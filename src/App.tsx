import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import ChatBot from './components/Chatbot/ChatBot';
import AdminDashboard from './components/Admin/AdminDashboard';
import SearchExplore from './components/User/SearchExplore';
import Recommendations from './components/User/Recommendations';
import Favorites from './components/User/Favorites';
import ReadingLists from './components/User/ReadingLists';
import Notifications from './components/User/Notifications';
import Profile from './components/User/Profile';
import Settings from './components/User/Settings';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Set default tab based on user role
    return user?.email === 'admin@bookapp.com' ? 'admin-overview' : 'home';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Check if user is admin
  const isAdmin = user?.email === 'admin@bookapp.com';

  // Reset activeTab when user changes (login/logout)
  React.useEffect(() => {
    if (user) {
      setActiveTab(
        user.email === 'admin@bookapp.com' ? 'admin-overview' : 'home'
      );
    }
  }, [user]);

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm switchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm switchToLogin={() => setAuthMode('login')} />
    );
  }

  const renderContent = () => {
    if (isAdmin) {
      // Admin routes
      switch (activeTab) {
        case 'admin-overview':
        case 'admin-users':
        case 'admin-books':
        case 'admin-ai':
        case 'admin-monitoring':
        case 'admin-notifications':
        case 'admin-logs':
        case 'admin-settings':
          return <AdminDashboard activeSection={activeTab} />;
        default:
          return <AdminDashboard activeSection='admin-overview' />;
      }
    } else {
      // User routes
      switch (activeTab) {
        case 'home':
          return <HomePage />;
        case 'chatbot':
          return <ChatBot />;
        case 'search':
          return <SearchExplore />;
        case 'recommendations':
          return <Recommendations />;
        case 'favorites':
          return <Favorites />;
        case 'reading-lists':
          return <ReadingLists />;
        case 'notifications':
          return <Notifications />;
        case 'profile':
          return <Profile />;
        case 'settings':
          return <Settings />;
        default:
          return <HomePage />;
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300'>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Header
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className={`${isAdmin ? 'p-0' : 'p-6'}`}>
          <div
            className={isAdmin ? 'h-[calc(100vh-80px)] overflow-hidden' : ''}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
