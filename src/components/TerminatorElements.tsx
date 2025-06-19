import React from 'react';
import { Eye, Target, Zap, AlertTriangle, Shield } from 'lucide-react';

// Composant pour l'affichage HUD style Terminator
export const TerminatorHUD: React.FC<{ children: React.ReactNode; title?: string }> = ({ 
  children, 
  title 
}) => {
  return (
    <div className="relative bg-black/90 border-2 border-red-500/50 rounded-lg overflow-hidden">
      {/* Header HUD */}
      {title && (
        <div className="bg-red-900/30 border-b border-red-500/50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-red-300 font-bold text-sm">{title}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-bold">ONLINE</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Corner indicators */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500"></div>
      
      {/* Scanning line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

// Composant pour les statistiques style Terminator
export const TerminatorStats: React.FC<{ 
  label: string; 
  value: string | number; 
  status: 'good' | 'warning' | 'critical';
  icon?: React.ReactNode;
}> = ({ label, value, status, icon }) => {
  const statusColors = {
    good: 'text-green-400 border-green-500/50',
    warning: 'text-yellow-400 border-yellow-500/50',
    critical: 'text-red-400 border-red-500/50'
  };

  const statusIcons = {
    good: <Shield className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    critical: <Target className="h-4 w-4 animate-pulse" />
  };

  return (
    <div className={`bg-black/50 border-2 ${statusColors[status]} rounded-lg p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-mono uppercase">{label}</p>
          <p className={`text-2xl font-bold ${statusColors[status].split(' ')[0]} font-mono`}>
            {value}
          </p>
        </div>
        <div className={statusColors[status].split(' ')[0]}>
          {icon || statusIcons[status]}
        </div>
      </div>
      
      {/* Scanning effect */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 animate-pulse"></div>
    </div>
  );
};

// Composant pour les boutons style Terminator
export const TerminatorButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, onClick, variant = 'primary', disabled = false, size = 'md' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-blue-400/50 text-white',
    secondary: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 border-slate-400/50 text-slate-200',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-red-400/50 text-white'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        border-2 rounded-lg font-bold transition-all duration-300
        hover:shadow-lg hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden group
      `}
    >
      {/* Scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </button>
  );
};

// Composant pour l'indicateur de chargement style Terminator
export const TerminatorLoader: React.FC<{ message?: string }> = ({ message = "PROCESSING..." }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-red-500/30 rounded-full animate-spin">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        
        {/* Inner eye */}
        <div className="absolute inset-4 flex items-center justify-center">
          <Eye className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-red-400 font-bold font-mono">{message}</p>
        <div className="flex space-x-1 mt-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

// Composant pour l'alerte style Terminator
export const TerminatorAlert: React.FC<{
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  onClose?: () => void;
}> = ({ type, title, message, onClose }) => {
  const typeConfig = {
    info: { color: 'blue', icon: <Eye className="h-5 w-5" /> },
    warning: { color: 'yellow', icon: <AlertTriangle className="h-5 w-5" /> },
    error: { color: 'red', icon: <Target className="h-5 w-5" /> },
    success: { color: 'green', icon: <Shield className="h-5 w-5" /> }
  };

  const config = typeConfig[type];

  return (
    <div className={`bg-${config.color}-900/20 border-2 border-${config.color}-500/50 rounded-lg p-4 relative overflow-hidden`}>
      <div className="flex items-start space-x-3">
        <div className={`text-${config.color}-400 animate-pulse`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <h4 className={`text-${config.color}-300 font-bold mb-1`}>{title}</h4>
          <p className="text-slate-400 text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`text-${config.color}-400 hover:text-${config.color}-300 transition-colors`}
          >
            ×
          </button>
        )}
      </div>
      
      {/* Animated border */}
      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-${config.color}-500 to-transparent animate-pulse`}></div>
    </div>
  );
};