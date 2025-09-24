import React from 'react';
import { Brain, TrendingUp, Users, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Hero = ({ onGetStarted }) => {
  const { t } = useLanguage();

  const features = [
    { icon: Brain, text: 'AI-Powered Predictions' },
    { icon: TrendingUp, text: 'Real-time Analytics' },
    { icon: Users, text: 'Multi-stakeholder Support' },
    { icon: Zap, text: 'Instant Interventions' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mac-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-mac-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-mac-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">
              {t('heroTitle')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            {t('heroSubtitle')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={onGetStarted}
              className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200"
            >
              {t('getStarted')}
            </button>
            <button className="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200">
              {t('learnMore')}
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <feature.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <p className="text-sm font-medium text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Stats section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-mac-green-600 to-mac-green-700 bg-clip-text text-transparent">
                78.5%
              </div>
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-mac-yellow-600 to-mac-yellow-700 bg-clip-text text-transparent">
                1,250+
              </div>
              <div className="text-gray-600 mt-2">Students Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-mac-red-600 to-mac-red-700 bg-clip-text text-transparent">
                23
              </div>
              <div className="text-gray-600 mt-2">Dropouts Prevented</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;