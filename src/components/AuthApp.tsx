import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OAuthCallback from './OAuthCallback';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import Billing from './Billing';
import ApiKeys from './ApiKeys';
import Organizations from './Organizations';
import OrganizationSettings from './OrganizationSettings';
import ProtectedRoute from './ProtectedRoute';
import VerifyEmail from './VerifyEmail';
import PageTransition from './PageTransition';
import LogoutOverlay from './LogoutOverlay';
import LoadingSpinner from './LoadingSpinner';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import SlugRedirect from './SlugRedirect';

/**
 * AuthAppContent - Internal component to access useAuth hook
 */
const AuthAppContent: React.FC = () => {
  const location = useLocation();
  const { loggingOut, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen text="Verifying session..." />;
  }

  return (
    <div className="min-h-screen bg-black font-space">
      <LogoutOverlay isVisible={loggingOut} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Default route - redirect to login */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Navigate to="/login" replace />
              </PageTransition>
            }
          />

          {/* Login route */}
          <Route
            path="/login"
            element={
              <PageTransition>
                <LoginForm />
              </PageTransition>
            }
          />

          {/* Signup route */}
          <Route
            path="/signup"
            element={
              <PageTransition>
                <SignupForm />
              </PageTransition>
            }
          />

          {/* OAuth Callback route */}
          <Route
            path="/auth/callback"
            element={
              <PageTransition>
                <OAuthCallback />
              </PageTransition>
            }
          />

          {/* Protected Dashboard Route - Redirect legacy to slug */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SlugRedirect to="dashboard" />
              </ProtectedRoute>
            }
          />

          {/* Protected Dashboard Route - Slug based */}
          <Route
            path="/:slug/dashboard"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected Onboarding Route */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Onboarding />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected Billing Route */}
          <Route
            path="/settings/billing"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Billing />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected API Keys Route - Redirect legacy */}
          <Route
            path="/settings/api-keys"
            element={
              <ProtectedRoute>
                <SlugRedirect to="settings/api-keys" />
              </ProtectedRoute>
            }
          />

          {/* Protected API Keys Route - Slug based */}
          <Route
            path="/:slug/settings/api-keys"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ApiKeys />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected Organizations Route */}
          <Route
            path="/settings/organizations"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Organizations />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected Organization Settings Route - Redirect legacy */}
          <Route
            path="/settings/organizations/settings"
            element={
              <ProtectedRoute>
                <SlugRedirect to="settings/organizations/settings" />
              </ProtectedRoute>
            }
          />

          {/* Protected Organization Settings Route - Slug based */}
          <Route
            path="/:slug/settings/organizations/settings"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <OrganizationSettings />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Email Verification route */}
          <Route
            path="/verify-email"
            element={
              <PageTransition>
                <VerifyEmail />
              </PageTransition>
            }
          />

          {/* Forgot Password route - placeholder */}
          <Route
            path="/forgot-password"
            element={
              <PageTransition>
                <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
                  <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float opacity-60"></div>
                  </div>
                  <div className="max-w-md w-full bg-neutral-900/50 backdrop-blur-xl rounded-2xl shadow-xl border border-neutral-800 p-8 sm:p-10 text-center relative z-10">
                    <h1 className="text-2xl font-normal text-white mb-4">
                      Reset Password
                    </h1>
                    <p className="text-neutral-500 mb-6">
                      Password reset functionality coming soon
                    </p>
                    <Link
                      to="/login"
                      className="text-white hover:text-neutral-300 font-medium"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </PageTransition>
            }
          />

          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <PageTransition>
                <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
                  <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float opacity-60"></div>
                  </div>
                  <div className="text-center relative z-10">
                    <h1 className="text-4xl font-normal text-white mb-4">
                      404
                    </h1>
                    <p className="text-neutral-500 mb-4">Page not found</p>
                    <a
                      href="/login"
                      className="text-white hover:text-neutral-300 font-medium transition-colors"
                    >
                      Go to Login
                    </a>
                  </div>
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

/**
 * AuthApp - Main component for app.refactron.dev subdomain
 * Handles authentication-related routes (login, signup, etc.)
 */
const AuthApp: React.FC = () => {
  return (
    <AuthProvider>
      <AuthAppContent />
    </AuthProvider>
  );
};

export default AuthApp;
