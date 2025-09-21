import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    // Account Settings
    email: user?.email || '',
    name: user?.name || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    bookRecommendations: true,
    readingReminders: true,
    socialUpdates: false,
    systemUpdates: true,

    // Reading Preferences
    defaultLanguage: 'English',
    preferredGenres: ['Fiction', 'Science Fiction'],
    readingGoal: 24,
    autoMarkAsRead: false,
    showSpoilers: false,

    // Privacy Settings
    profileVisibility: 'public',
    showReadingActivity: true,
    showFavorites: true,
    allowRecommendations: true,

    // Display Settings
    booksPerPage: 12,
    defaultView: 'grid',
    showRatings: true,
    compactMode: false,
  });

  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reading', label: 'Reading', icon: BookOpen },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'data', label: 'Data & Export', icon: Download },
  ];

  const languages = [
    'English',
    'Vietnamese',
    'French',
    'Spanish',
    'German',
    'Japanese',
  ];
  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
    'Fantasy',
    'Thriller',
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
    }, 1500);
  };

  const handleGenreToggle = (genre: string) => {
    setSettings((prev) => ({
      ...prev,
      preferredGenres: prev.preferredGenres.includes(genre)
        ? prev.preferredGenres.filter((g) => g !== genre)
        : [...prev.preferredGenres, genre],
    }));
  };

  const renderAccountSettings = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Account Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Full Name
            </label>
            <input
              type='text'
              value={settings.name}
              onChange={(e) =>
                setSettings({ ...settings, name: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Change Password
        </h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Current Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.currentPassword}
                onChange={(e) =>
                  setSettings({ ...settings, currentPassword: e.target.value })
                }
                className='w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                New Password
              </label>
              <input
                type='password'
                value={settings.newPassword}
                onChange={(e) =>
                  setSettings({ ...settings, newPassword: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Confirm New Password
              </label>
              <input
                type='password'
                value={settings.confirmPassword}
                onChange={(e) =>
                  setSettings({ ...settings, confirmPassword: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Notification Preferences
        </h3>
        <div className='space-y-4'>
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              description: 'Receive notifications via email',
            },
            {
              key: 'pushNotifications',
              label: 'Push Notifications',
              description: 'Receive push notifications in browser',
            },
            {
              key: 'bookRecommendations',
              label: 'Book Recommendations',
              description: 'Get personalized book suggestions',
            },
            {
              key: 'readingReminders',
              label: 'Reading Reminders',
              description: 'Reminders to continue reading',
            },
            {
              key: 'socialUpdates',
              label: 'Social Updates',
              description: 'Updates from friends and community',
            },
            {
              key: 'systemUpdates',
              label: 'System Updates',
              description: 'Important system announcements',
            },
          ].map((item) => (
            <div
              key={item.key}
              className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
            >
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white'>
                  {item.label}
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {item.description}
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    setSettings({ ...settings, [item.key]: e.target.checked })
                  }
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReadingSettings = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Reading Preferences
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Default Language
            </label>
            <select
              value={settings.defaultLanguage}
              onChange={(e) =>
                setSettings({ ...settings, defaultLanguage: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Annual Reading Goal
            </label>
            <input
              type='number'
              value={settings.readingGoal}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  readingGoal: parseInt(e.target.value),
                })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Preferred Genres
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.preferredGenres.includes(genre)
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Reading Behavior
        </h3>
        <div className='space-y-4'>
          {[
            {
              key: 'autoMarkAsRead',
              label: 'Auto-mark as Read',
              description:
                'Automatically mark books as read when you finish them',
            },
            {
              key: 'showSpoilers',
              label: 'Show Spoilers',
              description: 'Display spoiler content in reviews and discussions',
            },
          ].map((item) => (
            <div
              key={item.key}
              className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
            >
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white'>
                  {item.label}
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {item.description}
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    setSettings({ ...settings, [item.key]: e.target.checked })
                  }
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Privacy Controls
        </h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Profile Visibility
            </label>
            <select
              value={settings.profileVisibility}
              onChange={(e) =>
                setSettings({ ...settings, profileVisibility: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              <option value='public'>
                Public - Anyone can see your profile
              </option>
              <option value='friends'>
                Friends Only - Only friends can see your profile
              </option>
              <option value='private'>
                Private - Only you can see your profile
              </option>
            </select>
          </div>

          {[
            {
              key: 'showReadingActivity',
              label: 'Show Reading Activity',
              description: 'Display your reading progress and activity',
            },
            {
              key: 'showFavorites',
              label: 'Show Favorite Books',
              description: 'Allow others to see your favorite books',
            },
            {
              key: 'allowRecommendations',
              label: 'Allow Recommendations',
              description: 'Let others recommend books to you',
            },
          ].map((item) => (
            <div
              key={item.key}
              className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
            >
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white'>
                  {item.label}
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {item.description}
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    setSettings({ ...settings, [item.key]: e.target.checked })
                  }
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Display Preferences
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Books Per Page
            </label>
            <select
              value={settings.booksPerPage}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  booksPerPage: parseInt(e.target.value),
                })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              <option value={8}>8 books</option>
              <option value={12}>12 books</option>
              <option value={16}>16 books</option>
              <option value={24}>24 books</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Default View
            </label>
            <select
              value={settings.defaultView}
              onChange={(e) =>
                setSettings({ ...settings, defaultView: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              <option value='grid'>Grid View</option>
              <option value='list'>List View</option>
            </select>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <div className='flex items-center space-x-3'>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isDark ? (
                  <Sun className='w-5 h-5' />
                ) : (
                  <Moon className='w-5 h-5' />
                )}
              </button>
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white'>
                  Theme
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Currently using {isDark ? 'dark' : 'light'} theme
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
            >
              Switch to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>

          {[
            {
              key: 'showRatings',
              label: 'Show Ratings',
              description: 'Display star ratings on book cards',
            },
            {
              key: 'compactMode',
              label: 'Compact Mode',
              description: 'Use smaller book cards and tighter spacing',
            },
          ].map((item) => (
            <div
              key={item.key}
              className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
            >
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white'>
                  {item.label}
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {item.description}
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    setSettings({ ...settings, [item.key]: e.target.checked })
                  }
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Data Management
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <div className='flex items-center mb-3'>
              <Download className='w-5 h-5 text-blue-600 mr-2' />
              <h4 className='font-medium text-gray-900 dark:text-white'>
                Export Data
              </h4>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              Download all your reading data, lists, and preferences
            </p>
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors'>
              Export My Data
            </button>
          </div>

          <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
            <div className='flex items-center mb-3'>
              <Upload className='w-5 h-5 text-green-600 mr-2' />
              <h4 className='font-medium text-gray-900 dark:text-white'>
                Import Data
              </h4>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              Import reading data from other platforms
            </p>
            <button className='w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors'>
              Import Data
            </button>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 dark:border-gray-700 pt-6'>
        <h3 className='text-lg font-semibold text-red-600 dark:text-red-400 mb-4'>
          Danger Zone
        </h3>

        <div className='space-y-4'>
          <div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='font-medium text-red-900 dark:text-red-100'>
                  Clear All Data
                </h4>
                <p className='text-sm text-red-700 dark:text-red-300'>
                  Remove all your reading lists, favorites, and progress
                </p>
              </div>
              <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center'>
                <RefreshCw className='w-4 h-4 mr-2' />
                Clear Data
              </button>
            </div>
          </div>

          <div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='font-medium text-red-900 dark:text-red-100'>
                  Delete Account
                </h4>
                <p className='text-sm text-red-700 dark:text-red-300'>
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button className='bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center'>
                <Trash2 className='w-4 h-4 mr-2' />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'reading':
        return renderReadingSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'display':
        return renderDisplaySettings();
      case 'data':
        return renderDataSettings();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-gradient-to-r from-gray-600 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4 flex items-center'>
              <SettingsIcon className='w-8 h-8 mr-3' />
              Settings
            </h1>
            <p className='text-gray-100 mb-6'>
              Customize your reading experience and manage your account
              preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className='bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center font-medium disabled:opacity-50'
          >
            {isSaving ? (
              <>
                <RefreshCw className='w-5 h-5 mr-2 animate-spin' />
                Saving...
              </>
            ) : (
              <>
                <Save className='w-5 h-5 mr-2' />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Sidebar Navigation */}
        <div className='lg:col-span-1'>
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4'>
            <nav className='space-y-2'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className='w-5 h-5 mr-3' />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className='lg:col-span-3'>
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6'>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
