import React from 'react';
import { TrendingUp, Target, Calendar, BookOpen, Award, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import StudentChatbot from '/Users/manyakalra/Desktop/smart-india-hackathon/src/components/Dashboard/StudentChatbot';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Mock student data
  const studentData = {
    riskLevel: 'medium',
    riskScore: 0.45,
    attendance: 78,
    overallGrade: 'B',
    interventionsReceived: 2,
    improvement: '+12%'
  };

  const progressData = [
    { month: 'Aug', attendance: 72, grade: 70, engagement: 65 },
    { month: 'Sep', attendance: 75, grade: 73, engagement: 68 },
    { month: 'Oct', attendance: 78, grade: 76, engagement: 72 },
    { month: 'Nov', attendance: 80, grade: 78, engagement: 75 },
    { month: 'Dec', attendance: 82, grade: 80, engagement: 78 },
    { month: 'Jan', attendance: 85, grade: 82, engagement: 80 }
  ];

  const riskFactors = [
    { factor: 'Attendance', score: 78, status: 'improving' },
    { factor: 'Academic Performance', score: 76, status: 'stable' },
    { factor: 'Engagement', score: 72, status: 'improving' },
    { factor: 'Participation', score: 68, status: 'needs attention' }
  ];

  const achievements = [
    { title: 'Attendance Improver', description: 'Improved attendance by 15%', icon: '🎯', date: 'Jan 15' },
    { title: 'Math Progress', description: 'Grade improved from C+ to B', icon: '📚', date: 'Jan 10' },
    { title: 'Active Participant', description: 'Participated in 5 activities', icon: '🌟', date: 'Jan 08' }
  ];

  const upcomingTasks = [
    { task: 'Mathematics Assignment', due: 'Tomorrow', priority: 'high' },
    { task: 'Science Project', due: '3 days', priority: 'medium' },
    { task: 'English Essay', due: '1 week', priority: 'low' },
    { task: 'Group Presentation', due: '2 weeks', priority: 'medium' }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'improving': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      case 'needs attention': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('welcome')}, {user?.name}
          </h1>
          <p className="mt-1 text-gray-600">
            Track your academic progress and stay on course
          </p>
        </div>
        <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-medium ${getRiskColor(studentData.riskLevel)}`}>
          Risk Level: {studentData.riskLevel.toUpperCase()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-3xl font-bold text-blue-600">{studentData.attendance}%</p>
              <p className="text-sm text-green-600 mt-1">{studentData.improvement} this month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Grade</p>
              <p className="text-3xl font-bold text-green-600">{studentData.overallGrade}</p>
              <p className="text-sm text-green-600 mt-1">Above average</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interventions</p>
              <p className="text-3xl font-bold text-yellow-600">{studentData.interventionsReceived}</p>
              <p className="text-sm text-gray-600 mt-1">Active support</p>
            </div>
            <Target className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Score</p>
              <p className="text-3xl font-bold text-red-600">{(studentData.riskScore * 100).toFixed(0)}%</p>
              <p className="text-sm text-red-600 mt-1">Needs monitoring</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} name="Attendance %" />
            <Line type="monotone" dataKey="grade" stroke="#10b981" strokeWidth={2} name="Grade Score" />
            <Line type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={2} name="Engagement %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors Analysis */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Areas</h3>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{factor.factor}</p>
                  <p className={`text-sm ${getStatusColor(factor.status)}`}>
                    {factor.status.replace('_', ' ')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{factor.score}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        factor.score >= 80 ? 'bg-green-500' : 
                        factor.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          Upcoming Tasks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingTasks.map((task, index) => (
            <div key={index} className="p-4 rounded-lg border-l-4 bg-gray-50 border-l-blue-500">
              <p className="font-medium text-gray-900">{task.task}</p>
              <p className="text-sm text-gray-600 mt-1">Due: {task.due}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority} priority
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="card p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Keep Up the Great Work!</h3>
          <p className="mb-4">
            You're showing consistent improvement in your academic journey. 
            Your efforts are making a real difference!
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">+15%</div>
              <div className="opacity-80">Attendance Improved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="opacity-80">Achievements Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">B</div>
              <div className="opacity-80">Current Grade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Chatbot */}
      <StudentChatbot />
    </div>
  );
};

export default StudentDashboard;