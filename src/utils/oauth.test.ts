/**
 * Tests for OAuth utility functions
 */

import {
  initiateOAuth,
  validateOAuthState,
  handleOAuthCallback,
  isOAuthProviderConfigured,
} from './oauth';

// Mock window.location
delete (window as any).location;
window.location = { href: '', origin: 'http://localhost:3000' } as any;

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Mock crypto.getRandomValues
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  },
});

describe('OAuth utility functions', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.location.href = '';
    // Clear environment variables
    delete process.env.REACT_APP_GOOGLE_CLIENT_ID;
    delete process.env.REACT_APP_GITHUB_CLIENT_ID;
    // Clear fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('isOAuthProviderConfigured', () => {
    it('should return true when Google client ID is configured', () => {
      process.env.REACT_APP_GOOGLE_CLIENT_ID = 'test-google-client-id';
      expect(isOAuthProviderConfigured('google')).toBe(true);
    });

    it('should return false when Google client ID is not configured', () => {
      expect(isOAuthProviderConfigured('google')).toBe(false);
    });

    it('should return true when GitHub client ID is configured', () => {
      process.env.REACT_APP_GITHUB_CLIENT_ID = 'test-github-client-id';
      expect(isOAuthProviderConfigured('github')).toBe(true);
    });

    it('should return false when GitHub client ID is not configured', () => {
      expect(isOAuthProviderConfigured('github')).toBe(false);
    });
  });

  describe('validateOAuthState', () => {
    it('should return null if stored state does not match', () => {
      sessionStorage.setItem('oauth_state', 'stored-state');
      sessionStorage.setItem('oauth_provider', 'google');
      sessionStorage.setItem('oauth_type', 'login');
      sessionStorage.setItem('oauth_timestamp', Date.now().toString());

      const result = validateOAuthState('different-state');
      expect(result).toBeNull();
    });

    it('should return null if state is expired (older than 10 minutes)', () => {
      const expiredTimestamp = Date.now() - 11 * 60 * 1000; // 11 minutes ago
      sessionStorage.setItem('oauth_state', 'test-state');
      sessionStorage.setItem('oauth_provider', 'google');
      sessionStorage.setItem('oauth_type', 'login');
      sessionStorage.setItem('oauth_timestamp', expiredTimestamp.toString());

      const result = validateOAuthState('test-state');
      expect(result).toBeNull();
    });

    it('should return provider and type if state is valid', () => {
      sessionStorage.setItem('oauth_state', 'test-state');
      sessionStorage.setItem('oauth_provider', 'google');
      sessionStorage.setItem('oauth_type', 'signup');
      sessionStorage.setItem('oauth_timestamp', Date.now().toString());

      const result = validateOAuthState('test-state');
      expect(result).toEqual({ provider: 'google', type: 'signup' });
    });

    it('should clear session storage after successful validation', () => {
      sessionStorage.setItem('oauth_state', 'test-state');
      sessionStorage.setItem('oauth_provider', 'github');
      sessionStorage.setItem('oauth_type', 'login');
      sessionStorage.setItem('oauth_timestamp', Date.now().toString());

      validateOAuthState('test-state');

      expect(sessionStorage.getItem('oauth_state')).toBeNull();
      expect(sessionStorage.getItem('oauth_provider')).toBeNull();
      expect(sessionStorage.getItem('oauth_type')).toBeNull();
      expect(sessionStorage.getItem('oauth_timestamp')).toBeNull();
    });

    it('should return null if provider is missing', () => {
      sessionStorage.setItem('oauth_state', 'test-state');
      sessionStorage.setItem('oauth_type', 'login');
      sessionStorage.setItem('oauth_timestamp', Date.now().toString());

      const result = validateOAuthState('test-state');
      expect(result).toBeNull();
    });

    it('should return null if type is missing', () => {
      sessionStorage.setItem('oauth_state', 'test-state');
      sessionStorage.setItem('oauth_provider', 'google');
      sessionStorage.setItem('oauth_timestamp', Date.now().toString());

      const result = validateOAuthState('test-state');
      expect(result).toBeNull();
    });
  });

  describe('initiateOAuth', () => {
    it('should reject if Google client ID is not configured', async () => {
      await expect(
        initiateOAuth('google', 'login', {
          redirectUri: 'http://localhost:3000/auth/callback',
        })
      ).rejects.toThrow(
        'Google OAuth client ID is not configured. Please set REACT_APP_GOOGLE_CLIENT_ID environment variable.'
      );
    });

    it('should reject if GitHub client ID is not configured', async () => {
      await expect(
        initiateOAuth('github', 'signup', {
          redirectUri: 'http://localhost:3000/auth/callback',
        })
      ).rejects.toThrow(
        'GitHub OAuth client ID is not configured. Please set REACT_APP_GITHUB_CLIENT_ID environment variable.'
      );
    });

    it('should redirect to Google OAuth URL with correct parameters for login', async () => {
      process.env.REACT_APP_GOOGLE_CLIENT_ID = 'test-google-client-id';

      await initiateOAuth('google', 'login', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(window.location.href).toContain(
        'https://accounts.google.com/o/oauth2/v2/auth'
      );
      expect(window.location.href).toContain('client_id=test-google-client-id');
      expect(window.location.href).toContain(
        'redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback'
      );
      expect(window.location.href).toContain('response_type=code');
      expect(window.location.href).toContain('scope=openid+email+profile');
      expect(window.location.href).toContain('prompt=select_account');
    });

    it('should redirect to Google OAuth URL with consent prompt for signup', async () => {
      process.env.REACT_APP_GOOGLE_CLIENT_ID = 'test-google-client-id';

      await initiateOAuth('google', 'signup', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(window.location.href).toContain('prompt=select_account+consent');
    });

    it('should redirect to GitHub OAuth URL with correct parameters for login', async () => {
      process.env.REACT_APP_GITHUB_CLIENT_ID = 'test-github-client-id';

      await initiateOAuth('github', 'login', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(window.location.href).toContain(
        'https://github.com/login/oauth/authorize'
      );
      expect(window.location.href).toContain('client_id=test-github-client-id');
      expect(window.location.href).toContain('scope=user%3Aemail');
      expect(window.location.href).toContain('allow_signup=false');
    });

    it('should redirect to GitHub OAuth URL with extended scope for signup', async () => {
      process.env.REACT_APP_GITHUB_CLIENT_ID = 'test-github-client-id';

      await initiateOAuth('github', 'signup', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(window.location.href).toContain('scope=user%3Aemail+read%3Auser');
      expect(window.location.href).toContain('allow_signup=true');
    });

    it('should store OAuth state in sessionStorage', async () => {
      process.env.REACT_APP_GOOGLE_CLIENT_ID = 'test-google-client-id';

      await initiateOAuth('google', 'login', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(sessionStorage.getItem('oauth_state')).toBeTruthy();
      expect(sessionStorage.getItem('oauth_provider')).toBe('google');
      expect(sessionStorage.getItem('oauth_type')).toBe('login');
      expect(sessionStorage.getItem('oauth_timestamp')).toBeTruthy();
    });
  });

  describe('handleOAuthCallback', () => {
    beforeEach(() => {
      // Setup valid state
      sessionStorage.setItem('oauth_state', 'test-state');
      sessionStorage.setItem('oauth_provider', 'google');
      sessionStorage.setItem('oauth_type', 'login');
      sessionStorage.setItem('oauth_timestamp', Date.now().toString());
    });

    it('should return error if state validation fails', async () => {
      const result = await handleOAuthCallback('test-code', 'invalid-state', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe(
        'Invalid or expired OAuth state. Please try again.'
      );
    });

    it('should exchange code for token via backend API', async () => {
      const mockResponse = {
        success: true,
        user: { id: '123', email: 'test@example.com' },
        redirectTo: '/dashboard',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await handleOAuthCallback('test-code', 'test-state', {
        redirectUri: 'http://localhost:3000/auth/callback',
        apiBaseUrl: 'http://localhost:3001',
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/auth/callback/google',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            code: 'test-code',
            state: 'test-state',
            type: 'login',
          }),
        })
      );
    });

    it('should return error if backend API returns error', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Authentication failed' }),
      });

      const result = await handleOAuthCallback('test-code', 'test-state', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Authentication failed');
    });

    it('should handle network errors gracefully', async () => {
      global.fetch = jest
        .fn()
        .mockRejectedValue(new TypeError('Failed to fetch'));

      const result = await handleOAuthCallback('test-code', 'test-state', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain(
        'Unable to reach the authentication server'
      );
    });

    it('should use REACT_APP_API_BASE_URL if apiBaseUrl is not provided', async () => {
      process.env.REACT_APP_API_BASE_URL = 'http://localhost:4000';

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      await handleOAuthCallback('test-code', 'test-state', {
        redirectUri: 'http://localhost:3000/auth/callback',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/auth/callback/google',
        expect.anything()
      );
    });
  });
});
