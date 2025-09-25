import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Calendar, BookOpen, Award, Clock, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const StudentProgress = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  // Mock student progress data
  const progressData = {
    overall: {
      currentGrade: 'B+',
      gpa: 3.4,
      attendance: 82,
      improvement: 12,
      rank: 45,
      totalStudents: 200
    },
    monthlyProgress: [
      { month: 'Aug', attendance: 75, grades: 72, engagement: 68, assignments: 80 },
      { month: 'Sep', attendance: 78, grades: 75, engagement: 70, assignments: 85 },
      { month: 'Oct', attendance: 82, grades: 78, engagement: 75, assignments: 88 },
      { month: 'Nov', attendance: 85, grades: 82, engagement: 78, assignments: 90 },
      { month: 'Dec', attendance: 87, grades: 84, engagement: 82, assignments: 92 },
      { month: 'Jan', attendance: 85, grades: 86, engagement: 85, assignments: 95 }
    ],
    subjectPerformance: [
      { subject: 'Mathematics', current: 78, previous: 72, target: 85 },
      { subject: 'Science', current: 84, previous: 80, target: 88 },
      { subject: 'English', current: 81, previous: 79, target: 85 },
      { subject: 'History', current: 76, previous: 74, target: 80 },
      { subject: 'Geography', current: 79, previous: 75, target: 82 }
    ],
    skillsRadar: [
      { skill: 'Critical Thinking', score: 78, fullMark: 100 },
      { skill: 'Communication', score: 85, fullMark: 100 },
      { skill: 'Collaboration', score: 72, fullMark: 100 },
      { skill: 'Creativity', score: 68, fullMark: 100 },
      { skill: 'Problem Solving', score: 82, fullMark: 100 },
      { skill: 'Leadership', score: 65, fullMark: 100 }
    ],
    goals: [
      { goal: 'Improve Math Grade to A', progress: 70, deadline: '2024-03-15', status: 'on-track' },
      { goal: 'Increase Attendance to 90%', progress: 85, deadline: '2024-02-28', status: 'on-track' },
      { goal: 'Complete Science Project', progress: 45, deadline: '2024-02-10', status: 'behind' },
      { goal: 'Join Study Group', progress: 100, deadline: '2024-01-20', status: 'completed' }
    ],
    achievements: [
      { title: 'Perfect Attendance Week', date: '2024-01-15', icon: '🎯', points: 50 },
      { title: 'Math Quiz Champion', date: '2024-01-10', icon: '🏆', points: 100 },
      { title: 'Study Streak - 10 Days', date: '2024-01-08', icon: '🔥', points: 75 },
      { title: 'Assignment Submitter', date: '2024-01-05', icon: '📚', points: 25 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Award className="h-4 w-4" />;
      case 'on-track': return <TrendingUp className="h-4 w-4" />;
      case 'behind': return <TrendingDown className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
          <p className="mt-1 text-gray-600">
            Track your academic journey and achievements
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field text-sm"
          >
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Overall Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Grade</p>
              <p className="text-2xl font-bold text-green-600">{progressData.overall.currentGrade}</p>
              <p className="text-xs text-green-600">GPA: {progressData.overall.gpa}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-blue-600">{progressData.overall.attendance}%</p>
              <p className="text-xs text-blue-600">+{progressData.overall.improvement}% this month</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Class Rank</p>
              <p className="text-2xl font-bold text-purple-600">{progressData.overall.rank}</p>
              <p className="text-xs text-gray-500">out of {progressData.overall.totalStudents}</p>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-yellow-600">{progressData.achievements.length}</p>
              <p className="text-xs text-yellow-600">This semester</p>
            </div>
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Trend */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData.monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} name="Attendance %" />
              <Line type="monotone" dataKey="grades" stroke="#10b981" strokeWidth={2} name="Grades %" />
              <Line type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={2} name="Engagement %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={progressData.skillsRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Current Level"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
        <div className="space-y-4">
          {progressData.subjectPerformance.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center flex-1">
                <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{subject.subject}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Previous: {subject.previous}%</span>
                      <span className="text-sm font-medium text-gray-900">Current: {subject.current}%</span>
                      <span className="text-sm text-blue-600">Target: {subject.target}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(subject.current / subject.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4">
                  {subject.current >= subject.target ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : subject.current > subject.previous ? (
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Goals</h3>
          <div className="space-y-4">
            {progressData.goals.map((goal, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{goal.goal}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {getStatusIcon(goal.status)}
                    <span className="ml-1 capitalize">{goal.status.replace('-', ' ')}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Due: {goal.deadline}</span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      goal.status === 'completed' ? 'bg-green-500' :
                      goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {progressData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div className="text-2xl mr-4">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{achievement.title}</div>
                  <div className="text-sm text-gray-500">{achievement.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-yellow-600">+{achievement.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;