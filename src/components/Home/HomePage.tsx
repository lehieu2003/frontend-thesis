import React from 'react';
import { Star, Clock, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import BookCard from '../Common/BookCard';
import { Book } from '../../types';

const HomePage: React.FC = () => {
  // Mock data - replace with actual API calls
  const personalizedBooks: Book[] = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      isbn: '9781786892737',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
      rating: 4.2,
      genre: ['Fiction', 'Philosophy'],
      language: 'English',
      publishedYear: 2020,
      source: 'local'
    },
    {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      isbn: '9780593135204',
      description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.',
      coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
      rating: 4.6,
      genre: ['Science Fiction', 'Thriller'],
      language: 'English',
      publishedYear: 2021,
      source: 'external'
    },
    {
      id: '3',
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      isbn: '9780571364886',
      description: 'A thrilling book that offers a look at our changing world through the eyes of an unforgettable narrator.',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      rating: 4.0,
      genre: ['Literary Fiction', 'Science Fiction'],
      language: 'English',
      publishedYear: 2021,
      source: 'local'
    }
  ];

  const trendingBooks = personalizedBooks.slice(0, 4);
  const newArrivals = personalizedBooks.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Great Read
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl">
            Get personalized book recommendations powered by AI, discover trending titles, and connect with a community of book lovers.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            Start Exploring
            <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        <div className="absolute right-8 top-8 opacity-20">
          <Sparkles className="w-32 h-32" />
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
          </div>
          <button className="text-blue-600 hover:text-blue-500 font-medium flex items-center">
            View all
            <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personalizedBooks.map((book) => (
            <BookCard key={book.id} book={book} showRecommendationReason />
          ))}
        </div>
      </section>

      {/* Trending Books */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>
          <button className="text-blue-600 hover:text-blue-500 font-medium flex items-center">
            View all
            <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingBooks.map((book) => (
            <BookCard key={`trending-${book.id}`} book={book} showTrendingBadge />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              New Arrivals
            </h2>
          </div>
          <button className="text-blue-600 hover:text-blue-500 font-medium flex items-center">
            View all
            <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.map((book) => (
            <BookCard key={`new-${book.id}`} book={book} showNewBadge />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Reading Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
            <div className="text-gray-600 dark:text-gray-400">Books Read</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-gray-600 dark:text-gray-400">Currently Reading</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
            <div className="text-gray-600 dark:text-gray-400">Want to Read</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;