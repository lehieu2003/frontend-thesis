// API Endpoints Configuration
// Centralized API endpoints management for the application

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },

  // User management endpoints
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    DELETE_ACCOUNT: '/users/account',
    PREFERENCES: '/users/preferences',
    NOTIFICATIONS: '/users/notifications',
    READING_LISTS: '/users/reading-lists',
    READING_LIST_BY_TYPE: (type: string) => `/users/reading-lists/${type}`,
    REMOVE_FROM_READING_LIST: (type: string, bookId: string) =>
      `/users/reading-lists/${type}/${bookId}`,
    READING_HISTORY: '/users/reading-history',
    FAVORITES: '/users/favorites',
    RECOMMENDATIONS: '/users/recommendations',
    SEARCH_HISTORY: '/users/search-history',
    STATISTICS: '/users/statistics',
  },

  // Books endpoints
  BOOKS: {
    SEARCH: '/books/search',
    BY_ID: (id: string) => `/books/${id}`,
    POPULAR: '/books/popular',
    NEW_RELEASES: '/books/new-releases',
    FEATURED: '/books/featured',
    BY_GENRE: (genre: string) => `/books/genre/${genre}`,
    BY_AUTHOR: (author: string) => `/books/author/${author}`,
    RECOMMENDATIONS: '/books/recommendations',
    RECOMMENDATIONS_BY_USER: (userId: string) =>
      `/books/recommendations/${userId}`,
    SIMILAR: (bookId: string) => `/books/${bookId}/similar`,
    REVIEWS: (bookId: string) => `/books/${bookId}/reviews`,
    USER_REVIEW: (bookId: string) => `/books/${bookId}/user-review`,
    MARK_READ: (bookId: string) => `/books/${bookId}/mark-read`,
    PROGRESS: (bookId: string) => `/books/${bookId}/progress`,
    RATING: (bookId: string) => `/books/${bookId}/rating`,
    BOOKMARK: (bookId: string) => `/books/${bookId}/bookmark`,
    NOTES: (bookId: string) => `/books/${bookId}/notes`,
  },

  // Reviews endpoints
  REVIEWS: {
    CREATE: '/reviews',
    BY_ID: (id: string) => `/reviews/${id}`,
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
    BY_USER: '/reviews/user',
    BY_BOOK: (bookId: string) => `/reviews/book/${bookId}`,
    LIKE: (reviewId: string) => `/reviews/${reviewId}/like`,
    UNLIKE: (reviewId: string) => `/reviews/${reviewId}/unlike`,
    REPORT: (reviewId: string) => `/reviews/${reviewId}/report`,
  },

  // Categories/Genres endpoints
  GENRES: {
    LIST: '/genres',
    BY_ID: (id: string) => `/genres/${id}`,
    BOOKS: (genreId: string) => `/genres/${genreId}/books`,
    POPULAR: '/genres/popular',
    TRENDING: '/genres/trending',
  },

  // Authors endpoints
  AUTHORS: {
    LIST: '/authors',
    BY_ID: (id: string) => `/authors/${id}`,
    BOOKS: (authorId: string) => `/authors/${authorId}/books`,
    POPULAR: '/authors/popular',
    SEARCH: '/authors/search',
    FOLLOW: (authorId: string) => `/authors/${authorId}/follow`,
    UNFOLLOW: (authorId: string) => `/authors/${authorId}/unfollow`,
    FOLLOWERS: (authorId: string) => `/authors/${authorId}/followers`,
  },

  // Collections/Reading Lists endpoints
  COLLECTIONS: {
    PUBLIC: '/collections/public',
    USER: '/collections/user',
    CREATE: '/collections',
    BY_ID: (id: string) => `/collections/${id}`,
    UPDATE: (id: string) => `/collections/${id}`,
    DELETE: (id: string) => `/collections/${id}`,
    BOOKS: (collectionId: string) => `/collections/${collectionId}/books`,
    ADD_BOOK: (collectionId: string) => `/collections/${collectionId}/books`,
    REMOVE_BOOK: (collectionId: string, bookId: string) =>
      `/collections/${collectionId}/books/${bookId}`,
    FOLLOW: (collectionId: string) => `/collections/${collectionId}/follow`,
    UNFOLLOW: (collectionId: string) => `/collections/${collectionId}/unfollow`,
    POPULAR: '/collections/popular',
    FEATURED: '/collections/featured',
  },

  // Search endpoints
  SEARCH: {
    GLOBAL: '/search',
    BOOKS: '/search/books',
    AUTHORS: '/search/authors',
    USERS: '/search/users',
    COLLECTIONS: '/search/collections',
    SUGGESTIONS: '/search/suggestions',
    HISTORY: '/search/history',
    TRENDING: '/search/trending',
    AUTOCOMPLETE: '/search/autocomplete',
  },

  // Notifications endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    UNREAD_COUNT: '/notifications/unread-count',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: (id: string) => `/notifications/${id}`,
    PREFERENCES: '/notifications/preferences',
    SUBSCRIBE: '/notifications/subscribe',
    UNSUBSCRIBE: '/notifications/unsubscribe',
  },

  // Chat/Discussion endpoints
  CHAT: {
    ROOMS: '/chat/rooms',
    ROOM_BY_ID: (roomId: string) => `/chat/rooms/${roomId}`,
    MESSAGES: (roomId: string) => `/chat/rooms/${roomId}/messages`,
    SEND_MESSAGE: (roomId: string) => `/chat/rooms/${roomId}/messages`,
    JOIN_ROOM: (roomId: string) => `/chat/rooms/${roomId}/join`,
    LEAVE_ROOM: (roomId: string) => `/chat/rooms/${roomId}/leave`,
    BOOK_DISCUSSIONS: (bookId: string) => `/chat/books/${bookId}/discussions`,
  },

  // Admin endpoints
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    USER_BY_ID: (id: string) => `/admin/users/${id}`,
    BOOKS: '/admin/books',
    BOOK_BY_ID: (id: string) => `/admin/books/${id}`,
    REVIEWS: '/admin/reviews',
    REVIEW_BY_ID: (id: string) => `/admin/reviews/${id}`,
    REPORTS: '/admin/reports',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
    MODERATE_CONTENT: '/admin/moderate',
    BAN_USER: (userId: string) => `/admin/users/${userId}/ban`,
    UNBAN_USER: (userId: string) => `/admin/users/${userId}/unban`,
    DELETE_REVIEW: (reviewId: string) => `/admin/reviews/${reviewId}`,
    FEATURED_BOOKS: '/admin/books/featured',
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    AVATAR: '/upload/avatar',
    BOOK_COVER: '/upload/book-cover',
    DOCUMENT: '/upload/document',
  },

  // Analytics endpoints
  ANALYTICS: {
    READING_STATS: '/analytics/reading-stats',
    USER_ACTIVITY: '/analytics/user-activity',
    BOOK_POPULARITY: '/analytics/book-popularity',
    GENRE_TRENDS: '/analytics/genre-trends',
    ENGAGEMENT: '/analytics/engagement',
  },

  // External API integration endpoints
  EXTERNAL: {
    GOOGLE_BOOKS: '/external/google-books',
    GOODREADS: '/external/goodreads',
    OPENLIBRARY: '/external/openlibrary',
    BOOK_IMPORT: '/external/import-book',
  },

  // Real-time features (WebSocket endpoints)
  WEBSOCKET: {
    CONNECT: '/ws/connect',
    CHAT: '/ws/chat',
    NOTIFICATIONS: '/ws/notifications',
    READING_PROGRESS: '/ws/reading-progress',
    LIVE_DISCUSSIONS: '/ws/discussions',
  },
} as const;

