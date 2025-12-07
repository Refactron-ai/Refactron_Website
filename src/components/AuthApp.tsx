import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SEOHead from './SEOHead';

/**
 * AuthApp - Main component for app.refactron.dev subdomain
 * Handles authentication-related routes (login, signup, etc.)
 */
const AuthApp: React.FC = () => {
  // Structured data for the app subdomain
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Refactron App',
    alternateName: 'Refactron Platform',
    description:
      'Access the Refactron AI-powered code refactoring platform. Login or sign up to start transforming your legacy code with intelligent automation.',
    url: 'https://app.refactron.dev',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, Windows, macOS, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: 'Refactron',
      url: 'https://refactron.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Refactron',
      url: 'https://refactron.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://refactron.dev/Refactron-logo-TM.png',
      },
    },
    featureList: [
      'User authentication and account management',
      'AI-powered code refactoring tools',
      'Code analysis and optimization',
      'Real-time code transformation',
      'Team collaboration features',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <SEOHead
        title="Refactron App | AI-Powered Code Refactoring Platform"
        description="Access the Refactron AI-powered code refactoring platform. Login or sign up to start transforming your legacy code with intelligent automation and improve code quality."
        keywords="Refactron app, AI code refactoring login, code optimization platform, developer tools signin, automated refactoring platform, code transformation tool"
        ogTitle="Refactron App | AI-Powered Code Refactoring Platform"
        ogDescription="Access the Refactron platform to transform your legacy code with AI-powered refactoring and optimization tools. Sign in to get started."
        ogImage="https://refactron.dev/Refactron-logo-TM.png"
        ogUrl="https://app.refactron.dev/"
        canonicalUrl="https://app.refactron.dev/"
        structuredData={structuredData}
      />
      <Routes>
        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Signup route */}
        <Route path="/signup" element={<SignupForm />} />

        {/* Email Verification route */}
        <Route
          path="/verify-email"
          element={
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
                <div
                  className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
                  style={{ animationDelay: '2s' }}
                ></div>
              </div>
              <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8 sm:p-10 text-center relative z-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h1>
                <p className="text-gray-600 mb-6">
                  We've sent a verification link to your email address. Please
                  click the link to verify your account.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive the email? Check your spam folder or{' '}
                  <a
                    href="/resend-verification"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    resend verification email
                  </a>
                  .
                </p>
                <Link
                  to="/login"
                  className="inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          }
        />

        {/* Forgot Password route - placeholder */}
        <Route
          path="/forgot-password"
          element={
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
                <div
                  className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
                  style={{ animationDelay: '2s' }}
                ></div>
              </div>
              <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8 sm:p-10 text-center relative z-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Reset Password
                </h1>
                <p className="text-gray-600 mb-6">
                  Password reset functionality coming soon
                </p>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
              </div>
              <div className="text-center relative z-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Go to Login
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default AuthApp;
