import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Bot, User, Heart, Star, Award, AlertTriangle, Zap, Target, BookOpen, Calendar, TrendingUp, Coffee, Brain, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Enhanced chatbot service with more responses
class EnhancedChatbotService {
  constructor(language, studentData) {
    this.language = language;
    this.studentData = studentData;
    this.conversationHistory = [];
    this.emotionalState = 'supportive';
    this.context = {
      lastTopic: null,
      userMood: 'neutral',
      sessionGoals: [],
      achievements: []
    };

    // Comprehensive response patterns
    this.responses = {
      greetings: [
        "Hello! Ready to tackle today's challenges together? 🌟",
        "Hey there! I'm excited to help you succeed today! 💪",
        "Hi! Let's make today amazing - what's on your mind? ✨",
        "Welcome back! I've been thinking about your progress - you're doing great! 🎯"
      ],
      
      feelings: {
        good: [
          "That's wonderful! When we feel good, it's the perfect time to build momentum. What subject would you like to focus on? 📚",
          "I love hearing that! Your positive energy is contagious. How can we channel this into your studies? 🚀",
          "Fantastic! Good vibes lead to great results. What achievement are you most proud of recently? 🌟"
        ],
        stressed: [
          "I understand stress can be overwhelming. Take a deep breath with me - in for 4, hold for 4, out for 4. Better? Let's break down what's stressing you. 🧘‍♀️",
          "Stress is normal, especially when you care about your success! What specific subject or assignment is weighing on you? I'm here to help! 💙",
          "Feeling stressed shows you care about doing well. Let's turn that stress into productive action. What's your biggest concern right now? 🤝"
        ],
        motivated: [
          "YES! I can feel your determination through the screen! This energy is exactly what leads to breakthrough moments. What goal should we tackle first? 🔥",
          "Your motivation is inspiring! When you're fired up like this, you can accomplish anything. Let's make a plan to maximize this momentum! ⚡",
          "I LOVE this energy! Motivation like yours is rare and powerful. What's the biggest challenge you want to conquer today? 🏆"
        ],
        tired: [
          "Rest is just as important as study time. Are you getting enough sleep? Sometimes a 10-minute break can recharge us more than forcing through fatigue. ☕",
          "Feeling tired might mean you're working hard! But let's make sure you're working smart too. When did you last take a proper break? 😴",
          "Your brain needs rest to consolidate learning. How about we plan some energizing activities alongside your studies? 🌱"
        ]
      },

      academic: {
        math: [
          "Math is like a puzzle - each problem teaches you a new solving strategy! What specific math topic are you working on? 🧮",
          "Numbers are everywhere! Math builds logical thinking that helps in all subjects. Show me what you're stuck on! 📐",
          "Math anxiety is real, but so is math success! Let's break down complex problems into bite-sized pieces. What's challenging you? 🎯"
        ],
        science: [
          "Science is about curiosity and discovery! Every experiment teaches us something new about our world. What are you exploring? 🔬",
          "Science connects everything - from the stars to the cells in your body! What scientific concept has you curious? 🌌",
          "The best scientists ask 'what if?' and 'why?' Let's channel that curiosity into your studies! What's your current topic? 🧪"
        ],
        english: [
          "Words have power! Every book you read and essay you write makes you a better communicator. What are you reading? 📖",
          "Language arts develops critical thinking and creativity. Are you working on writing, reading, or literature analysis? ✍️",
          "Stories shape how we understand the world. What literary work is capturing your attention right now? 📚"
        ],
        history: [
          "History teaches us that every challenge has been faced before - and overcome! What period are you studying? 🏛️",
          "The past informs the present. Understanding history helps you become a thoughtful citizen. What era fascinates you? ⏳",
          "History is full of inspiring stories of perseverance - just like your educational journey! What's your current focus? 🗺️"
        ]
      },

      motivation: [
        "Remember: every expert was once a beginner. You're building expertise with each study session! 💎",
        "Your attendance has improved by 12% this month - that's real progress! Small steps lead to big changes. 📈",
        "I believe in your potential. Even when assignments feel hard, you're developing resilience and problem-solving skills. 🌟",
        "You've already overcome challenges that once seemed impossible. This is just another mountain to climb! ⛰️",
        "Your brain grows stronger with each challenge. Difficult doesn't mean impossible - it means you're learning! 🧠",
        "Progress isn't always linear. Some days are harder than others, and that's completely normal. Keep going! 💪"
      ],

      study_tips: [
        "Try the Pomodoro Technique: 25 minutes of focused study, 5-minute break. It works wonders! 🍅",
        "Create a study environment that energizes you - good lighting, minimal distractions, maybe some background music? 🎵",
        "Teaching someone else (even an imaginary student) is one of the best ways to reinforce your learning! 🎓",
        "Mix up your study methods - visual notes, audio recordings, practice quizzes. Different approaches strengthen memory! 🎨",
        "Connect new information to things you already know. Your brain loves making connections! 🔗",
        "Don't forget to celebrate small wins. Finished a chapter? That deserves recognition! 🎉"
      ],

      encouragement: [
        "You're stronger than you think and more capable than you know. Trust the process! 🌱",
        "Every challenge you face now is building the skills you'll use for life. You're investing in yourself! 💰",
        "I see your dedication, and it's impressive. Not everyone has your commitment to growth! 👑",
        "Setbacks are setups for comebacks. You've got this! 🔄",
        "Your future self will thank you for the effort you're putting in today. Keep going! ⏰",
        "Believe in yourself as much as I believe in you - and I believe in you completely! ❤️"
      ],

      help_resources: [
        "Need extra help? Try Khan Academy for step-by-step explanations, or form a study group with classmates! 👥",
        "Your teachers want you to succeed - don't hesitate to ask questions during office hours! 🙋‍♀️",
        "Online resources like Coursera and edX offer free courses that can supplement your learning! 💻",
        "Sometimes explaining your confusion out loud (even to me!) helps clarify your thoughts! 💭",
        "Break big projects into smaller tasks. It's less overwhelming and more manageable! 📋"
      ],

      time_management: [
        "Time blocking is magic! Assign specific time slots for different subjects. It creates structure and reduces decision fatigue! ⏰",
        "Priority matrix: Urgent+Important first, then Important but not Urgent. This keeps you focused on what matters! 📊",
        "Buffer time is your friend - always add 15-20% extra time to your estimates. It reduces stress! ⏳",
        "Sunday planning sessions can set you up for a successful week. 15 minutes of planning saves hours of confusion! 📅"
      ]
    };

    // Context-aware response triggers
    this.triggers = {
      attendance: /attendance|absent|skip|miss|class/i,
      grades: /grade|test|exam|quiz|score|mark/i,
      stress: /stress|anxious|worry|overwhelm|panic/i,
      motivation: /motivated|excited|ready|determined|goal/i,
      tired: /tired|exhausted|sleep|fatigue|energy/i,
      help: /help|stuck|confused|don't understand|difficult/i,
      subjects: {
        math: /math|algebra|geometry|calculus|statistics|equation/i,
        science: /science|biology|chemistry|physics|lab|experiment/i,
        english: /english|writing|essay|literature|reading|book/i,
        history: /history|social studies|government|politics/i
      },
      time: /time|schedule|deadline|manage|organize|plan/i,
      study: /study|learn|review|homework|assignment/i
    };
  }

