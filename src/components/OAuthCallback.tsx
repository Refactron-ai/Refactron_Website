import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { handleOAuthCallback } from '../utils/oauth';
import { getBaseUrl } from '../utils/urlUtils';
import { useAuth } from '../hooks/useAuth';

/**
 * OAuthCallback - Handles OAuth callback from Google/GitHub
 * Processes the authorization code and redirects user appropriately
 */
const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

        if (result.success && result.data) {
          // Update auth state
          login(result.data.accessToken, result.data.user);

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
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-neutral-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-800 p-8 sm:p-10 text-center relative z-10"
      >
        {status === 'loading' && (
          <>
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
                <img
                  src="/logo.png"
                  alt="Refactron"
                  className="w-10 h-10 opacity-80 animate-pulse"
                />
              </div>
            </div>
            <h2 className="text-2xl font-light text-white mb-2">
              Authenticating
            </h2>
            <p className="text-neutral-400">
              Completing your secure sign in...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/20">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-light text-white mb-2">Success</h2>
            <p className="text-neutral-400">
              Redirecting you to the dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-red-500/20">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-light text-white mb-2">
              Authentication Failed
            </h2>
            <p className="text-neutral-400 mb-8">{errorMessage}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-all"
              >
                Back to Login
              </button>
              <button
                onClick={() => navigate('/signup', { replace: true })}
                className="w-full py-3 bg-transparent border border-neutral-800 text-white font-medium rounded-xl hover:bg-neutral-900 transition-all"
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
