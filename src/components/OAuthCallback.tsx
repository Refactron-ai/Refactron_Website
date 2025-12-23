import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { handleOAuthCallback } from '../utils/oauth';
import { getBaseUrl } from '../utils/urlUtils';

/**
 * OAuthCallback - Handles OAuth callback from Google/GitHub
 * Processes the authorization code and redirects user appropriately
 */
const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const processingRef = React.useRef(false);
  const mountedRef = React.useRef(true);

  useEffect(() => {
    const processCallback = async () => {
      // Prevent multiple simultaneous callback attempts
      if (processingRef.current) {
        return;
      }
      processingRef.current = true;

      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // Handle OAuth errors
      if (error) {
        setStatus('error');
        setErrorMessage(
          errorDescription ||
            error.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) ||
            'Authentication failed. Please try again.'
        );
        return;
      }

      // Validate required parameters
      if (!code || !state) {
        setStatus('error');
        setErrorMessage('Invalid OAuth callback. Missing required parameters.');
        return;
      }

      try {
        // Handle OAuth callback
        const result = await handleOAuthCallback(code, state, {
          redirectUri: `${getBaseUrl()}/auth/callback`,
        });

        if (result.success) {
          setStatus('success');

          // Redirect to dashboard or appropriate page
          setTimeout(() => {
            if (mountedRef.current) {
              navigate(result.data?.redirectTo || '/dashboard', {
                replace: true,
              });
            }
          }, 1500);
        } else {
          setStatus('error');
          setErrorMessage(
            result.error || 'Authentication failed. Please try again.'
          );
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred during authentication.'
        );
      }
    };

    processCallback();

    return () => {
      mountedRef.current = false;
    };
  }, [searchParams, navigate]);

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
        className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8 sm:p-10 text-center relative z-10"
      >
        {status === 'loading' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <Loader2 className="w-16 h-16 text-primary-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Completing Authentication
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your credentials...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              You've been successfully authenticated. Redirecting...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertCircle className="w-8 h-8 text-red-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Back to Login
              </button>
              <button
                onClick={() => navigate('/signup', { replace: true })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Try Sign Up
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OAuthCallback;
