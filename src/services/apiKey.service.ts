import { getApiBaseUrl } from '../utils/urlUtils';

const API_BASE_URL = getApiBaseUrl() || 'http://localhost:3001';

interface ApiKeyResponse {
  id: string;
  name: string;
  keyPrefix: string;
  environment: 'test' | 'live';
  revoked: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
  key?: string; // Only present when creating a new key
}

interface CreateKeyResponse {
  success: boolean;
  apiKey?: ApiKeyResponse;
  error?: string;
}

interface ListKeysResponse {
  success: boolean;
  apiKeys?: ApiKeyResponse[];
  error?: string;
}

interface DeleteKeyResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Get auth token from cookies
 */
const getAuthToken = (): string | null => {
  // Try localStorage first (primary storage used by useAuth)
  const localToken = localStorage.getItem('accessToken');
  if (localToken) {
    console.log('Found token in localStorage');
    return localToken;
  }

  // Fallback to cookie
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('accessToken='));
  if (tokenCookie) {
    console.log('Found token in cookies');
    return tokenCookie.split('=')[1];
  }

  console.log('No token found in localStorage or cookies');
  return null;
};

/**
 * Create a new API key
 */
export const createApiKey = async (
  name: string,
  environment: 'test' | 'live'
): Promise<CreateKeyResponse> => {
  try {
    const token = getAuthToken();
    console.log('Token for createApiKey:', token ? 'Present' : 'Missing');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('Request headers:', headers);

    const response = await fetch(`${API_BASE_URL}/api/keys`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ name, environment }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create API key');
    }

    return data;
  } catch (error: any) {
    console.error('Error creating API key:', error);
    return {
      success: false,
      error: error.message || 'Failed to create API key',
    };
  }
};

/**
 * List all API keys for the authenticated user
 */
export const listApiKeys = async (): Promise<ListKeysResponse> => {
  try {
    const token = getAuthToken();

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/keys`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch API keys');
    }

    return data;
  } catch (error: any) {
    console.error('Error listing API keys:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch API keys',
    };
  }
};

/**
 * Revoke an API key
 */
export const revokeApiKey = async (
  keyId: string
): Promise<CreateKeyResponse> => {
  try {
    const token = getAuthToken();

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/keys/${keyId}/revoke`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to revoke API key');
    }

    return data;
  } catch (error: any) {
    console.error('Error revoking API key:', error);
    return {
      success: false,
      error: error.message || 'Failed to revoke API key',
    };
  }
};

/**
 * Delete an API key
 */
export const deleteApiKey = async (
  keyId: string
): Promise<DeleteKeyResponse> => {
  try {
    const token = getAuthToken();

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/keys/${keyId}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete API key');
    }

    return data;
  } catch (error: any) {
    console.error('Error deleting API key:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete API key',
    };
  }
};
