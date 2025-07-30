import React from 'react';
import { Code, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOutUser, analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      // Track sign-out from navbar
      logEvent(analytics, 'navbar_logout');
      
      await signOutUser();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg group-hover:scale-110 transition-transform">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CrackAlgo
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              About
            </a>
            <a href="#explore" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              Explore
            </a>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="h-4 w-4" />
                  <span className="text-sm">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logEvent(analytics, 'navbar_dashboard_click');
                    onNavigate('dashboard');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-lg hover:from-green-700 hover:to-blue-600 transition-all duration-200 font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:border-red-400 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 font-medium transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-purple-500/20">
            <div className="px-4 py-4 space-y-4">
              <a href="#about" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium">
                About
              </a>
              <a href="#explore" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium">
                Explore
              </a>
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 text-gray-300 py-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logEvent(analytics, 'mobile_navbar_dashboard_click');
                      onNavigate('dashboard');
                    }}
                    className="w-full px-6 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-lg hover:from-green-700 hover:to-blue-600 transition-all duration-200 font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-6 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:border-red-400 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;