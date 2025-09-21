import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
  const styles = getStyles(isDark);

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
    <View style={[
      styles.messageContainer,
      item.type === 'user' ? styles.userMessageContainer : styles.botMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        item.type === 'user' ? styles.userMessage : styles.botMessage
      ]}>
        <Text style={[
          styles.messageText,
          item.type === 'user' ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.content}
        </Text>
        <Text style={[
          styles.timestamp,
          item.type === 'user' ? styles.userTimestamp : styles.botTimestamp
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={styles.botMessageContainer}>
      <View style={[styles.messageBubble, styles.botMessage]}>
        <View style={styles.typingIndicator}>
          <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
          <View style={[styles.typingDot, { animationDelay: '150ms' }]} />
          <View style={[styles.typingDot, { animationDelay: '300ms' }]} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.botAvatar}>
            <Ionicons name="chatbubble-ellipses" size={20} color="white" />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Book Assistant</Text>
            <Text style={styles.headerSubtitle}>BookHive AI</Text>
          </View>
        </View>
        <View style={styles.onlineIndicator}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything about books..."
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputFooter}>
          <Ionicons name="sparkles" size={12} color="#8B5CF6" />
          <Text style={styles.inputFooterText}>
            Powered by advanced AI • Book recommendations • Literature insights
          </Text>
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#374151' : '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: isDark ? '#FFFFFF' : '#1F2937',
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7,
  },
  userTimestamp: {
    color: 'white',
    textAlign: 'right',
  },
  botTimestamp: {
    color: isDark ? '#9CA3AF' : '#6B7280',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: isDark ? '#9CA3AF' : '#6B7280',
    marginHorizontal: 2,
    opacity: 0.4,
  },
  inputContainer: {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: isDark ? '#374151' : '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: isDark ? '#374151' : '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: isDark ? '#FFFFFF' : '#1F2937',
    backgroundColor: isDark ? '#111827' : '#F9FAFB',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  inputFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFooterText: {
    fontSize: 10,
    color: isDark ? '#9CA3AF' : '#6B7280',
    marginLeft: 4,
  },
});