import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { getBaseUrl } from '../utils/urlUtils';
import {
  initiateOAuth,
  isOAuthProviderConfigured,
  type OAuthProvider,
} from '../utils/oauth';
import { GoogleLogo, GithubLogo } from './SocialLogos';
import AnimatedRefactorWindow from './AnimatedRefactorWindow';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);

  // SEO Configuration for Login Page
  useSEO({
    title: 'Login | Refactron - AI Code Refactoring Platform',
    description:
      'Login to your Refactron account to access AI-powered code refactoring tools. Transform legacy code with intelligent automation and boost developer productivity.',
    keywords:
      'Refactron login, code refactoring login, AI developer tools access, secure developer login, code optimization platform',
    ogTitle: 'Login to Refactron | AI Code Refactoring Platform',
    ogDescription:
      'Login to your Refactron account to access AI-powered code refactoring tools and transform legacy code with intelligent automation.',
    ogImage: 'https://refactron.dev/Refactron-logo-TM.png',
    twitterTitle: 'Login to Refactron | AI Code Refactoring Platform',
    twitterDescription:
      'Login to your Refactron account to access AI-powered code refactoring tools and transform legacy code with intelligent automation.',
    twitterImage: 'https://refactron.dev/Refactron-logo-TM.png',
    canonical: `${getBaseUrl()}/login`,
    robots: 'index, follow',
  });

  // Auto-focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Load saved email from localStorage if remember me was checked
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('refactron_remembered_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (storageError) {
      // localStorage may be disabled; continue without saved email
      console.warn('Unable to load saved email:', storageError);
    }
  }, []);

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
    const value = e.target.value;
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleSocialLogin = async (provider: OAuthProvider) => {
    // Prevent OAuth if email login is in progress
    if (isLoading) {
      return;
    }

    try {
      setOauthLoading(provider);
      setErrors({});

      if (!isOAuthProviderConfigured(provider)) {
        setErrors({
          general: `${
            provider === 'google' ? 'Google' : 'GitHub'
          } authentication is not configured. Please contact support or use email login.`,
        });
        setOauthLoading(null);
        return;
      }

      await initiateOAuth(provider, 'login', {
        redirectUri: `${getBaseUrl()}/auth/callback`,
      });
    } catch (error) {
      setOauthLoading(null);
      const message =
        error instanceof Error
          ? error.message
          : `Failed to authenticate with ${provider}. Please try again.`;
      setErrors({ general: message });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setRateLimitMessage('');

    // Prevent submission if OAuth is in progress
    if (oauthLoading !== null) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Rate limiting check (client-side indication)
    if (attemptCount >= 5) {
      setRateLimitMessage(
        'Too many login attempts. Please wait a few minutes before trying again.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setAttemptCount(prev => prev + 1);
          setErrors({
            general:
              "That email/password combo doesn't compile. Double-check your credentials and try again.",
          });
        } else if (response.status === 429) {
          setRateLimitMessage(
            'Too many login attempts. Please wait before trying again.'
          );
        } else if (response.status === 403) {
          setErrors({
            general: 'Your account has been suspended. Please contact support.',
          });
        } else if (response.status === 423) {
          setErrors({
            general:
              'Your account is locked. Please check your email for unlock instructions.',
          });
        } else if (response.status >= 500) {
          setErrors({
            general:
              'Our services are under heavy load. Give it a minute and try again.',
          });
        } else {
          setErrors({
            general:
              data.message ||
              'Something went wrong on our side. Please try again in a moment.',
          });
        }
        return;
      }

      try {
        if (rememberMe) {
          localStorage.setItem('refactron_remembered_email', email);
        } else {
          localStorage.removeItem('refactron_remembered_email');
        }
      } catch (storageError) {
        // localStorage may be disabled or full; continue without remembering email
        console.warn('Unable to save email preference:', storageError);
      }

      setSuccess(true);

      // Auth tokens are managed via secure httpOnly cookies on the server.
      // Do not store tokens in localStorage to avoid exposure to XSS.

      setTimeout(() => {
        navigate('/dashboard'); // TODO: Update with actual dashboard route
      }, 1000);
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setErrors({
          general:
            'Network issue detected. Check your connection and retry the login.',
        });
      } else {
        setErrors({
          general:
            'An unexpected error occurred during login. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-12 left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-60 animate-float" />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-40 animate-float"
          style={{ animationDelay: '1.6s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Left panel: value prop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100/70 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm border border-primary-200/70">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Secure AI-powered code refactoring
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Welcome back to Refactron
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Ship cleaner code faster with AI that understands your codebase,
                not just your files — and keeps every refactor safe and
                reviewable.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              <div className="rounded-xl bg-white/80 backdrop-blur border border-white/70 p-4 shadow-sm flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-primary-50 p-2 text-primary-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Faster reviews
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Auto-suggested refactors, human-approved changes. Teams see
                    review time drop by up to 30%.
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-white/80 backdrop-blur border border-white/70 p-4 shadow-sm flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Safer refactors
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Diff previews, rollbacks, and guardrails by default — 0
                    breaking changes suggested before tests pass.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <AnimatedRefactorWindow />
            </div>
            {process.env.REACT_APP_ENABLE_LOCAL_AUTH === 'true' && (
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 text-yellow-800 px-3 py-1 text-xs font-semibold border border-yellow-200">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                Local Testing Mode
              </div>
            )}
          </motion.div>

          {/* Right panel: auth card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <div className="relative">
              <div className="pointer-events-none absolute -inset-[1px] rounded-[1.25rem] bg-gradient-to-r from-primary-400/40 via-primary-300/30 to-primary-500/40 opacity-60 blur-sm" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10">
                {/* Success Message */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Login successful! Redirecting...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* General Error Message */}
                <AnimatePresence>
                  {(errors.general || rateLimitMessage) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">
                          {rateLimitMessage || errors.general}
                        </p>
                        {rateLimitMessage && attemptCount >= 5 && (
                          <p className="mt-1 text-xs text-red-600">
                            You can try again in a few minutes.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-6">
                  <motion.button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading || oauthLoading !== null}
                    whileHover={
                      isLoading || oauthLoading !== null
                        ? {}
                        : { scale: 1.03, y: -2 }
                    }
                    whileTap={
                      isLoading || oauthLoading !== null ? {} : { scale: 0.97 }
                    }
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-primary-400 text-gray-700 font-medium px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-lg hover:border-primary-500 group relative"
                  >
                    {oauthLoading === 'google' ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-primary-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Connecting to Google...</span>
                      </>
                    ) : (
                      <>
                        <GoogleLogo className="transition-transform group-hover:scale-110" />
                        <span>Continue with Google</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading || oauthLoading !== null}
                    whileHover={
                      isLoading || oauthLoading !== null
                        ? {}
                        : { scale: 1.03, y: -2 }
                    }
                    whileTap={
                      isLoading || oauthLoading !== null ? {} : { scale: 0.97 }
                    }
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-lg group relative"
                  >
                    {oauthLoading === 'github' ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Connecting to GitHub...</span>
                      </>
                    ) : (
                      <>
                        <GithubLogo className="transition-transform group-hover:scale-110" />
                        <span>Continue with GitHub</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (isLoading || success)) {
                      e.preventDefault();
                    }
                  }}
                >
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail
                          className={`h-5 w-5 ${
                            errors.email ? 'text-red-400' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <input
                        ref={emailInputRef}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        className={`block w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 ${
                          errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-primary-500'
                        }`}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? 'email-error' : undefined
                        }
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="email-error"
                        className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock
                          className={`h-5 w-5 ${
                            errors.password ? 'text-red-400' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        className={`block w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 ${
                          errors.password
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-primary-500'
                        }`}
                        placeholder="Enter your password"
                        aria-invalid={!!errors.password}
                        aria-describedby={
                          errors.password ? 'password-error' : undefined
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        tabIndex={0}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="password-error"
                        className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || success}
                    whileHover={
                      isLoading ? {} : { scale: 1.03, y: -1.5, rotate: -0.25 }
                    }
                    whileTap={
                      isLoading ? {} : { scale: 0.97, y: 0, rotate: 0.1 }
                    }
                    transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                    className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Signing in...</span>
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Success!</span>
                      </>
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>

                  {/* Trust & Safety Strip */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                    <span>No training on your private code</span>
                    <span className="hidden sm:inline text-gray-400">·</span>
                    <span>Encrypted in transit & at rest</span>
                    <span className="hidden sm:inline text-gray-400">·</span>
                    <span>Refactors are always reviewable</span>
                  </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center text-xs text-gray-500"
        >
          By signing in, you agree to our{' '}
          <a
            href="https://refactron.dev/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="https://refactron.dev/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            Privacy Policy
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default LoginForm;
