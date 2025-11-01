import React, { useState, useEffect } from 'react';
import { X, Settings, Shield } from 'lucide-react';

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
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-100 shadow-sm rounded-2xl max-w-xs transform transition-all duration-300 ease-out">
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 p-1 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Cookie Preferences
              </h3>
              <p className="text-xs text-gray-500">Manage your privacy</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs leading-relaxed mb-4">
            We use cookies to enhance your experience and analyze site usage.{' '}
            <a
              href="/privacy-policy"
              className="text-primary-600 hover:text-primary-700 underline font-medium"
            >
              Learn more
            </a>
          </p>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={handleAcceptAll}
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-300 shadow-sm"
            >
              Accept All Cookies
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleRejectAll}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                Decline
              </button>
              <button
                onClick={onCustomize}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 flex items-center justify-center gap-1"
              >
                <Settings className="h-3 w-3" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
