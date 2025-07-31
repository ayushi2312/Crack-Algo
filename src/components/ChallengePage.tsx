import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Trophy, Play, Eye, EyeOff } from 'lucide-react';

interface ChallengePageProps {
  onNavigate: (page: string) => void;
}

interface Player {
  id: string;
  name: string;
  avatar: string;
  xpInvested: number;
  isOnline: boolean;
  progress: number;
}

const ChallengePage: React.FC<ChallengePageProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');

  // Sample players data
  const [players] = useState<Player[]>([
    { id: '1', name: 'AlgoMaster99', avatar: '👑', xpInvested: 500, isOnline: true, progress: 85 },
    { id: '2', name: 'CodeNinja', avatar: '🥈', xpInvested: 300, isOnline: true, progress: 72 },
    { id: '3', name: 'DataStructureQueen', avatar: '🥉', xpInvested: 400, isOnline: false, progress: 65 },
    { id: '4', name: 'BinaryTreeBoss', avatar: '🏆', xpInvested: 250, isOnline: true, progress: 58 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    setShowLeaderboard(true);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowLeaderboard(true);
    }, 2000);
  };

  const handleRunCode = () => {
    setShowTerminal(true);
    setTerminalOutput('Running code...\nCompilation successful!\nTest case 1: PASSED\nTest case 2: PASSED\nTest case 3: PASSED\nAll test cases passed! ✅');
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '⚡' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg border-b border-purple-500/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-white">Group Challenge</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                timeLeft < 300 ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
              }`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>

              {/* Players Count */}
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-500/30">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">{players.length} Players</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Question & Code Editor */}
          <div className="space-y-6">
            {/* Question Section */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Challenge: Two Sum</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Given an array of integers <code className="bg-gray-800 px-2 py-1 rounded">nums</code> and an integer <code className="bg-gray-800 px-2 py-1 rounded">target</code>, 
                  return indices of the two numbers such that they add up to target.
                </p>
                <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Example:</h4>
                  <p className="text-sm">
                    <strong>Input:</strong> nums = [2,7,11,15], target = 9<br/>
                    <strong>Output:</strong> [0,1]<br/>
                    <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                  </p>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Code Editor</h3>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-600 text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.icon} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Write your ${selectedLanguage} solution here
function twoSum(nums, target) {
    // Your code here
}`}
                  className="w-full h-64 bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span>No copy-paste allowed</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRunCode}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    Run
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trophy className="h-4 w-4" />
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>

            {/* Terminal */}
            {showTerminal && (
              <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Terminal</h3>
                  <button
                    onClick={() => setShowTerminal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <EyeOff className="h-5 w-5" />
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
                  <pre>{terminalOutput}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Players & Leaderboard */}
          <div className="space-y-6">
            {/* Players Progress */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Players Progress</h3>
              <div className="space-y-3">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl">{player.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-semibold">{player.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-sm font-bold">{player.xpInvested} XP</span>
                          <div className={`w-2 h-2 rounded-full ${player.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${player.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{player.progress}% complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Pool */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Challenge Pool</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {players.reduce((sum, player) => sum + player.xpInvested, 0)} XP
                </div>
                <p className="text-gray-300 text-sm">Winner takes all + bonus rewards!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl border border-purple-500/30 p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Challenge Complete!</h2>
              <p className="text-gray-300">Here are the results:</p>
            </div>

            <div className="space-y-3 mb-6">
              {players
                .sort((a, b) => b.progress - a.progress)
                .map((player, index) => (
                  <div key={player.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' : 'bg-gray-800/50'
                  }`}>
                    <div className="text-2xl">{player.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{player.name}</span>
                        <span className={`font-bold ${index === 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {index === 0 ? '🏆 Winner!' : `${player.progress}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage; 