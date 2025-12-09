import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  CheckCircle2,
  Github,
  Chrome,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // SEO Configuration for Signup Page
  useSEO({
    title: 'Sign Up | Refactron - AI Code Refactoring Platform',
    description:
      'Create your free Refactron account to access AI-powered code refactoring tools. Transform legacy code with intelligent automation and boost developer productivity.',
    keywords:
      'Refactron signup, create developer account, AI code refactoring registration, free developer tools, code optimization signup',
    ogTitle: 'Sign Up for Refactron | AI Code Refactoring Platform',
    ogDescription:
      'Create your free Refactron account to access AI-powered code refactoring tools and transform legacy code with intelligent automation.',
    ogImage: 'https://refactron.dev/Refactron-logo-TM.png',
    twitterTitle: 'Sign Up for Refactron | AI Code Refactoring Platform',
    twitterDescription:
      'Create your free Refactron account to access AI-powered code refactoring tools and transform legacy code with intelligent automation.',
    twitterImage: 'https://refactron.dev/Refactron-logo-TM.png',
    canonical: 'https://app.refactron.dev/signup',
    robots: 'index, follow',
  });

  // Auto-focus name input on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordRequirements = (
    password: string
  ): PasswordRequirement[] => {
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
      { label: 'At least one number', met: /[0-9]/.test(password) },
      {
        label: 'At least one special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0)
      return { strength: 0, label: '', color: '', percentage: 0 };
    const requirements = checkPasswordRequirements(password);
    const metCount = requirements.filter(r => r.met).length;

    if (metCount <= 2)
      return {
        strength: 1,
        label: 'Weak',
        color: 'bg-red-500',
        percentage: 25,
      };
    if (metCount === 3)
      return {
        strength: 2,
        label: 'Fair',
        color: 'bg-yellow-500',
        percentage: 50,
      };
    if (metCount === 4)
      return {
        strength: 3,
        label: 'Good',
        color: 'bg-blue-500',
        percentage: 75,
      };
    return {
      strength: 4,
      label: 'Strong',
      color: 'bg-green-500',
      percentage: 100,
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordRequirements = checkPasswordRequirements(formData.password);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const unmet = passwordRequirements.filter(r => !r.met);
      if (unmet.length > 0) {
        newErrors.password = 'Password does not meet requirements';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.general =
        'Please agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Check email availability on blur (debounced)
    if (name === 'email' && value && validateEmail(value)) {
      setCheckingEmail(true);
      // TODO: Implement actual email availability check
      setTimeout(() => {
        setCheckingEmail(false);
        // For now, always allow
      }, 500);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      setErrors({});

      // TODO: Implement OAuth flow
      // In production, redirect to OAuth provider
      window.location.href = `/api/auth/${provider}/signup`;
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

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error types
        if (response.status === 409) {
          setErrors({
            email:
              'An account with this email already exists. Please sign in instead.',
          });
        } else if (response.status === 400) {
          setErrors({
            general:
              data.message ||
              'Invalid information provided. Please check your input.',
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

      // Success - show verification message
      setSuccess(true);

      // In production, show email verification notice
      // For now, simulate success and redirect
      setTimeout(() => {
        navigate('/verify-email', {
          state: { email: formData.email },
        });
      }, 2000);
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
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-sm sm:text-base"
          >
            Start your journey with Refactron
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
                className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Account created successfully!</p>
                    <p className="mt-1 text-xs text-green-700">
                      Please check your email to verify your account.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* General Error Message */}
          <AnimatePresence>
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{errors.general}</p>
                </div>
                <button
                  onClick={() =>
                    setErrors(prev => ({ ...prev, general: undefined }))
                  }
                  className="text-red-400 hover:text-red-600"
                  aria-label="Dismiss error"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <motion.button
              type="button"
              onClick={() => handleSocialSignup('google')}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Chrome className="w-5 h-5" />
              <span>Sign up with Google</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => handleSocialSignup('github')}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Github className="w-5 h-5" />
              <span>Sign up with GitHub</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`}
                  />
                </div>
                <input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="name-error"
                  className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </motion.p>
              )}
            </div>

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
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {checkingEmail && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg
                      className="animate-spin h-4 w-4 text-primary-500"
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
                  </div>
                )}
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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="Create a strong password"
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
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Password strength:{' '}
                    <span
                      className={`font-medium ${
                        passwordStrength.strength >= 3
                          ? 'text-green-600'
                          : passwordStrength.strength === 2
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </p>

                  {/* Password Requirements */}
                  <div className="space-y-1.5 mt-3">
                    {passwordRequirements.map((req, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-2 text-xs ${
                          req.met ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {req.met ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"></div>
                        )}
                        <span>{req.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

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

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`h-5 w-5 ${
                      errors.confirmPassword
                        ? 'text-red-400'
                        : formData.confirmPassword &&
                            formData.password === formData.confirmPassword
                          ? 'text-green-500'
                          : 'text-gray-400'
                    }`}
                  />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? 'border-green-300 focus:border-green-500'
                        : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="Confirm your password"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={
                    errors.confirmPassword
                      ? 'confirm-password-error'
                      : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="confirm-password-error"
                  className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </motion.p>
              )}
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword &&
                !errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1.5 text-sm text-green-600 flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Passwords match
                  </motion.p>
                )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.general?.includes('Terms')) {
                    setErrors(prev => ({ ...prev, general: undefined }));
                  }
                }}
                className="h-4 w-4 mt-0.5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                aria-invalid={errors.general?.includes('Terms')}
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                I agree to the{' '}
                <a
                  href="https://refactron.dev/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="https://refactron.dev/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || success}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
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
                  <span>Creating account...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Account Created!</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupForm;
