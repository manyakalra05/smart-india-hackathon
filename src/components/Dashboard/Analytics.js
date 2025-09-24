import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Target, Award, Filter, Download, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockAnalyticsData } from '../../utils/mockData';

const Analytics = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const kpiCards = [
    {
      title: 'Intervention Action Yield (IAY)',
      value: `${mockAnalyticsData.iayScore}%`,
      change: '+5.2%',
      changeType: 'positive',
      description: '30-day behavioral improvement rate',
      icon: Target
    },
    {
      title: 'Dropout Prevention Rate',
      value: `${mockAnalyticsData.successRate}%`,
      change: '+12.3%',
      changeType: 'positive',
      description: 'Students retained vs predicted dropouts',
      icon: Award
    },
    {
      title: 'Early Detection Accuracy',
      value: '91.2%',
      change: '+8.1%',
      changeType: 'positive',
      description: 'Prediction accuracy within 30 days',
      icon: TrendingUp
    },
    {
      title: 'Active Interventions',
      value: mockAnalyticsData.interventionsActive,
      change: '-15.7%',
      changeType: 'negative',
      description: 'Currently ongoing support programs',
      icon: Users
    }
  ];

  const interventionEffectiveness = [
    { name: 'Academic Support', success: 85, total: 52, cost: 2500 },
    { name: 'Financial Aid', success: 92, total: 28, cost: 4800 },
    { name: 'Counseling', success: 78, total: 45, cost: 1800 },
    { name: 'Health Support', success: 88, total: 23, cost: 3200 },
    { name: 'Transportation', success: 95, total: 15, cost: 1200 },
    { name: 'Peer Mentoring', success: 82, total: 35, cost: 800 }
  ];

  const riskFactorAnalysis = [
    { factor: 'Low Attendance', impact: 85, frequency: 45, trend: 'increasing' },
    { factor: 'Poor Academic Performance', impact: 80, frequency: 38, trend: 'stable' },
    { factor: 'Financial Stress', impact: 70, frequency: 32, trend: 'decreasing' },
    { factor: 'Family Issues', impact: 65, frequency: 28, trend: 'stable' },
    { factor: 'Health Problems', impact: 60, frequency: 22, trend: 'increasing' },
    { factor: 'Transportation Issues', impact: 45, frequency: 18, trend: 'decreasing' }
  ];

  const monthlyPredictionAccuracy = [
    { month: 'Jul', accuracy: 87.5, predictions: 45, actual: 42 },
    { month: 'Aug', accuracy: 89.2, predictions: 52, actual: 48 },
    { month: 'Sep', accuracy: 88.7, predictions: 48, actual: 44 },
    { month: 'Oct', accuracy: 91.3, predictions: 42, actual: 39 },
    { month: 'Nov', accuracy: 90.8, predictions: 38, actual: 35 },
    { month: 'Dec', accuracy: 92.1, predictions: 35, actual: 32 }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-red-500';
      case 'decreasing': return 'text-green-500';
      case 'stable': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('analytics')}</h1>
          <p className="mt-1 text-gray-600">
            Advanced insights and performance metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="btn-secondary flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="btn-primary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="card p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className={`text-sm font-medium ${getChangeColor(kpi.changeType)}`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.description}</p>
            </div>
          );
        })}
      </div>

      {/* IAY Metric Spotlight */}
      <div className="card p-8 bg-gradient-to-r from-blue-50 via-white to-green-50 border-2 border-blue-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Novel Evaluation Metric: Intervention Action Yield (IAY)
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Our innovative IAY metric measures the percentage of at-risk students who show positive 
            behavioral change within 30 days of intervention - providing immediate feedback on intervention effectiveness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{mockAnalyticsData.iayScore}%</div>
              <div className="text-sm text-gray-600">Current IAY Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">156</div>
              <div className="text-sm text-gray-600">Students Improved (30 days)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">187</div>
              <div className="text-sm text-gray-600">Total At-Risk Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Accuracy Trend */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Accuracy Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPredictionAccuracy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Intervention Effectiveness */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Intervention Effectiveness vs Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interventionEffectiveness}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="success" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Factor Analysis */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Impact Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Risk Factor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Impact Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Frequency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Trend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action Needed</th>
              </tr>
            </thead>
            <tbody>
              {riskFactorAnalysis.map((factor, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{factor.factor}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${
                            factor.impact >= 80 ? 'bg-red-500' : 
                            factor.impact >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${factor.impact}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{factor.impact}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{factor.frequency} cases</td>
                  <td className={`py-4 px-4 font-medium ${getTrendColor(factor.trend)}`}>
                    {factor.trend}
                  </td>
                  <td className="py-4 px-4">
                    <button className={`px-3 py-1 rounded-full text-xs font-medium ${
                      factor.impact >= 80 ? 'bg-red-100 text-red-800' :
                      factor.impact >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {factor.impact >= 80 ? 'High Priority' :
                       factor.impact >= 60 ? 'Medium Priority' : 'Monitor'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-lingual Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-lingual Engagement</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Hindi (हिन्दी)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">62%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Bengali (বাংলা)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="w-24 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tamil (தமிழ்)</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="w-16 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">50%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">English</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="w-28 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">88%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Insights</h3>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-green-800">Positive Trend</p>
                  <p className="text-sm text-green-600">IAY score improved by 5.2% this month</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-yellow-800">Attention Needed</p>
                  <p className="text-sm text-yellow-600">Health-related dropouts increasing by 15%</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-blue-800">System Update</p>
                  <p className="text-sm text-blue-600">ML model accuracy improved to 91.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;