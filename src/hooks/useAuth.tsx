import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/urlUtils';

interface User {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  organizationName?: string | null;
  onboardingCompleted?: boolean;
  plan?: string | null;
  githubConnected?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  loggingOut: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  completeOnboarding: (organizationName: string, plan: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    // ...

    const checkAuth = async () => {
      const apiBaseUrl = getApiBaseUrl();
      const token = localStorage.getItem('accessToken');

      try {
        if (token) {
          // Verify token with backend
          const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIsLoading(false);
            return;
          }

          // If token is invalid (401), try to refresh. Otherwise, don't clear anything yet.
          if (response.status !== 401) {
            setIsLoading(false);
            return;
          }
        }

        // No token or token expired (401) - Try refresh
        try {
          const refreshResponse = await fetch(
            `${apiBaseUrl}/api/auth/refresh`,
            {
              method: 'POST',
              credentials: 'include',
            }
          );

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('accessToken', refreshData.accessToken);

            // Retry getting user
            const retryResponse = await fetch(`${apiBaseUrl}/api/auth/me`, {
              headers: {
                Authorization: `Bearer ${refreshData.accessToken}`,
              },
            });

            if (retryResponse.ok) {
              const userData = await retryResponse.json();
              setUser(userData.user);
            }
          } else {
            // Refresh failed - only now clear the token if it existed
            if (token) {
              localStorage.removeItem('accessToken');
            }
          }
        } catch (error) {
          console.error('Refresh attempt failed:', error);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback((token: string, userData: User) => {
    localStorage.setItem('accessToken', token);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    // 1. Trigger logging out state for animation
    setIsLoggingOut(true);

    // 2. Clear local state and navigate after a short delay for animation
    setTimeout(() => {
      localStorage.removeItem('accessToken');
      setUser(null);
      setIsLoggingOut(false);
      navigate('/login');
    }, 800);

    // 3. Perform backend logout in the background
    try {
      const apiBaseUrl = getApiBaseUrl();
      await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Background logout failed:', error);
    }
  }, [navigate]);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const completeOnboarding = useCallback(
    async (organizationName: string, plan: string) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const apiBaseUrl = getApiBaseUrl();

      const response = await fetch(`${apiBaseUrl}/api/auth/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ organizationName, plan }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate('/dashboard');
      } else {
        throw new Error('Failed to complete onboarding');
      }
    },
    [navigate]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading: isLoading,
        loggingOut: isLoggingOut,
        login,
        logout,
        updateUser,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
