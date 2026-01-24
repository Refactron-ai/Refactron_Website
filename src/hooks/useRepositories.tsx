import { useState, useEffect } from 'react';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  clone_url: string;
  default_branch: string;
  language: string | null;
  updated_at: string;
}

interface UseRepositoriesResult {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRepositories(): UseRepositoriesResult {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setLoading(false);
      setError('Not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/github/repositories`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch repositories');
      }

      setRepositories(data.repositories || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch repositories'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return {
    repositories,
    loading,
    error,
    refetch: fetchRepositories,
  };
}
