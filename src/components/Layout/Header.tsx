import React from 'react';
import { Menu, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20'>
      <div className='flex items-center justify-between px-6 py-4'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
          >
            <Menu className='w-5 h-5' />
          </button>
          <div className='hidden md:block'>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Discover Your Next Great Read
            </h1>
          </div>
        </div>

        <div className='flex items-center space-x-4'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
          >
            {isDark ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>

          {user && (
            <div className='flex items-center space-x-3'>
              <div className='flex items-center space-x-2'>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                    <User className='w-4 h-4 text-white' />
                  </div>
                )}
                <span className='hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {user.name}
                </span>
              </div>
              <button
                onClick={logout}
                className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-red-600'
              >
                <LogOut className='w-4 h-4' />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
