import React, { useState } from 'react';
import { ArrowLeft, Crown, Users, Plus, Settings, Star, LogOut, User } from 'lucide-react';
import Leaderboard from './Leaderboard';
import ProfileSidebar from './ProfileSidebar';
import LevelMap from './LevelMap';
import FriendsWideView from './FriendsWideView';
import { useAuth } from '../contexts/AuthContext';
import { signOutUser, analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [currentLevel, setCurrentLevel] = useState(5);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showFriendsView, setShowFriendsView] = useState(true);

  const handleSignOut = async () => {
    try {
      // Track sign-out event
      logEvent(analytics, 'logout');
      
      await signOutUser();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Sample friends data
  const friends = [
    { id: '1', name: 'AlgoMaster99', avatar: '👑', level: 18, xp: 15420, title: 'DSA ka Raja', isOnline: true },
    { id: '2', name: 'CodeNinja', avatar: '🥈', level: 17, xp: 14230, title: 'Ninja Coder', isOnline: false, lastActive: '2h ago' },
    { id: '3', name: 'DataStructureQueen', avatar: '🥉', level: 16, xp: 13890, title: 'Data Queen', isOnline: true },
    { id: '4', name: 'BinaryTreeBoss', avatar: '🏆', level: 15, xp: 12560, title: 'Tree Master', isOnline: false, lastActive: '1d ago' },
    { id: '5', name: 'GraphGuru', avatar: '⭐', level: 14, xp: 11840, title: 'Graph Expert', isOnline: true },
    { id: '6', name: 'SortingSensei', avatar: '🔥', level: 13, xp: 10920, title: 'Sort Master', isOnline: false, lastActive: '30m ago' },
    { id: '7', name: 'RecursionRider', avatar: '⚡', level: 12, xp: 9870, title: 'Recursion Pro', isOnline: true },
    { id: '8', name: 'HashMapHero', avatar: '💎', level: 11, xp: 8950, title: 'Hash Master', isOnline: false, lastActive: '5h ago' },
    { id: '9', name: 'QueueQueen', avatar: '🚀', level: 10, xp: 7820, title: 'Queue Expert', isOnline: true },
    { id: '10', name: 'StackStar', avatar: '✨', level: 9, xp: 6740, title: 'Stack Pro', isOnline: false, lastActive: '1h ago' },
    { id: '11', name: 'LinkedListLord', avatar: '🎯', level: 8, xp: 5630, title: 'List Master', isOnline: true },
    { id: '12', name: 'ArrayAce', avatar: '🎪', level: 7, xp: 4520, title: 'Array Pro', isOnline: false, lastActive: '3h ago' },
    { id: '13', name: 'StringSage', avatar: '🎨', level: 6, xp: 3410, title: 'String Expert', isOnline: true },
    { id: '14', name: 'MathWizard', avatar: '🔢', level: 5, xp: 2300, title: 'Math Pro', isOnline: false, lastActive: '10m ago' },
    { id: '15', name: 'LogicLover', avatar: '🧠', level: 4, xp: 1200, title: 'Logic Master', isOnline: true },
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg border-b border-purple-500/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </button>
              <div className="h-6 w-px bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-white">Your Journey</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Friends Toggle */}
              <button 
                onClick={() => {
                  const newState = !showFriendsView;
                  setShowFriendsView(newState);
                  
                  // Track friends view toggle
                  logEvent(analytics, 'friends_view_toggle', {
                    visible: newState
                  });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFriendsView 
                    ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' 
                    : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-purple-500'
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="font-semibold">Friends</span>
              </button>

              {/* XP Display */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-lime-500/20 to-green-500/20 px-4 py-2 rounded-lg border border-lime-500/20">
                <Star className="h-5 w-5 text-lime-400" />
                <span className="text-lime-400 font-semibold">2,450 XP</span>
              </div>

              {/* Level Display */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-lg border border-purple-500/20">
                <Crown className="h-5 w-5 text-gold" />
                <span className="text-white font-semibold">Level {currentLevel}</span>
              </div>

              {/* User Info */}
              {currentUser && (
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-600">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
              )}

              {/* Settings */}
              <button className="p-2 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors">
                <Settings className="h-5 w-5 text-gray-400" />
              </button>

              {/* Sign Out */}
              <button 
                onClick={handleSignOut}
                className="p-2 bg-red-600/20 rounded-lg border border-red-500/30 hover:border-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Leaderboard Sidebar */}
        <Leaderboard 
          isOpen={isLeaderboardOpen}
          onToggle={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isLeaderboardOpen ? 'ml-80' : 'ml-0'} ${isProfileOpen ? 'mr-80' : 'mr-0'}`}>
          <div className="p-6">
            {/* Progress Overview */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/20 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Your Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-lime-400">24</div>
                    <div className="text-sm text-gray-400">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">5</div>
                    <div className="text-sm text-gray-400">Current Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold">#12</div>
                    <div className="text-sm text-gray-400">Global Rank</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Friends Wide View */}
            {showFriendsView && (
              <div className="mb-8">
                <FriendsWideView friends={friends} />
              </div>
            )}

            {/* Level Map */}
            <LevelMap currentLevel={currentLevel} />

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/20 hover:border-purple-400 transition-all hover:scale-105 group">
                  <Users className="h-8 w-8 text-purple-400 mb-3 group-hover:text-purple-300" />
                  <h4 className="font-semibold text-white mb-2">Challenge Friends</h4>
                  <p className="text-sm text-gray-400">Invite friends for a coding battle</p>
                </button>
                
                <button className="p-6 bg-gradient-to-r from-lime-600/20 to-green-600/20 rounded-xl border border-lime-500/20 hover:border-lime-400 transition-all hover:scale-105 group">
                  <Plus className="h-8 w-8 text-lime-400 mb-3 group-hover:text-lime-300" />
                  <h4 className="font-semibold text-white mb-2">Random Problem</h4>
                  <p className="text-sm text-gray-400">Practice with a surprise challenge</p>
                </button>
                
                <button className="p-6 bg-gradient-to-r from-gold/20 to-yellow-600/20 rounded-xl border border-gold/20 hover:border-gold/40 transition-all hover:scale-105 group">
                  <Crown className="h-8 w-8 text-gold mb-3 group-hover:text-yellow-300" />
                  <h4 className="font-semibold text-white mb-2">Leaderboard</h4>
                  <p className="text-sm text-gray-400">See where you rank globally</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sidebar */}
        <ProfileSidebar 
          isOpen={isProfileOpen}
          onToggle={() => setIsProfileOpen(!isProfileOpen)}
        />
      </div>

      {/* Toggle Buttons */}
      <button
        onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-r-lg transition-all duration-300 ${isLeaderboardOpen ? 'translate-x-80' : 'translate-x-0'}`}
      >
        <Crown className="h-5 w-5" />
      </button>

      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-lime-600 to-green-500 text-white p-3 rounded-l-lg transition-all duration-300 ${isProfileOpen ? '-translate-x-80' : 'translate-x-0'}`}
      >
        <Star className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Dashboard;