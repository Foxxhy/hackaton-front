import React from 'react';
import { Menu, Shield, Zap, Eye, Cpu } from 'lucide-react';
import { SkynetLogo } from './SkynetLogo';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="bg-black border-b-2 border-red-500 sticky top-0 z-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-black to-red-900/10"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="circuit-pattern"></div>
      </div>
      
      <div className="relative flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-red-900/30 transition-all duration-300 border border-red-500/50 hover:border-red-400 hover-lift"
          >
            <Menu className="h-5 w-5 text-red-400" />
          </button>
          
          {/* Logo Skynet avec la nouvelle image */}
          <SkynetLogo size="md" animated={true} variant="terminator" />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-900/40 to-green-800/40 text-green-400 rounded-full text-sm font-medium border border-green-500/50 glass-morphism online-status">
            <Zap className="h-4 w-4 animate-pulse" />
            <span>OPÉRATIONNEL</span>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-red-900/40 to-red-800/40 text-red-400 rounded-full text-sm font-medium border border-red-500/50 glass-morphism critical-status">
            <Cpu className="h-4 w-4" />
            <span>IA ACTIVE</span>
          </div>
          
          <div className="relative">
            <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center border-2 border-red-400/50 shadow-lg hover-lift red-glow overflow-hidden">
              {/* Avatar Terminator */}
              <img 
                src="/src/assets/image copy.png" 
                alt="Terminator Avatar"
                className="h-8 w-8 object-cover rounded-full filter brightness-110 contrast-125"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Scanning line effect */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
    </header>
  );
};