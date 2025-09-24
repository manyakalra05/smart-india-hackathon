import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Target, 
  Brain, 
  Users, 
  FileText, 
  Settings,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  const adminMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'predictions', label: t('predictions'), icon: Brain },
    { id: 'interventions', label: t('interventions'), icon: Target },
    { id: 'students', label: t('students'), icon: Users },
    { id: 'reports', label: t('reports'), icon: FileText },
    { id: 'settings', label: t('settings'), icon: Settings }
  ];

  const studentMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: GraduationCap },
    { id: 'settings', label: t('settings'), icon: Settings }
  ];

  const menuItems = isAdmin ? adminMenuItems : studentMenuItems;

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:top-0 md:h-screen md:translate-x-0
      `}>
        <div className="p-6">
          {/* Role indicator */}
          <div className={`mb-6 px-3 py-2 rounded-lg ${
            isAdmin 
              ? 'bg-gradient-to-r from-mac-red-100 to-mac-red-200 text-mac-red-800' 
              : 'bg-gradient-to-r from-mac-blue-100 to-mac-blue-200 text-mac-blue-800'
          }`}>
            <div className="text-xs font-medium uppercase tracking-wide opacity-75">
              {isAdmin ? 'Administrator' : 'Student'} Dashboard
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg
                    transition-all duration-200 transform hover:scale-105
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">78.5%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">IAY Score</span>
                  <span className="font-medium text-blue-600">72.3%</span>
                </div>
                {isAdmin && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">At Risk</span>
                    <span className="font-medium text-red-600">187</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;