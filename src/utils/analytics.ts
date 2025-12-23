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

  // Validate both consent exists and has appropriate value
  if (cookieConsent && (cookieConsent === 'true' || cookieConsent === 'accepted') && cookiePreferences) {
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
      import('@vercel/analytics')
        .then(({ track }) => {
          track(eventName, properties);
        })
        .catch((error) => {
          console.error('Error loading analytics module for conversion tracking:', error);
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
    preventDefault?: boolean;
    onNavigate?: () => void;
  }
) => {
  return async (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default navigation if specified
    if (options?.preventDefault !== false) {
      event.preventDefault();
    }

    try {
      // Dynamically import and track conversion
      const { trackConversion } = await import('./analytics');
      trackConversion(eventName, properties);
    } catch (error) {
      console.error('Error tracking conversion in click handler:', error);
    } finally {
      // Navigate if href or custom navigation provided
      if (options?.href) {
        window.location.href = options.href;
      } else if (options?.onNavigate) {
        options.onNavigate();
      }
    }
  };
};
