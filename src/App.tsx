import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OnScrollSections from './components/OnScrollSections';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ChallengePage from './components/ChallengePage';
import SoloTaskPage from './components/SoloTaskPage';
import Notifications from './components/Notifications';
import LoadingAnimation from './components/LoadingAnimation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const navigateTo = (page: string, levelId?: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      if (levelId) setSelectedLevel(levelId);
      setIsLoading(false);
    }, 1500);
  };

  // Auto-navigate to dashboard if user is authenticated
  React.useEffect(() => {
    if (currentUser && currentPage !== 'dashboard' && currentPage !== 'challenge' && currentPage !== 'solo-task') {
      setCurrentPage('dashboard');
    } else if (!currentUser && (currentPage === 'dashboard' || currentPage === 'challenge' || currentPage === 'solo-task')) {
      setCurrentPage('home');
    }
  }, [currentUser, currentPage]);

  if (loading || isLoading) {
    return <LoadingAnimation />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      case 'dashboard':
        return currentUser ? (
          <Dashboard 
            onNavigate={navigateTo} 
            onShowNotifications={() => setShowNotifications(true)}
          />
        ) : (
          <LoginPage onNavigate={navigateTo} />
        );
      case 'challenge':
        return currentUser ? (
          <ChallengePage onNavigate={navigateTo} />
        ) : (
          <LoginPage onNavigate={navigateTo} />
        );
      case 'solo-task':
        return currentUser ? (
          <SoloTaskPage onNavigate={navigateTo} levelId={selectedLevel} />
        ) : (
          <LoginPage onNavigate={navigateTo} />
        );
      default:
        return (
          <>
            <HeroSection onNavigate={navigateTo} />
            <OnScrollSections />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
      {/* Only show main Navbar when not on SoloTaskPage */}
      {currentPage !== 'solo-task' && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={navigateTo}
          onShowNotifications={() => setShowNotifications(true)}
          currentUser={currentUser}
        />
      )}
      {renderCurrentPage()}
      
      {/* Notifications Modal */}
      <Notifications 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;