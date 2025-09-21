import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const { isDark } = useTheme();

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again');
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#8B5CF6', '#3B82F6', '#6366F1']}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
          <View className="items-center mb-10">
            <View className="w-16 h-16 rounded-full bg-white/20 justify-center items-center mb-4">
              <Ionicons name="book" size={32} color="white" />
            </View>
            <Text className="text-3xl font-bold text-white mb-2">Create account</Text>
            <Text className="text-base text-white/80">Join our community of book lovers</Text>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-4 py-3">
              <Ionicons name="person" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-4 py-3">
              <Ionicons name="mail" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-4 py-3">
              <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-4 py-3">
              <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="bg-purple-500 rounded-xl py-4 items-center mt-2 mb-6"
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text className="text-white text-base font-semibold">
                {isLoading ? 'Creating account...' : 'Create account'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center items-center">
              <Text className="text-gray-500 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text className="text-purple-500 text-sm font-semibold">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}