// Helper functions for building dynamic endpoints
export const buildEndpoint = {
  // Build query string from parameters
  withQuery: (
    endpoint: string,
    params: Record<string, string | number | boolean | string[]>
  ): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  },

  // Build paginated endpoint
  withPagination: (
    endpoint: string,
    page: number = 1,
    limit: number = 20
  ): string => {
    return buildEndpoint.withQuery(endpoint, { page, limit });
  },

  // Build sorted endpoint
  withSort: (
    endpoint: string,
    sortBy: string,
    sortOrder: 'asc' | 'desc' = 'asc'
  ): string => {
    return buildEndpoint.withQuery(endpoint, { sortBy, sortOrder });
  },

  // Build filtered endpoint
  withFilter: (
    endpoint: string,
    filters: Record<string, string | number | boolean | string[]>
  ): string => {
    return buildEndpoint.withQuery(endpoint, filters);
  },
};

// Commonly used endpoint combinations
export const COMMON_ENDPOINTS = {
  // Books with pagination and filters
  BOOKS_PAGINATED: (
    page: number,
    limit: number,
    filters?: Record<string, string | number | boolean | string[]>
  ) =>
    buildEndpoint.withQuery(API_ENDPOINTS.BOOKS.SEARCH, {
      page,
      limit,
      ...filters,
    }),

  // Popular books with limit
  POPULAR_BOOKS: (limit: number = 10) =>
    buildEndpoint.withQuery(API_ENDPOINTS.BOOKS.POPULAR, { limit }),

  // User's reading list with pagination
  USER_READING_LIST: (type: string, page: number = 1, limit: number = 20) =>
    buildEndpoint.withPagination(
      API_ENDPOINTS.USERS.READING_LIST_BY_TYPE(type),
      page,
      limit
    ),

  // Book reviews with pagination
  BOOK_REVIEWS: (bookId: string, page: number = 1, limit: number = 10) =>
    buildEndpoint.withPagination(
      API_ENDPOINTS.BOOKS.REVIEWS(bookId),
      page,
      limit
    ),

  // Search with filters
  SEARCH_BOOKS: (
    query: string,
    filters?: Record<string, string | number | boolean | string[]>
  ) =>
    buildEndpoint.withQuery(API_ENDPOINTS.SEARCH.BOOKS, {
      q: query,
      ...filters,
    }),
};

// Export endpoint validator (useful for testing)
export const validateEndpoint = (endpoint: string): boolean => {
  // Basic validation - endpoint should start with /
  return endpoint.startsWith('/') && endpoint.length > 1;
};

// Type for endpoint functions
export type EndpointFunction = (...args: string[] | number[]) => string;

// Helper to check if endpoint is a function
export const isEndpointFunction = (
  endpoint: unknown
): endpoint is EndpointFunction => {
  return typeof endpoint === 'function';
};
