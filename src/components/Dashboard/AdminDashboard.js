import React from 'react';
import { Users, AlertTriangle, Target, TrendingUp, Calendar, Bell } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockAnalyticsData, mockStudentsData } from '../../utils/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      title: t('totalStudents'),
      value: mockAnalyticsData.totalStudents.toLocaleString(),
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: t('atRisk'),
      value: mockAnalyticsData.atRiskStudents,
      change: '-12.3%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: t('interventionsActive'),
      value: mockAnalyticsData.interventionsActive,
      change: '+8.1%',
      changeType: 'positive',
      icon: Target,
      color: 'yellow'
    },
    {
      title: t('successRate'),
      value: `${mockAnalyticsData.successRate}%`,
      change: '+15.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green'
    }
  ];

  const riskColors = {
    'High Risk': '#ef4444',
    'Medium Risk': '#f59e0b',
    'Low Risk': '#22c55e'
  };

  const recentAlerts = [
    {
      id: 1,
      student: 'আর্যন শর্মা',
      type: 'High Risk',
      message: 'Attendance dropped below 70%',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      student: 'அனிதா முருகன்',
      type: 'Critical',
      message: 'Multiple risk factors detected',
      time: '4 hours ago',
      priority: 'critical'
    },
    {
      id: 3,
      student: 'প্রিয়া পটেল',
      type: 'Medium Risk',
      message: 'Grade decline in mathematics',
      time: '6 hours ago',
      priority: 'medium'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('welcome')}, {user?.name}
          </h1>
          <p className="mt-1 text-gray-600">
            {t('dashboard')} - Admin Panel
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <button className="btn-primary">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{stat.change} from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockAnalyticsData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="atRisk" 
                stackId="1" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="interventions" 
                stackId="2" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAnalyticsData.riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {mockAnalyticsData.riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* IAY Metric Highlight */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Intervention Action Yield (IAY) - 30 Days
            </h3>
            <p className="text-gray-600 mt-1">
              Percentage of at-risk students showing positive behavioral change within 30 days
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {mockAnalyticsData.iayScore}%
            </div>
            <div className="text-sm text-green-600">+5.2% improvement</div>
          </div>
        </div>
      </div>

      {/* Recent Alerts and Students At Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  alert.priority === 'critical' ? 'bg-red-500' :
                  alert.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.student}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  alert.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'high' ? 'bg-orange-100 text-orange-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top At-Risk Students */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Students Requiring Attention</h3>
          <div className="space-y-4">
            {mockStudentsData.filter(s => s.risk === 'high').slice(0, 4).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                    <span className="text-red-700 font-medium text-sm">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">
                      Attendance: {student.attendance}% | Grade: {student.grade}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-red-700">Risk: {student.riskScore}</div>
                  <div className="text-xs text-gray-500">{student.interventions} interventions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;