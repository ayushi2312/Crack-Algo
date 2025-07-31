import React, { useState } from 'react';
import { Coins, TrendingUp, TrendingDown, X, Filter, Calendar, Target, Trophy, Lightbulb, Clock } from 'lucide-react';
import ProgressTracker, { CoinTransaction } from '../services/ProgressTracker';

interface CoinHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

const CoinHistory: React.FC<CoinHistoryProps> = ({ isOpen, onClose, currentUserId }) => {
  const [filterType, setFilterType] = useState<'all' | 'earned' | 'spent'>('all');
  const [filterSource, setFilterSource] = useState<'all' | 'question' | 'achievement' | 'challenge' | 'streak' | 'purchase' | 'reward'>('all');

  const coinHistory = ProgressTracker.getCoinHistory(currentUserId || 'current-user');
  const currentBalance = ProgressTracker.getCoinBalance(currentUserId || 'current-user');

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'question': return <Target className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'challenge': return <TrendingUp className="w-4 h-4" />;
      case 'streak': return <TrendingUp className="w-4 h-4" />;
      case 'purchase': return <TrendingDown className="w-4 h-4" />;
      case 'reward': return <Coins className="w-4 h-4" />;
      default: return <Coins className="w-4 h-4" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'question': return 'text-green-400';
      case 'achievement': return 'text-yellow-400';
      case 'challenge': return 'text-purple-400';
      case 'streak': return 'text-blue-400';
      case 'purchase': return 'text-red-400';
      case 'reward': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'question': return 'Question';
      case 'achievement': return 'Achievement';
      case 'challenge': return 'Challenge';
      case 'streak': return 'Streak';
      case 'purchase': return 'Purchase';
      case 'reward': return 'Reward';
      default: return 'Other';
    }
  };

  const filteredHistory = coinHistory.filter(transaction => {
    const typeMatch = filterType === 'all' || transaction.type === filterType;
    const sourceMatch = filterSource === 'all' || transaction.source === filterSource;
    return typeMatch && sourceMatch;
  });

  const totalEarned = coinHistory
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = coinHistory
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Coin History</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/30">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{currentBalance}</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm">Total Earned</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{totalEarned}</div>
            <div className="text-gray-400 text-sm">Coins earned</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-gray-300 text-sm">Total Spent</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{totalSpent}</div>
            <div className="text-gray-400 text-sm">Coins spent</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300 text-sm">Current Balance</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{currentBalance}</div>
            <div className="text-gray-400 text-sm">Available coins</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-gray-700 text-white text-sm rounded px-3 py-1 border border-gray-600"
            >
              <option value="all">All</option>
              <option value="earned">Earned</option>
              <option value="spent">Spent</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-300 text-sm">Source:</span>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value as any)}
              className="bg-gray-700 text-white text-sm rounded px-3 py-1 border border-gray-600"
            >
              <option value="all">All Sources</option>
              <option value="question">Questions</option>
              <option value="achievement">Achievements</option>
              <option value="challenge">Challenges</option>
              <option value="streak">Streaks</option>
              <option value="purchase">Purchases</option>
              <option value="reward">Rewards</option>
            </select>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-semibold">Type</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Reason</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Source</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-600 hover:bg-gray-600/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {transaction.type === 'earned' ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                          <span className={`font-medium ${
                            transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'earned' ? 'Earned' : 'Spent'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-yellow-400" />
                          <span className={`font-bold ${
                            transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white">{transaction.reason}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={getSourceColor(transaction.source)}>
                            {getSourceIcon(transaction.source)}
                          </div>
                          <span className={`text-sm ${getSourceColor(transaction.source)}`}>
                            {getSourceLabel(transaction.source)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">
                            {formatDate(transaction.timestamp)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Total Transactions:</span>
                <span className="text-white font-semibold">{coinHistory.length}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Earnings:</span>
                <span className="text-green-400 font-semibold">+{totalEarned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Spending:</span>
                <span className="text-red-400 font-semibold">-{totalSpent}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Net Gain:</span>
                <span className={`font-semibold ${totalEarned - totalSpent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalEarned - totalSpent >= 0 ? '+' : ''}{totalEarned - totalSpent}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Most Common Source:</span>
                <span className="text-white font-semibold">
                  {(() => {
                    const sourceCounts = coinHistory.reduce((acc, t) => {
                      acc[t.source] = (acc[t.source] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    const mostCommon = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0];
                    return mostCommon ? getSourceLabel(mostCommon[0]) : 'None';
                  })()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last Transaction:</span>
                <span className="text-white font-semibold">
                  {coinHistory.length > 0 ? formatDate(coinHistory[0].timestamp) : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinHistory; 