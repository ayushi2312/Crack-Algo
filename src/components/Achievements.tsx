import React, { useState } from 'react';
import { X, Trophy, Star, Zap, Crown, Target, Puzzle, Diamond, Rocket } from 'lucide-react';
import { Achievement, Badge } from '../services/ProgressTracker';

interface AchievementsProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  badges: Badge[];
  totalXP: number;
}

const Achievements: React.FC<AchievementsProps> = ({ 
  isOpen, 
  onClose, 
  achievements, 
  badges, 
  totalXP 
}) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'badges' | 'stats'>('achievements');

  const getAchievementIcon = (achievementId: string) => {
    switch (achievementId) {
      case 'first_solve': return <Target className="w-6 h-6" />;
      case 'streak_3': return <Zap className="w-6 h-6" />;
      case 'streak_7': return <Star className="w-6 h-6" />;
      case 'streak_30': return <Crown className="w-6 h-6" />;
      case 'solve_10': return <Puzzle className="w-6 h-6" />;
      case 'solve_50': return <Trophy className="w-6 h-6" />;
      case 'perfect_accuracy': return <Diamond className="w-6 h-6" />;
      case 'speed_demon': return <Rocket className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Achievements & Progress</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* XP Display */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg">Total XP</h3>
              <p className="text-purple-200 text-sm">Keep solving to earn more!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{totalXP.toLocaleString()}</div>
              <div className="text-purple-200 text-sm">Experience Points</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'achievements' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Achievements ({achievements.length})
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'badges' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Badges ({badges.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'stats' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Statistics
          </button>
        </div>

        {/* Content */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Your Achievements</h3>
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No achievements unlocked yet!</p>
                <p className="text-gray-500 text-sm mt-2">Start solving problems to unlock achievements</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gray-700 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                        {getAchievementIcon(achievement.id)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{achievement.name}</h4>
                        <p className="text-gray-300 text-sm mt-1">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-yellow-400 text-sm font-medium">+{achievement.xpReward} XP</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Your Badges</h3>
            {badges.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No badges earned yet!</p>
                <p className="text-gray-500 text-sm mt-2">Complete special challenges to earn badges</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="text-center">
                    <div className={`w-16 h-16 ${getBadgeColor(badge.category)} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-medium text-sm">{badge.name}</h4>
                    <p className="text-gray-400 text-xs mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Statistics</h3>
            
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">10</div>
                <div className="text-gray-400 text-sm">Total Questions</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{achievements.length}</div>
                <div className="text-gray-400 text-sm">Achievements</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{badges.length}</div>
                <div className="text-gray-400 text-sm">Badges</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Completed Level 3</span>
                  <span className="text-green-400">+100 XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Unlocked "First Steps"</span>
                  <span className="text-yellow-400">+50 XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Completed Level 2</span>
                  <span className="text-green-400">+75 XP</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements; 