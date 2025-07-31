import React, { useState, useEffect } from 'react';
import { Trophy, Users, Clock, Target, Zap, Crown, X, Play, UserPlus, MessageCircle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: ChallengeParticipant[];
  maxParticipants: number;
  startTime: string;
  duration: number; // in minutes
  status: 'waiting' | 'active' | 'completed';
  xpReward: number;
  questionId: number;
}

interface ChallengeParticipant {
  userId: string;
  name: string;
  avatar: string;
  status: 'ready' | 'solving' | 'completed';
  score: number;
  completionTime?: number;
}

interface ChallengeSystemProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

const ChallengeSystem: React.FC<ChallengeSystemProps> = ({ isOpen, onClose, currentUserId }) => {
  const [activeTab, setActiveTab] = useState<'available' | 'my-challenges' | 'create'>('available');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showChallengeDetails, setShowChallengeDetails] = useState(false);

  useEffect(() => {
    // Mock challenges data
    const mockChallenges: Challenge[] = [
      {
        id: 'challenge1',
        title: 'Array Master Challenge',
        description: 'Solve array-based problems in a competitive environment',
        difficulty: 'Medium',
        participants: [
          { userId: 'user1', name: 'CodeMaster', avatar: '👨‍💻', status: 'ready', score: 0 },
          { userId: 'user2', name: 'AlgoQueen', avatar: '👩‍💻', status: 'ready', score: 0 },
          { userId: 'user3', name: 'BinaryBeast', avatar: '🤖', status: 'ready', score: 0 }
        ],
        maxParticipants: 4,
        startTime: new Date(Date.now() + 300000).toISOString(), // 5 minutes from now
        duration: 30,
        status: 'waiting',
        xpReward: 500,
        questionId: 3
      },
      {
        id: 'challenge2',
        title: 'Speed Coding Battle',
        description: 'Fastest solution wins!',
        difficulty: 'Easy',
        participants: [
          { userId: 'user4', name: 'ArrayAce', avatar: '👨‍🎓', status: 'solving', score: 75 },
          { userId: 'user5', name: 'StackStar', avatar: '👩‍🎓', status: 'solving', score: 60 }
        ],
        maxParticipants: 3,
        startTime: new Date().toISOString(),
        duration: 15,
        status: 'active',
        xpReward: 300,
        questionId: 1
      },
      {
        id: 'challenge3',
        title: 'Expert Level Showdown',
        description: 'For advanced coders only',
        difficulty: 'Hard',
        participants: [
          { userId: 'user1', name: 'CodeMaster', avatar: '👨‍💻', status: 'completed', score: 100, completionTime: 1200 },
          { userId: 'user2', name: 'AlgoQueen', avatar: '👩‍💻', status: 'completed', score: 95, completionTime: 1350 }
        ],
        maxParticipants: 2,
        startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        duration: 45,
        status: 'completed',
        xpReward: 800,
        questionId: 5
      }
    ];

    setChallenges(mockChallenges);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'Waiting';
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const formatTimeUntilStart = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = start.getTime() - now.getTime();
    
    if (diff <= 0) return 'Started';
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && challenge.participants.length < challenge.maxParticipants) {
        const newParticipant: ChallengeParticipant = {
          userId: currentUserId || 'current-user',
          name: 'You',
          avatar: '👤',
          status: 'ready',
          score: 0
        };
        return {
          ...challenge,
          participants: [...challenge.participants, newParticipant]
        };
      }
      return challenge;
    }));
  };

  const leaveChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId) {
        return {
          ...challenge,
          participants: challenge.participants.filter(p => p.userId !== currentUserId)
        };
      }
      return challenge;
    }));
  };

  const isParticipating = (challenge: Challenge) => {
    return challenge.participants.some(p => p.userId === currentUserId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Challenge System</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-700 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'available' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Available Challenges
          </button>
          <button
            onClick={() => setActiveTab('my-challenges')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my-challenges' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            My Challenges
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'create' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Create Challenge
          </button>
        </div>

        {/* Content */}
        {activeTab === 'available' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Available Challenges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold">{challenge.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)} text-white`}>
                      {getStatusText(challenge.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className={`font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-gray-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {challenge.duration} min
                    </span>
                    <span className="text-yellow-400 font-medium">
                      +{challenge.xpReward} XP
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">
                        {challenge.participants.length}/{challenge.maxParticipants}
                      </span>
                    </div>
                    {challenge.status === 'waiting' && (
                      <span className="text-blue-400 text-sm">
                        Starts in {formatTimeUntilStart(challenge.startTime)}
                      </span>
                    )}
                  </div>

                  {/* Participants */}
                  <div className="flex gap-1 mb-4">
                    {challenge.participants.map((participant, index) => (
                      <div key={participant.userId} className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                        {participant.avatar}
                      </div>
                    ))}
                    {challenge.participants.length < challenge.maxParticipants && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm text-gray-400">
                        +
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!isParticipating(challenge) && challenge.status === 'waiting' && challenge.participants.length < challenge.maxParticipants ? (
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <UserPlus className="w-4 h-4" />
                        Join
                      </button>
                    ) : isParticipating(challenge) && challenge.status === 'waiting' ? (
                      <button
                        onClick={() => leaveChallenge(challenge.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Leave
                      </button>
                    ) : challenge.status === 'active' && isParticipating(challenge) ? (
                      <button
                        onClick={() => {
                          setSelectedChallenge(challenge);
                          setShowChallengeDetails(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        <Play className="w-4 h-4" />
                        Continue
                      </button>
                    ) : null}
                    
                    <button
                      onClick={() => {
                        setSelectedChallenge(challenge);
                        setShowChallengeDetails(true);
                      }}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my-challenges' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">My Challenges</h3>
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">You haven't joined any challenges yet.</p>
              <p className="text-gray-500 text-sm mt-2">Join a challenge to start competing!</p>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Challenge</h3>
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Challenge Title</label>
                  <input
                    type="text"
                    placeholder="Enter challenge title"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Difficulty</label>
                  <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-purple-500">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Max Participants</label>
                  <input
                    type="number"
                    placeholder="4"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    placeholder="Describe your challenge..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Create Challenge
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Challenge Details Modal */}
        {showChallengeDetails && selectedChallenge && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Challenge Details</h3>
                <button
                  onClick={() => setShowChallengeDetails(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white text-lg font-semibold mb-2">{selectedChallenge.title}</h4>
                  <p className="text-gray-300">{selectedChallenge.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-white font-semibold">Difficulty</div>
                    <div className={`${getDifficultyColor(selectedChallenge.difficulty)}`}>
                      {selectedChallenge.difficulty}
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-white font-semibold">Duration</div>
                    <div className="text-gray-300">{selectedChallenge.duration} minutes</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-white font-semibold">XP Reward</div>
                    <div className="text-yellow-400">+{selectedChallenge.xpReward} XP</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-white font-semibold">Status</div>
                    <div className={`${getStatusColor(selectedChallenge.status)} text-white px-2 py-1 rounded-full text-sm inline-block`}>
                      {getStatusText(selectedChallenge.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-white font-semibold mb-3">Participants</h5>
                  <div className="space-y-2">
                    {selectedChallenge.participants.map((participant) => (
                      <div key={participant.userId} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            {participant.avatar}
                          </div>
                          <div>
                            <div className="text-white font-medium">{participant.name}</div>
                            <div className="text-gray-400 text-sm capitalize">{participant.status}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{participant.score} pts</div>
                          {participant.completionTime && (
                            <div className="text-gray-400 text-sm">{participant.completionTime}s</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedChallenge.status === 'completed' && (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
                    <h5 className="text-white font-semibold mb-2">🏆 Winner</h5>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">CodeMaster</div>
                        <div className="text-yellow-400">100 points • 20:00</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {!isParticipating(selectedChallenge) && selectedChallenge.status === 'waiting' ? (
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Join Challenge
                    </button>
                  ) : isParticipating(selectedChallenge) && selectedChallenge.status === 'active' ? (
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Continue Solving
                    </button>
                  ) : null}
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    Close
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

export default ChallengeSystem; 