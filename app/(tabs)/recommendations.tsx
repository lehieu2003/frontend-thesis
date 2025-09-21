import React, { useState } from 'react';
import {
  View,
  Text,
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
  const styles = getStyles(isDark);

  const renderBookCard = ({ item }: { item: typeof personalizedBooks[0] }) => (
    <View style={styles.bookCard}>
      <Image source={{ uri: item.coverUrl }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
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
      <View style={styles.recommendationInfo}>
        <View style={styles.reasonContainer}>
          <Ionicons name="sparkles" size={12} color="#8B5CF6" />
          <Text style={styles.reasonText} numberOfLines={2}>
            {item.reason}
          </Text>
        </View>
        <View style={styles.matchContainer}>
          <View style={styles.matchStars}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={12}
                color={i < 4 ? '#F59E0B' : '#E5E7EB'}
              />
            ))}
          </View>
          <Text style={styles.matchText}>{item.match}% match</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="sparkles" size={28} color="#8B5CF6" />
            <Text style={styles.headerTitle}>For You</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Discover books tailored just for you, powered by AI
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    activeCategory === category.id && styles.activeCategoryButton,
                  ]}
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
                    style={[
                      styles.categoryText,
                      activeCategory === category.id && styles.activeCategoryText,
                    ]}
                  >
                    {category.label}
                  </Text>
                  <View style={styles.categoryCount}>
                    <Text style={styles.categoryCountText}>{category.count}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* AI Insights */}
        <View style={styles.insightsContainer}>
          <View style={styles.insightsHeader}>
            <Ionicons name="sparkles" size={16} color="#8B5CF6" />
            <Text style={styles.insightsTitle}>AI Insights</Text>
          </View>
          <Text style={styles.insightsText}>
            Based on your reading of <Text style={styles.boldText}>24 books</Text> and preferences for{' '}
            <Text style={styles.boldText}>Fiction, Science Fiction, and Mystery</Text>, we've found books that match your taste for character-driven narratives.
          </Text>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>
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
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesTitle}>Your Reading Preferences</Text>
          <View style={styles.preferencesGrid}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Favorite Genres</Text>
              <View style={styles.genreList}>
                {['Fiction', 'Science Fiction', 'Mystery', 'Romance'].map((genre) => (
                  <View key={genre} style={styles.preferenceGenreTag}>
                    <Text style={styles.preferenceGenreText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Preferred Length</Text>
              <Text style={styles.preferenceValue}>Medium (200-400 pages)</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Reading Pace</Text>
              <Text style={styles.preferenceValue}>2-3 books per month</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: isDark ? '#9CA3AF' : '#6B7280',
    lineHeight: 22,
  },
  refreshButton: {
    padding: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isDark ? '#374151' : '#E5E7EB',
  },
  activeCategoryButton: {
    backgroundColor: '#F3E8FF',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginLeft: 6,
    marginRight: 8,
  },
  activeCategoryText: {
    color: '#8B5CF6',
  },
  categoryCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  insightsContainer: {
    backgroundColor: isDark ? '#1F2937' : '#F0F9FF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginLeft: 8,
  },
  insightsText: {
    fontSize: 14,
    color: isDark ? '#9CA3AF' : '#6B7280',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  recommendationsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 16,
  },
  bookCard: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookInfo: {
    marginBottom: 12,
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
  recommendationInfo: {
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    padding: 12,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 12,
    color: '#8B5CF6',
    marginLeft: 6,
    flex: 1,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchStars: {
    flexDirection: 'row',
    gap: 2,
  },
  matchText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  preferencesContainer: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  preferencesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 16,
  },
  preferencesGrid: {
    gap: 16,
  },
  preferenceItem: {
    marginBottom: 8,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 8,
  },
  preferenceValue: {
    fontSize: 14,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  preferenceGenreTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  preferenceGenreText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '500',
  },
});