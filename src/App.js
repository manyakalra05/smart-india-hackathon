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
                  return isAdmin ? <Analytics /> : <div>Not authorized</div>;
                case 'predictions':
                  return isAdmin ? <Predictions /> : <div>Not authorized</div>;
                case 'interventions':
                  return isAdmin ? <Interventions /> : <div>Not authorized</div>;
                case 'students':
                  return isAdmin ? <StudentsManagement /> : <div>Not authorized</div>;
                case 'progress':
                  return !isAdmin ? <StudentProgress /> : <div>Not available</div>;
                case 'profile':
                  return !isAdmin ? <StudentProfile /> : <div>Not available</div>;
                case 'reports':
                  return <Reports />;
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

// Placeholder components for missing dashboard sections
const StudentsManagement = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Students Management</h2>
    <p>Students management interface will be implemented here.</p>
  </div>
);

const StudentProgress = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">My Progress</h2>
    <p>Student progress tracking interface will be implemented here.</p>
  </div>
);

const StudentProfile = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">My Profile</h2>
    <p>Student profile management interface will be implemented here.</p>
  </div>
);

const Reports = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <p>Reports and documentation interface will be implemented here.</p>
  </div>
);

const Settings = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <p>Application settings interface will be implemented here.</p>
  </div>
);

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