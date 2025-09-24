import React from 'react';
import { BarChart3, Globe, Zap, Shield, Brain, Target, MessageCircle, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('predictiveAnalytics'),
      description: t('predictiveDesc'),
      color: 'mac-green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: t('multiLingual'),
      description: t('multiLingualDesc'),
      color: 'mac-yellow',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Zap,
      title: t('realTimeIntervention'),
      description: t('realTimeDesc'),
      color: 'mac-red',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: t('explainableAI'),
      description: t('explainableDesc'),
      color: 'mac-blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Behavioral Analytics',
      description: 'Deep analysis of fee patterns, mental health indicators, and engagement metrics',
      color: 'mac-purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Stakeholder Collaboration',
      description: 'Real-time collaboration platform for teachers, parents, counselors, and administrators',
      color: 'mac-indigo',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: MessageCircle,
      title: 'AI Chatbot Support',
      description: 'Multi-lingual AI chatbot for instant support and guidance in local languages',
      color: 'mac-pink',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'IAY Metric',
      description: 'Novel Intervention Action Yield metric tracking 30-day behavioral improvements',
      color: 'mac-teal',
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI-powered solution designed for the Indian education landscape
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon container */}
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-200`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Education?
            </h3>
            <p className="text-gray-600 mb-6">
              Join the revolution in preventing student dropouts with our AI-powered platform
            </p>
            <button className="btn-primary">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;