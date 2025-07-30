import React from 'react';
import { Users, Crown, Star, Trophy, Medal } from 'lucide-react';
import { analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  title?: string;
  isOnline: boolean;
  lastActive?: string;
}

interface FriendsWideViewProps {
  friends: Friend[];
}

const FriendsWideView: React.FC<FriendsWideViewProps> = ({ friends }) => {
  const handleFriendClick = (friend: Friend) => {
    // Track friend interaction
    logEvent(analytics, 'friend_click', {
      friend_name: friend.name,
      friend_level: friend.level,
      friend_online: friend.isOnline
    });
    
    // Handle friend click - could open profile, start challenge, etc.
    console.log('Clicked on friend:', friend.name);
  };

  const getLevelStage = (level: number) => {
    if (level >= 20) return { stage: 'Master', color: 'text-gold', bgColor: 'bg-gold/20', borderColor: 'border-gold/30', glowColor: 'shadow-gold/50' };
    if (level >= 15) return { stage: 'Expert', color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30', glowColor: 'shadow-purple-500/50' };
    if (level >= 10) return { stage: 'Advanced', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', glowColor: 'shadow-blue-500/50' };
    if (level >= 5) return { stage: 'Intermediate', color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30', glowColor: 'shadow-green-500/50' };
    return { stage: 'Beginner', color: 'text-gray-400', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30', glowColor: 'shadow-gray-500/50' };
  };

  const getLevelIcon = (level: number) => {
    if (level >= 20) return <Crown className="h-4 w-4 text-gold" />;
    if (level >= 15) return <Trophy className="h-4 w-4 text-purple-400" />;
    if (level >= 10) return <Medal className="h-4 w-4 text-blue-400" />;
    if (level >= 5) return <Star className="h-4 w-4 text-green-400" />;
    return <Star className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Friends</h2>
          <span className="text-sm text-gray-400">({friends.length} friends)</span>
        </div>
        
        {/* Online Count */}
        <div className="flex items-center gap-2 text-sm text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{friends.filter(f => f.isOnline).length} online</span>
        </div>
      </div>

      <div className="relative">
        {/* Scrollable Friends Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {friends.map((friend) => {
            const levelStage = getLevelStage(friend.level);
            
            return (
              <div
                key={friend.id}
                className="flex-shrink-0 group cursor-pointer"
                onClick={() => handleFriendClick(friend)}
              >
                <div className="relative">
                  {/* Avatar Container */}
                  <div className={`relative w-20 h-20 rounded-full border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${
                    friend.isOnline 
                      ? 'border-green-500 shadow-lg shadow-green-500/30' 
                      : 'border-gray-600'
                  } ${levelStage.borderColor}`}>
                    
                    {/* Avatar */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-3xl group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                      {friend.avatar}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300 pointer-events-none"></div>

                    {/* Online Status */}
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}

                    {/* Level Badge */}
                    <div className={`absolute -top-2 -right-2 ${levelStage.bgColor} ${levelStage.borderColor} border rounded-full px-2 py-1 flex items-center gap-1`}>
                      {getLevelIcon(friend.level)}
                      <span className={`text-xs font-bold ${levelStage.color}`}>
                        {friend.level}
                      </span>
                    </div>
                  </div>

                  {/* Friend Info */}
                  <div className="mt-3 text-center">
                    <div className="text-sm font-semibold text-white truncate max-w-20">
                      {friend.name}
                    </div>
                    
                    {/* Level Stage */}
                    <div className={`text-xs font-medium ${levelStage.color} mt-1`}>
                      {levelStage.stage}
                    </div>

                    {/* XP */}
                    <div className="text-xs text-gray-400 mt-1">
                      {friend.xp.toLocaleString()} XP
                    </div>

                    {/* Level Progress Bar */}
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${levelStage.color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min((friend.xp % 1000) / 10, 100)}%` }}
                      ></div>
                    </div>

                    {/* Title if exists */}
                    {friend.title && (
                      <div className="text-xs text-gold mt-1 font-medium">
                        {friend.title}
                      </div>
                    )}

                    {/* Last Active */}
                    {!friend.isOnline && friend.lastActive && (
                      <div className="text-xs text-gray-500 mt-1">
                        {friend.lastActive}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicators */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-black/50 to-transparent rounded-l-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-l from-black/50 to-transparent rounded-r-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Empty State */}
      {friends.length === 0 && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No Friends Yet</h3>
          <p className="text-sm text-gray-500">Add friends to see their progress and challenge them!</p>
        </div>
      )}
    </div>
  );
};

export default FriendsWideView; 