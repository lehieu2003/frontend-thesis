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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { isDark } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6', '#6366F1']}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
          <View className="items-center mb-10">
            <View className="w-16 h-16 rounded-full bg-white/20 justify-center items-center mb-4">
              <Ionicons name="book" size={32} color="white" />
            </View>
            <Text className="text-3xl font-bold text-white mb-2">Welcome back</Text>
            <Text className="text-base text-white/80">Sign in to your account</Text>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-4 py-3">
              <Ionicons name="mail" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-4 py-3">
              <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
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

            <TouchableOpacity
              className="bg-blue-500 rounded-xl py-4 items-center mt-2 mb-6"
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white text-base font-semibold">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center items-center">
              <Text className="text-gray-500 text-sm">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-blue-500 text-sm font-semibold">Sign up</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-center text-gray-400 text-xs mt-4">
              Demo: Use any email/password combination
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}