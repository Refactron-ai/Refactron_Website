import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

/**
 * AuthApp - Main component for app.refactron.dev subdomain
 * Handles authentication-related routes (login, signup, etc.)
 */
const AuthApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      <Routes>
        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={<LoginForm />} />

        {/* Signup route */}
        <Route path="/signup" element={<SignupForm />} />

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
                <a
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Back to Login
                </a>
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
