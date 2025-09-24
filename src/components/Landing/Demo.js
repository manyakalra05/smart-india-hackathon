import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Monitor, Smartphone, Tablet } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState('desktop');

  const demoData = [
    { month: 'Jan', predictions: 45, accuracy: 87, interventions: 12 },
    { month: 'Feb', predictions: 52, accuracy: 89, interventions: 15 },
    { month: 'Mar', predictions: 48, accuracy: 91, interventions: 13 },
    { month: 'Apr', predictions: 42, accuracy: 93, interventions: 10 },
    { month: 'May', predictions: 38, accuracy: 91, interventions: 9 },
    { month: 'Jun', predictions: 35, accuracy: 94, interventions: 8 }
  ];

  const deviceViews = [
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'mobile', name: 'Mobile', icon: Smartphone }
  ];

  const demoSteps = [
    {
      title: 'Real-time Risk Assessment',
      description: 'AI continuously monitors student behavior patterns and academic performance',
      highlight: 'predictions'
    },
    {
      title: 'Intervention Triggers',
      description: 'Automatic alerts when risk levels exceed thresholds',
      highlight: 'interventions'
    },
    {
      title: 'Accuracy Improvement',
      description: 'ML model learns and improves prediction accuracy over time',
      highlight: 'accuracy'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Our System in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI-driven dropout prediction and intervention management
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Video/Demo Section */}
          <div className="flex-1 w-full">
            {/* Device Selection */}
            <div className="flex justify-center mb-6 space-x-4">
              {deviceViews.map((device) => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.id}
                    onClick={() => setCurrentView(device.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentView === device.id
                        ? 'bg-white text-gray-900'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {device.name}
                  </button>
                );
              })}
            </div>

            {/* Demo Screen */}
            <div className={`
              mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden
              ${currentView === 'desktop' ? 'max-w-4xl' : 
                currentView === 'tablet' ? 'max-w-2xl' : 'max-w-sm'}
            `}>
              {/* Mock Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center border-b">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">
                    aidropout.edu/dashboard
                  </div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-6 text-gray-900">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">AI Dropout Prediction Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live Data</span>
                  </div>
                </div>

                {/* Demo Chart */}
                <div className="mb-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={demoData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Demo Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">35</div>
                    <div className="text-xs text-gray-600">Predictions</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">8</div>
                    <div className="text-xs text-gray-600">Interventions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 mr-2" />
                ) : (
                  <Play className="h-5 w-5 mr-2" />
                )}
                {isPlaying ? 'Pause Demo' : 'Play Demo'}
              </button>
              <button className="flex items-center px-4 py-3 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all duration-200">
                <RotateCcw className="h-5 w-5 mr-2" />
                Restart
              </button>
            </div>
          </div>

          {/* Demo Steps */}
          <div className="flex-1 w-full lg:pl-8">
            <h3 className="text-2xl font-bold mb-8">How It Works</h3>
            <div className="space-y-6">
              {demoSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    isPlaying 
                      ? 'border-white bg-white bg-opacity-10' 
                      : 'border-white border-opacity-20 bg-white bg-opacity-5'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${isPlaying ? 'bg-white text-gray-900' : 'bg-white bg-opacity-20 text-white'}
                    `}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-8 border-t border-white border-opacity-20">
              <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium py-4 rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-16 border-t border-white border-opacity-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1,250+</div>
              <div className="text-gray-300">Students Monitored</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">94.2%</div>
              <div className="text-gray-300">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">23</div>
              <div className="text-gray-300">Dropouts Prevented</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-gray-300">Languages Supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;