  generateResponse(input, context = {}) {
    const lowerInput = input.toLowerCase();
    this.updateContext(lowerInput);

    // Greeting responses
    if (this.isGreeting(lowerInput)) {
      return this.formatResponse(this.getRandomResponse(this.responses.greetings), {
        gamification: { points: 5, message: "Daily check-in bonus! +5 pts 🎯" }
      });
    }

    // Feeling-based responses
    const feeling = this.detectFeeling(lowerInput);
    if (feeling && this.responses.feelings[feeling]) {
      this.context.userMood = feeling;
      const response = this.getRandomResponse(this.responses.feelings[feeling]);
      return this.formatResponse(response, {
        suggestions: this.getSuggestionsForFeeling(feeling),
        gamification: feeling === 'motivated' ? { points: 10, message: "Motivation boost! +10 pts 🔥" } : null
      });
    }

    // Subject-specific responses
    for (const [subject, pattern] of Object.entries(this.triggers.subjects)) {
      if (pattern.test(lowerInput)) {
        const response = this.getRandomResponse(this.responses.academic[subject]);
        return this.formatResponse(response, {
          suggestions: [`Tell me more about ${subject}`, 'I need study tips', 'Help me understand'],
          gamification: { points: 8, message: `Subject focus bonus! +8 pts 📚` }
        });
      }
    }

    // Help requests
    if (this.triggers.help.test(lowerInput)) {
      const response = this.getRandomResponse(this.responses.help_resources);
      return this.formatResponse(response, {
        suggestions: ['Show me study techniques', 'I need motivation', 'Time management tips'],
        gamification: { points: 5, message: "Asking for help shows wisdom! +5 pts 🤝" }
      });
    }

    // Time management
    if (this.triggers.time.test(lowerInput)) {
      const response = this.getRandomResponse(this.responses.time_management);
      return this.formatResponse(response, {
        suggestions: ['More time tips', 'Help with planning', 'Study schedule'],
        gamification: { points: 12, message: "Time management skill! +12 pts ⏰" }
      });
    }

    // Study-related
    if (this.triggers.study.test(lowerInput)) {
      const response = this.getRandomResponse(this.responses.study_tips);
      return this.formatResponse(response, {
        suggestions: ['More study tips', 'Motivation please', 'Help me focus']
      });
    }

    // Grade/attendance concerns
    if (this.triggers.attendance.test(lowerInput) || this.triggers.grades.test(lowerInput)) {
      return this.formatResponse(
        "I understand your concerns about academic performance. Remember, every small improvement counts! Your recent progress shows you're capable of positive change. What specific area would you like to focus on improving?",
        {
          suggestions: ['Study strategies', 'Time management', 'Stress management', 'Goal setting'],
          gamification: { points: 7, message: "Self-reflection is growth! +7 pts 🎯" }
        }
      );
    }

    // Default intelligent responses based on context
    const contextualResponses = [
      `That's interesting! Based on our conversation, I think you might benefit from ${this.getContextualSuggestion()}. What do you think?`,
      `I hear you! Given your current ${this.context.userMood} mood, let's focus on ${this.getMoodBasedActivity()}. Sound good?`,
      `Thanks for sharing that with me! Your openness helps me support you better. What would be most helpful right now?`,
      `I appreciate you talking with me about this. Every conversation helps me understand how to support you better. What's your next priority?`
    ];

    const response = this.getRandomResponse([
      ...contextualResponses,
      ...this.responses.encouragement,
      ...this.responses.motivation
    ]);

    return this.formatResponse(response, {
      suggestions: ['Tell me more', 'I need help', 'Study tips', 'Motivation boost'],
      gamification: { points: 3, message: "Great conversation! +3 pts 💬" }
    });
  }

