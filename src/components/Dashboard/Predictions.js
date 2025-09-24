import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, User, Calendar, Clock, Target } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockPredictions } from '../../utils/mockData';

const Predictions = () => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('riskScore');

  const filterOptions = [
    { value: 'all', label: 'All Predictions' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable': return <div className="h-4 w-4 bg-blue-500 rounded-full" />;
      default: return null;
    }
  };

  const filteredPredictions = mockPredictions.filter(pred => {
    if (selectedFilter === 'all') return true;
    return pred.riskLevel.toLowerCase() === selectedFilter;
  });

  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    if (sortBy === 'riskScore') return b.riskScore - a.riskScore;
    if (sortBy === 'confidence') return b.confidenceScore - a.confidenceScore;
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('predictions')}</h1>
          <p className="mt-1 text-gray-600">
            AI-powered dropout risk predictions with explanations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="input-field text-sm"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field text-sm"
          >
            <option value="riskScore">Risk Score</option>
            <option value="confidence">Confidence</option>
            <option value="lastUpdated">Last Updated</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Predictions</p>
              <p className="text-2xl font-bold text-gray-900">{mockPredictions.length}</p>
            </div>
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-red-600">
                {mockPredictions.filter(p => p.riskLevel === 'High').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-green-600">
                {(mockPredictions.reduce((sum, p) => sum + p.confidenceScore, 0) / mockPredictions.length * 100).toFixed(1)}%
              </p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Predictions Today</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Predictions List */}
      <div className="space-y-4">
        {sortedPredictions.map((prediction) => (
          <div key={prediction.id} className="card p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              {/* Student Info & Risk Level */}
              <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {prediction.studentName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel} Risk
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {prediction.timeToDropout}
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(prediction.trend)}
                      <span className="ml-1 text-sm text-gray-600 capitalize">
                        {prediction.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 lg:mb-0 lg:mr-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {(prediction.riskScore * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-500">Risk Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {(prediction.confidenceScore * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            </div>

            {/* Key Factors */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Risk Factors:</h4>
              <div className="flex flex-wrap gap-2">
                {prediction.keyFactors.map((factor, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</h4>
              <ul className="space-y-1">
                {prediction.recommendedActions.map((action, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2 sm:mb-0">
                Last updated: {new Date(prediction.lastUpdated).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button className="btn-secondary text-xs px-3 py-1">
                  View Details
                </button>
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Create Intervention
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Explanation Panel */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          AI Prediction Model Explanation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Data Sources</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Attendance patterns (90 days)</li>
              <li>• Academic performance trends</li>
              <li>• Behavioral engagement metrics</li>
              <li>• Socio-economic indicators</li>
              <li>• Family situation updates</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Model Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Gradient Boosting Algorithm</li>
              <li>• 15+ risk factor analysis</li>
              <li>• Real-time data processing</li>
              <li>• Explainable AI (SHAP values)</li>
              <li>• Cross-validation accuracy: 91.2%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Intervention Triggers</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Risk score greater than 70%: Immediate action</li>
              <li>• Risk score greater than 50%: Close monitoring</li>
              <li>• Trend analysis: Preventive measures</li>
              <li>• Multi-factor alerts: Team intervention</li>
              <li>• Parent notification thresholds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;