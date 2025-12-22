/**
 * Track conversion events with cookie consent check
 * Only tracks if user has consented to analytics
 */
export const trackConversion = (
  eventName: string,
  properties?: Record<string, any>
) => {
  // Check if analytics consent is given
  const cookieConsent = localStorage.getItem('cookie-consent');
  const cookiePreferences = localStorage.getItem('cookie-preferences');

  let hasAnalyticsConsent = false;

  if (cookieConsent && cookiePreferences) {
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
      // Dynamically import to avoid Jest ESM issues
      import('@vercel/analytics').then(({ track }) => {
        track(eventName, properties);
      });

      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Conversion tracked:', eventName, properties);
      }
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  }
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
