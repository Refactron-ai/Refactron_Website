/**
 * Centralized environment configuration for the Refactron frontend.
 * All process.env.REACT_APP_* usages should be moved here.
 */

const getEnv = (name: string, defaultValue = ''): string => {
  return process.env[name] || defaultValue;
};

const getBoolEnv = (name: string): boolean => {
  const val = process.env[name];
  return val === 'true' || val === '1';
};

export const config = {
  // Application Environment
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',

  // API Configuration
  apiBaseUrl: getEnv('REACT_APP_API_BASE_URL', 'http://localhost:3001'),

  // Feature Toggles
  enableLocalAuth: getBoolEnv('REACT_APP_ENABLE_LOCAL_AUTH'),
  enableLocalDocs: getBoolEnv('REACT_APP_ENABLE_LOCAL_DOCS'),

  // OAuth Configuration
  googleClientId: getEnv('REACT_APP_GOOGLE_CLIENT_ID'),
  githubClientId: getEnv('REACT_APP_GITHUB_CLIENT_ID'),

  // Analytics & Monitoring
  sentryDsn: getEnv('REACT_APP_SENTRY_DSN'),

  // EmailJS Configuration
  emailjs: {
    serviceId: getEnv('REACT_APP_EMAILJS_SERVICE_ID', 'your_service_id'),
    welcomeTemplateId: getEnv(
      'REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID',
      'your_welcome_template_id'
    ),
    notificationTemplateId: getEnv(
      'REACT_APP_EMAILJS_NOTIFICATION_TEMPLATE_ID',
      'your_notification_template_id'
    ),
    publicKey: getEnv('REACT_APP_EMAILJS_PUBLIC_KEY', 'your_public_key'),
  },

  // Contact Emails
  emails: {
    from: getEnv('REACT_APP_FROM_EMAIL', 'hello@refactron.dev'),
    notification: getEnv('REACT_APP_NOTIFICATION_EMAIL', 'hello@refactron.dev'),
  },
};

export default config;
