import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Plus,
  MessageSquare,
  Edit2,
  Trash2,
  Menu,
  X,
  Clock,
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatBot: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Book Recommendations',
      messages: [
        {
          id: '1',
          type: 'bot',
          content:
            "Hello! I'm your AI book assistant. I can help you discover new books, answer questions about literature, or recommend titles based on your preferences. What would you like to explore today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [activeSessionId, setActiveSessionId] = useState('1');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: Date.now().toString(),
          type: 'bot',
          content:
            "Hello! I'm ready to help you discover amazing books. What are you looking for today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length === 1) return; // Don't delete the last session

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));

    if (activeSessionId === sessionId) {
      const remainingSessions = sessions.filter((s) => s.id !== sessionId);
      setActiveSessionId(remainingSessions[0]?.id || '');
    }
  };

  const startEditingSession = (sessionId: string, currentTitle: string) => {
    setEditingSessionId(sessionId);
    setEditingTitle(currentTitle);
  };

  const saveSessionTitle = () => {
    if (editingSessionId && editingTitle.trim()) {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === editingSessionId
            ? { ...session, title: editingTitle.trim(), updatedAt: new Date() }
            : session
        )
      );
    }
    setEditingSessionId(null);
    setEditingTitle('');
  };

  const cancelEditingSession = () => {
    setEditingSessionId(null);
    setEditingTitle('');
  };

  const handleSend = async () => {
    if (!input.trim() || !activeSession) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Update the active session with the new message
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, userMessage],
              updatedAt: new Date(),
              title:
                session.messages.length === 1
                  ? input.slice(0, 30) + (input.length > 30 ? '...' : '')
                  : session.title,
            }
          : session
      )
    );

    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(input),
        books:
          input.toLowerCase().includes('recommend') ||
          input.toLowerCase().includes('suggest')
            ? [
                {
                  id: '1',
                  title: 'The Seven Husbands of Evelyn Hugo',
                  author: 'Taylor Jenkins Reid',
                  isbn: '9781501161933',
                  description:
                    'A captivating novel about a reclusive Hollywood icon who decides to tell her story to an unknown journalist.',
                  coverUrl:
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
                  rating: 4.5,
                  genre: ['Fiction', 'Romance'],
                  language: 'English',
                  publishedYear: 2017,
                  source: 'local',
                },
                {
                  id: '2',
                  title: 'Educated',
                  author: 'Tara Westover',
                  isbn: '9780399590504',
                  description:
                    'A memoir about a young girl who grows up in a survivalist family and eventually earns a PhD from Cambridge.',
                  coverUrl:
                    'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
                  rating: 4.4,
                  genre: ['Memoir', 'Education'],
                  language: 'English',
                  publishedYear: 2018,
                  source: 'external',
                },
              ]
            : undefined,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: [...session.messages, botResponse],
                updatedAt: new Date(),
              }
            : session
        )
      );

      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('recommend') || input.includes('suggest')) {
      return `Based on your reading preferences and history, I've found some great books that might interest you! Here are my recommendations:`;
    }

    if (input.includes('fiction')) {
      return 'Fiction is a wonderful genre! I can recommend some contemporary fiction, literary fiction, or specific subgenres. What type of fiction mood are you in?';
    }

    if (input.includes('mystery') || input.includes('thriller')) {
      return 'Great choice! Mystery and thriller books are perfect for keeping you on the edge of your seat. Are you looking for psychological thrillers, cozy mysteries, or crime novels?';
    }

    return `That's an interesting question about books! I'd love to help you discover something new. Could you tell me more about what genres you enjoy or what you're in the mood for? I can provide personalized recommendations based on your preferences.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className='flex h-[calc(100vh-100px)] bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <button
            onClick={createNewSession}
            className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105'
          >
            <Plus className='w-4 h-4 mr-2' />
            New Chat
          </button>
        </div>

        {/* Session List */}
        <div className='flex-1 overflow-y-auto'>
          <div className='p-2 space-y-1'>
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                  activeSessionId === session.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSessionId(session.id)}
              >
                {editingSessionId === session.id ? (
                  <div className='flex items-center space-x-2'>
                    <input
                      type='text'
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={saveSessionTitle}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && saveSessionTitle()
                      }
                      onKeyDown={(e) =>
                        e.key === 'Escape' && cancelEditingSession()
                      }
                      className='flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      autoFocus
                    />
                  </div>
                ) : (
                  <>
                    <div className='flex items-start space-x-3'>
                      <MessageSquare className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                          {session.title}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                          {formatDate(session.updatedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Session Actions */}
                    <div className='absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingSession(session.id, session.title);
                        }}
                        className='p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded'
                      >
                        <Edit2 className='w-3 h-3' />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className='p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded'
                        disabled={sessions.length === 1}
                      >
                        <Trash2 className='w-3 h-3' />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className='flex-1 flex flex-col'>
        {/* Chat Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800'>
          <div className='flex items-center space-x-3'>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden'
            >
              {isSidebarOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </button>
            <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
              <Bot className='w-5 h-5 text-white' />
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                AI Book Assistant
              </h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {activeSession?.title || 'BookHive AI'}
              </p>
            </div>
          </div>
          <div className='flex items-center text-emerald-500'>
            <div className='w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse'></div>
            <span className='text-xs'>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-3xl ${
                  message.type === 'user'
                    ? 'flex-row-reverse space-x-reverse'
                    : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-blue-500'
                      : 'bg-gradient-to-r from-purple-500 to-blue-600'
                  }`}
                >
                  {message.type === 'user' ? (
                    user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt='User'
                        className='w-8 h-8 rounded-full object-cover'
                      />
                    ) : (
                      <User className='w-4 h-4 text-white' />
                    )
                  ) : (
                    <Bot className='w-4 h-4 text-white' />
                  )}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className='text-sm whitespace-pre-wrap'>
                    {message.content}
                  </p>

                  {/* Book recommendations */}
                  {message.books && message.books.length > 0 && (
                    <div className='mt-4 space-y-3'>
                      {message.books.map((book) => (
                        <div
                          key={book.id}
                          className='flex bg-white dark:bg-gray-700 rounded-lg p-3 space-x-3'
                        >
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className='w-16 h-20 object-cover rounded'
                          />
                          <div className='flex-1'>
                            <h4 className='font-medium text-gray-900 dark:text-white text-sm'>
                              {book.title}
                            </h4>
                            <p className='text-xs text-gray-600 dark:text-gray-400'>
                              by {book.author}
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2'>
                              {book.description}
                            </p>
                            <div className='flex space-x-2 mt-2'>
                              <button className='px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors'>
                                Add to List
                              </button>
                              <button className='px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors'>
                                Favorite
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className='flex items-center justify-between mt-2'>
                    <span className='text-xs opacity-70 flex items-center'>
                      <Clock className='w-3 h-3 mr-1' />
                      {formatTime(message.timestamp)}
                    </span>

                    {message.type === 'bot' && (
                      <div className='flex items-center space-x-2'>
                        <button className='text-gray-400 hover:text-green-500 transition-colors'>
                          <ThumbsUp className='w-4 h-4' />
                        </button>
                        <button className='text-gray-400 hover:text-red-500 transition-colors'>
                          <ThumbsDown className='w-4 h-4' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className='flex justify-start'>
              <div className='flex items-start space-x-3'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center'>
                  <Bot className='w-4 h-4 text-white' />
                </div>
                <div className='bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className='border-t border-gray-200 dark:border-gray-700 p-4'>
          <div className='flex items-end space-x-3'>
            <div className='flex-1 relative'>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Ask me anything about books...'
                className='w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none'
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className='absolute right-3 bottom-3 text-xs text-gray-400'>
                Press Enter to send
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all transform hover:scale-105'
            >
              <Send className='w-5 h-5' />
            </button>
          </div>
          <div className='flex items-center justify-center mt-2 text-xs text-gray-500 dark:text-gray-400'>
            <Sparkles className='w-3 h-3 mr-1' />
            Powered by advanced AI • Book recommendations • Literature insights
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
