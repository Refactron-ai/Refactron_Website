import { useState, useEffect, useCallback } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const useCookieConsent = () => {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Handle analytics consent
  const handleAnalyticsConsent = useCallback((analyticsEnabled: boolean) => {
    if (analyticsEnabled) {
      // Enable analytics tracking
      enableAnalytics();
    } else {
      // Disable analytics tracking
      disableAnalytics();
    }
  }, []);

  // Load saved preferences on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const savedConsent = localStorage.getItem('cookie-consent');
        const savedPreferences = localStorage.getItem('cookie-preferences');

        if (savedConsent) {
          setHasConsent(true);
          if (savedPreferences) {
            const parsedPreferences = JSON.parse(savedPreferences);
            setPreferences(parsedPreferences);
          } else {
            setPreferences(DEFAULT_PREFERENCES);
          }
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
        setPreferences(DEFAULT_PREFERENCES);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback(
    (newPreferences: CookiePreferences) => {
      try {
        localStorage.setItem(
          'cookie-preferences',
          JSON.stringify(newPreferences)
        );
        localStorage.setItem('cookie-consent', 'true');
        localStorage.setItem('cookie-consent-date', new Date().toISOString());

        setPreferences(newPreferences);
        setHasConsent(true);

        // Trigger analytics based on preferences
        handleAnalyticsConsent(newPreferences.analytics);

        return true;
      } catch (error) {
        console.error('Error saving cookie preferences:', error);
        return false;
      }
    },
    [handleAnalyticsConsent]
  );

  // Check if a specific cookie category is enabled
  const isCategoryEnabled = useCallback(
    (category: keyof CookiePreferences) => {
      return preferences[category];
    },
    [preferences]
  );

  // Reset consent (for testing or user request)
  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem('cookie-consent');
      localStorage.removeItem('cookie-preferences');
      localStorage.removeItem('cookie-consent-date');

      setHasConsent(false);
      setPreferences(DEFAULT_PREFERENCES);

      // Disable all tracking
      disableAnalytics();

      return true;
    } catch (error) {
      console.error('Error resetting cookie consent:', error);
      return false;
    }
  }, []);

  return {
    preferences,
    hasConsent,
    isLoading,
    savePreferences,
    isCategoryEnabled,
    resetConsent,
  };
};

// Analytics management functions
const enableAnalytics = () => {
  // Enable Vercel Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  }

  // Enable other analytics services here
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Analytics enabled');
  }
};

const disableAnalytics = () => {
  // Disable Vercel Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    });
  }

  // Disable other analytics services here
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Analytics disabled');
  }
};

// Cookie utility functions
export const cookieUtils = {
  // Set a cookie with proper attributes
  setCookie: (
    name: string,
    value: string,
    days: number = 365,
    secure: boolean = true
  ) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${
      secure ? ';Secure' : ''
    }`;

    document.cookie = cookieString;
  },

  // Get a cookie value
  getCookie: (name: string): string | null => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  },

  // Delete a cookie
  deleteCookie: (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  // Check if cookies are supported
  areCookiesSupported: (): boolean => {
    try {
      const testCookie = 'cookie-test';
      document.cookie = `${testCookie}=1`;
      const supported = document.cookie.indexOf(testCookie) !== -1;
      document.cookie = `${testCookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      return supported;
    } catch {
      return false;
    }
  },
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
