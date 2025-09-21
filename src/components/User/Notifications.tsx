import React, { useState } from 'react';
import {
  Bell,
  Check,
  X,
  Star,
  BookOpen,
  Heart,
  Filter,
  Settings,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'recommendation' | 'social' | 'system' | 'reading';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<
    'all' | 'unread' | 'recommendation' | 'social' | 'system'
  >('all');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'recommendation',
      title: 'New Book Recommendation',
      message:
        'Based on your reading of "The Seven Husbands of Evelyn Hugo", we think you\'ll love "Daisy Jones & The Six"',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: '2',
      type: 'social',
      title: 'New Review',
      message:
        'Sarah left a 5-star review on "Educated" - a book in your reading list',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: '3',
      type: 'reading',
      title: 'Reading Goal Update',
      message:
        "Congratulations! You've completed 75% of your yearly reading goal",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'New Features Available',
      message:
        'Check out our new AI-powered book recommendations and improved search functionality',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: '5',
      type: 'recommendation',
      title: 'Weekly Recommendations',
      message: 'Your personalized weekly book recommendations are ready',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'recommendation':
        return Star;
      case 'social':
        return Heart;
      case 'reading':
        return BookOpen;
      case 'system':
        return Settings;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'social':
        return 'text-pink-500 bg-pink-100 dark:bg-pink-900/30';
      case 'reading':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'system':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const deleteReadNotifications = () => {
    setNotifications(notifications.filter((notif) => !notif.read));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-4 flex items-center'>
              <Bell className='w-8 h-8 mr-3' />
              Notifications
              {unreadCount > 0 && (
                <span className='ml-3 bg-red-500 text-white text-sm px-2 py-1 rounded-full'>
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className='text-blue-100 mb-6'>
              Stay updated with book recommendations, reading progress, and
              community activity
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center'
            >
              <Check className='w-4 h-4 mr-2' />
              Mark All Read
            </button>
          )}
          <div className='flex space-x-2'>
            <button
              onClick={deleteReadNotifications}
              className='bg-red-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center'
            >
              <X className='w-4 h-4 mr-2' />
              Clear Read
            </button>
            <button
              onClick={deleteAllNotifications}
              className='bg-red-600/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-red-600/30 transition-colors flex items-center'
            >
              <X className='w-4 h-4 mr-2' />
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Filter Notifications
          </h3>
          <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
            <Filter className='w-4 h-4 mr-1' />
            {filteredNotifications.length} notifications
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            {
              id: 'recommendation',
              label: 'Recommendations',
              count: notifications.filter((n) => n.type === 'recommendation')
                .length,
            },
            {
              id: 'social',
              label: 'Social',
              count: notifications.filter((n) => n.type === 'social').length,
            },
            {
              id: 'reading',
              label: 'Reading',
              count: notifications.filter((n) => n.type === 'reading').length,
            },
            {
              id: 'system',
              label: 'System',
              count: notifications.filter((n) => n.type === 'system').length,
            },
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() =>
                setFilter(
                  filterOption.id as
                    | 'all'
                    | 'unread'
                    | 'recommendation'
                    | 'social'
                    | 'system'
                )
              }
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filterOption.label}
              <span className='ml-2 px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-xs'>
                {filterOption.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className='space-y-3'>
        {filteredNotifications.length === 0 ? (
          <div className='text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl'>
            <Bell className='w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              No notifications
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              {filter === 'unread'
                ? 'All caught up! No unread notifications.'
                : 'No notifications match your current filter.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
                  notification.read
                    ? 'border-gray-200 dark:border-gray-700'
                    : 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
                }`}
              >
                <div className='flex items-start space-x-4'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(
                      notification.type
                    )}`}
                  >
                    <IconComponent className='w-5 h-5' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h4
                          className={`font-medium ${
                            notification.read
                              ? 'text-gray-900 dark:text-white'
                              : 'text-blue-900 dark:text-blue-100'
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                          {notification.message}
                        </p>
                        <div className='flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500'>
                          <span>{formatTime(notification.timestamp)}</span>
                          {!notification.read && (
                            <span className='ml-2 w-2 h-2 bg-blue-500 rounded-full'></span>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center space-x-2 ml-4'>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className='text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1'
                            title='Mark as read'
                          >
                            <Check className='w-4 h-4' />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className='text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1'
                          title='Delete notification'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
