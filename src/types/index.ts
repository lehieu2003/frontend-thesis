export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    genres: string[];
    languages: string[];
  };
  readingLists: {
    favorites: string[];
    currentlyReading: string[];
    wantToRead: string[];
    completed: string[];
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  coverUrl: string;
  rating: number;
  genre: string[];
  language: string;
  publishedYear: number;
  source: 'local' | 'external';
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  books?: Book[];
  timestamp: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalBooks: number;
  activeUsers: number;
  systemHealth: 'good' | 'warning' | 'error';
}