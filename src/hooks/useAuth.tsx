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
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  stripeCurrentPeriodEnd?: string | null; // Date string from JSON
  dodoCustomerId?: string | null;
  dodoSubscriptionId?: string | null;
  dodoPaymentId?: string | null;
  trialEnd?: string | null; // Date string from JSON
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  loggingOut: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  completeOnboarding: (
    organizationName: string,
    plan: string,
    skipNavigation?: boolean
  ) => Promise<void>;
  updatePlan: (plan: string) => Promise<void>;
  createCheckoutSession: (priceId?: string) => Promise<void>;
  createDodoCheckoutSession: (productId?: string) => Promise<void>;
  createPortalSession: () => Promise<void>;
  createDodoPortalSession: () => Promise<void>;
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
    async (organizationName: string, plan: string, skipNavigation = false) => {
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

        // Skip navigation if requested (e.g., for Stripe redirect)
        if (skipNavigation) {
          return;
        }

        // Check if there's a pending device code
        const deviceCode = localStorage.getItem('pending_device_code');
        console.log(
          '[completeOnboarding] Device code from localStorage:',
          deviceCode
        );

        if (deviceCode) {
          // Navigate with state (cleanup will happen in DeviceConnect after mount)
          console.log(
            '[completeOnboarding] Navigating to device connect with code via state'
          ); // Don't remove yet - ProtectedRoute needs to detect this!
          // localStorage.removeItem('pending_device_code');
          navigate('/device/connect', {
            state: { deviceCode },
            replace: true,
          });
        } else {
          console.log(
            '[completeOnboarding] No device code found, redirecting to dashboard'
          );
          navigate('/dashboard');
        }
      } else {
        throw new Error('Failed to complete onboarding');
      }
    },
    [navigate]
  );
  const updatePlan = useCallback(async (plan: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const apiBaseUrl = getApiBaseUrl();

    const response = await fetch(`${apiBaseUrl}/api/auth/plan`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
    } else {
      throw new Error('Failed to update plan');
    }
  }, []);

  const createCheckoutSession = useCallback(async (priceId?: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No authentication token found');

    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/api/stripe/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ priceId }),
    });

    if (response.ok) {
      const { url } = await response.json();
      window.location.href = url;
    } else {
      throw new Error('Failed to start checkout');
    }
  }, []);

  const createDodoCheckoutSession = useCallback(async (productId?: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No authentication token found');

    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/api/dodo/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      const { url } = await response.json();
      window.location.href = url;
    } else {
      throw new Error('Failed to start Dodo checkout');
    }
  }, []);

  const createDodoPortalSession = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No authentication token found');

    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/api/dodo/portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const { url } = await response.json();
      window.location.href = url;
    } else {
      throw new Error('Failed to open Dodo billing portal');
    }
  }, []);

  const createPortalSession = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No authentication token found');

    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}/api/stripe/portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const { url } = await response.json();
      window.location.href = url;
    } else {
      throw new Error('Failed to open billing portal');
    }
  }, []);

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
        updatePlan,
        createCheckoutSession,
        createDodoCheckoutSession,
        createPortalSession,
        createDodoPortalSession,
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
