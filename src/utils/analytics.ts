import type { MouseEvent } from 'react';

/**
 * Valid cookie consent values
 */
const ACCEPTED_CONSENT_VALUES = ['true', 'accepted'] as const;

/**
 * Track conversion events with cookie consent check
 * Only tracks if user has consented to analytics
 * @returns A promise that resolves when tracking is complete or consent is denied
 */
export const trackConversion = (
  eventName: string,
  properties?: Record<string, any>
): Promise<void> => {
  // Check if analytics consent is given
  const cookieConsent = localStorage.getItem('cookie-consent');
  const cookiePreferences = localStorage.getItem('cookie-preferences');

  let hasAnalyticsConsent = false;

  // Validate both consent exists and has appropriate value
  if (cookieConsent && ACCEPTED_CONSENT_VALUES.includes(cookieConsent as any) && cookiePreferences) {
    try {
      const preferences = JSON.parse(cookiePreferences);
      hasAnalyticsConsent = preferences.analytics === true;
    } catch (error) {
      console.error('Error parsing cookie preferences:', error);
    }
  }

  // Only track if consent is given
  if (hasAnalyticsConsent || process.env.NODE_ENV === 'development') {
    try {
      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Conversion tracked:', eventName, properties);
      }

      // Dynamically import to avoid Jest ESM issues
      return import('@vercel/analytics')
        .then(({ track }) => {
          track(eventName, properties);
        })
        .catch((error) => {
          console.error('Error loading analytics module for conversion tracking:', error);
        });
    } catch (error) {
      console.error('Error tracking conversion:', error);
      return Promise.resolve();
    }
  }

  // Return resolved promise if no consent
  return Promise.resolve();
};

/**
 * Conversion event names
 */
export const ConversionEvents = {
  EARLY_ACCESS_FORM_SUBMITTED: 'early_access_form_submitted',
  TRY_REFACTRON_LIBRARY_CLICKED: 'try_refactron_library_clicked',
  VIEW_DOCUMENTATION_CLICKED: 'view_documentation_clicked',
  VIEW_PYPI_CLICKED: 'view_pypi_clicked',
  VIEW_SOURCE_CLICKED: 'view_source_clicked',
  SIGN_UP_CLICKED: 'sign_up_clicked',
  LOGIN_CLICKED: 'login_clicked',
} as const;

/**
 * Creates a click handler that tracks conversions and optionally navigates
 * @param eventName - The conversion event name to track
 * @param properties - Additional properties to pass to the tracking event
 * @param options - Optional configuration for navigation behavior
 * @returns A click handler function
 */
export const createTrackingClickHandler = (
  eventName: string,
  properties?: Record<string, any>,
  options?: {
    href?: string;
    allowDefault?: boolean;
    onNavigate?: () => void;
  }
) => {
  return async (event: MouseEvent<HTMLElement>) => {
    // Prevent default navigation unless explicitly allowed
    if (!options?.allowDefault) {
      event.preventDefault();
    }

    try {
      // Track conversion and wait for it to complete
      await trackConversion(eventName, properties);
    } catch (error) {
      console.error('Error tracking conversion in click handler:', error);
    } finally {
      // Navigate if href or custom navigation provided
      if (options?.href) {
        window.location.assign(options.href);
      } else if (options?.onNavigate) {
        options.onNavigate();
      }
    }
  };
};
