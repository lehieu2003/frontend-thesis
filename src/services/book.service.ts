import { api } from './apiClient';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  coverImage?: string;
  publishedDate?: string;
  genre: string[];
  language: string;
  pageCount?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookSearchParams {
  query?: string;
  author?: string;
  genre?: string[];
  language?: string;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'author' | 'publishedDate' | 'rating' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface BookSearchResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookReview {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  bookId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

export class BookService {
  // Search books
  static async searchBooks(
    params: BookSearchParams = {}
  ): Promise<BookSearchResponse> {
    const response = await api.get<BookSearchResponse>('/books/search', {
      // Convert params to query string
      ...(params &&
        Object.keys(params).length > 0 && {
          body: JSON.stringify(params),
          method: 'POST',
        }),
    });
    return response.data;
  }

  // Get book by ID
  static async getBookById(id: string): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  }

  // Get popular books
  static async getPopularBooks(limit: number = 10): Promise<Book[]> {
    const response = await api.get<Book[]>(`/books/popular?limit=${limit}`);
    return response.data;
  }

  // Get recommended books
  static async getRecommendedBooks(
    userId?: string,
    limit: number = 10
  ): Promise<Book[]> {
    const endpoint = userId
      ? `/books/recommendations/${userId}`
      : '/books/recommendations';
    const response = await api.get<Book[]>(`${endpoint}?limit=${limit}`);
    return response.data;
  }

  // Get books by genre
  static async getBooksByGenre(
    genre: string,
    page: number = 1,
    limit: number = 20
  ): Promise<BookSearchResponse> {
    const response = await api.get<BookSearchResponse>(
      `/books/genre/${genre}?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  // Get new releases
  static async getNewReleases(limit: number = 10): Promise<Book[]> {
    const response = await api.get<Book[]>(
      `/books/new-releases?limit=${limit}`
    );
    return response.data;
  }

  // Get book reviews
  static async getBookReviews(
    bookId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    reviews: BookReview[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const response = await api.get<{
      reviews: BookReview[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/books/${bookId}/reviews?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Create book review
  static async createReview(
    reviewData: CreateReviewRequest
  ): Promise<BookReview> {
    const response = await api.post<BookReview>('/reviews', reviewData);
    return response.data;
  }

  // Update book review
  static async updateReview(
    reviewId: string,
    reviewData: UpdateReviewRequest
  ): Promise<BookReview> {
    const response = await api.put<BookReview>(
      `/reviews/${reviewId}`,
      reviewData
    );
    return response.data;
  }

  // Delete book review
  static async deleteReview(reviewId: string): Promise<void> {
    await api.delete(`/reviews/${reviewId}`);
  }

  // Get user's review for a book
  static async getUserReview(bookId: string): Promise<BookReview | null> {
    try {
      const response = await api.get<BookReview>(
        `/books/${bookId}/user-review`
      );
      return response.data;
    } catch {
      // Return null if no review found (404)
      return null;
    }
  }

  // Add book to reading list
  static async addToReadingList(
    bookId: string,
    listType: 'favorites' | 'currentlyReading' | 'wantToRead' | 'completed'
  ): Promise<void> {
    await api.post(`/users/reading-lists/${listType}`, { bookId });
  }

  // Remove book from reading list
  static async removeFromReadingList(
    bookId: string,
    listType: 'favorites' | 'currentlyReading' | 'wantToRead' | 'completed'
  ): Promise<void> {
    await api.delete(`/users/reading-lists/${listType}/${bookId}`);
  }

  // Get user's reading lists
  static async getReadingLists(): Promise<{
    favorites: Book[];
    currentlyReading: Book[];
    wantToRead: Book[];
    completed: Book[];
  }> {
    const response = await api.get<{
      favorites: Book[];
      currentlyReading: Book[];
      wantToRead: Book[];
      completed: Book[];
    }>('/users/reading-lists');
    return response.data;
  }

  // Mark book as read
  static async markAsRead(bookId: string): Promise<void> {
    await api.post(`/books/${bookId}/mark-read`);
  }

  // Get reading progress
  static async getReadingProgress(bookId: string): Promise<{
    currentPage: number;
    totalPages: number;
    percentage: number;
    lastReadAt: string;
  }> {
    const response = await api.get<{
      currentPage: number;
      totalPages: number;
      percentage: number;
      lastReadAt: string;
    }>(`/books/${bookId}/progress`);
    return response.data;
  }

  // Update reading progress
  static async updateReadingProgress(
    bookId: string,
    currentPage: number
  ): Promise<void> {
    await api.put(`/books/${bookId}/progress`, { currentPage });
  }
}
