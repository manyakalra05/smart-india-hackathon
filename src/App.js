import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Landing components
import Hero from './components/Landing/Hero';
import Features from './components/Landing/Features';
import USP from './components/Landing/USP';

// Auth components
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

// Dashboard components
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import Analytics from './components/Dashboard/Analytics';
import Predictions from './components/Dashboard/Predictions';
import Interventions from './components/Dashboard/Interventions';
import StudentsManagement from './components/Dashboard/StudentsManagement';
import Reports from './components/Dashboard/Reports';
import Settings from './components/Dashboard/Settings';
import StudentProgress from './components/Dashboard/StudentProgress';
import StudentProfile from './components/Dashboard/StudentProfile';

// CSS
import './index.css';

// Main App Content
const AppContent = () => {
  const { user, isAuthenticated, loading, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuClick={() => setShowMobileMenu(!showMobileMenu)}
          showMobileMenu={showMobileMenu}
        />
        
        <div className="flex">
          <Sidebar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={showMobileMenu}
            onClose={() => setShowMobileMenu(false)}
          />
          
          <main className="flex-1 p-6">
            {(() => {
              switch (activeTab) {
                case 'dashboard':
                  return isAdmin ? <AdminDashboard /> : <StudentDashboard />;
                case 'analytics':
                  return isAdmin ? <Analytics /> : <div className="text-center text-gray-500 mt-20">Not authorized</div>;
                case 'predictions':
                  return isAdmin ? <Predictions /> : <div className="text-center text-gray-500 mt-20">Not authorized</div>;
                case 'interventions':
                  return isAdmin ? <Interventions /> : <div className="text-center text-gray-500 mt-20">Not authorized</div>;
                case 'students':
                  return isAdmin ? <StudentsManagement /> : <div className="text-center text-gray-500 mt-20">Not authorized</div>;
                case 'reports':
                  return isAdmin ? <Reports /> : <div className="text-center text-gray-500 mt-20">Not authorized</div>;
                case 'progress':
                  return !isAdmin ? <StudentProgress /> : <div className="text-center text-gray-500 mt-20">Not available</div>;
                case 'profile':
                  return !isAdmin ? <StudentProfile /> : <div className="text-center text-gray-500 mt-20">Not available</div>;
                case 'settings':
                  return <Settings />;
                default:
                  return isAdmin ? <AdminDashboard /> : <StudentDashboard />;
              }
            })()}
          </main>
        </div>
      </div>
    );
  }

  // If not authenticated, show appropriate page
  switch (currentPage) {
    case 'login':
      return <Login onSwitchToSignup={() => setCurrentPage('signup')} />;
    case 'signup':
      return <SignUp onSwitchToLogin={() => setCurrentPage('login')} />;
    default:
      return (
        <div>
          <Hero onGetStarted={() => setCurrentPage('login')} />
          <Features />
          <USP />
        </div>
      );
  }
};

// Main App Component
const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;