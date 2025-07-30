import React from 'react';
import { Instagram, Linkedin, Code, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-purple-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CrackAlgo
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              The ultimate gamified platform for mastering Data Structures & Algorithms. 
              Turn your coding journey into an addictive adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Leaderboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Challenges</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 CrackAlgo. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg hover:scale-110 transition-transform"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:scale-110 transition-transform"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:scale-110 transition-transform"
            >
              <Mail className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;