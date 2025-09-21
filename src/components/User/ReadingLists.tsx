import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Star, Clock, CheckCircle, Heart, List, Grid } from 'lucide-react';
import BookCard from '../Common/BookCard';
import { Book } from '../../types';

interface ReadingList {
  id: string;
  name: string;
  description: string;
  books: Book[];
  createdAt: Date;
  isDefault: boolean;
  color: string;
}

const ReadingLists: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');

  // Mock books data
  const sampleBooks: Book[] = [
    {
      id: '1',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      isbn: '9781501161933',
      description: 'A captivating novel about a reclusive Hollywood icon.',
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
    }
  ];

  // Mock reading lists data
  const [readingLists, setReadingLists] = useState<ReadingList[]>([
    {
      id: '1',
      name: 'Currently Reading',
      description: 'Books I\'m reading right now',
      books: [sampleBooks[0]],
      createdAt: new Date(),
      isDefault: true,
      color: 'blue'
    },
    {
      id: '2',
      name: 'Want to Read',
      description: 'Books on my wishlist',
      books: [sampleBooks[1]],
      createdAt: new Date(),
      isDefault: true,
      color: 'green'
    },
    {
      id: '3',
      name: 'Completed',
      description: 'Books I\'ve finished reading',
      books: [],
      createdAt: new Date(),
      isDefault: true,
      color: 'purple'
    },
    {
      id: '4',
      name: 'Summer Reading 2024',
      description: 'My summer reading challenge',
      books: [sampleBooks[0], sampleBooks[1]],
      createdAt: new Date(),
      isDefault: false,
      color: 'orange'
    }
  ]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      red: 'bg-red-500 text-white',
      pink: 'bg-pink-500 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIcon = (listName: string) => {
    if (listName.includes('Currently')) return Clock;
    if (listName.includes('Want')) return Heart;
    if (listName.includes('Completed')) return CheckCircle;
    return BookOpen;
  };

  const createNewList = () => {
    if (!newListName.trim()) return;
    
    const newList: ReadingList = {
      id: Date.now().toString(),
      name: newListName,
      description: newListDescription,
      books: [],
      createdAt: new Date(),
      isDefault: false,
      color: 'blue'
    };
    
    setReadingLists([...readingLists, newList]);
    setNewListName('');
    setNewListDescription('');
    setShowCreateModal(false);
  };

  const deleteList = (listId: string) => {
    const list = readingLists.find(l => l.id === listId);
    if (list?.isDefault) return; // Can't delete default lists
    
    setReadingLists(readingLists.filter(l => l.id !== listId));
    if (selectedList === listId) {
      setSelectedList(null);
    }
  };

  const selectedListData = readingLists.find(l => l.id === selectedList);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              Reading Lists
            </h1>
            <p className="text-indigo-100 mb-6">
              Organize your books into custom collections and track your reading journey
            </p>
            <div className="flex items-center space-x-6 text-indigo-100">
              <div className="flex items-center">
                <List className="w-5 h-5 mr-2" />
                <span>{readingLists.length} Lists</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{readingLists.reduce((total, list) => total + list.books.length, 0)} Books</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            New List
          </button>
        </div>
      </div>

      {!selectedList ? (
        /* Lists Overview */
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Reading Lists</h3>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {readingLists.map((list) => {
              const IconComponent = getIcon(list.name);
              return (
                <div
                  key={list.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedList(list.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg ${getColorClasses(list.color)} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {!list.isDefault && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                          <button className="text-gray-400 hover:text-blue-600 p-1">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteList(list.id);
                            }}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {list.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {list.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {list.books.length} {list.books.length === 1 ? 'book' : 'books'}
                      </span>
                      {list.isDefault && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full text-xs">
                          Default
                        </span>
                      )}
                    </div>

                    {/* Book previews */}
                    {list.books.length > 0 && (
                      <div className="flex -space-x-2 mt-4">
                        {list.books.slice(0, 3).map((book, index) => (
                          <img
                            key={book.id}
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-8 h-10 object-cover rounded border-2 border-white dark:border-gray-800"
                            style={{ zIndex: 3 - index }}
                          />
                        ))}
                        {list.books.length > 3 && (
                          <div className="w-8 h-10 bg-gray-200 dark:bg-gray-700 rounded border-2 border-white dark:border-gray-800 flex items-center justify-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">+{list.books.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Selected List View */
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedList(null)}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                ← Back to Lists
              </button>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedListData?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedListData?.description}
                </p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Books
            </button>
          </div>

          {selectedListData?.books.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No books in this list</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start adding books to organize your reading
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Add Your First Book
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedListData?.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Reading List</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  List Name
                </label>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                  placeholder="Describe your reading list..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={createNewList}
                disabled={!newListName.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg"
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingLists;