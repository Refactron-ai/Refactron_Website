import React, { useState } from 'react';
import CookieConsent from './CookieConsent';
import CookiePreferencesModal from './CookiePreferencesModal';
import { useCookieConsent, CookiePreferences } from '../hooks/useCookieConsent';

const CookieManager: React.FC = () => {
  const { preferences, hasConsent, isLoading, savePreferences } = useCookieConsent();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  const handleAccept = (newPreferences: CookiePreferences) => {
    savePreferences(newPreferences);
  };

  const handleReject = () => {
    const rejectPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(rejectPreferences);
  };

  const handleCustomize = () => {
    setShowPreferencesModal(true);
  };

  const handleCancel = () => {
    // User dismissed the banner without making a choice
    // This is allowed - they can make a choice later via footer link
  };

  const handleSavePreferences = (newPreferences: CookiePreferences) => {
    savePreferences(newPreferences);
  };

  // Don't render anything while loading or if user has already given consent
  if (isLoading || hasConsent) {
    return null;
  }

  return (
    <>
      <CookieConsent
        onAccept={handleAccept}
        onReject={handleReject}
        onCustomize={handleCustomize}
        onCancel={handleCancel}
      />
      
      <CookiePreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSave={handleSavePreferences}
        currentPreferences={preferences}
      />
    </>
  );
};

export default CookieManager;
