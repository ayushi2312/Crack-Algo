import React from 'react';
import { Code, Lightbulb, Zap } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Character Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
              <Code className="h-12 w-12 text-purple-600" />
              
              {/* Lightbulb Animation */}
              <div className="absolute -top-12 -right-8 animate-bounce">
                <div className="relative">
                  <Lightbulb className="h-8 w-8 text-yellow-400 animate-pulse" />
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50 scale-150 animate-ping"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 left-8 w-6 h-6 bg-lime-400 rounded opacity-80 animate-bounce">
              <div className="flex items-center justify-center h-full text-black text-xs font-bold">1</div>
            </div>
            <div className="absolute top-12 right-8 w-8 h-8 bg-blue-400 rounded-full opacity-80 animate-bounce delay-300">
              <div className="flex items-center justify-center h-full text-white text-xs font-bold">0</div>
            </div>
            <div className="absolute bottom-4 left-12 w-7 h-7 bg-green-400 rounded opacity-80 animate-bounce delay-500">
              <div className="flex items-center justify-center h-full text-black text-xs font-bold">[]</div>
            </div>
            <div className="absolute bottom-12 right-12 w-6 h-6 bg-purple-400 rounded-full opacity-80 animate-bounce delay-700">
              <Zap className="h-4 w-4 text-white m-1" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white animate-pulse">
            Cracking the Code...
          </h2>
          <p className="text-lg text-gray-300 animate-pulse delay-300">
            Preparing your DSA adventure
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-gray-800 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-lime-500 to-green-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Loading Steps */}
          <div className="text-sm text-gray-400 space-y-1 mt-6">
            <div className="flex items-center justify-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce"></div>
              <span>Initializing algorithms...</span>
            </div>
            <div className="flex items-center justify-center gap-2 animate-pulse delay-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              <span>Loading data structures...</span>
            </div>
            <div className="flex items-center justify-center gap-2 animate-pulse delay-500">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-500"></div>
              <span>Preparing challenges...</span>
            </div>
          </div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-lime-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-gold rounded-full animate-ping delay-700"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;