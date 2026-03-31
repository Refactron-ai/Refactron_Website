import React, { useState } from 'react';
import CookieConsent from './CookieConsent';
import CookiePreferencesModal from './CookiePreferencesModal';
import { useCookieConsent, CookiePreferences } from '../hooks/useCookieConsent';

const CookieManager: React.FC = () => {
  const { preferences, hasConsent, isLoading, savePreferences } =
    useCookieConsent();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // Don't render anything while loading or if user has already given consent
  if (isLoading || hasConsent) {
    return null;
  }

  return (
    <>
      <CookieConsent
        onAccept={savePreferences}
        onCustomize={() => setShowPreferencesModal(true)}
        onCancel={() => {
          // User dismissed the banner without making a choice.
          // They can revisit via the footer "Cookie Settings" link.
        }}
      />

      <CookiePreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSave={(newPreferences: CookiePreferences) => {
          savePreferences(newPreferences);
        }}
        currentPreferences={preferences}
      />
    </>
  );
};

export default CookieManager;
