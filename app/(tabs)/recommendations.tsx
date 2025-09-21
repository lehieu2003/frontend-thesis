import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

// Mock data
const personalizedBooks = [
  {
    id: '1',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    rating: 4.5,
    genre: ['Fiction', 'Romance'],
    reason: 'Based on your love for contemporary fiction',
    match: 95,
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
    rating: 4.6,
    genre: ['Science Fiction', 'Thriller'],
    reason: 'Similar to books you\'ve rated highly',
    match: 92,
  },
];

const categories = [
  { id: 'for-you', label: 'For You', icon: 'sparkles', count: 24 },
  { id: 'trending', label: 'Trending', icon: 'trending-up', count: 18 },
  { id: 'similar', label: 'Similar Reads', icon: 'heart', count: 12 },
  { id: 'genre-based', label: 'Your Genres', icon: 'book', count: 30 },
];

export default function RecommendationsScreen() {
  const [activeCategory, setActiveCategory] = useState('for-you');
  const { isDark } = useTheme();

  const renderBookCard = ({ item }: { item: typeof personalizedBooks[0] }) => (
    <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-4 shadow-sm`}>
      <Image source={{ uri: item.coverUrl }} className="w-full h-48 rounded-lg mb-3" />
      <View className="mb-3">
        <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`} numberOfLines={2}>
          {item.title}
        </Text>
        <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`} numberOfLines={1}>
          by {item.author}
        </Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-1`}>{item.rating}</Text>
        </View>
        <View className="flex-row gap-1.5">
          {item.genre.slice(0, 2).map((genre) => (
            <View key={genre} className="bg-blue-100 px-2 py-1 rounded-full">
              <Text className="text-blue-800 text-xs font-medium">{genre}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="bg-purple-50 rounded-lg p-3">
        <View className="flex-row items-start mb-2">
          <Ionicons name="sparkles" size={12} color="#8B5CF6" />
          <Text className="text-purple-700 text-xs ml-1.5 flex-1" numberOfLines={2}>
            {item.reason}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={12}
                color={i < 4 ? '#F59E0B' : '#E5E7EB'}
              />
            ))}
          </View>
          <Text className="text-gray-600 text-xs font-medium">{item.match}% match</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className="flex-row justify-between items-start px-5 py-4">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Ionicons name="sparkles" size={28} color="#8B5CF6" />
            <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} ml-3`}>For You</Text>
          </View>
          <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-5`}>
            Discover books tailored just for you, powered by AI
          </Text>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="refresh" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-5 gap-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className={`flex-row items-center px-4 py-2 rounded-full border ${
                    activeCategory === category.id
                      ? 'bg-purple-100 border-purple-500'
                      : isDark
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setActiveCategory(category.id)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={16}
                    color={
                      activeCategory === category.id
                        ? '#8B5CF6'
                        : isDark
                        ? '#9CA3AF'
                        : '#6B7280'
                    }
                  />
                  <Text
                    className={`text-sm font-medium ml-1.5 mr-2 ${
                      activeCategory === category.id
                        ? 'text-purple-700'
                        : isDark
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }`}
                  >
                    {category.label}
                  </Text>
                  <View className="bg-white/50 px-1.5 py-0.5 rounded-full">
                    <Text className="text-gray-600 text-xs font-semibold">{category.count}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* AI Insights */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-blue-50'} mx-5 rounded-xl p-4 mb-6`}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="sparkles" size={16} color="#8B5CF6" />
            <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'} ml-2`}>AI Insights</Text>
          </View>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-5`}>
            Based on your reading of <Text className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>24 books</Text> and preferences for{' '}
            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Fiction, Science Fiction, and Mystery</Text>, we've found books that match your taste for character-driven narratives.
          </Text>
        </View>

        {/* Recommendations */}
        <View className="px-5 mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            {categories.find(c => c.id === activeCategory)?.label} ({personalizedBooks.length} books)
          </Text>
          <FlatList
            data={personalizedBooks}
            renderItem={renderBookCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Reading Preferences */}
        <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} mx-5 rounded-xl p-5 mb-8 shadow-sm`}>
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Your Reading Preferences</Text>
          <View className="gap-4">
            <View className="mb-2">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Favorite Genres</Text>
              <View className="flex-row flex-wrap gap-1.5">
                {['Fiction', 'Science Fiction', 'Mystery', 'Romance'].map((genre) => (
                  <View key={genre} className="bg-blue-100 px-2 py-1 rounded-full">
                    <Text className="text-blue-800 text-xs font-medium">{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="mb-2">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Preferred Length</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Medium (200-400 pages)</Text>
            </View>
            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Reading Pace</Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>2-3 books per month</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}