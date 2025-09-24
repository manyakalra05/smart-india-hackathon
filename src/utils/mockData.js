export const mockStudentsData = [
  {
    id: 1,
    name: 'आर्यन शर्मा',
    email: 'aryan.sharma@student.edu',
    risk: 'high',
    riskScore: 0.85,
    attendance: 65,
    grade: 'C+',
    interventions: 3,
    lastActive: '2024-01-15',
    subjects: {
      math: 68,
      science: 72,
      english: 60,
      social: 65
    },
    riskFactors: ['Low Attendance', 'Declining Grades', 'Fee Payment Delay'],
    interventionsHistory: [
      { type: 'Counseling', date: '2024-01-10', status: 'completed' },
      { type: 'Parent Meeting', date: '2024-01-08', status: 'completed' },
      { type: 'Peer Mentoring', date: '2024-01-12', status: 'ongoing' }
    ]
  },
  {
    id: 2,
    name: 'प्रिया पटेल',
    email: 'priya.patel@student.edu',
    risk: 'medium',
    riskScore: 0.45,
    attendance: 78,
    grade: 'B',
    interventions: 1,
    lastActive: '2024-01-16',
    subjects: {
      math: 75,
      science: 80,
      english: 78,
      social: 82
    },
    riskFactors: ['Family Issues', 'Transportation Problems'],
    interventionsHistory: [
      { type: 'Transportation Support', date: '2024-01-14', status: 'ongoing' }
    ]
  },
  {
    id: 3,
    name: 'রাহুল দাস',
    email: 'rahul.das@student.edu',
    risk: 'low',
    riskScore: 0.15,
    attendance: 92,
    grade: 'A',
    interventions: 0,
    lastActive: '2024-01-16',
    subjects: {
      math: 88,
      science: 90,
      english: 85,
      social: 87
    },
    riskFactors: [],
    interventionsHistory: []
  },
  {
    id: 4,
    name: 'அனிதா முருகன்',
    email: 'anitha.murugan@student.edu',
    risk: 'high',
    riskScore: 0.92,
    attendance: 58,
    grade: 'D+',
    interventions: 5,
    lastActive: '2024-01-14',
    subjects: {
      math: 55,
      science: 60,
      english: 52,
      social: 58
    },
    riskFactors: ['Poor Academic Performance', 'Low Attendance', 'Financial Stress', 'Health Issues'],
    interventionsHistory: [
      { type: 'Academic Support', date: '2024-01-12', status: 'ongoing' },
      { type: 'Health Checkup', date: '2024-01-10', status: 'completed' },
      { type: 'Financial Aid', date: '2024-01-08', status: 'approved' },
      { type: 'Family Counseling', date: '2024-01-15', status: 'scheduled' },
      { type: 'Nutrition Support', date: '2024-01-13', status: 'ongoing' }
    ]
  },
  {
    id: 5,
    name: 'محمد علی',
    email: 'mohamed.ali@student.edu',
    risk: 'medium',
    riskScore: 0.52,
    attendance: 74,
    grade: 'B-',
    interventions: 2,
    lastActive: '2024-01-15',
    subjects: {
      math: 70,
      science: 68,
      english: 75,
      social: 72
    },
    riskFactors: ['Language Barrier', 'Cultural Adjustment'],
    interventionsHistory: [
      { type: 'Language Support', date: '2024-01-11', status: 'ongoing' },
      { type: 'Cultural Integration', date: '2024-01-09', status: 'completed' }
    ]
  }
];

