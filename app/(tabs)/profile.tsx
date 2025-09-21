import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
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
  const styles = getStyles(isDark);

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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || 'Book Lover'}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.joinDate}>Joined {stats.joinDate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Reading Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Reading Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.booksRead}</Text>
              <Text style={styles.statLabel}>Books Read</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.currentlyReading}</Text>
              <Text style={styles.statLabel}>Currently Reading</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.wantToRead}</Text>
              <Text style={styles.statLabel}>Want to Read</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.averageRating}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>

          {/* Reading Goal Progress */}
          <View style={styles.goalContainer}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>2024 Reading Goal</Text>
              <Text style={styles.goalProgress}>{stats.booksRead}/24 books</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(stats.booksRead / 24) * 100}%` }]} />
            </View>
            <Text style={styles.goalPercentage}>
              {Math.round((stats.booksRead / 24) * 100)}% complete
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme Toggle */}
        <View style={styles.themeContainer}>
          <View style={styles.themeItem}>
            <View style={styles.themeLeft}>
              <View style={styles.themeIcon}>
                <Ionicons 
                  name={isDark ? "moon" : "sunny"} 
                  size={20} 
                  color={isDark ? "#F59E0B" : "#6B7280"} 
                />
              </View>
              <View>
                <Text style={styles.themeLabel}>Theme</Text>
                <Text style={styles.themeSubtitle}>
                  Currently using {isDark ? 'dark' : 'light'} theme
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
              <Text style={styles.themeButtonText}>
                Switch to {isDark ? 'Light' : 'Dark'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    paddingVertical: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
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
  goalContainer: {
    backgroundColor: isDark ? '#111827' : '#F3F4F6',
    borderRadius: 12,
    padding: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  goalProgress: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: isDark ? '#374151' : '#E5E7EB',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  goalPercentage: {
    fontSize: 10,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  menuContainer: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#374151' : '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  themeContainer: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: isDark ? '#374151' : '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: isDark ? '#FFFFFF' : '#1F2937',
    marginBottom: 2,
  },
  themeSubtitle: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  themeButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  themeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
});