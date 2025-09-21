import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/apiClient';
import { TokenManager } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true to check for existing auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (TokenManager.hasValidToken()) {
          // Try to get user profile if token exists
          const response = await api.get<User>('/auth/profile');
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid tokens
        TokenManager.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Set up auth error callback to handle token expiration
  useEffect(() => {
    const handleAuthError = () => {
      setUser(null);
      setIsAuthenticated(false);
      // Optional: Show notification or redirect to login
      console.log('Authentication expired. Please login again.');
    };

    api.onAuthError(handleAuthError);

    // Cleanup
    return () => {
      api.offAuthError(handleAuthError);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Call actual login API
      const response = await api.post<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/auth/login', { email, password });

      const { user: userData, accessToken, refreshToken } = response.data;

      // Store tokens
      TokenManager.setAccessToken(accessToken);
      TokenManager.setRefreshToken(refreshToken);

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      // Re-throw to let the component handle the error
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Call actual registration API
      const response = await api.post<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/auth/register', { email, password, name });

      const { user: userData, accessToken, refreshToken } = response.data;

      // Store tokens
      TokenManager.setAccessToken(accessToken);
      TokenManager.setRefreshToken(refreshToken);

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      // Re-throw to let the component handle the error
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API to invalidate refresh token on server
      await api.post('/auth/logout', {}, { skipAuth: false });
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local state and tokens
      TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
