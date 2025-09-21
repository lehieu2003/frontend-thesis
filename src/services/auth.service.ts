import { api } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { User } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  }

  // Get current user profile
  static async getProfile(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  }

  // Refresh access token
  static async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const response = await api.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      request,
      {
        skipAuth: true, // Don't add authorization header for refresh
      }
    );
    return response.data;
  }

  // Logout user
  static async logout(): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  // Change password
  static async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
  }

  // Request password reset
  static async requestPasswordReset(email: string): Promise<void> {
    await api.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
      { skipAuth: true }
    );
  }

  // Reset password with token
  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<void> {
    await api.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      {
        token,
        newPassword,
      },
      { skipAuth: true }
    );
  }

  // Verify email address
  static async verifyEmail(token: string): Promise<void> {
    await api.post(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { token },
      { skipAuth: true }
    );
  }

  // Resend verification email
  static async resendVerificationEmail(): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION);
  }
}
