import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatBotScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI book assistant. I can help you discover new books, answer questions about literature, or recommend titles based on your preferences. What would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { isDark } = useTheme();
  const { user } = useAuth();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Auto scroll to bottom when new messages are added
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(input),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('recommend') || input.includes('suggest')) {
      return `Based on your reading preferences and history, I'd recommend checking out some contemporary fiction or science fiction titles. What genres are you most interested in right now?`;
    }

    if (input.includes('fiction')) {
      return 'Fiction is a wonderful genre! I can recommend some contemporary fiction, literary fiction, or specific subgenres. What type of fiction mood are you in?';
    }

    if (input.includes('mystery') || input.includes('thriller')) {
      return 'Great choice! Mystery and thriller books are perfect for keeping you on the edge of your seat. Are you looking for psychological thrillers, cozy mysteries, or crime novels?';
    }

    return `That's an interesting question about books! I'd love to help you discover something new. Could you tell me more about what genres you enjoy or what you're in the mood for? I can provide personalized recommendations based on your preferences.`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View className={`px-5 mb-4 ${item.type === 'user' ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${
        item.type === 'user' 
          ? 'bg-blue-500 rounded-br-sm' 
          : isDark 
          ? 'bg-gray-800 rounded-bl-sm shadow-sm' 
          : 'bg-white rounded-bl-sm shadow-sm'
      }`}>
        <Text className={`text-base leading-5 mb-1 ${
          item.type === 'user' 
            ? 'text-white' 
            : isDark 
            ? 'text-white' 
            : 'text-gray-900'
        }`}>
          {item.content}
        </Text>
        <Text className={`text-xs opacity-70 ${
          item.type === 'user' 
            ? 'text-white text-right' 
            : isDark 
            ? 'text-gray-400' 
            : 'text-gray-600'
        }`}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View className="px-5 mb-4 items-start">
      <View className={`px-4 py-3 rounded-2xl rounded-bl-sm ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <View className="flex-row items-center py-2">
          <View className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'} opacity-40 mr-1`} />
          <View className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'} opacity-40 mr-1`} />
          <View className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-600'} opacity-40`} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className={`flex-row justify-between items-center px-5 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-blue-500 justify-center items-center mr-3">
            <Ionicons name="chatbubble-ellipses" size={20} color="white" />
          </View>
          <View>
            <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Book Assistant</Text>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>BookHive AI</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
          <Text className="text-green-500 text-xs font-medium">Online</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} px-5 py-4`}
      >
        <View className="flex-row items-end mb-2">
          <TextInput
            className={`flex-1 border ${isDark ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-gray-50 text-gray-900'} rounded-2xl px-4 py-3 mr-3 max-h-24 text-base`}
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything about books..."
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            className={`w-10 h-10 rounded-full bg-blue-500 justify-center items-center ${(!input.trim() || isTyping) ? 'opacity-50' : ''}`}
            onPress={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center">
          <Ionicons name="sparkles" size={12} color="#8B5CF6" />
          <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-1`}>
            Powered by advanced AI • Book recommendations • Literature insights
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}