// Main services export file
// Centralized exports for all API services and utilities

// Core API infrastructure
export {
  API_CONFIG,
  ApiError,
  TokenManager,
  withRetry,
  withTimeout,
} from './api';

export type { ApiResponse, RequestConfig } from './api';

export { ApiClient, api } from './apiClient';

// Endpoints configuration
export {
  API_ENDPOINTS,
  COMMON_ENDPOINTS,
  buildEndpoint,
  validateEndpoint,
  isEndpointFunction,
} from './endpoints';

// Service classes
export { AuthService } from './auth.service';
export { BookService } from './book.service';
export { UserService } from './user.service';

// Type exports
export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './auth.service';

export type {
  Book,
  BookSearchParams,
  BookSearchResponse,
  BookReview,
  CreateReviewRequest,
  UpdateReviewRequest,
} from './book.service';

export type {
  UserPreferences,
  UserStatistics,
  ReadingHistory,
  UserNotification,
} from './user.service';

// Utility functions for common API operations
import { TokenManager } from './api';
import { api } from './apiClient';

export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => TokenManager.hasValidToken(),

  // Get current access token
  getAccessToken: () => TokenManager.getAccessToken(),

  // Clear all authentication data
  clearAuth: () => TokenManager.clearTokens(),

  // Set authentication tokens
  setTokens: (accessToken: string, refreshToken?: string) => {
    TokenManager.setAccessToken(accessToken);
    if (refreshToken) {
      TokenManager.setRefreshToken(refreshToken);
    }
  },

  // Handle authentication errors globally
  onAuthError: (callback: () => void) => api.onAuthError(callback),
  offAuthError: (callback: () => void) => api.offAuthError(callback),

  // Set API base URL
  setBaseURL: (url: string) => api.setBaseURL(url),

  // Get current API base URL
  getBaseURL: () => api.getBaseURL(),
};
