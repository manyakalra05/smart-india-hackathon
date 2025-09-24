import React from 'react';
import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h3 className="ml-3 text-lg font-bold text-gray-900">
                AI Dropout Prediction System
              </h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Revolutionizing education through AI-powered dropout prediction and 
              personalized interventions for every Indian student.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>for Smart India Hackathon 2024</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>AI Predictions</li>
              <li>Multi-lingual Support</li>
              <li>Real-time Analytics</li>
              <li>Behavioral Insights</li>
              <li>Intervention Tracking</li>
              <li>IAY Metrics</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © 2024 AI Dropout Prediction System. Built for Smart India Hackathon.
            </div>

            {/* Social Links */}
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Built with React, Tailwind CSS, Recharts • Powered by Advanced ML Models • 
              Supporting Hindi, Bengali, Tamil, English
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;