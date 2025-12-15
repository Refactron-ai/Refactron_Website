import React, { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface RedirectToAppProps {
  path: string;
  label: string;
}

const RedirectToApp: React.FC<RedirectToAppProps> = ({ path, label }) => {
  useEffect(() => {
    // Use window.location for 302 redirect
    window.location.replace(`https://app.refactron.dev${path}`);
  }, [path]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Redirecting to {label}...</p>
      </div>
    </div>
  );
};

export default RedirectToApp;
