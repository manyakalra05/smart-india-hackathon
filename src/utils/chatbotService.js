// Chatbot Service for AI-powered student support
export class ChatbotService {
  constructor(language = 'en', studentData = {}) {
    this.language = language;
    this.studentData = studentData;
    this.conversationHistory = [];
    this.emotionalState = 'neutral';
    this.supportLevel = this.calculateSupportLevel();
  }

  calculateSupportLevel() {
    const { riskLevel, attendance, recentGrades } = this.studentData;
    if (riskLevel === 'high' || attendance < 70) return 'high';
    if (riskLevel === 'medium' || attendance < 80) return 'medium';
    return 'low';
  }

  // Emotional Intelligence - Detect student's emotional state
  detectEmotion(text) {
    const emotionalKeywords = {
      sad: ['sad', 'down', 'depressed', 'upset', 'crying', 'hurt', 'disappointed'],
      stressed: ['stressed', 'overwhelmed', 'pressure', 'anxiety', 'worried', 'tense', 'panicked'],
      angry: ['angry', 'mad', 'frustrated', 'annoyed', 'furious', 'irritated', 'hate'],
      happy: ['happy', 'good', 'great', 'amazing', 'excited', 'joy', 'wonderful', 'fantastic'],
      tired: ['tired', 'exhausted', 'sleepy', 'drained', 'weary', 'fatigue'],
      confident: ['confident', 'ready', 'strong', 'motivated', 'determined', 'capable'],
      confused: ['confused', 'lost', 'stuck', 'don\'t understand', 'difficult', 'hard']
    };

    const lowerText = text.toLowerCase();
    for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        this.emotionalState = emotion;
        return emotion;
      }
    }
    return 'neutral';
  }

  // Generate contextual responses based on student needs
  generateResponse(userInput, context = {}) {
    const emotion = this.detectEmotion(userInput);
    const lowerInput = userInput.toLowerCase();

    // Emergency support detection
    if (this.isEmergencySupport(lowerInput)) {
      return this.getEmergencySupport();
    }

    // Academic help
    if (this.isAcademicQuery(lowerInput)) {
      return this.getAcademicSupport(lowerInput, context);
    }

    // Emotional support
    if (emotion !== 'neutral') {
      return this.getEmotionalSupport(emotion, context);
    }

    // Risk-specific guidance
    if (this.isRiskRelated(lowerInput)) {
      return this.getRiskGuidance(lowerInput);
    }

    // Motivational content
    if (this.isMotivationNeeded(lowerInput)) {
      return this.getMotivationalResponse(context);
    }

    // Gamification triggers
    if (this.isGamificationTrigger(lowerInput)) {
      return this.getGamificationResponse(lowerInput, context);
    }

    // Default supportive response
    return this.getDefaultResponse(lowerInput);
  }

  isEmergencySupport(input) {
    const emergencyKeywords = ['suicide', 'kill myself', 'end it all', 'can\'t go on', 'no point', 'hurt myself'];
    return emergencyKeywords.some(keyword => input.includes(keyword));
  }

  getEmergencySupport() {
    return {
      type: 'emergency',
      content: this.getLocalizedMessage('emergency_support'),
      actions: ['contact_counselor', 'emergency_contacts', 'immediate_help'],
      priority: 'critical'
    };
  }

  isAcademicQuery(input) {
    const academicKeywords = ['study', 'homework', 'exam', 'test', 'assignment', 'grade', 'subject', 'math', 'science', 'english'];
    return academicKeywords.some(keyword => input.includes(keyword));
  }

  getAcademicSupport(input, context) {
    const studyTips = this.getLocalizedMessage('study_tips');
    const subjectHelp = this.identifySubject(input);
    
    return {
      type: 'academic',
      content: studyTips,
      subjectSpecific: subjectHelp,
      gamification: {
        points: 5,
        message: this.getLocalizedMessage('learning_points')
      },
      suggestions: ['Need more help', 'Show study schedule', 'Practice problems']
    };
  }

  getEmotionalSupport(emotion, context) {
    const emotionalResponses = {
      sad: {
        content: this.getLocalizedMessage('emotional_sad'),
        actions: ['breathing_exercise', 'positive_affirmations', 'talk_to_friend'],
        mood_boost: true
      },
      stressed: {
        content: this.getLocalizedMessage('emotional_stressed'),
        actions: ['relaxation_technique', 'time_management', 'break_tasks'],
        techniques: ['deep_breathing', 'progressive_relaxation']
      },
      angry: {
        content: this.getLocalizedMessage('emotional_angry'),
        actions: ['cooling_down', 'physical_activity', 'journal_writing'],
        cooling_period: true
      },
      happy: {
        content: this.getLocalizedMessage('emotional_happy'),
        celebration: true,
        gamification: {
          points: 10,
          message: this.getLocalizedMessage('happiness_bonus')
        }
      },
      tired: {
        content: this.getLocalizedMessage('emotional_tired'),
        actions: ['rest_reminder', 'sleep_tips', 'energy_boosters'],
        health_focus: true
      },
      confident: {
        content: this.getLocalizedMessage('emotional_confident'),
        challenge: this.generateChallenge(),
        gamification: {
          points: 15,
          message: this.getLocalizedMessage('confidence_boost')
        }
      }
    };

    return emotionalResponses[emotion] || this.getDefaultResponse();
  }

  getRiskGuidance(input) {
    const riskLevel = this.studentData.riskLevel || 'medium';
    const guidance = {
      high: {
        content: this.getLocalizedMessage('risk_high_guidance'),
        urgency: 'high',
        actions: ['immediate_counseling', 'parent_notification', 'academic_support'],
        followUp: '24_hours'
      },
      medium: {
        content: this.getLocalizedMessage('risk_medium_guidance'),
        urgency: 'medium',
        actions: ['study_plan', 'attendance_improvement', 'peer_support'],
        followUp: '3_days'
      },
      low: {
        content: this.getLocalizedMessage('risk_low_guidance'),
        urgency: 'low',
        actions: ['maintain_momentum', 'set_goals', 'celebrate_progress'],
        followUp: '1_week'
      }
    };

    return guidance[riskLevel];
  }

  getMotivationalResponse(context) {
    const motivationalContent = [
      this.getLocalizedMessage('motivation_1'),
      this.getLocalizedMessage('motivation_2'),
      this.getLocalizedMessage('motivation_3')
    ];

    const randomMotivation = motivationalContent[Math.floor(Math.random() * motivationalContent.length)];

    return {
      type: 'motivation',
      content: randomMotivation,
      quote: this.getDailyQuote(),
      gamification: {
        points: 8,
        message: this.getLocalizedMessage('motivation_points')
      },
      challenge: this.generateDailyChallenge()
    };
  }

  getGamificationResponse(input, context) {
    return {
      type: 'gamification',
      content: this.getLocalizedMessage('gamification_response'),
      currentStats: {
        level: this.studentData.level || 1,
        points: this.studentData.points || 0,
        streak: this.studentData.streakDays || 0,
        achievements: this.studentData.achievements || []
      },
      nextReward: this.calculateNextReward(),
      dailyChallenge: this.generateDailyChallenge()
    };
  }

  // Multi-lingual message system
  getLocalizedMessage(key) {
    const messages = {
      en: {
        emergency_support: `🚨 I'm really concerned about you. Please reach out to someone right now. You're not alone, and there are people who care about you. Would you like me to connect you with a counselor immediately?`,
        study_tips: `📚 Here are some study techniques that work: 1) Pomodoro Technique (25 min study, 5 min break), 2) Active recall (test yourself), 3) Spaced repetition. Which subject needs attention?`,
        emotional_sad: `😔 I can see you're feeling down. It's okay to have difficult days - they help us grow stronger. Want to talk about what's bothering you? Sometimes sharing lightens the load. 💙`,
        emotional_stressed: `😰 Feeling overwhelmed is normal, especially with studies. Let's break this down together. What's the biggest thing worrying you right now? We can tackle it step by step. 🌸`,
        emotional_happy: `😊 I love seeing you happy! Your positive energy is amazing! Keep spreading those good vibes. What made your day special today? ✨`,
        emotional_angry: `😤 I can sense some frustration. It's natural to feel this way sometimes. Let's channel that energy into determination! What's the challenge you're facing? 🔥`,
        emotional_tired: `😴 You seem exhausted. Rest isn't laziness - it's essential for learning. Have you been getting enough sleep? Your brain needs rest to function well. 💤`,
        emotional_confident: `💪 I can feel your confidence! This energy is powerful - use it to tackle your biggest challenges today! What goal will you conquer? 🚀`,
        risk_high_guidance: `⚠️ I notice you need some extra support right now. That's completely okay - asking for help shows strength. Let's create an action plan together. Your success matters! 💪`,
        risk_medium_guidance: `📊 Your progress shows you're capable of great things! Let's fine-tune your approach to get you back on the winning track. Small consistent steps lead to big victories! 🎯`,
        risk_low_guidance: `🌟 You're doing wonderfully! Keep up the excellent momentum. Let's set some exciting new goals to challenge yourself even further! 🚀`,
        motivation_1: `🌟 Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown. Don't give up on your dreams!`,
        motivation_2: `🎯 Success isn't about being perfect. It's about being consistent. You don't have to be great to get started, but you have to get started to be great!`,
        motivation_3: `💪 Your current situation is not your final destination. Every challenge you overcome makes you stronger. Keep pushing forward!`,
        learning_points: `Great question! +5 learning points! 📚`,
        happiness_bonus: `Happiness boost! +10 points! 😊`,
        confidence_boost: `Confidence power-up! +15 points! 💪`,
        motivation_points: `Motivation fuel! +8 points! 🔥`,
        gamification_response: `🎮 Let's check your progress! You're doing amazing!`
      },
      hi: {
        study_tips: `📚 यहाँ कुछ अध्ययन तकनीकें हैं जो काम करती हैं: 1) पोमोडोरो तकनीक (25 मिनट अध्ययन, 5 मिनट ब्रेक), 2) सक्रिय याद (खुद को परखें), 3) दोहराव। किस विषय पर ध्यान देना है?`,
        emotional_sad: `😔 मैं देख सकती हूं कि आप उदास हैं। मुश्किल दिन होना सामान्य है - ये हमें मजबूत बनाते हैं। क्या आप बात करना चाहेंगे कि क्या परेशान कर रहा है? 💙`,
        emotional_happy: `😊 आपको खुश देखकर मुझे बहुत अच्छा लगता है! आपकी सकारात्मक ऊर्जा अद्भुत है! ये अच्छे विचार फैलाते रहिए। आज आपका दिन क्यों खास रहा? ✨`,
        motivation_1: `🌟 हर विशेषज्ञ कभी शुरुआती था। हर पेशेवर कभी शौकिया था। हर मशहूर व्यक्ति कभी अनजान था। अपने सपनों को न छोड़ें!`
      },
      bn: {
        study_tips: `📚 এখানে কিছু অধ্যয়ন কৌশল যা কাজ করে: 1) পোমোডোরো কৌশল (25 মিনিট অধ্যয়ন, 5 মিনিট বিরতি), 2) সক্রিয় স্মরণ (নিজেকে পরীক্ষা করুন), 3) পুনরাবৃত্তি। কোন বিষয়ে মনোযোগ দিতে হবে?`,
        emotional_happy: `😊 তোমাকে খুশি দেখে আমার খুব ভালো লাগছে! তোমার ইতিবাচক শক্তি অসাধারণ! এই ভালো অনুভূতি ছড়িয়ে দিতে থাকো। আজ তোমার দিনটা কেন বিশেষ হলো? ✨`
      },
      ta: {
        study_tips: `📚 இதோ சில படிப்பு நுட்பங்கள்: 1) பொமொடோரோ நுட்பம் (25 நிமிடம் படிப்பு, 5 நிமிடம் ஓய்வு), 2) சுறுசுறுப்பான நினைவு (உங்களைப் பரீক்ஷித்துக் கொள்ளுங்கள்), 3) இடைவெளி மீண்டும். எந்த பாடத்தில் கவனம் செலுத்த வேண்டும்?`,
        emotional_happy: `😊 உங்களைப் பார்த்து மகிழ்ச்சியாக இருப்பதைப் பார்த்து எனக்கு மிகவும் மகிழ்ச்சியாக இருக்கிறது! உங்கள் நேர்மறை ஆற்றல் அற்புதமானது! இந்த நல்ல உணர்வுகளைப் பரப்பிக்கொண்டே இருங்கள். இன்று உங்கள் நாள் ஏன் சிறப்பாக இருந்தது? ✨`
      }
    };

    return messages[this.language]?.[key] || messages['en'][key];
  }

  generateDailyChallenge() {
    const challenges = [
      { task: 'Complete 3 practice problems', points: 25, subject: 'math' },
      { task: 'Read for 30 minutes', points: 20, subject: 'reading' },
      { task: 'Take detailed notes in class', points: 15, subject: 'general' },
      { task: 'Help a classmate with homework', points: 30, subject: 'social' },
      { task: 'Review yesterday\'s lessons', points: 20, subject: 'revision' }
    ];

    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  generateChallenge() {
    return {
      title: 'Confidence Challenge',
      task: 'Take on the hardest problem in your weakest subject',
      reward: 50,
      timeLimit: '24 hours'
    };
  }

  getDailyQuote() {
    const quotes = [
      "The expert in anything was once a beginner. - Helen Hayes",
      "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ];

    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  calculateNextReward() {
    const currentPoints = this.studentData.points || 0;
    const nextMilestone = Math.ceil(currentPoints / 100) * 100;
    const pointsNeeded = nextMilestone - currentPoints;

    return {
      points: nextMilestone,
      pointsNeeded,
      reward: this.getRewardForPoints(nextMilestone)
    };
  }

  getRewardForPoints(points) {
    const rewards = {
      100: 'Study Buddy Badge',
      200: 'Knowledge Seeker Title',
      300: 'Academic Achiever Badge',
      500: 'Learning Champion Title',
      1000: 'Scholar Supreme Badge'
    };

    return rewards[points] || 'Special Recognition';
  }

  identifySubject(input) {
    const subjects = {
      math: ['math', 'mathematics', 'algebra', 'geometry', 'calculus', 'numbers'],
      science: ['science', 'physics', 'chemistry', 'biology', 'experiment'],
      english: ['english', 'grammar', 'writing', 'literature', 'essay'],
      history: ['history', 'social', 'civics', 'geography', 'political']
    };

    for (const [subject, keywords] of Object.entries(subjects)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return subject;
      }
    }

    return 'general';
  }

  isRiskRelated(input) {
    const riskKeywords = ['attendance', 'absent', 'miss class', 'grade', 'failing', 'behind', 'struggling'];
    return riskKeywords.some(keyword => input.includes(keyword));
  }

  isMotivationNeeded(input) {
    const motivationKeywords = ['motivation', 'encourage', 'inspire', 'give up', 'quit', 'can\'t do', 'impossible'];
    return motivationKeywords.some(keyword => input.includes(keyword));
  }

  isGamificationTrigger(input) {
    const gamificationKeywords = ['points', 'level', 'achievement', 'progress', 'reward', 'challenge', 'streak'];
    return gamificationKeywords.some(keyword => input.includes(keyword));
  }

  getDefaultResponse(input = '') {
    const defaultResponses = [
      {
        content: this.getLocalizedMessage('default_1') || "I'm here to support you! Tell me what's on your mind. 🌟",
        suggestions: ['How are you feeling?', 'Need study help?', 'Show my progress', 'Daily challenge']
      },
      {
        content: this.getLocalizedMessage('default_2') || "Thanks for sharing! I'm listening. What would help you most right now? 💙",
        suggestions: ['I feel stressed', 'Help with homework', 'Motivate me', 'Check achievements']
      }
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Track conversation for context
  addToHistory(userInput, botResponse) {
    this.conversationHistory.push({
      user: userInput,
      bot: botResponse,
      timestamp: new Date(),
      emotion: this.emotionalState
    });

    // Keep only last 10 conversations for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
  }

  // Get conversation context for better responses
  getConversationContext() {
    return {
      recentEmotions: this.conversationHistory.map(conv => conv.emotion).slice(-3),
      conversationLength: this.conversationHistory.length,
      supportLevel: this.supportLevel,
      studentData: this.studentData
    };
  }
}

export default ChatbotService;