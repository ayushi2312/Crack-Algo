import React, { useState, useEffect } from 'react';

const LoadingAnimation: React.FC = () => {
  const [dots, setDots] = useState('');
  const [bulbGlow, setBulbGlow] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const bulbInterval = setInterval(() => {
      setBulbGlow(prev => !prev);
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(bulbInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        {/* Main Loading Container */}
        <div className="relative mb-8">
          {/* Boy Character */}
          <div className="relative mx-auto w-32 h-32 mb-6">
            {/* Head */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-600">
              {/* Eyes */}
              <div className="absolute top-4 left-3 w-3 h-3 bg-black rounded-full animate-blink"></div>
              <div className="absolute top-4 right-3 w-3 h-3 bg-black rounded-full animate-blink"></div>
              {/* Mouth */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black rounded-full"></div>
            </div>
            
            {/* Body */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-blue-500 rounded-t-2xl border-2 border-blue-600">
              {/* Arms */}
              <div className="absolute top-2 -left-2 w-4 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 transform rotate-12"></div>
              <div className="absolute top-2 -right-2 w-4 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 transform -rotate-12"></div>
            </div>
            
            {/* Legs */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-4 h-8 bg-blue-600 rounded-full"></div>
              <div className="w-4 h-8 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          {/* Light Bulb */}
          <div className="absolute -top-8 right-8">
            <div className={`relative ${bulbGlow ? 'animate-pulse' : ''}`}>
              {/* Bulb */}
              <div className={`w-8 h-8 rounded-full border-2 ${bulbGlow ? 'bg-yellow-300 border-yellow-400 shadow-lg shadow-yellow-300/50' : 'bg-gray-400 border-gray-500'}`}>
                {/* Filament */}
                <div className={`absolute inset-1 ${bulbGlow ? 'bg-yellow-200' : 'bg-gray-300'} rounded-full`}></div>
              </div>
              {/* Base */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-600 rounded-b-lg"></div>
              
              {/* Glow Effect */}
              {bulbGlow && (
                <div className="absolute inset-0 w-8 h-8 bg-yellow-300 rounded-full animate-ping opacity-30"></div>
              )}
            </div>
          </div>

          {/* Code Elements Floating */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 text-green-400 text-xs animate-bounce">function()</div>
            <div className="absolute top-8 right-6 text-blue-400 text-xs animate-bounce delay-300">if</div>
            <div className="absolute bottom-8 left-6 text-purple-400 text-xs animate-bounce delay-500">return</div>
            <div className="absolute bottom-4 right-4 text-yellow-400 text-xs animate-bounce delay-700">for</div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Solving Problems{dots}
          </h2>
          <p className="text-gray-400 text-lg">
            Loading your DSA journey
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          
          {/* Loading Tips */}
          <div className="mt-8 space-y-2">
            <p className="text-gray-500 text-sm">💡 Tip: Practice makes perfect!</p>
            <p className="text-gray-500 text-sm">🎯 Focus on understanding the concepts</p>
            <p className="text-gray-500 text-sm">🚀 You're on your way to becoming a DSA master!</p>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        .animate-blink {
          animation: blink 2s infinite;
        }
        
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;