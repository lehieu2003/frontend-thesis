import React, { useState } from 'react';
import {
  Heart,
  Star,
  Grid,
  List,
  Search,
  BookOpen,
  Calendar,
  User,
} from 'lucide-react';
import BookCard from '../Common/BookCard';
import { Book } from '../../types';

const Favorites: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date-added');
  const [filterGenre, setFilterGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock favorite books data
  const favoriteBooks: Book[] = [
    {
      id: '1',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      isbn: '9781501161933',
      description:
        'A captivating novel about a reclusive Hollywood icon who decides to tell her story to an unknown journalist.',
      coverUrl:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
      rating: 4.5,
      genre: ['Fiction', 'Romance'],
      language: 'English',
      publishedYear: 2017,
      source: 'local',
    },
    {
      id: '2',
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '9780399590504',
      description:
        'A memoir about a young girl who grows up in a survivalist family and eventually earns a PhD from Cambridge.',
      coverUrl:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
      rating: 4.4,
      genre: ['Memoir', 'Biography'],
      language: 'English',
      publishedYear: 2018,
      source: 'external',
    },
    {
      id: '3',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      isbn: '9781786892737',
      description:
        'Between life and death there is a library, and within that library, the shelves go on forever.',
      coverUrl:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      rating: 4.2,
      genre: ['Fiction', 'Philosophy'],
      language: 'English',
      publishedYear: 2020,
      source: 'local',
    },
    {
      id: '4',
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '9780735211292',
      description:
        'An easy & proven way to build good habits & break bad ones.',
      coverUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      rating: 4.6,
      genre: ['Self-Help', 'Psychology'],
      language: 'English',
      publishedYear: 2018,
      source: 'local',
    },
  ];

  const genres = [
    'Fiction',
    'Romance',
    'Memoir',
    'Biography',
    'Philosophy',
    'Self-Help',
    'Psychology',
  ];

  const filteredBooks = favoriteBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      filterGenre === 'all' || book.genre.includes(filterGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 rounded-2xl p-8 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4 flex items-center'>
              <Heart className='w-8 h-8 mr-3 fill-current' />
              Your Favorites
            </h1>
            <p className='text-red-100 mb-6'>
              Books you've loved and want to remember forever
            </p>
            <div className='flex items-center space-x-6 text-red-100'>
              <div className='flex items-center'>
                <BookOpen className='w-5 h-5 mr-2' />
                <span>{favoriteBooks.length} Books</span>
              </div>
              <div className='flex items-center'>
                <Star className='w-5 h-5 mr-2 fill-current' />
                <span>4.4 Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
          {/* Search */}
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search your favorites...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            />
          </div>

          <div className='flex items-center space-x-4'>
            {/* Genre Filter */}
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              <option value='all'>All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              <option value='date-added'>Date Added</option>
              <option value='title'>Title</option>
              <option value='author'>Author</option>
              <option value='rating'>Rating</option>
            </select>

            {/* View Mode */}
            <div className='flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 shadow-sm'
                    : ''
                }`}
              >
                <Grid className='w-4 h-4' />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 shadow-sm'
                    : ''
                }`}
              >
                <List className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <Heart className='w-8 h-8 text-red-500 mr-3' />
            <div>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                {favoriteBooks.length}
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Total Favorites
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <Star className='w-8 h-8 text-yellow-500 mr-3' />
            <div>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                4.4
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Avg Rating
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <BookOpen className='w-8 h-8 text-blue-500 mr-3' />
            <div>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                3
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                Genres
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <Calendar className='w-8 h-8 text-green-500 mr-3' />
            <div>
              <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                2
              </div>
              <div className='text-sm text-gray-600 dark:text-gray-400'>
                This Month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Display */}
      <div>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
            {filteredBooks.length}{' '}
            {filteredBooks.length === 1 ? 'Book' : 'Books'}
          </h3>
        </div>

        {viewMode === 'grid' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredBooks.map((book) => (
              <div key={book.id} className='relative'>
                <BookCard book={book} />
                <div className='absolute top-3 right-3'>
                  <button className='bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors'>
                    <Heart className='w-4 h-4 fill-current' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start space-x-4'>
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className='w-20 h-28 object-cover rounded-lg flex-shrink-0'
                  />
                  <div className='flex-1'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                          {book.title}
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 mb-2 flex items-center'>
                          <User className='w-4 h-4 mr-1' />
                          {book.author}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-500 mb-3 line-clamp-2'>
                          {book.description}
                        </p>
                        <div className='flex items-center space-x-4'>
                          <div className='flex items-center'>
                            <div className='flex text-yellow-400 mr-2'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(book.rating)
                                      ? 'fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className='text-sm text-gray-600 dark:text-gray-400'>
                              {book.rating}
                            </span>
                          </div>
                          <div className='flex space-x-2'>
                            {book.genre.slice(0, 2).map((genre) => (
                              <span
                                key={genre}
                                className='px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs'
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button className='bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors'>
                        <Heart className='w-4 h-4 fill-current' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredBooks.length === 0 && (
        <div className='text-center py-12'>
          <Heart className='w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            No favorites found
          </h3>
          <p className='text-gray-600 dark:text-gray-400'>
            {searchQuery || filterGenre !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start adding books to your favorites to see them here'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
