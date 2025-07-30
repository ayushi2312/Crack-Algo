import React, { useRef } from 'react';
import { Crown, Users, Gamepad2, Target } from 'lucide-react';

const OnScrollSections: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Gamepad2 className="h-12 w-12" />,
      title: "Level System",
      description: "Progress through railway-style levels like Candy Crush",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Friend Battles",
      description: "Challenge friends and compete in real-time coding battles",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"
    },
    {
      icon: <Crown className="h-12 w-12" />,
      title: "Leaderboards",
      description: "Climb the ranks and become the DSA ka Raja",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg"
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Smart Challenges",
      description: "AI-powered problems that adapt to your skill level",
      image: "https://images.pexels.com/photos/1181245/pexels-photo-1181245.jpeg"
    }
  ];

  return (
    <div className="py-24 space-y-24">
      {/* Tagline Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-black/40 backdrop-blur-lg border border-purple-500/20 rounded-3xl p-12">
            <h2 className="text-4xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-gold to-yellow-400 bg-clip-text">
              DSA ka raja kon –
            </h2>
            <h3 className="text-3xl lg:text-5xl font-bold text-white mt-2">
              CrackAlgo ka player
            </h3>
            <div className="mt-6 flex justify-center">
              <Crown className="h-16 w-16 text-gold animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Side-scroll Feature Previews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          Experience the Platform
        </h3>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/20 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-purple-400 mb-4 group-hover:text-lime-400 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-green-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900/80 to-purple-900/80 backdrop-blur-lg border border-lime-400/20 rounded-3xl p-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Become the{' '}
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                CrackAlgo
              </span>
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              to become{' '}
              <span className="bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                Raja of DSA
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers mastering algorithms through our innovative gamified approach.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-green-500 text-black text-lg font-bold rounded-xl hover:from-lime-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/25">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnScrollSections;