import React from 'react';
import { Star, Heart, BookPlus, ExternalLink, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  showRecommendationReason?: boolean;
  showTrendingBadge?: boolean;
  showNewBadge?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  showRecommendationReason,
  showTrendingBadge,
  showNewBadge 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
      <div className="relative overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showTrendingBadge && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </div>
        )}
        {showNewBadge && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            New
          </div>
        )}
        {book.source === 'external' && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white p-1 rounded-full">
            <ExternalLink className="w-3 h-3" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
              <BookPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{book.rating}</span>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2 mb-3">
          {book.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
        
        {showRecommendationReason && (
          <div className="flex items-center text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg px-2 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Based on your reading history
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;