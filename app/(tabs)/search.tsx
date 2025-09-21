import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

// Mock data
const searchResults = [
  {
    id: '1',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    rating: 4.5,
    genre: ['Fiction', 'Romance'],
  },
  {
    id: '2',
    title: 'Educated',
    author: 'Tara Westover',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
    rating: 4.4,
    genre: ['Memoir', 'Biography'],
  },
];

const trendingSearches = ['Science Fiction', 'Self-Help', 'Mystery Thriller', 'Romance', 'Biography'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme();

  const renderBookItem = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity className={`flex-row ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-3 shadow-sm`}>
      <Image source={{ uri: item.coverUrl }} className="w-15 h-20 rounded-lg mr-4" />
      <View className="flex-1">
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
      <TouchableOpacity className="p-2">
        <Ionicons name="heart-outline" size={20} color="#6B7280" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className="px-5 py-4">
        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Search & Explore</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 mb-6">
        <View className={`flex-row items-center ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl px-4 py-3 shadow-sm`}>
          <Ionicons name="search" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            className={`flex-1 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
            placeholder="Search for books, authors, or genres..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Searches */}
        <View className="mb-8 px-5">
          <View className="flex-row items-center mb-4">
            <Ionicons name="trending-up" size={20} color="#F59E0B" />
            <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} ml-2`}>Trending Searches</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {trendingSearches.map((search) => (
              <TouchableOpacity
                key={search}
                className="bg-yellow-100 px-3 py-1.5 rounded-full"
                onPress={() => setSearchQuery(search)}
              >
                <Text className="text-yellow-800 text-xs font-medium">{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Results */}
        <View className="px-5 mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Search Results ({searchResults.length} books found)
          </Text>
          <FlatList
            data={searchResults}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between px-5 mb-8">
          <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 items-center flex-1 mx-1 shadow-sm`}>
            <Ionicons name="book" size={24} color="#3B82F6" />
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-2 mb-1`}>12,450</Text>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>Total Books</Text>
          </View>
          <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 items-center flex-1 mx-1 shadow-sm`}>
            <Ionicons name="star" size={24} color="#8B5CF6" />
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-2 mb-1`}>4.2</Text>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>Avg Rating</Text>
          </View>
          <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 items-center flex-1 mx-1 shadow-sm`}>
            <Ionicons name="trophy" size={24} color="#10B981" />
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-2 mb-1`}>156</Text>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>New This Week</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}