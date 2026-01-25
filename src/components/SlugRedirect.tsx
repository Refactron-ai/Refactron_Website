import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface SlugRedirectProps {
  to: string; // e.g., 'dashboard' or 'settings/api-keys'
}

const SlugRedirect: React.FC<SlugRedirectProps> = ({ to }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Generate slug from organization name or fallback to 'user'
      const orgSlug =
        (user.organizationName || 'user')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') + '-organization';

      navigate(`/${orgSlug}/${to}`, { replace: true });
    }
  }, [user, loading, navigate, to]);

  return <LoadingSpinner fullScreen text="Redirecting..." />;
};

export default SlugRedirect;
