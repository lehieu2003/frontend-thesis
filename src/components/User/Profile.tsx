import React, { useState } from 'react';
import {
  User,
  Camera,
  Edit2,
  Save,
  X,
  BookOpen,
  Star,
  Award,
  Settings,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate reader who loves exploring different genres and discovering new authors.',
    location: 'Ho Chi Minh City, Vietnam',
    website: 'https://mybookblog.com',
    favoriteGenres: ['Fiction', 'Science Fiction', 'Mystery'],
    readingGoal: 24,
  });

  const stats = {
    booksRead: 24,
    currentlyReading: 3,
    wantToRead: 47,
    averageRating: 4.2,
    readingStreak: 15,
    joinDate: 'January 2024',
  };

  const recentActivity = [
    {
      type: 'finished',
      book: 'The Seven Husbands of Evelyn Hugo',
      date: '2 days ago',
      rating: 5,
    },
    { type: 'started', book: 'Project Hail Mary', date: '1 week ago' },
    { type: 'reviewed', book: 'Educated', date: '2 weeks ago', rating: 4 },
    { type: 'added', book: 'The Midnight Library', date: '3 weeks ago' },
  ];

  const achievements = [
    {
      id: 1,
      name: 'First Book',
      description: 'Read your first book',
      earned: true,
      icon: '📚',
    },
    {
      id: 2,
      name: 'Speed Reader',
      description: 'Read 5 books in a month',
      earned: true,
      icon: '⚡',
    },
    {
      id: 3,
      name: 'Genre Explorer',
      description: 'Read books from 5 different genres',
      earned: true,
      icon: '🌟',
    },
    {
      id: 4,
      name: 'Consistent Reader',
      description: 'Read for 30 days straight',
      earned: false,
      icon: '🔥',
    },
    {
      id: 5,
      name: 'Book Critic',
      description: 'Write 10 book reviews',
      earned: false,
      icon: '✍️',
    },
    {
      id: 6,
      name: 'Goal Crusher',
      description: 'Complete your yearly reading goal',
      earned: false,
      icon: '🎯',
    },
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Passionate reader who loves exploring different genres and discovering new authors.',
      location: 'Ho Chi Minh City, Vietnam',
      website: 'https://mybookblog.com',
      favoriteGenres: ['Fiction', 'Science Fiction', 'Mystery'],
      readingGoal: 24,
    });
    setIsEditing(false);
  };

  return (
    <div className='space-y-6'>
      {/* Profile Header */}
      <div className='bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start space-x-6'>
            <div className='relative'>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-24 h-24 rounded-full object-cover border-4 border-white/20'
                />
              ) : (
                <div className='w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/20'>
                  <User className='w-12 h-12 text-white' />
                </div>
              )}
              <button className='absolute bottom-0 right-0 bg-white text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors'>
                <Camera className='w-4 h-4' />
              </button>
            </div>

            <div className='flex-1'>
              <h1 className='text-3xl font-bold mb-2'>{user?.name}</h1>
              <p className='text-purple-100 mb-4'>{editedProfile.bio}</p>
              <div className='flex items-center space-x-4 text-purple-100'>
                <span>📍 {editedProfile.location}</span>
                <span>📅 Joined {stats.joinDate}</span>
                <span>🔥 {stats.readingStreak} day streak</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center'
          >
            <Edit2 className='w-4 h-4 mr-2' />
            Edit Profile
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Edit Profile Form */}
          {isEditing && (
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Edit Profile
                </h3>
                <div className='flex space-x-2'>
                  <button
                    onClick={handleSave}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center'
                  >
                    <Save className='w-4 h-4 mr-2' />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center'
                  >
                    <X className='w-4 h-4 mr-2' />
                    Cancel
                  </button>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        name: e.target.value,
                      })
                    }
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Bio
                  </label>
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        bio: e.target.value,
                      })
                    }
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Location
                  </label>
                  <input
                    type='text'
                    value={editedProfile.location}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        location: e.target.value,
                      })
                    }
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Reading Goal (books/year)
                  </label>
                  <input
                    type='number'
                    value={editedProfile.readingGoal}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        readingGoal: parseInt(e.target.value),
                      })
                    }
                    className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Reading Stats */}
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-6'>
              Reading Statistics
            </h3>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600 mb-1'>
                  {stats.booksRead}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Books Read
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600 mb-1'>
                  {stats.currentlyReading}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Currently Reading
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600 mb-1'>
                  {stats.wantToRead}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Want to Read
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-yellow-600 mb-1'>
                  {stats.averageRating}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Avg Rating
                </div>
              </div>
            </div>

            {/* Reading Goal Progress */}
            <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                  2024 Reading Goal
                </span>
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  {stats.booksRead}/{editedProfile.readingGoal} books
                </span>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${
                      (stats.booksRead / editedProfile.readingGoal) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
                {Math.round(
                  (stats.booksRead / editedProfile.readingGoal) * 100
                )}
                % complete
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-6'>
              Recent Activity
            </h3>

            <div className='space-y-4'>
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'finished'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : activity.type === 'started'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : activity.type === 'reviewed'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}
                  >
                    {activity.type === 'finished' && (
                      <BookOpen className='w-5 h-5' />
                    )}
                    {activity.type === 'started' && (
                      <BookOpen className='w-5 h-5' />
                    )}
                    {activity.type === 'reviewed' && (
                      <Star className='w-5 h-5' />
                    )}
                    {activity.type === 'added' && (
                      <BookOpen className='w-5 h-5' />
                    )}
                  </div>

                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      {activity.type === 'finished' && 'Finished reading'}
                      {activity.type === 'started' && 'Started reading'}
                      {activity.type === 'reviewed' && 'Reviewed'}
                      {activity.type === 'added' &&
                        'Added to reading list'}{' '}
                      <span className='text-blue-600 dark:text-blue-400'>
                        {activity.book}
                      </span>
                    </p>
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs text-gray-500 dark:text-gray-500'>
                        {activity.date}
                      </span>
                      {activity.rating && (
                        <div className='flex items-center'>
                          <Star className='w-3 h-3 text-yellow-400 fill-current' />
                          <span className='text-xs text-gray-500 dark:text-gray-500 ml-1'>
                            {activity.rating}/5
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Achievements */}
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
              <Award className='w-5 h-5 mr-2' />
              Achievements
            </h3>

            <div className='grid grid-cols-2 gap-3'>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700 opacity-60'
                  }`}
                >
                  <div className='text-2xl mb-2'>{achievement.icon}</div>
                  <h4 className='font-medium text-sm text-gray-900 dark:text-white mb-1'>
                    {achievement.name}
                  </h4>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Genres */}
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Favorite Genres
            </h3>

            <div className='flex flex-wrap gap-2'>
              {editedProfile.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className='px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm'
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Quick Actions
            </h3>

            <div className='space-y-2'>
              <button className='w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center'>
                <Settings className='w-4 h-4 mr-3' />
                Account Settings
              </button>
              <button className='w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center'>
                <Shield className='w-4 h-4 mr-3' />
                Privacy Settings
              </button>
              <button className='w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center'>
                <BookOpen className='w-4 h-4 mr-3' />
                Reading Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
