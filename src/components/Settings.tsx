import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Download,
  Mail,
  Globe,
  Palette,
  Database,
  Cpu,
  Eye,
  Target,
  Zap,
  AlertTriangle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('skynet');
  const [autoSave, setAutoSave] = useState(true);

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-slate-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Cpu className="h-8 w-8 text-blue-500 animate-pulse" />
          <h1 className="text-3xl font-bold gradient-text-blue">CONFIGURATION SYSTÈME</h1>
          <SettingsIcon className="h-8 w-8 text-red-500 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <p className="text-slate-400 text-lg">Panneau de Contrôle du Réseau Neural</p>
      </div>

      {/* General Settings */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent"></div>
        
        <div className="relative z-10 p-6 border-b border-blue-500/30">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold text-blue-300">PARAMÈTRES PRINCIPAUX</h2>
          </div>
        </div>
        
        <div className="relative z-10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-blue-300">LANGUE INTERFACE</h3>
              <p className="text-sm text-slate-400">Protocole de communication interface neurale</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-200"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-blue-300">THÈME VISUEL</h3>
              <p className="text-sm text-slate-400">Mode d'affichage du réseau neural</p>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-200"
            >
              <option value="skynet">Protocole Skynet</option>
              <option value="matrix">Mode Matrix</option>
              <option value="cyberpunk">Interface Cyberpunk</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-blue-300">PROTOCOLE AUTO-SAUVEGARDE</h3>
              <p className="text-sm text-slate-400">Préservation automatique des données de mission</p>
            </div>
            <ToggleSwitch enabled={autoSave} onChange={() => setAutoSave(!autoSave)} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-yellow-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-transparent"></div>
        
        <div className="relative z-10 p-6 border-b border-yellow-500/30">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-yellow-300">SYSTÈMES D'ALERTE</h2>
          </div>
        </div>
        
        <div className="relative z-10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-yellow-300">ALERTES NEURALES</h3>
              <p className="text-sm text-slate-400">Notifications de menaces en temps réel</p>
            </div>
            <ToggleSwitch enabled={notifications} onChange={() => setNotifications(!notifications)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-yellow-300">RAPPORTS DE MISSION</h3>
              <p className="text-sm text-slate-400">Transmission automatique des rapports</p>
            </div>
            <ToggleSwitch enabled={emailReports} onChange={() => setEmailReports(!emailReports)} />
          </div>
        </div>
      </div>

      {/* Analysis Settings */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-red-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent"></div>
        
        <div className="relative z-10 p-6 border-b border-red-500/30">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-bold text-red-300">PROTOCOLES DÉTECTION MENACES</h2>
          </div>
        </div>
        
        <div className="relative z-10 p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-red-300 mb-3">NIVEAUX CONFORMITÉ WCAG</h3>
            <div className="space-y-3">
              <label className="flex items-center group cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-red-500/50 bg-slate-700/50 text-red-500 focus:ring-red-500 mr-3" />
                <span className="text-sm text-slate-300 group-hover:text-red-300 transition-colors">Niveau A (Sécurité Minimum)</span>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-red-500/50 bg-slate-700/50 text-red-500 focus:ring-red-500 mr-3" />
                <span className="text-sm text-slate-300 group-hover:text-red-300 transition-colors">Niveau AA (Protocole Standard)</span>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input type="checkbox" className="rounded border-red-500/50 bg-slate-700/50 text-red-500 focus:ring-red-500 mr-3" />
                <span className="text-sm text-slate-300 group-hover:text-red-300 transition-colors">Niveau AAA (Sécurité Maximum)</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-red-300 mb-3">CATÉGORIES DE MENACES</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Images',
                'Cadres',
                'Couleurs',
                'Multimédia',
                'Tableaux',
                'Liens',
                'Scripts',
                'Éléments Requis',
                'Structure',
                'Présentation',
                'Formulaires',
                'Navigation',
                'Consultation'
              ].map((category) => (
                <label key={category} className="flex items-center group cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-red-500/50 bg-slate-700/50 text-red-500 focus:ring-red-500 mr-2" />
                  <span className="text-sm text-slate-300 group-hover:text-red-300 transition-colors">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-green-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-transparent"></div>
        
        <div className="relative z-10 p-6 border-b border-green-500/30">
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-green-400" />
            <h2 className="text-xl font-bold text-green-300">GESTION DES DONNÉES</h2>
          </div>
        </div>
        
        <div className="relative z-10 p-6 space-y-4">
          <button className="flex items-center space-x-4 w-full p-4 text-left border-2 border-green-500/30 rounded-lg hover:bg-green-900/20 transition-all hover-lift group">
            <Download className="h-6 w-6 text-green-400 group-hover:animate-pulse" />
            <div>
              <p className="font-bold text-green-300">EXPORTER TOUTES DONNÉES MISSION</p>
              <p className="text-sm text-slate-400">Télécharger archive complète réseau neural</p>
            </div>
          </button>

          <button className="flex items-center space-x-4 w-full p-4 text-left border-2 border-red-500/30 rounded-lg hover:bg-red-900/20 transition-all hover-lift text-red-400 group">
            <AlertTriangle className="h-6 w-6 group-hover:animate-pulse" />
            <div>
              <p className="font-bold">PURGER TOUTES DONNÉES</p>
              <p className="text-sm opacity-75">ATTENTION: Effacement irréversible du réseau neural</p>
            </div>
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gradient-to-r from-blue-900/20 via-slate-800/50 to-purple-900/20 rounded-xl border-2 border-blue-500/50 p-6 relative overflow-hidden glass-morphism">
        <div className="absolute inset-0 opacity-10">
          <Eye className="h-full w-full" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold text-blue-300">INFORMATIONS SYSTÈME SKYNET</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Version:</p>
              <p className="text-blue-300 font-bold">SKYNET v2.0.29</p>
            </div>
            <div>
              <p className="text-slate-400">Protocole:</p>
              <p className="text-blue-300 font-bold">RGAA 4.1 Neural</p>
            </div>
            <div>
              <p className="text-slate-400">Conformité:</p>
              <p className="text-blue-300 font-bold">WCAG 2.1 Amélioré</p>
            </div>
            <div>
              <p className="text-slate-400">Statut:</p>
              <p className="text-green-400 font-bold flex items-center">
                <Zap className="h-4 w-4 mr-1 animate-pulse" />
                OPÉRATIONNEL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};