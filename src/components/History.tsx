import React from 'react';
import { 
  Clock, 
  Trash2, 
  Eye, 
  Download,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  FileText,
  Zap
} from 'lucide-react';
import { AnalysisResult } from '../App';

interface HistoryProps {
  analysisResults: AnalysisResult[];
  onViewReport: (result: AnalysisResult) => void;
  onDeleteReport: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({ 
  analysisResults, 
  onViewReport, 
  onDeleteReport 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-900/20 border-green-500/50';
    if (score >= 60) return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
    return 'text-red-400 bg-red-900/20 border-red-500/50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return null;
  };

  const exportAll = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalAnalyses: analysisResults.length,
      reports: analysisResults
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal-mission-skynet-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Target className="h-8 w-8 text-red-500 animate-pulse" />
          <div>
            <h1 className="text-3xl font-bold gradient-text-red">JOURNAL DE MISSION</h1>
            <p className="text-slate-400 text-lg">
              {analysisResults.length} opération{analysisResults.length !== 1 ? 's' : ''} enregistrée{analysisResults.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {analysisResults.length > 0 && (
          <button
            onClick={exportAll}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-lg transition-all border border-blue-400/50 hover:border-blue-300 hover-lift"
          >
            <Download className="h-4 w-4" />
            <span className="font-medium">EXPORTER JOURNAL</span>
          </button>
        )}
      </div>

      {/* History List */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent"></div>
        
        {analysisResults.length === 0 ? (
          <div className="relative z-10 p-12 text-center">
            <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">AUCUNE DONNÉE DE MISSION</h3>
            <p className="text-slate-500">Les journaux de mission apparaîtront ici après les opérations terminées</p>
          </div>
        ) : (
          <div className="relative z-10 divide-y divide-blue-500/20">
            {analysisResults.map((result, index) => {
              const previousResult = analysisResults[index + 1];
              
              return (
                <div key={result.id} className="p-6 hover:bg-blue-900/10 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg border-2 ${getScoreColor(result.score)}`}>
                        {getScoreIcon(result.score)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                          {result.filename}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-slate-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {result.timestamp.toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getScoreColor(result.score)}`}>
                              {result.score}%
                            </span>
                            {getTrendIcon(result.score, previousResult?.score)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-300">
                          {result.issues.length} MENACE{result.issues.length !== 1 ? 'S' : ''}
                        </p>
                        <div className="flex items-center space-x-2 text-xs mt-1">
                          <span className="text-red-400 font-medium">
                            {result.issues.filter(i => i.severity === 'critical').length} CRITIQUE{result.issues.filter(i => i.severity === 'critical').length !== 1 ? 'S' : ''}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="text-orange-400 font-medium">
                            {result.issues.filter(i => i.severity === 'major').length} MAJEUR{result.issues.filter(i => i.severity === 'major').length !== 1 ? 'S' : ''}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewReport(result)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all border border-blue-500/30 hover:border-blue-400 hover-lift"
                          title="Voir Rapport"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            if (confirm('Confirmer la suppression de cet enregistrement de mission ?')) {
                              onDeleteReport(result.id);
                            }
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all border border-red-500/30 hover:border-red-400 hover-lift"
                          title="Supprimer Enregistrement"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress indication */}
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
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {analysisResults.length > 0 && (
        <div className="glass-morphism rounded-xl shadow-2xl p-6 border border-green-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold text-green-300">STATISTIQUES DE MISSION</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30 hover-lift">
                <p className="text-3xl font-bold text-blue-400">
                  {Math.round(analysisResults.reduce((acc, r) => acc + r.score, 0) / analysisResults.length)}%
                </p>
                <p className="text-sm text-slate-500 font-medium">SCORE MOYEN</p>
              </div>
              
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30 hover-lift">
                <p className="text-3xl font-bold text-green-400">
                  {Math.max(...analysisResults.map(r => r.score))}%
                </p>
                <p className="text-sm text-slate-500 font-medium">MEILLEUR SCORE</p>
              </div>
              
              <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30 hover-lift">
                <p className="text-3xl font-bold text-red-400">
                  {analysisResults.reduce((acc, r) => acc + r.issues.length, 0)}
                </p>
                <p className="text-sm text-slate-500 font-medium">MENACES TOTALES</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30 hover-lift">
                <p className="text-3xl font-bold text-yellow-400">
                  {analysisResults.filter(r => r.score >= 80).length}
                </p>
                <p className="text-sm text-slate-500 font-medium">CIBLES SÉCURISÉES</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="glass-morphism rounded-xl p-6 border border-green-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-900/50 rounded-lg border border-green-500/50">
              <Zap className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-300">SYSTÈME JOURNAL DE MISSION</h3>
              <p className="text-green-400">Tous les enregistrements sécurisés • Intégrité des données vérifiée</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold">OPÉRATIONNEL</span>
          </div>
        </div>
      </div>
    </div>
  );
};