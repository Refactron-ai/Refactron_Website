'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackConversion, ConversionEvents } from '../utils/analytics';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '../utils/cn';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const serviceId =
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const welcomeTemplateId =
        process.env.REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID ||
        'your_welcome_template_id';
      const notificationTemplateId =
        process.env.REACT_APP_EMAILJS_NOTIFICATION_TEMPLATE_ID ||
        'your_notification_template_id';
      const publicKey =
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';
      const fromEmail =
        process.env.REACT_APP_FROM_EMAIL || 'hello@refactron.dev';
      const notificationEmail =
        process.env.REACT_APP_NOTIFICATION_EMAIL || 'hello@refactron.dev';

      if (
        serviceId === 'your_service_id' ||
        welcomeTemplateId === 'your_welcome_template_id' ||
        notificationTemplateId === 'your_notification_template_id' ||
        publicKey === 'your_public_key'
      ) {
        // For demo purposes, simulate success if env vars are missing
        console.warn('EmailJS not configured, simulating success');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        const emailData = {
          user_email: email,
          user_name: email.split('@')[0],
          signup_date: new Date().toLocaleDateString(),
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          from_email: fromEmail,
          reply_to: fromEmail,
        };

        await emailjs.send(
          serviceId,
          welcomeTemplateId,
          { ...emailData, to_email: email },
          publicKey
        );
        await emailjs.send(
          serviceId,
          notificationTemplateId,
          { ...emailData, to_email: notificationEmail },
          publicKey
        );
      }

      setIsSubmitted(true);
      setEmail('');
      trackConversion(ConversionEvents.EARLY_ACCESS_FORM_SUBMITTED, {
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Email sending failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div className="shadow-input mx-auto w-full max-w-md rounded-lg bg-white p-4 md:p-8 dark:bg-black pointer-events-auto border border-neutral-200 dark:border-neutral-800 relative font-space">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>

              {!isSubmitted ? (
                <>
                  <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Join Early Access
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    Get priority access to Refactron and start transforming your
                    codebase.
                  </p>

                  <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </LabelInputContainer>

                    {error && (
                      <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <button
                      className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Joining...' : 'Join Now \u2192'}
                      <BottomGradient />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Thanks for joining. We'll be in touch soon.
                  </p>
                  <button
                    onClick={onClose}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EarlyAccessModal;

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
