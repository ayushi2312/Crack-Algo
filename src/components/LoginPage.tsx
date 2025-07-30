import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, Eye, EyeOff, AlertCircle, User } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';
import { auth } from '../firebase/config'; // Added for the test button

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Track sign-in attempt
      logEvent(analytics, 'login_attempt', {
        method: 'google'
      });
      
      await signInWithGoogle();
      
      // Track successful sign-in
      logEvent(analytics, 'login', {
        method: 'google'
      });
      
      onNavigate('dashboard');
    } catch (error: any) {
      // Track sign-in error
      logEvent(analytics, 'login_error', {
        method: 'google',
        error: error.message
      });
      
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('Attempting email sign-in with:', { email, password: password.length });
    
    try {
      // Track sign-in attempt
      logEvent(analytics, 'login_attempt', {
        method: 'email'
      });
      
      const user = await signInWithEmail(email, password);
      console.log('Sign-in successful:', user);
      
      // Track successful sign-in
      logEvent(analytics, 'login', {
        method: 'email'
      });
      
      onNavigate('dashboard');
    } catch (error: any) {
      console.error('Sign-in error:', error);
      
      // Track sign-in error
      logEvent(analytics, 'login_error', {
        method: 'email',
        error: error.message
      });
      
      // Check if it's the "not implemented" error and provide a better message
      if (error.message.includes('not implemented')) {
        setError('Please enable Email/Password authentication in your Firebase project. For now, use Google Sign-In.');
      } else {
        setError(error.message || 'Failed to sign in with email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('Attempting email sign-up with:', { email, password: password.length, confirmPassword: confirmPassword.length });
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      // Track sign-up attempt
      logEvent(analytics, 'signup_attempt', {
        method: 'email'
      });
      
      const user = await signUpWithEmail(email, password);
      console.log('Sign-up successful:', user);
      
      // Track successful sign-up
      logEvent(analytics, 'signup', {
        method: 'email'
      });
      
      onNavigate('dashboard');
    } catch (error: any) {
      console.error('Sign-up error:', error);
      
      // Track sign-up error
      logEvent(analytics, 'signup_error', {
        method: 'email',
        error: error.message
      });
      
      // Check if it's the "not implemented" error and provide a better message
      if (error.message.includes('not implemented')) {
        setError('Please enable Email/Password authentication in your Firebase project. For now, use Google Sign-In.');
      } else {
        setError(error.message || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Join CrackAlgo' : 'Welcome Back'}
          </h2>
          <p className="text-gray-300">
            {isSignUp ? 'Start your DSA mastery journey' : 'Sign in to continue your coding journey'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {/* Firebase Setup Instructions */}
        {error && error.includes('enable Email/Password') && (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">How to Enable Email/Password Authentication:</h4>
            <ol className="text-blue-300 text-sm space-y-1">
              <li>1. Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
              <li>2. Select your project: <strong>crashalgo-c77f3</strong></li>
              <li>3. Click "Authentication" in the left sidebar</li>
              <li>4. Go to "Sign-in method" tab</li>
              <li>5. Click on "Email/Password"</li>
              <li>6. Toggle "Enable" to ON</li>
              <li>7. Click "Save"</li>
              <li>8. Refresh this page and try again</li>
            </ol>
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Test Firebase Connection */}
        <button
          onClick={() => {
            console.log('Testing Firebase connection...');
            console.log('Auth object:', auth);
            console.log('Current user:', auth.currentUser);
            console.log('Available providers:', auth.config);
            setError('Firebase connection test - check console for details');
          }}
          className="w-full flex items-center justify-center gap-3 bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
        >
          Test Firebase Connection
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-gray-400">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Choose a username"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter your email"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder={isSignUp ? "Create a password (min 6 characters)" : "Enter your password"}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign in')}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setUsername('');
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;