import { getApiBaseUrl } from '../utils/urlUtils';

const API_BASE_URL = getApiBaseUrl() || 'http://localhost:3001';

export interface UsageRecord {
  id: string;
  apiKeyId: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  createdAt: string;
}

export interface UsageStatsResponse {
  success: boolean;
  totalRequests?: number;
  totalTokens?: number;
  totalCost?: number;
  usage?: UsageRecord[];
  error?: string;
}

const getAuthToken = (): string | null => {
  const localToken = localStorage.getItem('accessToken');
  if (localToken) return localToken;

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('accessToken='));
  if (tokenCookie) return tokenCookie.split('=')[1];

  return null;
};

export const getUsageStats = async (
  days = 30
): Promise<UsageStatsResponse> => {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(
      `${API_BASE_URL}/api/llm/usage?days=${days}`,
      {
        method: 'GET',
        headers,
        credentials: 'include',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch usage stats');
    }

    // Backend wraps data under `stats`
    const stats = data.stats ?? data;
    return {
      success: true,
      totalRequests: stats.totalRequests,
      totalTokens: stats.totalTokens,
      totalCost: stats.totalCost,
      usage: stats.usage,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch usage stats',
    };
  }
};

export const updatePreferredModel = async (
  model: string | null
): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/auth/preferences`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
      body: JSON.stringify({ preferredModel: model }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update preferences');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
