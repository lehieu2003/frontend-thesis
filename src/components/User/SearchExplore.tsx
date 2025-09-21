import React, { useState } from 'react';
import { Search, Filter, Star, BookOpen, Heart, Plus, TrendingUp, Clock, Award } from 'lucide-react';
import BookCard from '../Common/BookCard';
import { Book } from '../../types';

const SearchExplore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Biography', 'History', 'Self-Help'];
  const languages = ['English', 'Vietnamese', 'French', 'Spanish', 'German'];

  const searchResults: Book[] = [
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
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '9780399590504',
      description: 'A memoir about a young girl who grows up in a survivalist family.',
      coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
      rating: 4.4,
      genre: ['Memoir', 'Biography'],
      language: 'English',
      publishedYear: 2018,
      source: 'external'
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '9780735211292',
      description: 'An easy & proven way to build good habits & break bad ones.',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      rating: 4.6,
      genre: ['Self-Help', 'Psychology'],
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

  const trendingSearches = ['Science Fiction', 'Self-Help', 'Mystery Thriller', 'Romance', 'Biography'];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Search & Explore</h1>
        <p className="text-blue-100 mb-6">Discover your next favorite book from our vast collection</p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books, authors, or genres..."
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-blue-600 hover:text-blue-500"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Languages</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trending Searches */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Searches</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search) => (
            <button
              key={search}
              onClick={() => setSearchQuery(search)}
              className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-sm hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Search Results ({searchResults.length} books found)
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">12,450</div>
              <div className="text-blue-100">Total Books</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <Star className="w-8 h-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">4.2</div>
              <div className="text-purple-100">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <Award className="w-8 h-8 mr-3" />
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-emerald-100">New This Week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchExplore;