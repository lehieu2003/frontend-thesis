import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  switchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4'>
            <BookOpen className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Welcome back
          </h2>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Sign in to your account
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
              >
                Email address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all'
                  placeholder='Enter your email'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-700 dark:text-gray-300'
              >
                Remember me
              </label>
            </div>
            <button
              type='button'
              className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400'
            >
              Forgot password?
            </button>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105'
          >
            {isLoading ? (
              <div className='flex items-center'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>

          <div className='text-center'>
            <span className='text-gray-600 dark:text-gray-400'>
              Don't have an account?{' '}
            </span>
            <button
              type='button'
              onClick={switchToRegister}
              className='text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium'
            >
              Sign up
            </button>
          </div>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Demo credentials: any email/password combination
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
