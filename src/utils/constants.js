// Application Constants

export const APP_CONFIG = {
  name: 'AI Dropout Prediction System',
  version: '1.0.0',
  description: 'Smart India Hackathon - AI-powered dropout prediction and intervention system',
  author: 'Smart India Hackathon Team',
  contact: 'support@aidropout.edu'
};

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const RISK_THRESHOLDS = {
  HIGH: 0.7,
  MEDIUM: 0.4,
  LOW: 0.2
};

export const INTERVENTION_TYPES = [
  'Academic Support',
  'Financial Aid',
  'Counseling',
  'Health Support',
  'Transportation',
  'Peer Mentoring',
  'Family Counseling',
  'Career Guidance',
  'Mental Health Support',
  'Nutrition Support',
  'Technology Access',
  'Language Support'
];

export const INTERVENTION_STATUS = {
  PENDING: 'pending',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  APPROVED: 'approved'
};

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TEACHER: 'teacher',
  COUNSELOR: 'counselor',
  PARENT: 'parent'
};

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    rtl: false
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    rtl: false
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    rtl: false
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    rtl: false
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    rtl: false
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    rtl: false
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    rtl: false
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    rtl: false
  }
];

export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899'
};

export const MAC_COLORS = {
  RED: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  YELLOW: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  GREEN: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  }
};

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  SLOWER: 500
};

export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  
  // Students
  STUDENTS: '/api/students',
  STUDENT_PROFILE: '/api/students/:id',
  STUDENT_PREDICTIONS: '/api/students/:id/predictions',
  STUDENT_INTERVENTIONS: '/api/students/:id/interventions',
  
  // Predictions
  PREDICTIONS: '/api/predictions',
  PREDICTION_DETAIL: '/api/predictions/:id',
  
  // Interventions
  INTERVENTIONS: '/api/interventions',
  INTERVENTION_DETAIL: '/api/interventions/:id',
  
  // Analytics
  ANALYTICS_OVERVIEW: '/api/analytics/overview',
  ANALYTICS_TRENDS: '/api/analytics/trends',
  ANALYTICS_IAY: '/api/analytics/iay',
  
  // Reports
  REPORTS: '/api/reports',
  EXPORT_REPORT: '/api/reports/export'
};

export const LOCAL_STORAGE_KEYS = {
  USER: 'aidropout_user',
  TOKEN: 'aidropout_token',
  LANGUAGE: 'aidropout_language',
  THEME: 'aidropout_theme',
  PREFERENCES: 'aidropout_preferences'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred.'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  SAVE_SUCCESS: 'Changes saved successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  UPDATE_SUCCESS: 'Updated successfully!'
};

export const IAY_CONFIG = {
  MEASUREMENT_PERIOD: 30, // days
  SUCCESS_CRITERIA: [
    'Improved attendance (>10% increase)',
    'Grade improvement (>5% increase)', 
    'Engagement increase (>10% increase)',
    'Completed assigned tasks',
    'Positive feedback from teachers'
  ],
  THRESHOLDS: {
    EXCELLENT: 80,
    GOOD: 60,
    FAIR: 40,
    POOR: 20
  }
};

export default {
  APP_CONFIG,
  RISK_LEVELS,
  RISK_THRESHOLDS,
  INTERVENTION_TYPES,
  INTERVENTION_STATUS,
  PRIORITY_LEVELS,
  USER_ROLES,
  SUPPORTED_LANGUAGES,
  CHART_COLORS,
  MAC_COLORS,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  API_ENDPOINTS,
  LOCAL_STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  IAY_CONFIG
};