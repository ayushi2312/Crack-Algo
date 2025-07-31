import React, { useState } from 'react';
import { Crown, Star, User, Bell, Trophy, Coins, Target, BarChart3, Zap, ShoppingCart, History } from 'lucide-react';
import Leaderboard from './Leaderboard';
import Achievements from './Achievements';
import ChallengeSystem from './ChallengeSystem';
import CoinShop from './CoinShop';
import CoinHistory from './CoinHistory';

interface DashboardProps {
  onNavigate: (page: string, levelId?: number) => void;
  onShowNotifications: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onShowNotifications }) => {
  const [currentLevel] = useState(5);
  const [coins] = useState(450);
  const [totalXP] = useState(1250);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [showCoinHistory, setShowCoinHistory] = useState(false);

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Code...", avatar: "👨", college: "IIT Delhi", level: 22, xp: 5420, isTop: true },
    { rank: 2, name: "AlgoQueen", avatar: "👩", college: "IIT Bombay", level: 20, xp: 4890 },
    { rank: 3, name: "BinaryBeast", avatar: "👨", college: "IIT Madras", level: 19, xp: 4650 },
    { rank: 4, name: "ArrayAce", avatar: "👩", college: "IIT Kharagpur", level: 18, xp: 4320 },
    { rank: 5, name: "StackStar", avatar: "👨", college: "IIT Kanpur", level: 17, xp: 4100 }
  ];

            // Sample level data - Updated to match questions database
          const levelData = [
            { id: 1, name: "Array Basics", category: "Arrays", difficulty: "Easy", xp: 50, status: "completed", stars: 3 },
            { id: 2, name: "Two Pointers", category: "Arrays", difficulty: "Easy", xp: 75, status: "completed", stars: 2 },
            { id: 3, name: "Sliding Window", category: "Arrays", difficulty: "Medium", xp: 100, status: "available" },
            { id: 4, name: "Binary Search", category: "Search", difficulty: "Medium", xp: 125, status: "available" },
            { id: 5, name: "Valid Parentheses", category: "Stack", difficulty: "Easy", xp: 150, status: "available" },
            { id: 6, name: "First Non-Repeating", category: "Queue", difficulty: "Medium", xp: 175, status: "available" },
            { id: 7, name: "Reverse Linked List", category: "Linked List", difficulty: "Easy", xp: 200, status: "available" },
            { id: 8, name: "Inorder Traversal", category: "Tree", difficulty: "Medium", xp: 250, status: "available" },
            { id: 9, name: "DFS Traversal", category: "Graph", difficulty: "Medium", xp: 300, status: "available" },
            { id: 10, name: "Fibonacci Number", category: "Dynamic Programming", difficulty: "Easy", xp: 350, status: "available" }
          ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">✓</div>;
      case 'available':
        return <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">?</div>;
      case 'locked':
        return <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">🔒</div>;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleLevelClick = (level: any) => {
    if (level.status === 'locked') {
      // Show a message that level is locked
      alert(`Level ${level.id} is locked. Complete previous levels to unlock it!`);
      return;
    }
    
    // Navigate to SoloTaskPage with the level ID
    onNavigate('solo-task', level.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-white font-bold text-xl">CrackAlgo</span>
            </div>
            
                                <nav className="flex items-center gap-6">
                      <button className="text-white font-medium">Dashboard</button>
                      <button 
                        onClick={() => setShowChallenges(true)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Battle
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">Problems</button>
                      <button 
                        onClick={() => setShowLeaderboard(true)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Leaderboard
                      </button>
                    </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={onShowNotifications} className="relative">
              <Bell className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">kaumari2324</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Welcome back, kaumari2324!</h1>
        <p className="text-gray-300">Ready to continue your DSA mastery journey?</p>
      </div>

      {/* Main Content - Three Columns */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Leaderboard */}
          <div className="col-span-3">
            <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Leaderboard</h2>
                <select className="bg-purple-800 text-white text-sm rounded px-2 py-1 border border-purple-600">
                  <option>Global</option>
                  <option>Friends</option>
                  <option>College</option>
                </select>
              </div>
              
              <div className="space-y-3">
                {leaderboardData.map((player) => (
                  <div key={player.rank} className={`flex items-center gap-3 p-3 rounded-lg ${
                    player.isTop ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' : 'bg-purple-800/30'
                  }`}>
                    <div className="relative">
                      <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center text-lg">
                        {player.avatar}
                      </div>
                      {player.isTop && (
                        <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{player.name}</span>
                        {player.isTop && (
                          <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">DSA Ka Raja</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{player.college}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white font-semibold">Level {player.level}</div>
                      <div className="text-purple-300 text-sm">{player.xp.toLocaleString()} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Level Map */}
          <div className="col-span-6">
            <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Level Map</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
                    <span className="text-gray-300">Completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center text-xs">🔒</div>
                    <span className="text-gray-300">Locked</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Winding Path */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg"></div>
                
                {/* Level Grid */}
                <div className="relative grid grid-cols-5 gap-4 p-4">
                  {levelData.map((level) => (
                    <div 
                      key={level.id} 
                      className="relative group"
                      onClick={() => handleLevelClick(level)}
                    >
                      <div className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        level.status === 'completed' ? 'bg-green-500/20 border-green-500/50' :
                        level.status === 'available' ? 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30 cursor-pointer' :
                        'bg-gray-500/20 border-gray-500/50'
                      } ${level.status !== 'locked' ? 'hover:scale-105 hover:shadow-lg' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          {getStatusIcon(level.status)}
                          <span className="text-white font-bold text-sm">Level {level.id}</span>
                        </div>
                        
                        <h3 className="text-white font-semibold text-sm mb-1">{level.name}</h3>
                        <p className="text-gray-400 text-xs mb-2">{level.category}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${getDifficultyColor(level.difficulty)}`}>
                            {level.difficulty}
                          </span>
                          <span className="text-purple-300 text-xs">+{level.xp} XP</span>
                        </div>
                        
                        {level.stars && (
                          <div className="flex gap-1 mt-2">
                            {[...Array(level.stars)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Hover tooltip for locked levels */}
                      {level.status === 'locked' && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Locked
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className="col-span-3">
            <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-purple-500/20 p-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold">Code Warrior</h3>
                <p className="text-gray-400 text-sm">ID: CK5DOFBO</p>
              </div>
              
                                    {/* Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300 text-sm">Total XP</span>
                          </div>
                          <span className="text-white font-semibold">{totalXP.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300 text-sm">Coins</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold">{coins}</span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setShowCoinShop(true)}
                                className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                                title="Shop"
                              >
                                <ShoppingCart className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setShowCoinHistory(true)}
                                className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                                title="History"
                              >
                                <History className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
              
              {/* Level Progress */}
              <div className="bg-purple-800/30 rounded-lg p-3 mb-4">
                <div className="text-center mb-2">
                  <span className="text-white font-bold text-lg">Level {currentLevel}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-gray-400 text-sm text-center">250 XP to next</p>
              </div>
              
                                    {/* Recent Badges */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">Recent Badges</h4>
                          <button 
                            onClick={() => setShowAchievements(true)}
                            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                          >
                            View All
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                            <Target className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                            <Star className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                            <Trophy className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 text-xs">
                          <span className="text-gray-400">First Solve</span>
                          <span className="text-gray-400">7-Day Streak</span>
                          <span className="text-gray-400">Array Master</span>
                        </div>
                      </div>
              
              {/* Activity Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Solved</span>
                  <span className="text-white font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Battles Won</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Streak Days</span>
                  <span className="text-white font-semibold">5</span>
                </div>
              </div>
                          </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Modal */}
        <Leaderboard 
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          currentUserId="current-user"
        />

        {/* Challenge System Modal */}
        <ChallengeSystem 
          isOpen={showChallenges}
          onClose={() => setShowChallenges(false)}
          currentUserId="current-user"
        />

        {/* Coin Shop Modal */}
        <CoinShop 
          isOpen={showCoinShop}
          onClose={() => setShowCoinShop(false)}
          currentUserId="current-user"
        />

        {/* Coin History Modal */}
        <CoinHistory 
          isOpen={showCoinHistory}
          onClose={() => setShowCoinHistory(false)}
          currentUserId="current-user"
        />

        {/* Achievements Modal */}
        <Achievements 
          isOpen={showAchievements}
          onClose={() => setShowAchievements(false)}
          achievements={[
            {
              id: 'first_solve',
              name: 'First Steps',
              description: 'Solve your first question',
              icon: '🎯',
              unlockedAt: new Date().toISOString(),
              xpReward: 50
            },
            {
              id: 'streak_3',
              name: 'Getting Started',
              description: 'Maintain a 3-day streak',
              icon: '🔥',
              unlockedAt: new Date().toISOString(),
              xpReward: 100
            }
          ]}
          badges={[
            {
              id: 'array_master',
              name: 'Array Master',
              description: 'Complete all array problems',
              icon: '🏆',
              unlockedAt: new Date().toISOString(),
              category: 'beginner'
            }
          ]}
          totalXP={totalXP}
        />
      </div>
    );
  };

export default Dashboard;