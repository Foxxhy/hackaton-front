import React, { useEffect, useState } from 'react';

// Composant pour l'effet Matrix Rain
export const MatrixRain: React.FC = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-green-400 text-xs font-mono matrix-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="block">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Composant pour les points de scan rotatifs
export const RotatingScanPoints: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping opacity-25" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-35" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-20" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

// Composant pour l'effet de grille cyberpunk subtile
export const CyberGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-5">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
          animation: 'grid-move 30s linear infinite'
        }}
      />
    </div>
  );
};

// Composant pour les particules flottantes
export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-red-500/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};

// Composant pour les décorations Terminator avec la nouvelle image
export const TerminatorDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-5">
      {/* Terminator Skynet aux coins */}
      <div className="absolute top-10 left-10">
        <img 
          src="/src/assets/image copy.png" 
          alt="Terminator Decoration"
          className="h-16 w-16 object-contain animate-pulse filter brightness-110 contrast-125"
        />
      </div>
      
      <div className="absolute top-10 right-10">
        <img 
          src="/src/assets/images.png" 
          alt="Autobot Decoration"
          className="h-12 w-12 object-contain animate-pulse filter brightness-110 contrast-125"
        />
      </div>
      
      <div className="absolute bottom-10 left-10">
        <img 
          src="/src/assets/images.png" 
          alt="Autobot Decoration"
          className="h-10 w-10 object-contain animate-pulse filter brightness-110 contrast-125"
        />
      </div>
      
      <div className="absolute bottom-10 right-10">
        <img 
          src="/src/assets/image copy.png" 
          alt="Terminator Decoration"
          className="h-14 w-14 object-contain animate-pulse filter brightness-110 contrast-125"
        />
      </div>
      
      {/* Logo central subtil avec la nouvelle image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3">
        <img 
          src="/src/assets/image copy.png" 
          alt="Skynet Central"
          className="h-48 w-48 object-contain animate-pulse filter brightness-110 contrast-125"
        />
      </div>
    </div>
  );
};

// Composant principal pour tous les effets de fond
export const SkynetBackground: React.FC = () => {
  return (
    <>
      <CyberGrid />
      <RotatingScanPoints />
      <FloatingParticles />
      <MatrixRain />
      <TerminatorDecorations />
    </>
  );
};