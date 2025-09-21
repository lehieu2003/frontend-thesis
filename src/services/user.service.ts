import { api } from './apiClient';
import { API_ENDPOINTS, COMMON_ENDPOINTS } from './endpoints';
import { User } from '../types';

export interface UserPreferences {
  genres: string[];
  languages: string[];
  notifications: {
    email: boolean;
    push: boolean;
    recommendations: boolean;
    reviews: boolean;
    newBooks: boolean;
  };
  privacy: {
    profileVisible: boolean;
    readingListVisible: boolean;
    reviewsVisible: boolean;
  };
  reading: {
    autoMarkCompleted: boolean;
    dailyGoal: number;
    preferredFormat: 'physical' | 'ebook' | 'audiobook' | 'any';
  };
}

export interface UserStatistics {
  totalBooksRead: number;
  totalPagesRead: number;
  totalReadingTime: number; // in minutes
  averageRating: number;
  favoriteGenres: Array<{ genre: string; count: number }>;
  readingStreak: number;
  currentYearGoal: number;
  currentYearProgress: number;
  monthlyStats: Array<{
    month: string;
    booksRead: number;
    pagesRead: number;
    readingTime: number;
  }>;
}

export interface ReadingHistory {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
  startDate: string;
  endDate?: string;
  status: 'reading' | 'completed' | 'paused' | 'abandoned';
  currentPage: number;
  totalPages: number;
  rating?: number;
  review?: string;
  notes?: string[];
}

export interface UserNotification {
  id: string;
  type: 'recommendation' | 'review' | 'follow' | 'book_update' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export class UserService {
  // Get user profile
  static async getProfile(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put<User>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      userData
    );
    return response.data;
  }

  // Delete user account
  static async deleteAccount(): Promise<void> {
    await api.delete(API_ENDPOINTS.USERS.DELETE_ACCOUNT);
  }

  // Get user preferences
  static async getPreferences(): Promise<UserPreferences> {
    const response = await api.get<UserPreferences>(
      API_ENDPOINTS.USERS.PREFERENCES
    );
    return response.data;
  }

  // Update user preferences
  static async updatePreferences(
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    const response = await api.put<UserPreferences>(
      API_ENDPOINTS.USERS.PREFERENCES,
      preferences
    );
    return response.data;
  }

  // Get user statistics
  static async getStatistics(): Promise<UserStatistics> {
    const response = await api.get<UserStatistics>(
      API_ENDPOINTS.USERS.STATISTICS
    );
    return response.data;
  }

  // Get reading history
  static async getReadingHistory(
    page: number = 1,
    limit: number = 20
  ): Promise<{
    history: ReadingHistory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const endpoint = COMMON_ENDPOINTS.USER_READING_LIST('history', page, limit);
    const response = await api.get<{
      history: ReadingHistory[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(endpoint);
    return response.data;
  }

  // Get notifications
  static async getNotifications(
    page: number = 1,
    limit: number = 20
  ): Promise<{
    notifications: UserNotification[];
    total: number;
    unreadCount: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const response = await api.get<{
      notifications: UserNotification[];
      total: number;
      unreadCount: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(API_ENDPOINTS.NOTIFICATIONS.LIST + `?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Get unread notifications count
  static async getUnreadNotificationsCount(): Promise<number> {
    const response = await api.get<{ count: number }>(
      API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
    );
    return response.data.count;
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string): Promise<void> {
    await api.post(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId));
  }

  // Mark all notifications as read
  static async markAllNotificationsAsRead(): Promise<void> {
    await api.post(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  }

  // Delete notification
  static async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(notificationId));
  }

  // Update notification preferences
  static async updateNotificationPreferences(
    preferences: UserPreferences['notifications']
  ): Promise<void> {
    await api.put(API_ENDPOINTS.NOTIFICATIONS.PREFERENCES, preferences);
  }

  // Get search history
  static async getSearchHistory(): Promise<string[]> {
    const response = await api.get<{ searches: string[] }>(
      API_ENDPOINTS.USERS.SEARCH_HISTORY
    );
    return response.data.searches;
  }

  // Clear search history
  static async clearSearchHistory(): Promise<void> {
    await api.delete(API_ENDPOINTS.USERS.SEARCH_HISTORY);
  }

  // Follow another user
  static async followUser(userId: string): Promise<void> {
    await api.post(`/users/${userId}/follow`);
  }

  // Unfollow a user
  static async unfollowUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}/follow`);
  }

  // Get user's followers
  static async getFollowers(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    followers: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const response = await api.get<{
      followers: User[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/users/${userId}/followers?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Get users that the user is following
  static async getFollowing(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    following: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const response = await api.get<{
      following: User[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/users/${userId}/following?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Upload user avatar
  static async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const response = await api.upload<{ avatarUrl: string }>(
      API_ENDPOINTS.UPLOAD.AVATAR,
      file
    );
    return response.data;
  }

  // Export user data (GDPR compliance)
  static async exportUserData(): Promise<Blob> {
    return await api.download('/users/export-data');
  }

  // Set reading goal for the year
  static async setYearlyReadingGoal(goal: number): Promise<void> {
    await api.post('/users/reading-goal', { goal });
  }

  // Get reading recommendations
  static async getRecommendations(limit: number = 10): Promise<
    {
      id: string;
      title: string;
      author: string;
      coverImage?: string;
      genre: string[];
      rating?: number;
      reason: string;
    }[]
  > {
    const response = await api.get<
      {
        id: string;
        title: string;
        author: string;
        coverImage?: string;
        genre: string[];
        rating?: number;
        reason: string;
      }[]
    >(API_ENDPOINTS.USERS.RECOMMENDATIONS + `?limit=${limit}`);
    return response.data;
  }
}
