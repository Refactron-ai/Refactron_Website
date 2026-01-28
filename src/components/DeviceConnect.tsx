import React, { useState, useEffect } from 'react';
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Terminal, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/**
 * DeviceConnect - Page for confirming CLI device authorization
 * User arrives here after logging in with a ?code= parameter
 */
const DeviceConnect: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuth();

  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );
  const [errorMessage, setErrorMessage] = useState('');

  // Get code from location state (passed from onboarding) or URL params
  // Priority: location.state.deviceCode > searchParams
  const userCode =
    (location.state as { deviceCode?: string })?.deviceCode ||
    searchParams.get('code');

  console.log(
    '[DeviceConnect] Loaded with code:',
    userCode,
    'from',
    (location.state as { deviceCode?: string })?.deviceCode ? 'state' : 'URL'
  );

  // Clean up pending_device_code after successful mount
  useEffect(() => {
    if (userCode) {
      localStorage.removeItem('pending_device_code');
      console.log(
        '[DeviceConnect] Cleaned up pending_device_code from localStorage'
      );
    }
  }, [userCode]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(`/login?code=${userCode}`, { replace: true });
    }
  }, [loading, isAuthenticated, navigate, userCode]);

  // If no code after loading, show error or redirect
  if (!loading && !userCode) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 font-space">
        <div className="text-center">
          <h2 className="text-2xl font-normal text-white mb-4">
            No Device Code
          </h2>
          <p className="text-neutral-400 mb-6">
            No device code was provided in the URL.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-black font-medium px-6 py-3 rounded-lg hover:opacity-90"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    if (!userCode || confirming) return;

    setConfirming(true);
    setErrorMessage('');

    try {
      const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`${apiBaseUrl}/api/oauth/device/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify({ user_code: userCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || 'Failed to authorize device');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to authorize device. Please try again.'
      );
    } finally {
      setConfirming(false);
    }
  };

  if (loading || !isAuthenticated || !userCode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-space">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-neutral-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-800 p-8 sm:p-10 relative z-10"
      >
        <AnimatePresence mode="wait">
          {status === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-neutral-700">
                <Terminal className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-2xl font-normal text-white mb-2">
                Connect Refactron CLI
              </h1>

              {/* User Info */}
              <p className="text-neutral-400 mb-6">
                You are logged in as{' '}
                <span className="text-white font-medium">{user?.email}</span>
              </p>

              {/* Code Display */}
              <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4 mb-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Device Code
                </p>
                <p className="text-2xl font-mono text-white tracking-widest">
                  {userCode}
                </p>
              </div>

              {/* Confirmation Message */}
              <p className="text-sm text-neutral-400 mb-8">
                A CLI session is requesting access to your account. Click below
                to authorize this device.
              </p>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {confirming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <span>Connect CLI</span>
                  )}
                </button>

                <Link
                  to="/dashboard"
                  className="block w-full text-center text-sm text-neutral-400 hover:text-white transition-colors py-2"
                >
                  Cancel and go to Dashboard
                </Link>
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>

              <h2 className="text-2xl font-normal text-white mb-2">
                ✅ CLI Connected
              </h2>

              <p className="text-neutral-400 mb-8">
                Your CLI is now authorized. You can return to your terminal.
              </p>

              <Link
                to="/dashboard"
                className="inline-block bg-white text-black font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-red-500/20">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>

              <h2 className="text-2xl font-normal text-white mb-2">
                Authorization Failed
              </h2>

              <p className="text-neutral-400 mb-8">
                {errorMessage ||
                  'Code invalid or expired — run refactron login again and refresh this page.'}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleConfirm}
                  className="w-full bg-white text-black font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Try Again
                </button>

                <Link
                  to="/dashboard"
                  className="block text-center text-sm text-neutral-400 hover:text-white transition-colors py-2"
                >
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DeviceConnect;
