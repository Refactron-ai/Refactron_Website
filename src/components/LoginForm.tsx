import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Github,
  Chrome,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from './SEOHead';

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

  // Auto-focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Load saved email from localStorage if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('refactron_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      setErrors({});

      // TODO: Implement OAuth flow
      // In production, redirect to OAuth provider
      window.location.href = `/api/auth/${provider}`;
    } catch (error) {
      setErrors({
        general: `Failed to authenticate with ${provider}. Please try again.`,
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setRateLimitMessage('');

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
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
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
        // Handle specific error types
        if (response.status === 401) {
          setAttemptCount(prev => prev + 1);
          setErrors({
            general:
              'Invalid email or password. Please check your credentials and try again.',
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
            general: 'Server error. Please try again in a few moments.',
          });
        } else {
          setErrors({
            general: data.message || 'An error occurred. Please try again.',
          });
        }
        return;
      }

      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('refactron_remembered_email', email);
      } else {
        localStorage.removeItem('refactron_remembered_email');
      }

      // Success
      setSuccess(true);

      // Store auth token if provided
      if (data.token) {
        localStorage.setItem('refactron_auth_token', data.token);
      }

      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard'); // TODO: Update with actual dashboard route
      }, 1000);
    } catch (error) {
      // Network or other errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setErrors({
          general: 'Network error. Please check your connection and try again.',
        });
      } else {
        setErrors({
          general: 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <SEOHead
        title="Login | Refactron - AI-Powered Code Refactoring Platform"
        description="Sign in to your Refactron account to access AI-powered code refactoring and optimization tools. Transform your legacy code with intelligent automation."
        keywords="Refactron login, sign in, code refactoring login, AI developer tools access, automated code optimization login"
        ogTitle="Login to Refactron | AI-Powered Code Refactoring"
        ogDescription="Sign in to access AI-powered code refactoring and optimization tools."
        ogImage="https://refactron.dev/Refactron-logo-TM.png"
        ogUrl="https://app.refactron.dev/login"
        canonicalUrl="https://app.refactron.dev/login"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-sm sm:text-base"
          >
            Sign in to your Refactron account
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8 sm:p-10"
        >
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
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
                    className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`}
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
                  aria-describedby={errors.email ? 'email-error' : undefined}
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
                    className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`}
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
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
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-xs text-gray-500"
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
      </motion.div>
    </div>
  );
};

export default LoginForm;
