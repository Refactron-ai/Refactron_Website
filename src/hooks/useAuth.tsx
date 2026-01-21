import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  organizationName?: string | null;
  onboardingCompleted?: boolean;
  plan?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
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
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        const apiBaseUrl =
          process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
        const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token invalid or expired
          if (response.status === 401) {
            // Try refresh
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
                localStorage.removeItem('accessToken');
              }
            } catch (error) {
              localStorage.removeItem('accessToken');
            }
          } else {
            localStorage.removeItem('accessToken');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
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
    try {
      const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
      navigate('/login');
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
      const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

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
