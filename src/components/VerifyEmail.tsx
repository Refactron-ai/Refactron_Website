import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const token = searchParams.get('token');
  const email = location.state?.email; // From signup redirection

  // Try to get device code from location.state first, then localStorage
  // localStorage is used when user clicks verification link from email
  const deviceCode =
    location.state?.deviceCode || localStorage.getItem('pending_device_code');

  // Debug: log device code source
  console.log('[VerifyEmail] Device code:', deviceCode);
  console.log('[VerifyEmail] From state:', location.state?.deviceCode);
  console.log(
    '[VerifyEmail] From localStorage:',
    localStorage.getItem('pending_device_code')
  );

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('idle');
      return;
    }

    setStatus('loading');
    const verifyToken = async () => {
      try {
        const apiBaseUrl =
          process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
        const response = await fetch(`${apiBaseUrl}/api/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
          // Don't remove device code here - keep it until user logs in with it
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to verify email.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred while verifying your email.');
      }
    };

    // Small delay for better UX
    setTimeout(verifyToken, 1000);
  }, [token]);

  // Common container style
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-space">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {children}
      </motion.div>
    </div>
  );

  // Icon wrapper style
  const IconWrapper = ({
    children,
    colorClass = 'bg-green-500/10 text-green-500',
  }: {
    children: React.ReactNode;
    colorClass?: string;
  }) => (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 ${colorClass} ring-1 ring-inset ring-white/10`}
    >
      {children}
    </div>
  );

  if (status === 'idle') {
    return (
      <Container>
        <IconWrapper>
          <Check className="w-8 h-8" />
        </IconWrapper>
        <h1 className="text-2xl font-light text-white mb-4">
          Check your email
        </h1>
        <p className="text-neutral-400 mb-8 leading-relaxed">
          We sent a confirmation link to <br />
          <span className="text-white font-medium">
            {email || 'your email address'}
          </span>
          . Click the link to activate <br /> your account.
        </p>
        <Link
          to={deviceCode ? `/login?code=${deviceCode}` : '/login'}
          className="inline-flex items-center text-sm text-neutral-500 hover:text-white transition-colors"
        >
          Back to login <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </Container>
    );
  }

  if (status === 'loading') {
    return (
      <Container>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full animate-pulse" />
          <div className="relative w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-8">
            <img
              src="/logo.png"
              alt="Refactron"
              className="w-10 h-10 opacity-80 animate-pulse"
            />
          </div>
        </div>
        <h1 className="text-2xl font-light text-white mb-4">Verifying...</h1>
        <p className="text-neutral-400">
          Please wait while we verify your email.
        </p>
      </Container>
    );
  }

  if (status === 'success') {
    return (
      <Container>
        <IconWrapper>
          <Check className="w-8 h-8" />
        </IconWrapper>
        <h1 className="text-2xl font-light text-white mb-4">Email Verified</h1>
        <p className="text-neutral-400 mb-8">
          Your account has been successfully verified. <br />
          You can now sign in.
        </p>
        <Link
          to={deviceCode ? `/login?code=${deviceCode}` : '/login'}
          className="inline-flex items-center text-sm text-neutral-500 hover:text-white transition-colors"
        >
          Back to login <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </Container>
    );
  }

  // Error state
  return (
    <Container>
      <IconWrapper colorClass="bg-red-500/10 text-red-500">
        <X className="w-8 h-8" />
      </IconWrapper>
      <h1 className="text-2xl font-light text-white mb-4">
        Verification Failed
      </h1>
      <p className="text-neutral-400 mb-8">{message}</p>
      <Link
        to={deviceCode ? `/login?code=${deviceCode}` : '/login'}
        className="inline-flex items-center text-sm text-neutral-500 hover:text-white transition-colors"
      >
        Back to login <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </Container>
  );
};

export default VerifyEmail;
