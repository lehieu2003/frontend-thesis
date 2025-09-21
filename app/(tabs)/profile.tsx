import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const stats = {
    booksRead: 24,
    currentlyReading: 3,
    wantToRead: 47,
    averageRating: 4.2,
    readingStreak: 15,
    joinDate: 'January 2024',
  };

  const menuItems = [
    { id: 'favorites', icon: 'heart', label: 'Favorites', color: '#EF4444' },
    { id: 'reading-lists', icon: 'book', label: 'Reading Lists', color: '#3B82F6' },
    { id: 'notifications', icon: 'notifications', label: 'Notifications', color: '#F59E0B', badge: '3' },
    { id: 'settings', icon: 'settings', label: 'Settings', color: '#6B7280' },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-start px-5 py-5">
          <View className="flex-row items-center flex-1">
            <View className="w-15 h-15 rounded-full bg-blue-500 justify-center items-center mr-4">
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View className="flex-1">
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{user?.name || 'Book Lover'}</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-0.5`}>{user?.email}</Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Joined {stats.joinDate}</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="create-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Reading Stats */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mx-5 rounded-2xl p-5 mb-5 shadow-sm`}>
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Reading Statistics</Text>
          <View className="flex-row flex-wrap justify-between mb-5">
            <View className="items-center w-[48%] py-3">
              <Text className="text-2xl font-bold text-blue-500 mb-1">{stats.booksRead}</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Books Read</Text>
            </View>
            <View className="items-center w-[48%] py-3">
              <Text className="text-2xl font-bold text-blue-500 mb-1">{stats.currentlyReading}</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Currently Reading</Text>
            </View>
            <View className="items-center w-[48%] py-3">
              <Text className="text-2xl font-bold text-blue-500 mb-1">{stats.wantToRead}</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Want to Read</Text>
            </View>
            <View className="items-center w-[48%] py-3">
              <Text className="text-2xl font-bold text-blue-500 mb-1">{stats.averageRating}</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Rating</Text>
            </View>
          </View>

          {/* Reading Goal Progress */}
          <View className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-4`}>
            <View className="flex-row justify-between items-center mb-2">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2024 Reading Goal</Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stats.booksRead}/24 books</Text>
            </View>
            <View className={`h-1.5 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-1`}>
              <View className="h-full bg-blue-500 rounded-full" style={{ width: `${(stats.booksRead / 24) * 100}%` }} />
            </View>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {Math.round((stats.booksRead / 24) * 100)}% complete
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mx-5 rounded-2xl mb-5 shadow-sm`}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              className={`flex-row justify-between items-center px-5 py-4 ${
                index < menuItems.length - 1 ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}` : ''
              }`}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-9 h-9 rounded-full justify-center items-center mr-3" style={{ backgroundColor: `${item.color}20` }}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</Text>
              </View>
              <View className="flex-row items-center">
                {item.badge && (
                  <View className="bg-red-500 rounded-full px-1.5 py-0.5 mr-2">
                    <Text className="text-white text-xs font-semibold">{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme Toggle */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mx-5 rounded-2xl mb-5 shadow-sm`}>
          <View className="flex-row justify-between items-center px-5 py-4">
            <View className="flex-row items-center flex-1">
              <View className={`w-9 h-9 rounded-full justify-center items-center mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Ionicons 
                  name={isDark ? "moon" : "sunny"} 
                  size={20} 
                  color={isDark ? "#F59E0B" : "#6B7280"} 
                />
              </View>
              <View>
                <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-0.5`}>Theme</Text>
                <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Currently using {isDark ? 'dark' : 'light'} theme
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg" onPress={toggleTheme}>
              <Text className="text-white text-xs font-semibold">
                Switch to {isDark ? 'Light' : 'Dark'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View className="px-5 mb-8">
          <TouchableOpacity 
            className={`flex-row items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'} py-4 rounded-2xl shadow-sm`} 
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="text-red-500 text-base font-semibold ml-2">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}