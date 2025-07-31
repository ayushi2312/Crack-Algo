import React, { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onShowNotifications: () => void;
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onShowNotifications, currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">&lt;/&gt;</span>
              </div>
              <span className="text-2xl font-bold text-white">CrackAlgo</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'explore' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Explore
            </button>
            
            {/* Notifications for logged in users */}
            {currentUser && (
              <button
                onClick={onShowNotifications}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* Auth Buttons */}
            {currentUser ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-lg rounded-lg mt-2 border border-purple-500/20">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'explore' 
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                Explore
              </button>
              
              {/* Notifications for logged in users */}
              {currentUser && (
                <button
                  onClick={() => {
                    onShowNotifications();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Notifications
                </button>
              )}

              {/* Auth Buttons */}
              {currentUser ? (
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
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