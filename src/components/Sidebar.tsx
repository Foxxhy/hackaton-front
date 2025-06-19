import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  History, 
  Settings,
  ChevronRight,
  Wrench,
  Cpu,
  Shield,
  Zap
} from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
}

const navigation = [
  { id: 'dashboard', name: 'Centre de Commande', icon: LayoutDashboard },
  { id: 'analyzer', name: 'Scanner Neural', icon: Search },
  { id: 'report', name: 'Rapport d\'Analyse', icon: FileText },
  { id: 'corrections', name: 'Auto-Réparation', icon: Wrench },
  { id: 'history', name: 'Journal de Mission', icon: History },
  { id: 'settings', name: 'Configuration Système', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen }) => {
  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black border-r-2 border-red-500 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    } relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-black to-black"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="circuit-pattern"></div>
      </div>
      
      {/* Header avec image Terminator intégrée */}
      {isOpen && (
        <div className="relative p-4 border-b-2 border-red-500/30 bg-gradient-to-r from-red-900/20 to-transparent">
          {/* Container centré pour l'image */}
          <div className="flex flex-col items-center space-y-3">
            {/* Image Terminator avec effets intégrés */}
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl scale-125 animate-pulse"></div>
              
              {/* Scanning rings */}
              <div className="absolute inset-0 border-2 border-red-500/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
              </div>
              
              {/* Inner scanning ring */}
              <div className="absolute inset-2 border border-red-500/60 rounded-full animate-pulse"></div>
              
              {/* Main image container */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-black group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/src/assets/image copy.png" 
                  alt="Skynet Neural Core"
                  className="w-full h-full object-cover filter brightness-110 contrast-125 group-hover:brightness-125 transition-all duration-300"
                />
                
                {/* Scanning overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-pulse"></div>
                
                {/* HUD corners */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-red-400"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-red-400"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-red-400"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-red-400"></div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            {/* System info */}
            <div className="text-center">
              <div className="text-xs font-bold text-red-400 gradient-text-red">SKYNET NEURAL</div>
              <div className="text-xs text-slate-500 font-mono">CORE v2.0.29</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-bold">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation container */}
      <div className="relative h-full flex flex-col">
        <nav className={`flex-1 p-4 space-y-2 overflow-y-auto pb-32 ${isOpen ? 'pt-4' : 'pt-4'}`}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewType)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden hover-lift ${
                  isActive
                    ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-red-300 border-2 border-red-500/50 shadow-lg red-glow'
                    : 'text-gray-400 hover:bg-red-900/20 hover:text-red-300 border-2 border-transparent hover:border-red-500/30'
                }`}
                title={!isOpen ? item.name : undefined}
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-red-400 animate-pulse' : 'group-hover:animate-pulse'}`} />
                {isOpen && (
                  <>
                    <span className="font-medium relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto relative z-10">
                        <ChevronRight className="h-4 w-4 animate-pulse" />
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Premium section - fixed at bottom */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="glass-morphism rounded-xl p-4 text-gray-300 relative overflow-hidden border-2 border-red-500/50">
              {/* Background avec la nouvelle image */}
              <div className="absolute inset-0 opacity-5">
                <img 
                  src="/src/assets/image copy.png" 
                  alt="Skynet Background"
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-red-400 animate-pulse" />
                  <h3 className="font-bold text-sm gradient-text-red">SKYNET PREMIUM</h3>
                </div>
                <p className="text-xs opacity-90 mb-3">
                  Protocoles Neuraux Avancés & Auto-Correction
                </p>
                <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-red-400/50 hover:border-red-300 shadow-lg hover-lift flex items-center justify-center space-x-2 red-glow">
                  <Zap className="h-4 w-4" />
                  <span>ACTIVER PROTOCOLE</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};