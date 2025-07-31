import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, TrendingUp, Users, Target, Star, Plus, Search, MessageCircle, UserPlus, X, BarChart3, Calendar, Award } from 'lucide-react';
import { UserProgress } from '../services/ProgressTracker';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose, currentUserId }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'college'>('global');
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [leaderboardData, setLeaderboardData] = useState<UserProgress[]>([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendSearch, setFriendSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Mock leaderboard data
    const mockData: UserProgress[] = [
      {
        userId: 'user1',
        completedQuestions: [1, 2, 3, 4, 5, 6, 7, 8],
        currentLevel: 9,
        totalXP: 2250,
        streak: 25,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 8,
          totalSubmissions: 12,
          averageExecutionTime: 800,
          favoriteTopics: ['Arrays', 'Dynamic Programming'],
          longestStreak: 25,
          currentStreak: 25,
          accuracy: 92.5
        }
      },
      {
        userId: 'user2',
        completedQuestions: [1, 2, 3, 4, 5, 6],
        currentLevel: 7,
        totalXP: 1650,
        streak: 18,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 6,
          totalSubmissions: 9,
          averageExecutionTime: 1200,
          favoriteTopics: ['Arrays', 'Strings'],
          longestStreak: 18,
          currentStreak: 18,
          accuracy: 88.9
        }
      },
      {
        userId: 'user3',
        completedQuestions: [1, 2, 3, 4, 5],
        currentLevel: 6,
        totalXP: 1250,
        streak: 12,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 5,
          totalSubmissions: 7,
          averageExecutionTime: 1500,
          favoriteTopics: ['Arrays'],
          longestStreak: 12,
          currentStreak: 12,
          accuracy: 85.7
        }
      },
      {
        userId: 'user4',
        completedQuestions: [1, 2, 3, 4],
        currentLevel: 5,
        totalXP: 950,
        streak: 8,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 4,
          totalSubmissions: 6,
          averageExecutionTime: 1800,
          favoriteTopics: ['Arrays', 'Stack'],
          longestStreak: 8,
          currentStreak: 8,
          accuracy: 83.3
        }
      },
      {
        userId: 'user5',
        completedQuestions: [1, 2, 3],
        currentLevel: 4,
        totalXP: 750,
        streak: 5,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 3,
          totalSubmissions: 5,
          averageExecutionTime: 2000,
          favoriteTopics: ['Arrays'],
          longestStreak: 5,
          currentStreak: 5,
          accuracy: 80.0
        }
      }
    ];

    setLeaderboardData(mockData);

    // Mock friends data
    const mockFriends: Friend[] = [
      { id: 'user2', name: 'AlgoQueen', avatar: '👩‍💻', status: 'online', lastSeen: new Date().toISOString() },
      { id: 'user4', name: 'ArrayAce', avatar: '👨‍🎓', status: 'busy', lastSeen: new Date().toISOString() },
      { id: 'user6', name: 'CodeNinja', avatar: '🤖', status: 'offline', lastSeen: new Date(Date.now() - 3600000).toISOString() }
    ];
    setFriends(mockFriends);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return { text: 'DSA Ka Raja', color: 'bg-yellow-500 text-black' };
      case 2: return { text: 'Silver Master', color: 'bg-gray-400 text-white' };
      case 3: return { text: 'Bronze Expert', color: 'bg-amber-600 text-white' };
      case 4: return { text: 'Rising Star', color: 'bg-blue-500 text-white' };
      case 5: return { text: 'Code Warrior', color: 'bg-green-500 text-white' };
      default: return { text: 'Coder', color: 'bg-gray-600 text-white' };
    }
  };

  const getUserDisplayName = (userId: string) => {
    const names: { [key: string]: string } = {
      'user1': 'CodeMaster',
      'user2': 'AlgoQueen',
      'user3': 'BinaryBeast',
      'user4': 'ArrayAce',
      'user5': 'StackStar'
    };
    return names[userId] || userId;
  };

  const getUserAvatar = (userId: string) => {
    const avatars: { [key: string]: string } = {
      'user1': '👨‍💻',
      'user2': '👩‍💻',
      'user3': '🤖',
      'user4': '👨‍🎓',
      'user5': '👩‍🎓'
    };
    return avatars[userId] || '👤';
  };

  const handleAddFriend = () => {
    if (friendSearch.trim()) {
      // Mock add friend functionality
      const newFriend: Friend = {
        id: friendSearch,
        name: friendSearch,
        avatar: '👤',
        status: 'offline',
        lastSeen: new Date().toISOString()
      };
      setFriends([...friends, newFriend]);
      setFriendSearch('');
      setShowAddFriend(false);
    }
  };

  const handleUserClick = (user: UserProgress) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getFilteredData = () => {
    if (activeTab === 'friends') {
      const friendIds = friends.map(f => f.id);
      return leaderboardData.filter(user => friendIds.includes(user.userId));
    }
    return leaderboardData;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Stats
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{leaderboardData.length}</div>
              <div className="text-gray-400 text-sm">Total Participants</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.max(...leaderboardData.map(u => u.totalXP)).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Highest XP</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {Math.max(...leaderboardData.map(u => u.streak))}
              </div>
              <div className="text-gray-400 text-sm">Longest Streak</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.max(...leaderboardData.map(u => u.statistics.totalQuestionsSolved))}
              </div>
              <div className="text-gray-400 text-sm">Most Solved</div>
            </div>
          </div>
        )}

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Tab Filter */}
          <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'global' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'friends' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Friends ({friends.length})
            </button>
            <button
              onClick={() => setActiveTab('college')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'college' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              College
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeFilter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeFilter === 'week' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeFilter === 'month' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              This Month
            </button>
          </div>

          {/* Add Friend Button */}
          {activeTab === 'friends' && (
            <button
              onClick={() => setShowAddFriend(!showAddFriend)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add Friend
            </button>
          )}
        </div>

        {/* Add Friend Input */}
        {showAddFriend && (
          <div className="mb-6 bg-gray-700 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                  placeholder="Enter friend's username or ID"
                  className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                onClick={handleAddFriend}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddFriend(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Friends List (for Friends tab) */}
        {activeTab === 'friends' && (
          <div className="mb-6 bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Your Friends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg">
                  <div className="relative">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-lg">
                      {friend.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(friend.status)} rounded-full border-2 border-gray-700`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{friend.name}</div>
                    <div className="text-gray-400 text-sm capitalize">{friend.status}</div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-semibold">Rank</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">User</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">Level</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">XP</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">Streak</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">Solved</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">Accuracy</th>
                  <th className="px-4 py-3 text-center text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredData().map((user, index) => {
                  const rank = index + 1;
                  const rankBadge = getRankBadge(rank);
                  const isCurrentUser = user.userId === currentUserId;
                  const isFriend = friends.some(f => f.id === user.userId);
                  
                  return (
                    <tr 
                      key={user.userId} 
                      className={`border-b border-gray-600 ${
                        isCurrentUser ? 'bg-purple-500/20' : 'hover:bg-gray-600/50 cursor-pointer'
                      }`}
                      onClick={() => handleUserClick(user)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getRankIcon(rank)}
                          {rank > 3 && <span className="text-gray-400 font-bold">{rank}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-lg">
                            {getUserAvatar(user.userId)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">
                                {getUserDisplayName(user.userId)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${rankBadge.color}`}>
                                {rankBadge.text}
                              </span>
                              {isFriend && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                                  Friend
                                </span>
                              )}
                            </div>
                            <div className="text-gray-400 text-sm">ID: {user.userId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-white font-semibold">Level {user.currentLevel}</div>
                        <div className="text-gray-400 text-sm">{user.statistics.totalQuestionsSolved}/10</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-white font-semibold">{user.totalXP.toLocaleString()}</div>
                        <div className="text-green-400 text-sm">+{user.totalXP - (user.totalXP * 0.9)} this week</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="w-4 h-4 text-orange-400" />
                          <span className="text-white font-semibold">{user.streak}</span>
                        </div>
                        <div className="text-gray-400 text-sm">days</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-white font-semibold">{user.statistics.totalQuestionsSolved}</div>
                        <div className="text-gray-400 text-sm">questions</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-white font-semibold">{user.statistics.accuracy}%</div>
                        <div className="text-gray-400 text-sm">
                          {user.statistics.totalSubmissions} attempts
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {!isFriend && user.userId !== currentUserId && (
                            <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                              <UserPlus className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-purple-400 transition-colors">
                            <Award className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Position */}
        {currentUserId && (
          <div className="mt-6 bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-white font-semibold mb-2">Your Position</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <span className="text-white">You are currently ranked #3</span>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">1,250 XP</div>
                <div className="text-gray-400 text-sm">12 days streak</div>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Modal */}
        {showUserProfile && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">User Profile</h3>
                <button
                  onClick={() => setShowUserProfile(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-3xl">
                    {getUserAvatar(selectedUser.userId)}
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-semibold">
                      {getUserDisplayName(selectedUser.userId)}
                    </h4>
                    <p className="text-gray-400">ID: {selectedUser.userId}</p>
                    <p className="text-purple-400">Level {selectedUser.currentLevel}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{selectedUser.totalXP}</div>
                    <div className="text-gray-400 text-sm">Total XP</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedUser.streak}</div>
                    <div className="text-gray-400 text-sm">Current Streak</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{selectedUser.statistics.totalQuestionsSolved}</div>
                    <div className="text-gray-400 text-sm">Questions Solved</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{selectedUser.statistics.accuracy}%</div>
                    <div className="text-gray-400 text-sm">Accuracy</div>
                  </div>
                </div>

                {/* Favorite Topics */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">Favorite Topics</h5>
                  <div className="flex gap-2 flex-wrap">
                    {selectedUser.statistics.favoriteTopics.map((topic, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">Recent Activity</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Completed Level 8</span>
                      <span className="text-green-400">+100 XP</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Unlocked "Week Warrior"</span>
                      <span className="text-yellow-400">+250 XP</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Completed Level 7</span>
                      <span className="text-green-400">+75 XP</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <UserPlus className="w-4 h-4" />
                    Add Friend
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Award className="w-4 h-4" />
                    Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;