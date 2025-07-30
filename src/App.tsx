import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OnScrollSections from './components/OnScrollSections';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import LoadingAnimation from './components/LoadingAnimation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (page: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 1500);
  };

  // Auto-navigate to dashboard if user is authenticated
  React.useEffect(() => {
    if (currentUser && currentPage !== 'dashboard') {
      setCurrentPage('dashboard');
    } else if (!currentUser && currentPage === 'dashboard') {
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
        return currentUser ? <Dashboard onNavigate={navigateTo} /> : <LoginPage onNavigate={navigateTo} />;
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
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      {renderCurrentPage()}
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