import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
  onReject: () => void;
  onCustomize: () => void;
  onCancel: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onReject,
  onCustomize,
  onCancel,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show popup after 2.5 seconds delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    onAccept(preferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const preferences: CookiePreferences = {
      necessary: true, // Always true as these are required
      analytics: false,
      marketing: false,
      functional: false,
    };
    onReject();
    onAccept(preferences);
    setIsVisible(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-300 ease-out" />

      {/* Cookie popup */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0D0D0D] border border-white/10 shadow-2xl rounded-xl w-[90%] max-w-2xl transform transition-all duration-300 ease-out font-space animate-in slide-in-from-bottom-4 fade-in">
        <div className="p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-neutral-400 text-xs leading-relaxed">
              We use cookies to enhance your experience.{' '}
              <a
                href="/privacy-policy"
                className="text-white hover:text-neutral-300 underline decoration-white/30 hover:decoration-white/100 transition-all"
              >
                Learn more
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 text-xs font-medium text-black bg-white hover:bg-neutral-200 rounded-lg transition-all duration-300 shadow-sm whitespace-nowrap"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-xs font-medium text-neutral-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 whitespace-nowrap"
            >
              Decline
            </button>
            <button
              onClick={onCustomize}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
