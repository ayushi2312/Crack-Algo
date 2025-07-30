import React, { useState } from 'react';
import { Crown, Trophy, Medal, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeaderboardProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onToggle }) => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendId, setFriendId] = useState('');

  const leaderboardData = [
    { rank: 1, name: 'AlgoMaster99', xp: 15420, level: 18, avatar: '👑', title: 'DSA ka Raja' },
    { rank: 2, name: 'CodeNinja', xp: 14230, level: 17, avatar: '🥈' },
    { rank: 3, name: 'DataStructureQueen', xp: 13890, level: 16, avatar: '🥉' },
    { rank: 4, name: 'BinaryTreeBoss', xp: 12560, level: 15, avatar: '🏆' },
    { rank: 5, name: 'GraphGuru', xp: 11840, level: 14, avatar: '⭐' },
    { rank: 6, name: 'SortingSensei', xp: 10920, level: 13, avatar: '🔥' },
    { rank: 7, name: 'RecursionRider', xp: 9870, level: 12, avatar: '⚡' },
    { rank: 8, name: 'HashMapHero', xp: 8950, level: 11, avatar: '💎' },
    { rank: 9, name: 'QueueQueen', xp: 7820, level: 10, avatar: '🚀' },
    { rank: 10, name: 'StackStar', xp: 6740, level: 9, avatar: '✨' },
    { rank: 11, name: 'LinkedListLord', xp: 5630, level: 8, avatar: '🎯' },
    { rank: 12, name: 'You', xp: 2450, level: 5, avatar: '👤', isCurrentUser: true }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-gold" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-500" />;
    return <span className="text-purple-400 font-bold">#{rank}</span>;
  };

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
      <div className={`fixed left-0 top-16 bottom-0 w-80 bg-black/40 backdrop-blur-lg border-r border-purple-500/20 transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Leaderboard</h2>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors lg:hidden"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Top Player Highlight */}
          <div className="bg-gradient-to-r from-gold/20 to-yellow-600/20 rounded-xl border border-gold/30 p-4 mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2">👑</div>
              <h3 className="font-bold text-gold text-lg">DSA ka Raja</h3>
              <p className="text-white font-semibold">{leaderboardData[0].name}</p>
              <p className="text-sm text-gray-300">{leaderboardData[0].xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Add Friend Button */}
          <div className="mb-4">
            {!showAddFriend ? (
              <button
                onClick={() => setShowAddFriend(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Friend
              </button>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                    placeholder="Enter Friend ID"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Add friend logic here
                      setShowAddFriend(false);
                      setFriendId('');
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddFriend(false);
                      setFriendId('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Rankings List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer ${
                  player.isCurrentUser
                    ? 'bg-lime-500/20 border-lime-500/30 shadow-lg'
                    : player.rank <= 3
                    ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/20'
                    : 'bg-gray-800/30 border-gray-600/20 hover:border-purple-500/30'
                }`}
              >
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(player.rank)}
                </div>

                {/* Avatar */}
                <div className="text-2xl">{player.avatar}</div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate ${
                    player.isCurrentUser ? 'text-lime-400' : 'text-white'
                  }`}>
                    {player.name}
                    {player.title && (
                      <span className="text-xs text-gold ml-2">({player.title})</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    Level {player.level} • {player.xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Collapse Button (Desktop) */}
          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:text-white transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Collapse
          </button>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;