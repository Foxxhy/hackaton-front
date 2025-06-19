import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  FileText,
  ArrowRight,
  Eye,
  Target,
  Shield,
  Zap
} from 'lucide-react';
import { AnalysisResult } from '../App';

interface DashboardProps {
  analysisResults: AnalysisResult[];
  onViewReport: (result: AnalysisResult) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ analysisResults, onViewReport }) => {
  const totalAnalyses = analysisResults.length;
  const averageScore = totalAnalyses > 0 
    ? Math.round(analysisResults.reduce((acc, r) => acc + r.score, 0) / totalAnalyses)
    : 0;
  
  const totalIssues = analysisResults.reduce((acc, r) => acc + r.issues.length, 0);
  const criticalIssues = analysisResults.reduce((acc, r) => 
    acc + r.issues.filter(i => i.severity === 'critical').length, 0
  );

  const recentAnalyses = analysisResults.slice(0, 5);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-900/20 border-green-500/50';
    if (score >= 60) return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
    return 'text-red-400 bg-red-900/20 border-red-500/50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Eye className="h-8 w-8 text-blue-500 animate-pulse" />
          <h1 className="text-3xl font-bold gradient-text-blue">CENTRE DE COMMANDE</h1>
          <Shield className="h-8 w-8 text-green-500 animate-pulse" />
        </div>
        <p className="text-slate-400">Vue d'ensemble du Réseau Neural d'Analyse</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-morphism rounded-xl p-6 relative overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400 mb-1">SCANS TOTAUX</p>
              <p className="text-3xl font-bold text-blue-300">{totalAnalyses}</p>
            </div>
            <div className="p-3 bg-blue-900/50 rounded-lg border border-blue-500/50">
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-6 relative overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-400 mb-1">SCORE MOYEN</p>
              <p className="text-3xl font-bold text-green-300">{averageScore}%</p>
            </div>
            <div className="p-3 bg-green-900/50 rounded-lg border border-green-500/50">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-6 relative overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-400 mb-1">MENACES</p>
              <p className="text-3xl font-bold text-yellow-300">{totalIssues}</p>
            </div>
            <div className="p-3 bg-yellow-900/50 rounded-lg border border-yellow-500/50">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-6 relative overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-400 mb-1">CRITIQUES</p>
              <p className="text-3xl font-bold text-red-300">{criticalIssues}</p>
            </div>
            <div className="p-3 bg-red-900/50 rounded-lg border border-red-500/50">
              <Target className="h-6 w-6 text-red-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent"></div>
        
        <div className="relative z-10 p-6 border-b border-blue-500/30">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold text-blue-300">SCANS NEURAUX RÉCENTS</h2>
          </div>
        </div>
        
        {recentAnalyses.length === 0 ? (
          <div className="relative z-10 p-12 text-center">
            <Target className="h-16 w-16 text-slate-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">AUCUNE CIBLE SCANNÉE</h3>
            <p className="text-slate-500 mb-6">Initialisez votre premier scan neural d'accessibilité</p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all border border-blue-400/50 hover:border-blue-300 hover-lift">
              DÉMARRER PROTOCOLE SCAN
            </button>
          </div>
        ) : (
          <div className="relative z-10 divide-y divide-blue-500/20">
            {recentAnalyses.map((result) => (
              <div key={result.id} className="p-6 hover:bg-blue-900/10 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-lg border-2 ${getScoreColor(result.score)}`}>
                        {getScoreIcon(result.score)}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                        {result.filename}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-slate-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {result.timestamp.toLocaleDateString('fr-FR')}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getScoreColor(result.score)}`}>
                          SCORE: {result.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-300">
                        {result.issues.length} MENACE{result.issues.length !== 1 ? 'S' : ''}
                      </p>
                      <p className="text-xs text-red-400">
                        {result.issues.filter(i => i.severity === 'critical').length} CRITIQUE{result.issues.filter(i => i.severity === 'critical').length !== 1 ? 'S' : ''}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => onViewReport(result)}
                      className="p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all border border-blue-500/30 hover:border-blue-400 hover-lift"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full bg-slate-700/50 rounded-full h-2 border border-blue-500/30">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        result.score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                        result.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                        'bg-gradient-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="glass-morphism rounded-xl p-6 border border-green-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-900/50 rounded-lg border border-green-500/50">
              <Zap className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-300">RÉSEAU NEURAL SKYNET</h3>
              <p className="text-green-400">Tous les systèmes opérationnels • Prêt pour l'analyse</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold">EN LIGNE</span>
          </div>
        </div>
      </div>
    </div>
  );
};