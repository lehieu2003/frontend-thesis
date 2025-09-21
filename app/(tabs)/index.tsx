import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
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
  const styles = getStyles(isDark);

  const renderBookCard = ({ item }: { item: typeof personalizedBooks[0] }) => (
    <TouchableOpacity style={styles.bookCard}>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.name || 'Reader'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#3B82F6', '#8B5CF6', '#6366F1']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Discover Your Next{'\n'}
              <Text style={styles.heroHighlight}>Great Read</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Get personalized book recommendations powered by AI
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Start Exploring</Text>
              <Ionicons name="chevron-forward" size={20} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Recommended for You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="sparkles" size={24} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Recommended for You</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={personalizedBooks}
            renderItem={renderBookCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
          />
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="trending-up" size={24} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Trending Now</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={personalizedBooks}
            renderItem={renderBookCard}
            keyExtractor={(item) => `trending-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
          />
        </View>

        {/* Reading Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Your Reading Journey</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Books Read</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Currently Reading</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Want to Read</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  profileButton: {
    padding: 4,
  },
  heroSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  heroHighlight: {
    color: '#FDE68A',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#6366F1',
    fontWeight: '600',
    marginRight: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginLeft: 8,
  },
  viewAllText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  booksList: {
    paddingLeft: 20,
  },
  bookCard: {
    width: 140,
    marginRight: 16,
  },
  bookCover: {
    width: 140,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  bookAuthor: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginLeft: 4,
  },
  statsSection: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
    textAlign: 'center',
  },
});