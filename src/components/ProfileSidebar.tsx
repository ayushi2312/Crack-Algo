import React from 'react';
import { Star, Settings, LogOut, User, Trophy, Target, Calendar, ChevronRight } from 'lucide-react';

interface ProfileSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onToggle }) => {
  const userStats = [
    { label: 'Problems Solved', value: '24', icon: <Target className="h-4 w-4" />, color: 'text-blue-400' },
    { label: 'Total XP', value: '2,450', icon: <Star className="h-4 w-4" />, color: 'text-lime-400' },
    { label: 'Current Level', value: '5', icon: <Trophy className="h-4 w-4" />, color: 'text-gold' },
    { label: 'Days Active', value: '15', icon: <Calendar className="h-4 w-4" />, color: 'text-purple-400' }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Solved your first problem', earned: true },
    { name: 'Speed Demon', description: 'Solved 5 problems in one day', earned: true },
    { name: 'Array Master', description: 'Completed all array problems', earned: false },
    { name: 'Social Butterfly', description: 'Added 10 friends', earned: false }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-16 bottom-0 w-80 bg-black/40 backdrop-blur-lg border-l border-purple-500/20 transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Profile</h2>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors lg:hidden"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* User Avatar & Info */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3">
                U
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-lime-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white">CrackAlgoUser</h3>
            <p className="text-sm text-gray-400">Joined 15 days ago</p>
          </div>

          {/* XP Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Level 5 Progress</span>
              <span className="text-sm text-lime-400 font-semibold">2,450 / 3,000 XP</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-lime-500 to-green-500 transition-all duration-1000"
                style={{ width: '82%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">550 XP to next level</p>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Statistics</h4>
            <div className="grid grid-cols-2 gap-3">
              {userStats.map((stat, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-3 border border-gray-600/20">
                  <div className={`flex items-center gap-2 mb-1 ${stat.color}`}>
                    {stat.icon}
                    <span className="text-xs font-medium">{stat.label}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="flex-1 overflow-y-auto mb-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Recent Achievements</h4>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-gradient-to-r from-gold/20 to-yellow-600/20 border-gold/30'
                      : 'bg-gray-800/30 border-gray-600/20 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-gold text-black' : 'bg-gray-600 text-gray-400'
                    }`}>
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-semibold text-sm ${
                        achievement.earned ? 'text-gold' : 'text-gray-400'
                      }`}>
                        {achievement.name}
                      </h5>
                      <p className="text-xs text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 hover:text-white transition-all duration-200">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 hover:text-red-300 transition-all duration-200">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* Collapse Button (Desktop) */}
          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:text-white transition-all duration-200"
          >
            Collapse
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;