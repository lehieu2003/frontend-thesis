import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
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
  const styles = getStyles(isDark);

  const renderBookItem = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity style={styles.bookItem}>
      <Image source={{ uri: item.coverUrl }} style={styles.bookCover} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          by {item.author}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.genreContainer}>
          {item.genre.slice(0, 2).map((genre) => (
            <View key={genre} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={20} color="#6B7280" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search & Explore</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for books, authors, or genres..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up" size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Trending Searches</Text>
          </View>
          <View style={styles.trendingContainer}>
            {trendingSearches.map((search) => (
              <TouchableOpacity
                key={search}
                style={styles.trendingTag}
                onPress={() => setSearchQuery(search)}
              >
                <Text style={styles.trendingText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Results */}
        <View style={styles.section}>
          <Text style={styles.resultsTitle}>
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
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="book" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>12,450</Text>
            <Text style={styles.statLabel}>Total Books</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>4.2</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={24} color="#10B981" />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>New This Week</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#111827' : '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginLeft: 8,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendingTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  trendingText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '500',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 16,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginLeft: 4,
  },
  genreContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  genreTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genreText: {
    color: '#1D4ED8',
    fontSize: 10,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
    textAlign: 'center',
  },
});