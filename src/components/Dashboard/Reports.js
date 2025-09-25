import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

const Reports = () => {
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last_month');

  const reportTypes = [
    { id: 'overview', name: 'System Overview', icon: BarChart3, description: 'Complete system performance metrics' },
    { id: 'students', name: 'Student Analytics', icon: Users, description: 'Detailed student performance analysis' },
    { id: 'interventions', name: 'Intervention Report', icon: TrendingUp, description: 'Intervention effectiveness metrics' },
    { id: 'predictions', name: 'Prediction Accuracy', icon: PieChart, description: 'AI model performance analysis' }
  ];

  const reportData = {
    monthly_performance: [
      { month: 'Aug', predictions: 45, accuracy: 87, interventions: 12, success_rate: 75 },
      { month: 'Sep', predictions: 52, accuracy: 89, interventions: 15, success_rate: 78 },
      { month: 'Oct', predictions: 48, accuracy: 91, interventions: 13, success_rate: 82 },
      { month: 'Nov', predictions: 42, accuracy: 93, interventions: 10, success_rate: 85 },
      { month: 'Dec', predictions: 38, accuracy: 91, interventions: 9, success_rate: 88 },
      { month: 'Jan', predictions: 35, accuracy: 94, interventions: 8, success_rate: 90 }
    ],
    intervention_effectiveness: [
      { type: 'Academic Support', count: 15, success: 85, cost: 2500 },
      { type: 'Financial Aid', count: 8, success: 92, cost: 4800 },
      { type: 'Counseling', count: 12, success: 78, cost: 1800 },
      { type: 'Health Support', count: 6, success: 88, cost: 3200 },
      { type: 'Transportation', count: 4, success: 95, cost: 1200 }
    ]
  };

  const generateReport = () => {
    // Mock report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} report for ${dateRange}...`);
  };

  const exportReport = (format) => {
    // Mock export functionality
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-gray-600">
            Generate comprehensive reports and insights
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_quarter">Last Quarter</option>
            <option value="last_year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button onClick={generateReport} className="btn-primary flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`card p-6 cursor-pointer transition-all duration-200 ${
                selectedReport === report.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600">{report.description}</p>
            </div>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Report Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-gray-600">Prediction Accuracy</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">72.3%</div>
                <div className="text-sm text-gray-600">IAY Score</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">187</div>
                <div className="text-sm text-gray-600">Students At Risk</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">23</div>
                <div className="text-sm text-gray-600">Dropouts Prevented</div>
              </div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.monthly_performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy %" />
                <Line type="monotone" dataKey="success_rate" stroke="#3b82f6" strokeWidth={2} name="Success Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Intervention Effectiveness */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Intervention Effectiveness</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.intervention_effectiveness}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="#10b981" name="Success Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Summary & Export */}
        <div className="space-y-6">
          {/* Report Summary */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Report Type:</span>
                <span className="text-sm font-medium">
                  {reportTypes.find(r => r.id === selectedReport)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date Range:</span>
                <span className="text-sm font-medium capitalize">{dateRange.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Students:</span>
                <span className="text-sm font-medium">1,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Data Points:</span>
                <span className="text-sm font-medium">15,000+</span>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
            <div className="space-y-3">
              <button
                onClick={() => exportReport('pdf')}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </button>
              <button
                onClick={() => exportReport('excel')}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export as Excel
              </button>
              <button
                onClick={() => exportReport('csv')}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </button>
            </div>
          </div>

          {/* Schedule Reports */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weekly Summary</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">Enable</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Analysis</span>
                <button className="text-sm text-green-600 hover:text-green-800">Enabled</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quarterly Review</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">Enable</button>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium">Monthly Analysis</div>
                  <div className="text-xs text-gray-500">Generated 2 days ago</div>
                </div>
                <Download className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium">Intervention Report</div>
                  <div className="text-xs text-gray-500">Generated 5 days ago</div>
                </div>
                <Download className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium">Student Analytics</div>
                  <div className="text-xs text-gray-500">Generated 1 week ago</div>
                </div>
                <Download className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;