import React from 'react';
import { Sparkles, Zap, Trophy } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Animated Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl overflow-hidden border border-purple-500/20">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                {/* Floating Code Blocks */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg opacity-80 animate-bounce">
                  <div className="flex items-center justify-center h-full text-black font-bold">
                    Array
                  </div>
                </div>
                <div className="absolute top-32 right-16 w-20 h-20 bg-gradient-to-r from-gold to-yellow-400 rounded-full opacity-80 animate-pulse">
                  <div className="flex items-center justify-center h-full text-black font-bold text-sm">
                    Tree
                  </div>
                </div>
                <div className="absolute bottom-32 left-16 w-14 h-14 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-80 animate-bounce delay-300">
                  <div className="flex items-center justify-center h-full text-black font-bold text-xs">
                    Stack
                  </div>
                </div>
                <div className="absolute bottom-16 right-12 w-18 h-18 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-80 animate-pulse delay-500">
                  <div className="flex items-center justify-center h-full text-white font-bold text-xs">
                    Graph
                  </div>
                </div>
                
                {/* Central Character */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                        <Sparkles className="h-12 w-12 text-purple-600 animate-spin" />
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold rounded-full animate-bounce">
                      <Zap className="h-5 w-5 text-black m-1.5" />
                    </div>
                  </div>
                </div>

                {/* Connecting Lines Animation */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full opacity-30">
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6C63FF" />
                        <stop offset="100%" stopColor="#00C6FF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M100,50 Q200,100 300,50 T500,50"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                    <path
                      d="M50,150 Q150,200 250,150 T450,150"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse delay-300"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                A way to learn{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  DSA
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                CrackAlgo is a gamified platform turning Data Structures & Algorithms into an addictive challenge — with fun levels, friend battles & leaderboards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('login')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <Trophy className="h-5 w-5 group-hover:animate-bounce" />
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-purple-500 text-purple-400 text-lg font-semibold rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400">1000+</div>
                <div className="text-sm text-gray-400">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">50+</div>
                <div className="text-sm text-gray-400">Levels</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;