  updateContext(input) {
    // Update conversation context
    if (this.triggers.stress.test(input)) this.context.userMood = 'stressed';
    if (this.triggers.motivation.test(input)) this.context.userMood = 'motivated';
    if (this.triggers.tired.test(input)) this.context.userMood = 'tired';
  }

  detectFeeling(input) {
    if (/good|great|awesome|happy|excellent|fantastic|wonderful/i.test(input)) return 'good';
    if (/stress|anxious|worry|nervous|overwhelm/i.test(input)) return 'stressed';
    if (/motivated|excited|ready|determined|pumped|energized/i.test(input)) return 'motivated';
    if (/tired|exhausted|sleepy|drained|fatigue/i.test(input)) return 'tired';
    return null;
  }

  isGreeting(input) {
    return /^(hi|hello|hey|good morning|good afternoon|good evening|what's up|sup)/i.test(input);
  }

  getSuggestionsForFeeling(feeling) {
    const suggestions = {
      good: ['Let\'s study!', 'Set a goal', 'Review progress'],
      stressed: ['Breathing exercise', 'Break it down', 'Take a break'],
      motivated: ['Make a plan', 'Challenge yourself', 'Set big goals'],
      tired: ['Rest tips', 'Energy boost', 'Schedule break']
    };
    return suggestions[feeling] || ['Tell me more', 'I need help'];
  }

  getContextualSuggestion() {
    const suggestions = [
      'breaking down your tasks into smaller, manageable pieces',
      'trying a new study technique like mind mapping',
      'setting up a reward system for completing assignments',
      'creating a distraction-free study environment',
      'connecting with a study buddy for accountability'
    ];
    return this.getRandomResponse(suggestions);
  }

  getMoodBasedActivity() {
    const activities = {
      stressed: 'some relaxation and planning techniques',
      motivated: 'setting challenging but achievable goals',
      tired: 'energy management and rest strategies',
      neutral: 'building positive study habits'
    };
    return activities[this.context.userMood] || activities.neutral;
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  formatResponse(content, options = {}) {
    return {
      content,
      suggestions: options.suggestions || [],
      gamification: options.gamification,
      priority: options.priority || 'normal'
    };
  }

  addToHistory(userInput, response) {
    this.conversationHistory.push({ userInput, response, timestamp: new Date() });
    // Keep only last 10 exchanges for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
  }
}

const StudentChatbot = () => {
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadAlert, setHasUnreadAlert] = useState(true);
  const [chatbotService, setChatbotService] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Student progress data (mock)
  const studentData = {
    riskLevel: 'medium',
    attendance: 78,
    recentGrades: [75, 82, 68, 79],
    streakDays: 5,
    points: 450,
    level: 3,
    achievements: ['Attendance Improver', 'Math Progress', 'Active Participant']
  };

  // Initialize enhanced chatbot service
  useEffect(() => {
    const service = new EnhancedChatbotService(currentLanguage, studentData);
    setChatbotService(service);
  }, [currentLanguage]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && chatbotService) {
      const welcomeMessages = [
        {
          id: 1,
          type: 'bot',
          content: `Hi ${user?.name}! 👋 I'm Vidya, your personal AI study buddy! I'm here to support you, celebrate your wins, and help you stay on track with your studies.`,
          timestamp: new Date(),
          mood: 'happy'
        },
        {
          id: 2,
          type: 'bot',
          content: `I can help you with study strategies, motivation, time management, subject-specific questions, and more! How are you feeling about your studies today?`,
          timestamp: new Date(),
          suggestions: ['I feel good!', 'I\'m stressed', 'I\'m motivated', 'I need help'],
          gamification: {
            points: 10,
            message: 'Welcome bonus! +10 points 🎉'
          }
        }
      ];

      // Add risk alert if needed
      if (studentData.riskLevel !== 'low') {
        welcomeMessages.push({
          id: 3,
          type: 'bot',
          content: `I noticed your attendance has been at ${studentData.attendance}%. Don't worry - I'm here to help you get back on track! 💪 Every step forward counts, and I believe in your potential!`,
          timestamp: new Date(),
          isAlert: true,
          suggestions: ['Help me improve', 'Study tips please', 'I want to do better', 'Time management help']
        });
      }

      setMessages(welcomeMessages);
    }
  }, [chatbotService, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatbotService) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate realistic AI thinking time
    setTimeout(() => {
      const response = chatbotService.generateResponse(currentInput, { studentData });
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        mood: chatbotService.emotionalState,
        gamification: response.gamification,
        suggestions: response.suggestions,
        isAlert: response.priority === 'critical'
      };

      // Add to conversation history
      chatbotService.addToHistory(currentInput, response);

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1500); // More realistic timing
  };

  const handleQuickResponse = (suggestion) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Risk alert notification
  const RiskAlert = () => (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-t-lg">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-medium">Attention Needed</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center ${
            hasUnreadAlert ? 'animate-pulse' : ''
          }`}
        >
          <MessageCircle className="h-7 w-7" />
          {hasUnreadAlert && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">!</span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-fade-in max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]">
          {/* Risk Alert Header */}
          {studentData.riskLevel !== 'low' && <RiskAlert />}
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-base">Vidya AI</h3>
                  <div className="flex items-center space-x-11   ml-4">
                    <div className="flex items-center text-sm text-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      <span>Lvl {studentData.level}</span>
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {studentData.points} pts
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Your Study Buddy</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-gray-200 rounded"
              >
                <Minimize2 className="h-4 w-4 text-gray-500" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setHasUnreadAlert(false);
                }}
                className="p-1.5 hover:bg-gray-200 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.isAlert
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.gamification && (
                        <div className="mt-3 p-2 bg-yellow-100 rounded text-yellow-800 text-xs flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          {message.gamification.message}
                        </div>
                      )}
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickResponse(suggestion)}
                              className="block w-full text-left text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded transition-colors duration-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-500">Vidya is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about studying, goals, or how you're feeling..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Quick actions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { text: '😊 Feeling Good', icon: '😊' },
                    { text: '😔 Stressed Out', icon: '😔' },
                    { text: '💪 Super Motivated', icon: '💪' },
                    { text: '📚 Study Tips', icon: '📚' },
                    { text: '⏰ Time Management', icon: '⏰' },
                    { text: '❓ Need Help', icon: '❓' }
                  ].map((quick, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickResponse(quick.text.split(' ').slice(1).join(' '))}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded transition-colors duration-200"
                    >
                      {quick.text}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .fixed.bottom-24.right-6 {
            width: calc(100vw - 2rem);
            right: 1rem;
            left: 1rem;
            height: calc(100vh - 8rem);
          }
        }
      `}</style>
    </>
  );
};

export default StudentChatbot;