// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Types for API responses
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// Request configuration interface
export interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  skipAuth?: boolean;
  baseURL?: string;
}

// Custom error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Token management
class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Simple JWT expiry check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }
}

// Request interceptor functions
class RequestInterceptor {
  static async handle(
    url: string,
    config: RequestConfig
  ): Promise<[string, RequestInit]> {
    const finalConfig: RequestInit = { ...config };

    // Set default headers
    finalConfig.headers = {
      'Content-Type': 'application/json',
      ...finalConfig.headers,
    };

    // Add authentication token if not skipped
    if (!config.skipAuth) {
      const token = TokenManager.getAccessToken();
      if (token) {
        (finalConfig.headers as Record<string, string>)[
          'Authorization'
        ] = `Bearer ${token}`;
      }
    }

    // Handle base URL
    const baseURL = config.baseURL || API_CONFIG.BASE_URL;
    const finalUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        `🚀 API Request: ${finalConfig.method || 'GET'} ${finalUrl}`,
        {
          headers: finalConfig.headers,
          body: finalConfig.body,
        }
      );
    }

    return [finalUrl, finalConfig];
  }
}

// Response interceptor functions
class ResponseInterceptor {
  static async handle<T>(
    response: Response,
    originalUrl: string
  ): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: unknown;

    // Parse response based on content type
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`📡 API Response: ${response.status} ${originalUrl}`, data);
    }

    // Handle successful responses
    if (response.ok) {
      return {
        data: data as T,
        status: response.status,
        success: true,
        message: (data as { message?: string })?.message,
      };
    }

    // Handle error responses
    throw new ApiError(
      (data as { message?: string })?.message ||
        `HTTP Error ${response.status}`,
      response.status,
      data as Record<string, unknown>
    );
  }
}

// Error handler
class ErrorHandler {
  private static authErrorCallbacks: (() => void)[] = [];

  static addAuthErrorCallback(callback: () => void): void {
    this.authErrorCallbacks.push(callback);
  }

  static removeAuthErrorCallback(callback: () => void): void {
    const index = this.authErrorCallbacks.indexOf(callback);
    if (index > -1) {
      this.authErrorCallbacks.splice(index, 1);
    }
  }

  static async handle(
    error: unknown,
    originalUrl: string,
    originalConfig: RequestConfig
  ): Promise<never> {
    // Network error
    if (
      error instanceof Error &&
      error.name === 'TypeError' &&
      error.message.includes('fetch')
    ) {
      console.error('🌐 Network Error:', error);
      throw new ApiError(
        'Network connection failed. Please check your internet connection.',
        0,
        { originalError: error.message }
      );
    }

    // Timeout error
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('⏱️ Timeout Error:', error);
      throw new ApiError('Request timeout. Please try again.', 408, {
        originalError: error.message,
      });
    }

    // Handle API errors
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          console.warn('🔐 Authentication Error:', error.message);
          // Try to refresh token
          if (await this.tryRefreshToken()) {
            // In a real implementation, you would retry the original request here
            throw new ApiError(
              'Token refreshed. Please retry the request.',
              401,
              error.details
            );
          }
          // Clear tokens and notify auth error callbacks
          TokenManager.clearTokens();
          this.authErrorCallbacks.forEach((callback) => callback());
          break;

        case 403:
          console.warn('🚫 Authorization Error:', error.message);
          break;

        case 404:
          console.warn('🔍 Not Found:', error.message);
          break;

        case 422:
          console.warn('✅ Validation Error:', error.message);
          break;

        case 429:
          console.warn('🚦 Rate Limit:', error.message);
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          console.error('🔥 Server Error:', error.message);
          break;

        default:
          console.error('❌ API Error:', error.message);
      }
    }

    throw error;
  }

  private static async tryRefreshToken(): Promise<boolean> {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) return false;

      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          accessToken: string;
          refreshToken?: string;
        };
        TokenManager.setAccessToken(data.accessToken);
        if (data.refreshToken) {
          TokenManager.setRefreshToken(data.refreshToken);
        }
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }
}

// Retry mechanism
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = API_CONFIG.RETRY_ATTEMPTS,
  delay: number = API_CONFIG.RETRY_DELAY
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && shouldRetry(error)) {
      console.log(
        `🔄 Retrying request... (${API_CONFIG.RETRY_ATTEMPTS - retries + 1}/${
          API_CONFIG.RETRY_ATTEMPTS
        })`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
}

function shouldRetry(error: unknown): boolean {
  // Don't retry on authentication/authorization errors
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    return false;
  }
  // Don't retry on client errors (4xx except 408, 429)
  if (
    error instanceof ApiError &&
    error.status >= 400 &&
    error.status < 500 &&
    ![408, 429].includes(error.status)
  ) {
    return false;
  }
  return true;
}

// Timeout wrapper
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timeout'));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

export { TokenManager, RequestInterceptor, ResponseInterceptor, ErrorHandler };
