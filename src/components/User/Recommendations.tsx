import React, { useState } from 'react';
import { Sparkles, RefreshCw, Settings, TrendingUp, Heart, BookOpen, Star, Filter } from 'lucide-react';
import BookCard from '../Common/BookCard';
import { Book } from '../../types';

const Recommendations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('for-you');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock recommendation data
  const personalizedBooks: Book[] = [
    {
      id: '1',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      isbn: '9781501161933',
      description: 'A captivating novel about a reclusive Hollywood icon who decides to tell her story.',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
      rating: 4.5,
      genre: ['Fiction', 'Romance'],
      language: 'English',
      publishedYear: 2017,
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
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '9780399590504',
      description: 'A memoir about a young girl who grows up in a survivalist family.',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      rating: 4.4,
      genre: ['Memoir', 'Biography'],
      language: 'English',
      publishedYear: 2018,
      source: 'local'
    },
    {
      id: '4',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      isbn: '9781786892737',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
      coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      rating: 4.2,
      genre: ['Fiction', 'Philosophy'],
      language: 'English',
      publishedYear: 2020,
      source: 'local'
    }
  ];

  const categories = [
    { id: 'for-you', label: 'For You', icon: Sparkles, count: 24 },
    { id: 'trending', label: 'Trending', icon: TrendingUp, count: 18 },
    { id: 'similar', label: 'Similar to Your Favorites', icon: Heart, count: 12 },
    { id: 'genre-based', label: 'Based on Your Genres', icon: BookOpen, count: 30 }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getRecommendationReason = (bookId: string) => {
    const reasons = [
      'Based on your love for contemporary fiction',
      'Similar to books you\'ve rated highly',
      'Popular among readers with similar tastes',
      'Matches your preferred genres',
      'Trending in your reading community'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 flex items-center">
              <Sparkles className="w-8 h-8 mr-3" />
              Personal Recommendations
            </h1>
            <p className="text-purple-100 mb-6">
              Discover books tailored just for you, powered by AI and your reading history
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Recommendation Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
              <span className="ml-2 px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
            AI Insights
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Based on your reading of <strong>24 books</strong> and preferences for <strong>Fiction, Science Fiction, and Mystery</strong>, 
            we've found books that match your taste for character-driven narratives and thought-provoking themes.
          </p>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {categories.find(c => c.id === activeCategory)?.label} ({personalizedBooks.length} books)
          </h3>
          <button className="flex items-center text-purple-600 hover:text-purple-500 font-medium">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personalizedBooks.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} showRecommendationReason />
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center text-xs text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {getRecommendationReason(book.id)}
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">95% match</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Reading Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Favorite Genres</h4>
            <div className="flex flex-wrap gap-2">
              {['Fiction', 'Science Fiction', 'Mystery', 'Romance'].map((genre) => (
                <span key={genre} className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Preferred Length</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Medium (200-400 pages)
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Reading Pace</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              2-3 books per month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;