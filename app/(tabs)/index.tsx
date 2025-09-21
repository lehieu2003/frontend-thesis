import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const { width } = Dimensions.get('window');

// Mock data
const personalizedBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    rating: 4.2,
    genre: ['Fiction', 'Philosophy'],
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
    rating: 4.6,
    genre: ['Science Fiction', 'Thriller'],
  },
  {
    id: '3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    rating: 4.0,
    genre: ['Literary Fiction', 'Science Fiction'],
  },
];

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const renderBookCard = ({ item }: { item: typeof personalizedBooks[0] }) => (
    <TouchableOpacity className="w-36 mr-4">
      <Image source={{ uri: item.coverUrl }} className="w-36 h-48 rounded-xl mb-2" />
      <View className="flex-1">
        <Text className={`text-sm font-semibold mb-1 leading-4 ${isDark ? 'text-white' : 'text-gray-800'}`} numberOfLines={2}>
          {item.title}
        </Text>
        <Text className={`text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} numberOfLines={1}>
          by {item.author}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 py-4">
          <View>
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Good morning,</Text>
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{user?.name || 'Reader'}</Text>
          </View>
          <TouchableOpacity className="p-1">
            <Ionicons name="person-circle" size={32} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#3B82F6', '#8B5CF6', '#6366F1']}
          className="mx-5 rounded-2xl p-6 mb-8"
        >
          <View className="items-start">
            <Text className="text-3xl font-bold text-white mb-3">
              Discover Your Next{'\n'}
              <Text className="text-yellow-200">Great Read</Text>
            </Text>
            <Text className="text-base text-white/80 mb-5 leading-6">
              Get personalized book recommendations powered by AI
            </Text>
            <TouchableOpacity className="bg-white flex-row items-center px-5 py-3 rounded-xl">
              <Text className="text-indigo-600 font-semibold mr-2">Start Exploring</Text>
              <Ionicons name="chevron-forward" size={20} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Recommended for You */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="sparkles" size={24} color="#8B5CF6" />
              <Text className={`text-xl font-bold ml-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Recommended for You</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-500 font-semibold">View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={personalizedBooks}
            renderItem={renderBookCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>

        {/* Trending Now */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="trending-up" size={24} color="#F59E0B" />
              <Text className={`text-xl font-bold ml-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Trending Now</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-500 font-semibold">View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={personalizedBooks}
            renderItem={renderBookCard}
            keyExtractor={(item) => `trending-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>

        {/* Reading Stats */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mx-5 rounded-2xl p-6 mb-8 shadow-sm`}>
          <Text className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Your Reading Journey</Text>
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-blue-500 mb-1">24</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Books Read</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-blue-500 mb-1">8</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Currently Reading</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-blue-500 mb-1">156</Text>
              <Text className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Want to Read</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}