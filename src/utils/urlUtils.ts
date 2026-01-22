/**
 * Utility functions for URL handling
 */

/**
 * Gets the base URL for the current environment
 * Returns the production subdomain URL (https://) in production,
 * or localhost URL (http://) in development
 */
export const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return 'https://app.refactron.dev';
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';

  // Check if we're in local development with auth enabled
  const enableLocalAuth =
    process.env.REACT_APP_ENABLE_LOCAL_AUTH === 'true' ||
    process.env.REACT_APP_ENABLE_LOCAL_AUTH === '1';

  // If local auth is enabled and we're on localhost, use localhost
  if (
    enableLocalAuth &&
    (hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.0.'))
  ) {
    return `${protocol}//${hostname}${port}`;
  }

  // If we're on the app subdomain, use it
  if (hostname.startsWith('app.')) {
    return `${protocol}//${hostname}${port}`;
  }

  // Default to production app subdomain
  return 'https://app.refactron.dev';
};

/**
 * Gets the API base URL
 * Uses REACT_APP_API_BASE_URL if set, otherwise uses relative paths
 */
export const getApiBaseUrl = (): string => {
  const url = process.env.REACT_APP_API_BASE_URL || '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
