import React, { useState, useEffect } from 'react';
import { X, Shield, BarChart3, Target, Settings, Check, AlertCircle } from 'lucide-react';

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
  const [preferences, setPreferences] = useState<CookiePreferences>(currentPreferences);

  useEffect(() => {
    setPreferences(currentPreferences);
  }, [currentPreferences]);

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
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
      description: 'Essential for the website to function properly. These cannot be disabled.',
      icon: Shield,
      required: true,
      examples: ['Session management', 'Security tokens', 'User preferences']
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      icon: BarChart3,
      required: false,
      examples: ['Page views', 'User behavior', 'Performance metrics']
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant and engaging advertisements.',
      icon: Target,
      required: false,
      examples: ['Ad targeting', 'Campaign tracking', 'Conversion tracking']
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization, such as remembering your preferences.',
      icon: Settings,
      required: false,
      examples: ['Language preferences', 'Theme settings', 'Form data']
    }
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
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">Cookie Preferences</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <p className="text-gray-600 mb-6">
              Manage your cookie preferences below. You can enable or disable different types of cookies. 
              Note that disabling certain cookies may affect your experience on our website.
            </p>

            <div className="space-y-4">
              {cookieCategories.map((category) => {
                const Icon = category.icon;
                const isEnabled = preferences[category.key];
                
                return (
                  <div
                    key={category.key}
                    className={`border rounded-lg p-4 transition-colors ${
                      isEnabled ? 'border-teal-200 bg-teal-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`h-5 w-5 ${isEnabled ? 'text-teal-600' : 'text-gray-400'}`} />
                          <h3 className="font-medium text-gray-900">{category.title}</h3>
                          {category.required && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                        
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Examples:</span> {category.examples.join(', ')}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <button
                          onClick={() => handleToggle(category.key)}
                          disabled={category.required}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isEnabled ? 'bg-teal-600' : 'bg-gray-200'
                          } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-1'
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
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Important Information</p>
                  <p>
                    Your preferences will be saved and applied immediately. You can change these settings at any time 
                    by clicking the cookie settings link in our footer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-2"
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
