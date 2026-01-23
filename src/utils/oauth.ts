/**
 * OAuth utility functions for Google and GitHub authentication
 */

export type OAuthProvider = 'google' | 'github';

export interface OAuthConfig {
  googleClientId?: string;
  githubClientId?: string;
  redirectUri: string;
  apiBaseUrl?: string;
}

export interface OAuthError {
  error: string;
  error_description?: string;
}

/**
 * Generates a secure random state token for OAuth flow
 */
const generateStateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Stores OAuth state in sessionStorage
 */
const storeOAuthState = (
  state: string,
  provider: OAuthProvider,
  type: 'login' | 'signup'
): void => {
  sessionStorage.setItem('oauth_state', state);
  sessionStorage.setItem('oauth_provider', provider);
  sessionStorage.setItem('oauth_type', type);
  sessionStorage.setItem('oauth_timestamp', Date.now().toString());
};

/**
 * Validates and retrieves OAuth state from sessionStorage
 */
export const validateOAuthState = (
  state: string
): { provider: OAuthProvider; type: 'login' | 'signup' } | null => {
  const storedState = sessionStorage.getItem('oauth_state');
  const provider = sessionStorage.getItem(
    'oauth_provider'
  ) as OAuthProvider | null;
  const type = sessionStorage.getItem('oauth_type') as
    | 'login'
    | 'signup'
    | null;
  const timestamp = sessionStorage.getItem('oauth_timestamp');

  // Validate state token first before clearing
  if (!storedState || storedState !== state) {
    return null;
  }

  // Validate timestamp (state should be used within 10 minutes)
  if (timestamp) {
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 10 * 60 * 1000) {
      // Clear expired state
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('oauth_provider');
      sessionStorage.removeItem('oauth_type');
      sessionStorage.removeItem('oauth_timestamp');
      return null;
    }
  }

  if (!provider || !type) {
    return null;
  }

  // Clear stored state only after successful validation
  sessionStorage.removeItem('oauth_state');
  sessionStorage.removeItem('oauth_provider');
  sessionStorage.removeItem('oauth_type');
  sessionStorage.removeItem('oauth_timestamp');

  return { provider, type };
};

/**
 * Gets OAuth authorization URL for Google
 */
const getGoogleAuthUrl = (
  clientId: string,
  redirectUri: string,
  state: string,
  type: 'login' | 'signup'
): string => {
  const scope = 'openid email profile';
  const responseType = 'code';
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: responseType,
    scope,
    state,
    access_type: 'offline',
    prompt: 'select_account',
  });

  // Add consent prompt for signup flow
  if (type === 'signup') {
    const existingPrompt = params.get('prompt') || '';
    const prompts = new Set(
      existingPrompt
        .split(' ')
        .map(p => p.trim())
        .filter(Boolean)
    );
    prompts.add('consent');
    params.set('prompt', Array.from(prompts).join(' '));
  }

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

/**
 * Gets OAuth authorization URL for GitHub
 */
const getGitHubAuthUrl = (
  clientId: string,
  redirectUri: string,
  state: string,
  type: 'login' | 'signup'
): string => {
  const scope = type === 'signup' ? 'user:email read:user' : 'user:email';
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state,
    allow_signup: type === 'signup' ? 'true' : 'false',
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

/**
 * Initiates OAuth flow for the specified provider
 */
export const initiateOAuth = (
  provider: OAuthProvider,
  type: 'login' | 'signup',
  config: OAuthConfig
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Generate and store state token
      const state = generateStateToken();
      storeOAuthState(state, provider, type);

      // Get provider-specific client ID
      const clientId =
        provider === 'google'
          ? config.googleClientId || process.env.REACT_APP_GOOGLE_CLIENT_ID
          : config.githubClientId || process.env.REACT_APP_GITHUB_CLIENT_ID;

      if (!clientId) {
        const providerName = provider === 'google' ? 'Google' : 'GitHub';
        reject(
          new Error(
            `${providerName} OAuth client ID is not configured. Please set REACT_APP_${provider.toUpperCase()}_CLIENT_ID environment variable.`
          )
        );
        return;
      }

      // Build redirect URI
      const redirectUri =
        config.redirectUri || `${window.location.origin}/auth/callback`;

      // Get authorization URL
      const authUrl =
        provider === 'google'
          ? getGoogleAuthUrl(clientId, redirectUri, state, type)
          : getGitHubAuthUrl(clientId, redirectUri, state, type);

      // Redirect to OAuth provider
      window.location.href = authUrl;
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Handles OAuth callback by exchanging code for token
 */
export const handleOAuthCallback = async (
  code: string,
  state: string,
  config: OAuthConfig
): Promise<{ success: boolean; error?: string; data?: any }> => {
  try {
    // Validate state
    const stateData = validateOAuthState(state);
    if (!stateData) {
      return {
        success: false,
        error: 'Invalid or expired OAuth state. Please try again.',
      };
    }

    const { provider, type } = stateData;
    const apiBaseUrl =
      config.apiBaseUrl || process.env.REACT_APP_API_BASE_URL || '';

    // Exchange code for token via backend API
    const response = await fetch(
      `${apiBaseUrl}/api/auth/callback/${provider}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          code,
          state,
          type, // 'login' or 'signup'
          redirectUri: config.redirectUri || `${window.location.origin}/auth/callback`,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error:
          data.message ||
          `Failed to authenticate with ${provider}. Please try again.`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    let message =
      'An unexpected error occurred during authentication. Please try again.';

    if (error instanceof TypeError) {
      // fetch typically throws TypeError for network/CORS issues
      const errMsg = error.message || '';
      if (/Failed to fetch|NetworkError|Load failed/i.test(errMsg)) {
        message =
          'Unable to reach the authentication server. This may be a network or browser configuration issue. Please check your connection and try again.';
      } else {
        message = errMsg || message;
      }
    } else if (error instanceof Error && error.message) {
      message = error.message;
    }

    return {
      success: false,
      error: message,
    };
  }
};

/**
 * Checks if OAuth provider is configured
 */
export const isOAuthProviderConfigured = (provider: OAuthProvider): boolean => {
  // Keep in sync with initiateOAuth: only use REACT_APP_GOOGLE_CLIENT_ID
  if (provider === 'google') {
    return !!process.env.REACT_APP_GOOGLE_CLIENT_ID;
  }
  // Keep in sync with initiateOAuth: only use REACT_APP_GITHUB_CLIENT_ID
  return !!process.env.REACT_APP_GITHUB_CLIENT_ID;
};
