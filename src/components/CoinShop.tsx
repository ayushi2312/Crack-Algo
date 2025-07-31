import React, { useState } from 'react';
import { Coins, Zap, Lightbulb, Clock, Star, X, ShoppingCart, Gift, Crown, Target } from 'lucide-react';
import ProgressTracker, { CoinTransaction } from '../services/ProgressTracker';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: 'hint' | 'powerup' | 'cosmetic' | 'boost';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: string;
}

interface CoinShopProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
}

const CoinShop: React.FC<CoinShopProps> = ({ isOpen, onClose, currentUserId }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hint' | 'powerup' | 'cosmetic' | 'boost'>('all');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const currentCoins = ProgressTracker.getCoinBalance(currentUserId || 'current-user');

  const shopItems: ShopItem[] = [
    // Hints
    {
      id: 'hint-basic',
      name: 'Basic Hint',
      description: 'Get a helpful hint for any question',
      price: 25,
      icon: <Lightbulb className="w-6 h-6" />,
      category: 'hint',
      rarity: 'common',
      effect: 'Reveals a basic hint for the current question'
    },
    {
      id: 'hint-advanced',
      name: 'Advanced Hint',
      description: 'Get a detailed hint with approach',
      price: 50,
      icon: <Lightbulb className="w-6 h-6" />,
      category: 'hint',
      rarity: 'rare',
      effect: 'Reveals the problem-solving approach'
    },
    {
      id: 'hint-solution',
      name: 'Solution Preview',
      description: 'See the first few lines of the solution',
      price: 100,
      icon: <Lightbulb className="w-6 h-6" />,
      category: 'hint',
      rarity: 'epic',
      effect: 'Shows the beginning of the optimal solution'
    },

    // Power-ups
    {
      id: 'time-freeze',
      name: 'Time Freeze',
      description: 'Freeze the timer for 5 minutes',
      price: 75,
      icon: <Clock className="w-6 h-6" />,
      category: 'powerup',
      rarity: 'rare',
      effect: 'Pauses the question timer for 5 minutes'
    },
    {
      id: 'double-xp',
      name: 'Double XP Boost',
      description: 'Earn double XP for 1 hour',
      price: 150,
      icon: <Star className="w-6 h-6" />,
      category: 'powerup',
      rarity: 'epic',
      effect: 'All XP earned is doubled for 60 minutes'
    },
    {
      id: 'coin-magnet',
      name: 'Coin Magnet',
      description: 'Earn 50% more coins for 30 minutes',
      price: 200,
      icon: <Coins className="w-6 h-6" />,
      category: 'powerup',
      rarity: 'epic',
      effect: 'Increases coin rewards by 50% for 30 minutes'
    },

    // Cosmetics
    {
      id: 'profile-frame',
      name: 'Golden Frame',
      description: 'Exclusive golden profile frame',
      price: 300,
      icon: <Crown className="w-6 h-6" />,
      category: 'cosmetic',
      rarity: 'legendary',
      effect: 'Adds a golden border to your profile picture'
    },
    {
      id: 'username-color',
      name: 'Rainbow Username',
      description: 'Colorful animated username',
      price: 250,
      icon: <Zap className="w-6 h-6" />,
      category: 'cosmetic',
      rarity: 'epic',
      effect: 'Makes your username display in rainbow colors'
    },
    {
      id: 'achievement-badge',
      name: 'Custom Badge',
      description: 'Create your own achievement badge',
      price: 500,
      icon: <Target className="w-6 h-6" />,
      category: 'cosmetic',
      rarity: 'legendary',
      effect: 'Design and display your custom achievement badge'
    },

    // Boosts
    {
      id: 'streak-protector',
      name: 'Streak Protector',
      description: 'Protect your streak for 1 day',
      price: 100,
      icon: <Shield className="w-6 h-6" />,
      category: 'boost',
      rarity: 'rare',
      effect: 'Prevents streak loss if you miss a day'
    },
    {
      id: 'question-unlock',
      name: 'Question Unlock',
      description: 'Unlock any locked question',
      price: 200,
      icon: <Unlock className="w-6 h-6" />,
      category: 'boost',
      rarity: 'epic',
      effect: 'Unlocks any question regardless of level requirements'
    },
    {
      id: 'challenge-entry',
      name: 'Challenge Entry',
      description: 'Free entry to any challenge',
      price: 150,
      icon: <Trophy className="w-6 h-6" />,
      category: 'boost',
      rarity: 'rare',
      effect: 'Grants free entry to any available challenge'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-600';
      case 'rare': return 'bg-blue-600';
      case 'epic': return 'bg-purple-600';
      case 'legendary': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (selectedItem && currentUserId) {
      const success = ProgressTracker.spendCoins(
        currentUserId,
        selectedItem.price,
        `Purchased ${selectedItem.name}`,
        'purchase'
      );
      
      if (success) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          setShowPurchaseModal(false);
          setPurchaseSuccess(false);
          setSelectedItem(null);
        }, 2000);
      } else {
        alert('Insufficient coins!');
        setShowPurchaseModal(false);
        setSelectedItem(null);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Coin Shop</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/30">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{currentCoins}</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setSelectedCategory('hint')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'hint' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            Hints
          </button>
          <button
            onClick={() => setSelectedCategory('powerup')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'powerup' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            Power-ups
          </button>
          <button
            onClick={() => setSelectedCategory('cosmetic')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'cosmetic' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            Cosmetics
          </button>
          <button
            onClick={() => setSelectedCategory('boost')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'boost' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            Boosts
          </button>
        </div>

        {/* Shop Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-purple-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${getRarityBg(item.rarity)} rounded-lg flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <span className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                      {item.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-bold">{item.price}</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{item.description}</p>
              
              {item.effect && (
                <div className="bg-gray-600 rounded p-2 mb-3">
                  <p className="text-gray-300 text-xs">
                    <span className="text-purple-400 font-medium">Effect:</span> {item.effect}
                  </p>
                </div>
              )}
              
              <button
                onClick={() => handlePurchase(item)}
                disabled={currentCoins < item.price}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  currentCoins >= item.price
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentCoins >= item.price ? 'Purchase' : 'Insufficient Coins'}
              </button>
            </div>
          ))}
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/30">
              {!purchaseSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${getRarityBg(selectedItem.rarity)} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      {selectedItem.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedItem.name}</h3>
                    <p className="text-gray-300">{selectedItem.description}</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Price:</span>
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold">{selectedItem.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-300">Your Balance:</span>
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold">{currentCoins}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-300">Remaining:</span>
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold">{currentCoins - selectedItem.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={confirmPurchase}
                      className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirm Purchase
                    </button>
                    <button
                      onClick={() => setShowPurchaseModal(false)}
                      className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-white mb-2">Purchase Successful!</h3>
                  <p className="text-gray-300">You now own {selectedItem.name}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Missing icon components
const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Unlock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);

const Trophy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14M5 7h14M5 11h14M5 15h14M5 19h14" />
  </svg>
);

export default CoinShop; 