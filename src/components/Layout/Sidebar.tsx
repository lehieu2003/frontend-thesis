import React from 'react';
import {
  Home,
  Search,
  Heart,
  BookOpen,
  MessageCircle,
  Bell,
  Settings,
  User,
  Sparkles,
  Shield,
  Users,
  BarChart3,
  Cpu,
  FileText,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
}) => {
  const { user } = useAuth();

  // Check if user is admin
  const isAdmin = user?.email === 'admin@bookapp.com';

  // Define menu items based on user role
  const userMenuItems = [
    { id: 'home', icon: Home, label: 'Home', badge: null },
    { id: 'search', icon: Search, label: 'Search & Explore', badge: null },
    {
      id: 'recommendations',
      icon: Sparkles,
      label: 'Recommendations',
      badge: null,
    },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Assistant', badge: 'AI' },
    { id: 'favorites', icon: Heart, label: 'Favorites', badge: null },
    {
      id: 'reading-lists',
      icon: BookOpen,
      label: 'Reading Lists',
      badge: null,
    },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: '3' },
    { id: 'profile', icon: User, label: 'Profile', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  const adminMenuItems = [
    { id: 'admin-overview', icon: BarChart3, label: 'Dashboard', badge: null },
    { id: 'admin-users', icon: Users, label: 'User Management', badge: null },
    {
      id: 'admin-books',
      icon: BookOpen,
      label: 'Book Management',
      badge: null,
    },
    { id: 'admin-ai', icon: Zap, label: 'AI/RAG Settings', badge: null },
    {
      id: 'admin-monitoring',
      icon: Cpu,
      label: 'System Monitoring',
      badge: null,
    },
    {
      id: 'admin-notifications',
      icon: Bell,
      label: 'Notifications',
      badge: null,
    },
    {
      id: 'admin-logs',
      icon: FileText,
      label: 'Logs & Analytics',
      badge: null,
    },
    {
      id: 'admin-settings',
      icon: Settings,
      label: 'System Settings',
      badge: null,
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className='p-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
            {isAdmin ? (
              <Shield className='w-5 h-5 text-white' />
            ) : (
              <BookOpen className='w-5 h-5 text-white' />
            )}
          </div>
          {!isCollapsed && (
            <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              {isAdmin ? 'Admin Panel' : 'BookHive'}
            </span>
          )}
        </div>
      </div>

      <nav className='mt-8'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              activeTab === item.id
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <item.icon className='w-5 h-5 flex-shrink-0' />
            {!isCollapsed && (
              <>
                <span className='ml-3 flex-1'>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      item.badge === 'AI'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Role indicator at bottom */}
      {!isCollapsed && (
        <div className='absolute bottom-4 left-4 right-4'>
          <div
            className={`px-3 py-2 rounded-lg text-xs font-medium text-center ${
              isAdmin
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            }`}
          >
            {isAdmin ? 'Administrator' : 'User'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
