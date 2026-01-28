import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useAuth } from '../hooks/useAuth';
import { getBaseUrl } from '../utils/urlUtils';
import {
  initiateOAuth,
  isOAuthProviderConfigured,
  type OAuthProvider,
} from '../utils/oauth';
import { GoogleLogo } from './SocialLogos';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [searchParams] = useState(
    () => new URLSearchParams(window.location.search)
  );
  const deviceCode = searchParams.get('code');

  // SEO Configuration
  useSEO({
    title: 'Login | Refactron',
    description: 'Login to your Refactron account',
    canonical: `${getBaseUrl()}/login`,
    robots: 'index, follow',
  });

  const { login, isAuthenticated, loading, user } = useAuth();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only run this effect on the login page to prevent interference with other flows
    if (location.pathname !== '/login') {
      return;
    }

    // Prevent multiple navigations as auth state updates
    if (hasNavigated.current) {
      console.log('[LoginForm] Already navigated, skipping');
      return;
    }

    console.log('[LoginForm] Auth state:', {
      loading,
      isAuthenticated,
      user,
      deviceCode,
    });
    console.log(
      '[LoginForm] user.onboardingCompleted:',
      user?.onboardingCompleted
    );

    if (!loading && isAuthenticated && user) {
      hasNavigated.current = true; // Mark as navigated to prevent re-runs

      if (deviceCode) {
        // Check onboarding status before redirecting
        if (user.onboardingCompleted) {
          // Existing user with device code → device connect
          console.log(
            '[LoginForm] Existing user, redirecting to device connect'
          );
          navigate(`/device/connect?code=${deviceCode}`, { replace: true });
        } else {
          // New user with device code → store in localStorage for post-onboarding redirect
          // ProtectedRoute will redirect to /onboarding
          console.log(
            '[LoginForm] New user, storing device code and redirecting to dashboard (will be intercepted by ProtectedRoute)'
          );
          localStorage.setItem('pending_device_code', deviceCode);
          navigate('/dashboard', { replace: true });
        }
      } else {
        // No device code → normal dashboard redirect
        console.log('[LoginForm] No device code, redirecting to dashboard');
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, loading, navigate, deviceCode, user, location.pathname]);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  if (loading) return null;

  const validateEmail = (emailToValidate: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailToValidate);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleSocialLogin = async (provider: OAuthProvider) => {
    if (isLoading) return;

    try {
      setOauthLoading(provider);
      setErrors({});

      if (!isOAuthProviderConfigured(provider)) {
        setErrors({
          general: `${provider === 'google' ? 'Google' : 'GitHub'} authentication is not configured.`,
        });
        setOauthLoading(null);
        return;
      }

      // Store device code in sessionStorage to preserve through OAuth flow
      if (deviceCode) {
        sessionStorage.setItem('oauth_device_code', deviceCode);
      }

      await initiateOAuth(provider, 'login', {
        redirectUri: `${getBaseUrl()}/auth/callback`,
      });
    } catch (error) {
      setOauthLoading(null);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : `Failed to authenticate with ${provider}.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setRateLimitMessage('');

    if (oauthLoading !== null || !validateForm()) return;

    if (attemptCount >= 5) {
      setRateLimitMessage(
        'Too many login attempts. Please wait a few minutes.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setAttemptCount(prev => prev + 1);
          setErrors({ general: 'Invalid email or password.' });
        } else if (response.status === 429) {
          setRateLimitMessage('Too many login attempts. Please wait.');
        } else {
          if (data.errors && Array.isArray(data.errors)) {
            const newErrors: FormErrors = { general: data.message };
            data.errors.forEach((err: { field?: string; message: string }) => {
              if (err.field === 'email') newErrors.email = err.message;
              else if (err.field === 'password')
                newErrors.password = err.message;
              else if (!newErrors.general) newErrors.general = err.message;
            });
            setErrors(newErrors);
          } else {
            setErrors({ general: data.message || 'Something went wrong.' });
          }
        }
        return;
      }

      setSuccess(true);
      login(data.accessToken, data.user);
      setTimeout(() => {
        if (deviceCode) {
          // Check onboarding status before redirecting
          if (data.user.onboardingCompleted) {
            // Existing user with device code → device connect
            navigate(`/device/connect?code=${deviceCode}`);
          } else {
            // New user with device code → store for post-onboarding redirect
            localStorage.setItem('pending_device_code', deviceCode);
            navigate('/onboarding');
          }
        } else if (data.user.onboardingCompleted) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      }, 1000);
    } catch (error) {
      setErrors({
        general:
          error instanceof TypeError && error.message.includes('fetch')
            ? 'Network issue detected. Is the backend running?'
            : 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex font-space">
      {/* Left Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-24 py-12 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-16"
              >
                <a
                  href="https://refactron.dev"
                  className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity"
                >
                  <img src="/logo.png" alt="Refactron" className="w-7 h-7" />
                  <span className="text-xl font-normal text-white">
                    Refactron
                  </span>
                </a>
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-10"
              >
                <h1 className="text-3xl font-normal text-white mb-2">
                  Welcome back
                </h1>
                <p className="text-neutral-500 text-sm">
                  Continue working with safe, verified refactoring.
                </p>
              </motion.div>

              {/* Error Messages */}
              <AnimatePresence>
                {(errors.general || rateLimitMessage) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
                  >
                    {rateLimitMessage || errors.general}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-neutral-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 transition-all"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-neutral-400 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                      className="block w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 transition-all pr-12"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-neutral-400"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 mt-6"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-black text-neutral-600">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Google OAuth Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading || oauthLoading !== null}
                  className="w-full flex items-center justify-center gap-3 bg-neutral-900/50 border border-neutral-800 text-white font-medium px-4 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-900"
                >
                  {oauthLoading === 'google' ? (
                    <span>Connecting...</span>
                  ) : (
                    <>
                      <GoogleLogo />
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <p className="text-sm text-neutral-500">
                  New to Refactron?{' '}
                  <Link
                    to={deviceCode ? `/signup?code=${deviceCode}` : '/signup'}
                    className="text-white hover:text-neutral-300 transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-sm flex flex-col items-center text-center"
            >
              <div className="mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-12 h-12 border-2 border-neutral-800 border-t-white rounded-full"
                />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-normal text-white mb-2"
              >
                Preparing workspace
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-neutral-500 text-sm"
              >
                Setting up your secure refactoring environment...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right Side - Marketing Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="hidden lg:flex lg:w-1/2 bg-neutral-950 items-center justify-center p-16"
      >
        <div className="max-w-lg text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-light text-neutral-600 mb-2"
          >
            Understand code.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-5xl font-light text-white mb-8"
          >
            Improve it safely.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-neutral-500 text-base leading-relaxed"
          >
            Structured refactoring with verification, rollback, and
            documentation.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
