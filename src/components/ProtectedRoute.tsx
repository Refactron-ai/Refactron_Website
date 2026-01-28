import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  console.log('[ProtectedRoute]', {
    pathname: location.pathname,
    isAuthenticated,
    loading,
    onboardingCompleted: user?.onboardingCompleted,
  });

  if (loading) {
    return <LoadingSpinner fullScreen text="Verifying session..." />;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check onboarding status
  if (
    user &&
    !user.onboardingCompleted &&
    location.pathname !== '/onboarding'
  ) {
    console.log('[ProtectedRoute] Redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  // If onboarding is completed and user tries to access onboarding page, redirect to dashboard
  // BUT: Don't redirect if there's a pending device code (user just completed onboarding and navigating to device connect)
  if (user && user.onboardingCompleted && location.pathname === '/onboarding') {
    const hasPendingDeviceCode = localStorage.getItem('pending_device_code');
    if (hasPendingDeviceCode) {
      console.log(
        '[ProtectedRoute] Has pending device code, allowing navigation to complete'
      );
      return <>{children}</>;
    }
    console.log('[ProtectedRoute] Redirecting from onboarding to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('[ProtectedRoute] Rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
