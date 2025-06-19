import React from 'react';
import { Eye, Cpu, Shield } from 'lucide-react';

interface SkynetLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  variant?: 'full' | 'icon' | 'text' | 'terminator';
}

export const SkynetLogo: React.FC<SkynetLogoProps> = ({ 
  size = 'md', 
  animated = true,
  variant = 'full' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  if (variant === 'terminator') {
    return (
      <div className="flex items-center space-x-3">
        {/* Terminator Skynet */}
        <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
          <img 
            src="/src/assets/image copy.png" 
            alt="Terminator Skynet"
            className={`${sizeClasses[size]} object-contain ${animated ? 'animate-pulse' : ''} filter brightness-110 contrast-125`}
          />
          {animated && (
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
          )}
        </div>

        {/* Text */}
        <div>
          <div className={`${textSizes[size]} font-bold gradient-text-red ${animated ? 'glitch' : ''}`}>
            SKYNET RGAA
          </div>
          {size !== 'sm' && (
            <div className="text-xs text-slate-400 font-medium">
              Neural Accessibility Scanner
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
          <div className={`absolute inset-0 rounded-full border-2 border-red-500 ${animated ? 'animate-spin' : ''}`} 
               style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
          </div>
          
          {/* Inner eye */}
          <div className="relative z-10">
            <Eye className={`${sizeClasses[size]} text-red-500 ${animated ? 'animate-pulse' : ''}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-2 h-2 bg-red-400 rounded-full ${animated ? 'animate-ping' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${textSizes[size]} font-bold gradient-text-red ${animated ? 'glitch' : ''}`}>
        SKYNET RGAA
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
          {/* Outer scanning ring */}
          <div className={`absolute inset-0 rounded-full border-2 border-red-500 ${animated ? 'animate-spin' : ''}`} 
               style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
          </div>
          
          {/* Central eye */}
          <div className="relative z-10">
            <Eye className={`${sizeClasses[size]} text-red-500 ${animated ? 'animate-pulse' : ''}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-2 h-2 bg-red-400 rounded-full ${animated ? 'animate-ping' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div>
        <div className={`${textSizes[size]} font-bold gradient-text-red ${animated ? 'glitch' : ''}`}>
          SKYNET RGAA
        </div>
        {size !== 'sm' && (
          <div className="text-xs text-slate-400 font-medium">
            Neural Accessibility Scanner
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour l'œil de Terminator avec la nouvelle image
export const TerminatorEye: React.FC<{ size?: string; animated?: boolean }> = ({ 
  size = 'h-16 w-16', 
  animated = true 
}) => {
  return (
    <div className={`${size} relative flex items-center justify-center`}>
      {/* Outer glow */}
      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
      
      {/* Terminator Skynet image */}
      <img 
        src="/src/assets/image copy.png" 
        alt="Terminator Skynet"
        className={`${size} object-contain ${animated ? 'animate-pulse' : ''} filter brightness-110 contrast-125`}
      />
      
      {/* Scanning overlay */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-pulse"></div>
      )}
    </div>
  );
};

// Composant pour le logo Autobot/Decepticon style (garde l'ancienne image pour la variété)
export const AutobotLogo: React.FC<{ size?: string; animated?: boolean }> = ({ 
  size = 'h-20 w-20', 
  animated = true 
}) => {
  return (
    <div className={`${size} relative flex items-center justify-center`}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-red-500/10 rounded-lg blur-lg"></div>
      
      {/* Autobot logo image */}
      <img 
        src="/src/assets/images.png" 
        alt="Autobot Logo"
        className={`${size} object-contain ${animated ? 'animate-pulse' : ''} filter brightness-110 contrast-125`}
      />
      
      {/* Rotating ring */}
      {animated && (
        <div className="absolute inset-0 border-2 border-red-500/30 rounded-lg animate-spin" style={{ animationDuration: '10s' }}></div>
      )}
    </div>
  );
};

// Composant pour l'interface HUD avec assets
export const HUDInterface: React.FC<{ children: React.ReactNode; showLogo?: boolean }> = ({ 
  children, 
  showLogo = false 
}) => {
  return (
    <div className="relative p-6 border-2 border-red-500/50 bg-black/80 backdrop-blur-sm">
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>
      
      {/* Logo in corner */}
      {showLogo && (
        <div className="absolute top-2 right-2">
          <TerminatorEye size="h-8 w-8" animated={true} />
        </div>
      )}
      
      {/* Scanning lines */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      
      {children}
    </div>
  );
};

// Composant pour les éléments décoratifs avec la nouvelle image
export const TerminatorDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-10">
      {/* Terminator Skynet aux coins */}
      <div className="absolute top-10 left-10">
        <TerminatorEye size="h-12 w-12" animated={true} />
      </div>
      
      <div className="absolute top-10 right-10">
        <AutobotLogo size="h-10 w-10" animated={true} />
      </div>
      
      <div className="absolute bottom-10 left-10">
        <AutobotLogo size="h-8 w-8" animated={true} />
      </div>
      
      <div className="absolute bottom-10 right-10">
        <TerminatorEye size="h-10 w-10" animated={true} />
      </div>
      
      {/* Logo central subtil avec la nouvelle image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
        <TerminatorEye size="h-32 w-32" animated={true} />
      </div>
    </div>
  );
};

// Composant spécial pour le logo Skynet complet
export const SkynetFullLogo: React.FC<{ size?: string; animated?: boolean }> = ({ 
  size = 'h-24 w-auto', 
  animated = true 
}) => {
  return (
    <div className={`${size} relative flex items-center justify-center`}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-red-500/20 rounded-lg blur-xl"></div>
      
      {/* Main Skynet image */}
      <img 
        src="/src/assets/image copy.png" 
        alt="Skynet Terminator"
        className={`${size} object-contain ${animated ? 'hover:scale-105' : ''} filter brightness-110 contrast-125 transition-transform duration-300`}
      />
      
      {/* Scanning overlay effect */}
      {animated && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 border-2 border-red-500/30 rounded-lg animate-pulse"></div>
        </>
      )}
    </div>
  );
};