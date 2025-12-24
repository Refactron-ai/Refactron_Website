import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackConversion, ConversionEvents } from '../utils/analytics';

const EarlyAccessForm: React.FC = () => {
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
      // EmailJS configuration
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

      // Check if environment variables are properly set
      if (
        serviceId === 'your_service_id' ||
        welcomeTemplateId === 'your_welcome_template_id' ||
        notificationTemplateId === 'your_notification_template_id' ||
        publicKey === 'your_public_key'
      ) {
        throw new Error(
          'EmailJS environment variables not configured. Please check your .env file.'
        );
      }

      // Prepare email data
      const emailData = {
        user_email: email,
        user_name: email.split('@')[0], // Use email prefix as name if no name provided
        signup_date: new Date().toLocaleDateString(),
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        from_email: fromEmail,
        reply_to: fromEmail,
      };

      // Send welcome email to user
      const welcomeResult = await emailjs.send(
        serviceId,
        welcomeTemplateId,
        {
          ...emailData,
          to_email: email,
        },
        publicKey
      );

      // Send notification email to you
      const notificationResult = await emailjs.send(
        serviceId,
        notificationTemplateId,
        {
          ...emailData,
          to_email: notificationEmail,
        },
        publicKey
      );

      console.log('Welcome email sent successfully:', welcomeResult);
      console.log('Notification email sent successfully:', notificationResult);

      // Log to console for development
      console.log('New early access signup:', {
        email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        welcomeEmailSent: welcomeResult.status === 200,
        notificationEmailSent: notificationResult.status === 200,
      });

      setIsSubmitted(true);
      setEmail('');

      // Track conversion
      trackConversion(ConversionEvents.EARLY_ACCESS_FORM_SUBMITTED, {
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Email sending failed:', err);

      // More specific error messages
      if (err instanceof Error) {
        if (err.message.includes('environment variables')) {
          setError('Email service not configured. Please contact support.');
        } else if (err.message.includes('400')) {
          setError(
            'Invalid email configuration. Please check your EmailJS setup.'
          );
        } else {
          setError(
            'Something went wrong. Please try again or contact us directly.'
          );
        }
      } else {
        setError(
          'Something went wrong. Please try again or contact us directly.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError('');
  };

  return (
    <section
      id="early-access"
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 relative scroll-mt-24"
      data-section="early-access"
    >
      {/* Background Effects - Hidden on mobile */}
      <div className="absolute inset-0">
        <div className="hidden sm:block absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="hidden sm:block absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-900 tracking-tight">
            Stay Updated
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Get the latest updates on Refactron features, new releases, and
            AI-powered development tools. Join our community of developers
            transforming code with intelligent automation.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-sm font-semibold text-gray-700 mb-2 sm:mb-3"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    disabled={isLoading}
                  />
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-xs sm:text-sm mt-2 sm:mt-3"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <span>Get Updates</span>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </button>

                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Get updates on new features and releases. No spam, ever.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 sm:space-y-8"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-tight">
                    You're All Set!
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto px-2">
                    You've successfully joined our community. We'll keep you
                    updated on the latest Refactron features and releases!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-primary-100">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    What happens next?
                  </h4>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold text-xs">
                          1
                        </span>
                      </div>
                      <span>
                        You'll receive a welcome email with installation guide
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold text-xs">
                          2
                        </span>
                      </div>
                      <span>Updates on new features and improvements</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold text-xs">
                          3
                        </span>
                      </div>
                      <span>Access to community resources and support</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-gray-500 px-2">
                    Questions? Reach out to us at{' '}
                    <a
                      href="mailto:hello@refactron.dev"
                      className="text-primary-600 hover:text-primary-700 font-medium break-all"
                    >
                      hello@refactron.dev
                    </a>
                  </p>

                  <button
                    onClick={handleReset}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 text-xs sm:text-sm"
                  >
                    Add another email address
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                  1
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Priority Access
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Be first in line when we launch with exclusive early access
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                  2
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Exclusive Benefits
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Special pricing and features only available to early adopters
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                  3
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Early Updates
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                Get the latest news and feature previews before anyone else
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessForm;