export const mockAnalyticsData = {
  totalStudents: 1250,
  atRiskStudents: 187,
  interventionsActive: 45,
  successRate: 78.5,
  dropoutsPrevented: 23,
  iayScore: 72.3, // Intervention Action Yield
  
  riskDistribution: [
    { name: 'Low Risk', value: 890, color: '#22c55e' },
    { name: 'Medium Risk', value: 173, color: '#f59e0b' },
    { name: 'High Risk', value: 187, color: '#ef4444' }
  ],
  
  monthlyTrends: [
    { month: 'Aug', atRisk: 210, interventions: 52, success: 75 },
    { month: 'Sep', atRisk: 198, interventions: 48, success: 78 },
    { month: 'Oct', atRisk: 187, interventions: 45, success: 82 },
    { month: 'Nov', atRisk: 175, interventions: 42, success: 85 },
    { month: 'Dec', atRisk: 163, interventions: 38, success: 88 },
    { month: 'Jan', atRisk: 151, interventions: 35, success: 90 }
  ],
  
  interventionTypes: [
    { type: 'Academic Support', count: 15, effectiveness: 85 },
    { type: 'Counseling', count: 12, effectiveness: 78 },
    { type: 'Financial Aid', count: 8, effectiveness: 92 },
    { type: 'Health Support', count: 6, effectiveness: 88 },
    { type: 'Transportation', count: 4, effectiveness: 95 }
  ],
  
  riskFactors: [
    { factor: 'Low Attendance', frequency: 45, impact: 'High' },
    { factor: 'Poor Academic Performance', frequency: 38, impact: 'High' },
    { factor: 'Financial Stress', frequency: 32, impact: 'Medium' },
    { factor: 'Family Issues', frequency: 28, impact: 'Medium' },
    { factor: 'Health Problems', frequency: 22, impact: 'Medium' },
    { factor: 'Transportation Issues', frequency: 18, impact: 'Low' },
    { factor: 'Language Barrier', frequency: 15, impact: 'Low' }
  ]
};

export const mockInterventions = [
  {
    id: 1,
    studentId: 1,
    studentName: 'आर्यन शर्मा',
    type: 'Peer Mentoring',
    status: 'ongoing',
    priority: 'high',
    assignedTo: 'Ms. Sarah Johnson',
    createdDate: '2024-01-12',
    dueDate: '2024-01-26',
    description: 'Assigned peer mentor for academic support and motivation',
    progress: 65,
    notes: 'Student showing positive response to peer interactions'
  },
  {
    id: 2,
    studentId: 4,
    studentName: 'அனிதா முருகன்',
    type: 'Financial Aid',
    status: 'approved',
    priority: 'high',
    assignedTo: 'Finance Department',
    createdDate: '2024-01-08',
    dueDate: '2024-01-22',
    description: 'Emergency financial assistance for school fees',
    progress: 100,
    notes: 'Aid approved and disbursed. Family very grateful.'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'प्रिया पटेल',
    type: 'Transportation Support',
    status: 'ongoing',
    priority: 'medium',
    assignedTo: 'Transport Coordinator',
    createdDate: '2024-01-14',
    dueDate: '2024-02-14',
    description: 'Arranging school bus pickup from remote area',
    progress: 80,
    notes: 'Bus route modified. Attendance improving.'
  }
];

export const mockPredictions = [
  {
    id: 1,
    studentId: 1,
    studentName: 'आर्यन शर्मा',
    riskScore: 0.85,
    riskLevel: 'High',
    confidenceScore: 0.92,
    timeToDropout: '3-4 weeks',
    keyFactors: ['Attendance: 65%', 'Grade decline: 15%', 'Fee payment delay: 2 months'],
    recommendedActions: [
      'Immediate parent conference',
      'Academic support tutoring',
      'Financial aid assessment'
    ],
    lastUpdated: '2024-01-16',
    trend: 'increasing'
  },
  {
    id: 2,
    studentId: 4,
    studentName: 'அனிதா முருகன்',
    riskScore: 0.92,
    riskLevel: 'High',
    confidenceScore: 0.88,
    timeToDropout: '2-3 weeks',
    keyFactors: ['Multiple risk factors', 'Health issues', 'Academic struggles'],
    recommendedActions: [
      'Multi-disciplinary team meeting',
      'Health support referral',
      'Intensive academic intervention'
    ],
    lastUpdated: '2024-01-15',
    trend: 'stable'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'प्रिया पटेल',
    riskScore: 0.45,
    riskLevel: 'Medium',
    confidenceScore: 0.75,
    timeToDropout: '8-10 weeks',
    keyFactors: ['Transportation issues', 'Family situation'],
    recommendedActions: [
      'Transportation support',
      'Family counseling',
      'Regular check-ins'
    ],
    lastUpdated: '2024-01-16',
    trend: 'decreasing'
  }
];

// Mock users for authentication
export const mockUsers = [
  {
    id: 1,
    email: 'admin@school.edu',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    phone: '+91-9876543210'
  },
  {
    id: 2,
    email: 'student@school.edu',
    password: 'student123',
    role: 'student',
    name: 'Test Student',
    phone: '+91-9876543211'
  },
  {
    id: 3,
    email: 'aryan.sharma@student.edu',
    password: 'password123',
    role: 'student',
    name: 'आर्यन शर्मा',
    phone: '+91-9876543212'
  }
];