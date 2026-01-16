import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  BarChart3,
  Target,
  Settings,
  Check,
  AlertCircle,
} from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
  currentPreferences: CookiePreferences;
}

const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentPreferences,
}) => {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(currentPreferences);

  useEffect(() => {
    setPreferences(currentPreferences);
  }, [currentPreferences]);

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const cookieCategories = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Necessary Cookies',
      description:
        'Essential for the website to function properly. These cannot be disabled.',
      icon: Shield,
      required: true,
      examples: ['Session management', 'Security tokens', 'User preferences'],
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description:
        'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      icon: BarChart3,
      required: false,
      examples: ['Page views', 'User behavior', 'Performance metrics'],
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing Cookies',
      description:
        'Used to track visitors across websites to display relevant and engaging advertisements.',
      icon: Target,
      required: false,
      examples: ['Ad targeting', 'Campaign tracking', 'Conversion tracking'],
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Functional Cookies',
      description:
        'Enable enhanced functionality and personalization, such as remembering your preferences.',
      icon: Settings,
      required: false,
      examples: ['Language preferences', 'Theme settings', 'Form data'],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-[#0D0D0D] border border-white/10 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden font-space">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">
                Cookie Preferences
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-neutral-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <p className="text-neutral-400 mb-6">
              Manage your cookie preferences below. You can enable or disable
              different types of cookies. Note that disabling certain cookies
              may affect your experience on our website.
            </p>

            <div className="space-y-4">
              {cookieCategories.map(category => {
                const Icon = category.icon;
                const isEnabled = preferences[category.key];

                return (
                  <div
                    key={category.key}
                    className={`border rounded-lg p-4 transition-colors ${
                      isEnabled
                        ? 'border-white/20 bg-white/5'
                        : 'border-white/10 bg-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon
                            className={`h-5 w-5 ${isEnabled ? 'text-white' : 'text-neutral-600'}`}
                          />
                          <h3 className="font-medium text-white">
                            {category.title}
                          </h3>
                          {category.required && (
                            <span className="text-xs bg-white/10 text-neutral-300 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mb-3">
                          {category.description}
                        </p>

                        <div className="text-xs text-neutral-500">
                          <span className="font-medium">Examples:</span>{' '}
                          {category.examples.join(', ')}
                        </div>
                      </div>

                      <div className="ml-4">
                        <button
                          onClick={() => handleToggle(category.key)}
                          disabled={category.required}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isEnabled ? 'bg-white' : 'bg-neutral-800'
                          } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                              isEnabled
                                ? 'translate-x-6 bg-black'
                                : 'translate-x-1 bg-white'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-200">
                  <p className="font-medium mb-1">Important Information</p>
                  <p>
                    Your preferences will be saved and applied immediately. You
                    can change these settings at any time by clicking the cookie
                    settings link in our footer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/10 bg-[#0D0D0D]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-white/10 hover:bg-white/5 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
