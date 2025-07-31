import React from 'react';
import { Lock, Star, Crown, Zap, CheckCircle, Play } from 'lucide-react';

interface LevelMapProps {
  currentLevel: number;
}

interface Level {
  id: number;
  name: string;
  difficulty: string;
  problemsCount: number;
  xpReward: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  position: { x: number; y: number };
}

const LevelMap: React.FC<LevelMapProps> = ({ currentLevel }) => {
  // DSA-themed level names that are engaging and educational
  const levelNames = [
    // Beginner Levels (1-10)
    "Array Basics", "String Magic", "Number Games", "Simple Math", "First Steps",
    "Loop Mastery", "Condition Logic", "Variable Power", "Function Fun", "Basic Patterns",
    
    // Easy Levels (11-25)
    "Two Pointers", "Sliding Window", "Binary Search", "Sorting Basics", "Hash Maps",
    "Stack Operations", "Queue Logic", "Linked Lists", "Tree Introduction", "Graph Basics",
    "Recursion Start", "Dynamic Arrays", "String Manipulation", "Math Tricks", "Logic Puzzles",
    
    // Medium Levels (26-40)
    "Advanced Arrays", "Complex Strings", "Tree Traversal", "Graph Search", "Dynamic Programming",
    "Greedy Algorithms", "Backtracking", "Bit Manipulation", "Advanced Sorting", "Heap Operations",
    "Union Find", "Trie Structures", "Segment Trees", "Binary Search Trees", "Advanced Recursion",
    
    // Hard Levels (41-50)
    "Expert Arrays", "Master Strings", "Complex Trees", "Advanced Graphs", "Hard DP",
    "Advanced Greedy", "Complex Backtracking", "Expert Bit Manipulation", "Master Sorting", "Advanced Heaps",
    "Complex Union Find", "Advanced Tries", "Segment Tree Mastery", "Red-Black Trees", "Expert Recursion",
    "Advanced Algorithms", "Competitive Problems", "Interview Prep", "System Design", "Algorithm Mastery"
  ];

  const levels: Level[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: levelNames[i] || `Level ${i + 1}`,
    difficulty: i < 10 ? 'Easy' : i < 25 ? 'Medium' : i < 40 ? 'Hard' : 'Expert',
    problemsCount: Math.floor(Math.random() * 5) + 3,
    xpReward: (i + 1) * 100,
    isCompleted: i + 1 < currentLevel,
    isCurrent: i + 1 === currentLevel,
    isLocked: i + 1 > currentLevel,
    // Position for winding path layout
    position: getPositionForLevel(i)
  }));

  function getPositionForLevel(index: number) {
    const row = Math.floor(index / 5);
    const col = index % 5;
    
    // Create zigzag pattern like Candy Crush
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 4 - col;
    
    return {
      x: actualCol * 120 + 60,
      y: row * 100 + 60
    };
  }

  const getDifficultyColor = (difficulty: string, isCompleted: boolean, isCurrent: boolean, isLocked: boolean) => {
    if (isLocked) return 'from-gray-400 to-gray-500';
    if (isCompleted) return 'from-green-400 to-lime-500';
    if (isCurrent) return 'from-gold to-yellow-400';
    
    switch (difficulty) {
      case 'Easy': return 'from-blue-400 to-cyan-400';
      case 'Medium': return 'from-orange-400 to-yellow-500';
      case 'Hard': return 'from-red-400 to-pink-500';
      case 'Expert': return 'from-purple-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelIcon = (level: Level) => {
    if (level.isCompleted) return <CheckCircle className="h-8 w-8 text-white" />;
    if (level.isCurrent) return <Crown className="h-8 w-8 text-white animate-pulse" />;
    if (level.isLocked) return <Lock className="h-6 w-6 text-gray-400" />;
    return <Play className="h-6 w-6 text-white" />;
  };

  const getPathBetweenLevels = (from: { position: { x: number; y: number } }, to: { position: { x: number; y: number } }) => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const midX = from.position.x + dx / 2;
    const midY = from.position.y + dy / 2;
    
    return `M ${from.position.x} ${from.position.y} Q ${midX} ${midY - 20} ${to.position.x} ${to.position.y}`;
  };

  const maxY = Math.max(...levels.map(l => l.position.y)) + 100;

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-white mb-6">Your DSA Journey</h2>
      
      {/* Level Map Container - No scroll, full background */}
      <div className="relative bg-gradient-to-br from-green-200 via-lime-100 to-yellow-200 rounded-3xl border-4 border-green-300 p-8" style={{ minHeight: maxY }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-300 to-lime-300 rounded-3xl"></div>
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-pink-400 rounded-full opacity-60"></div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute bottom-8 left-12 w-10 h-10 bg-purple-400 rounded-full opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-7 h-7 bg-orange-400 rounded-full opacity-60"></div>
        </div>

        {/* SVG for paths */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ height: maxY }}
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          {/* Draw paths between levels */}
          {levels.slice(0, -1).map((level, index) => {
            const nextLevel = levels[index + 1];
            const isPathActive = level.isCompleted;
            
            return (
              <path
                key={`path-${level.id}`}
                d={getPathBetweenLevels(level, nextLevel)}
                stroke={isPathActive ? "url(#pathGradient)" : "#9CA3AF"}
                strokeWidth="6"
                fill="none"
                strokeDasharray={isPathActive ? "0" : "10,5"}
                className={isPathActive ? "opacity-100" : "opacity-50"}
              />
            );
          })}
        </svg>

        {/* Level Nodes */}
        <div className="relative z-20" style={{ height: maxY }}>
          {levels.map((level) => (
            <div
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: level.position.x,
                top: level.position.y
              }}
            >
              {/* Level Circle */}
              <div 
                className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  level.isCompleted 
                    ? 'border-green-300 shadow-lg shadow-green-500/50' 
                    : level.isCurrent 
                    ? 'border-gold shadow-lg shadow-gold/50 animate-pulse' 
                    : level.isLocked 
                    ? 'border-gray-400' 
                    : 'border-white shadow-lg'
                } bg-gradient-to-br ${getDifficultyColor(level.difficulty, level.isCompleted, level.isCurrent, level.isLocked)}`}
              >
                {getLevelIcon(level)}
                
                {/* Glowing Effect for Current Level */}
                {level.isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-yellow-400 animate-ping opacity-30"></div>
                )}

                {/* Level Number */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  {level.id}
                </div>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                  <div className="font-semibold">{level.name}</div>
                  <div className="text-gray-300">{level.difficulty}</div>
                  {!level.isLocked && (
                    <div className="flex items-center gap-1 mt-1">
                      <Zap className="h-3 w-3 text-lime-400" />
                      <span className="text-lime-400">{level.xpReward} XP</span>
                    </div>
                  )}
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
              </div>

              {/* Stars for completed levels */}
              {level.isCompleted && (
                <div className="absolute -top-2 -right-2 flex">
                  {[1, 2, 3].map((star) => (
                    <Star 
                      key={star} 
                      className="h-3 w-3 text-gold fill-current" 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Stats */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg z-30">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{currentLevel - 1}</div>
            <div className="text-xs text-gray-600">Levels Completed</div>
          </div>
          <div className="mt-2 w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-lime-500 to-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${((currentLevel - 1) / levels.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Lives/Hearts Display */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg z-30">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((heart) => (
              <div 
                key={heart}
                className="w-6 h-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-red-500 rounded-full relative">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Progress Summary */}
      <div className="mt-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-lime-400">{currentLevel - 1}</div>
            <div className="text-sm text-gray-400">Levels Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{currentLevel}</div>
            <div className="text-sm text-gray-400">Current Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">{levels.length - currentLevel + 1}</div>
            <div className="text-sm text-gray-400">Levels Remaining</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{Math.round(((currentLevel - 1) / levels.length) * 100)}%</div>
            <div className="text-sm text-gray-400">Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;