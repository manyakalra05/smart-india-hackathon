import React from 'react';
import { Star, Heart, Globe, Gamepad2, Cpu, BarChart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const USP = () => {
  const { t } = useLanguage();

  const uspFeatures = [
    {
      icon: Heart,
      title: t('usp1Title'),
      description: t('usp1Desc'),
      color: 'mac-red',
      stats: '92% effectiveness',
      image: '🎯'
    },
    {
      icon: Cpu,
      title: t('usp2Title'),
      description: t('usp2Desc'),
      color: 'mac-yellow',
      stats: '15+ data points',
      image: '🧠'
    },
    {
      icon: Gamepad2,
      title: t('usp3Title'),
      description: t('usp3Desc'),
      color: 'mac-green',
      stats: '78% engagement',
      image: '🎮'
    },
    {
      icon: Globe,
      title: t('usp4Title'),
      description: t('usp4Desc'),
      color: 'mac-blue',
      stats: '4 languages',
      image: '🌐'
    }
  ];

  const metrics = [
    { label: 'Intervention Action Yield (IAY)', value: '72.3%', trend: '+15%' },
    { label: 'Dropout Prevention Rate', value: '78.5%', trend: '+22%' },
    { label: 'Parent Engagement', value: '84%', trend: '+35%' },
    { label: 'Early Detection Accuracy', value: '91.2%', trend: '+8%' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Our Unique Selling Points
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('whyChooseUs')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What makes our AI-powered dropout prediction system stand out from the competition
          </p>
        </div>

        {/* Main USP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {uspFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 text-6xl opacity-10 transform rotate-12 translate-x-4 -translate-y-2">
                {feature.image}
              </div>

              <div className="relative z-10">
                {/* Icon and stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <span className={`px-3 py-1 bg-${feature.color}-100 text-${feature.color}-800 rounded-full text-sm font-medium`}>
                    {feature.stats}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Novel Metrics Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Novel Evaluation Metrics
            </h3>
            <p className="text-gray-600">
              Measuring short-term impact with our innovative IAY metric
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {metric.label}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {metric.trend} vs baseline
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Our Competitive Edge
          </h3>
          <p className="text-lg mb-6 opacity-90">
            "AI that predicts, explains, and solves dropouts—through timely, personalized, 
            language-adapted interventions—bridging social, academic, and emotional gaps for 
            every Indian student."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">
              Explainable AI
            </span>
            <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">
              Multi-lingual Support
            </span>
            <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">
              Behavioral Analytics
            </span>
            <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">
              Real-time Interventions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USP;