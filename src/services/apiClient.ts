import {
  API_CONFIG,
  ApiResponse,
  RequestConfig,
  TokenManager,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorHandler,
  withRetry,
  withTimeout,
} from './api';

// Main API Client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || API_CONFIG.BASE_URL;
  }

  // Main request method with full interceptor support
  private async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const requestConfig: RequestConfig = {
      timeout: API_CONFIG.TIMEOUT,
      retries: API_CONFIG.RETRY_ATTEMPTS,
      ...config,
      baseURL: this.baseURL,
    };

    const makeRequest = async (): Promise<ApiResponse<T>> => {
      try {
        // Apply request interceptor
        const [finalUrl, finalConfig] = await RequestInterceptor.handle(
          url,
          requestConfig
        );

        // Create timeout controller
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          requestConfig.timeout
        );

        // Make the actual request
        const fetchPromise = fetch(finalUrl, {
          ...finalConfig,
          signal: controller.signal,
        });

        let response: Response;

        if (requestConfig.timeout) {
          response = await withTimeout(fetchPromise, requestConfig.timeout);
        } else {
          response = await fetchPromise;
        }

        clearTimeout(timeoutId);

        // Apply response interceptor
        return await ResponseInterceptor.handle<T>(response, finalUrl);
      } catch (error) {
        // Apply error handler
        return await ErrorHandler.handle(error, url, requestConfig);
      }
    };

    // Apply retry mechanism if retries are configured
    if (requestConfig.retries && requestConfig.retries > 0) {
      return await withRetry(makeRequest, requestConfig.retries);
    }

    return await makeRequest();
  }

  // HTTP Method helpers
  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  // File upload helper
  async upload<T>(
    url: string,
    file: File | FormData,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = file instanceof File ? new FormData() : file;
    if (file instanceof File) {
      formData.append('file', file);
    }

    const uploadConfig = { ...config };
    // Remove Content-Type from headers to let browser set it with boundary for FormData
    if (uploadConfig.headers) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { 'Content-Type': _, ...restHeaders } =
        uploadConfig.headers as Record<string, string>;
      uploadConfig.headers = restHeaders;
    }

    return this.request<T>(url, {
      ...uploadConfig,
      method: 'POST',
      body: formData,
    });
  }

  // Stream download helper
  async download(url: string, config?: RequestConfig): Promise<Blob> {
    const response = await this.request<Blob>(url, {
      ...config,
      method: 'GET',
    });
    return response.data;
  }

  // Utility methods
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  // Authentication helpers
  isAuthenticated(): boolean {
    return TokenManager.hasValidToken();
  }

  setAuthToken(token: string): void {
    TokenManager.setAccessToken(token);
  }

  clearAuth(): void {
    TokenManager.clearTokens();
  }

  // Add auth error callback (useful for redirecting to login)
  onAuthError(callback: () => void): void {
    ErrorHandler.addAuthErrorCallback(callback);
  }

  // Remove auth error callback
  offAuthError(callback: () => void): void {
    ErrorHandler.removeAuthErrorCallback(callback);
  }
}

// Create and export default instance
const apiClient = new ApiClient();

// Export both the class and default instance
export { ApiClient, apiClient as api };
export default apiClient;
