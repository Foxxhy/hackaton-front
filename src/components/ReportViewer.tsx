import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Filter,
  Wrench,
  Zap,
  Target,
  Shield,
  Eye
} from 'lucide-react';
import { AnalysisResult, Issue } from '../App';

interface ReportViewerProps {
  report: AnalysisResult;
  onGenerateCorrections?: (report: AnalysisResult) => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ report, onGenerateCorrections }) => {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedIssues(newExpanded);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-900/20 border-green-500/50';
    if (score >= 60) return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
    return 'text-red-400 bg-red-900/20 border-red-500/50';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'major':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'minor':
        return <Info className="h-4 w-4 text-yellow-400" />;
      default:
        return <Info className="h-4 w-4 text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const styles = {
      critical: 'bg-red-900/30 text-red-400 border-red-500/50',
      major: 'bg-orange-900/30 text-orange-400 border-orange-500/50',
      minor: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/50'
    };
    return styles[severity as keyof typeof styles] || 'bg-slate-900/30 text-slate-400 border-slate-500/50';
  };

  const filteredIssues = report.issues.filter(issue => {
    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) return false;
    if (filterCategory !== 'all' && issue.category !== filterCategory) return false;
    return true;
  });

  const correctableIssues = filteredIssues.filter(issue => issue.correctable);
  const categories = [...new Set(report.issues.map(issue => issue.category))];

  const exportReport = () => {
    const reportData = {
      ...report,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-skynet-${report.filename}-${new Date().toISOString().split('T')[0]}.json`;
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
            <h1 className="text-3xl font-bold gradient-text-blue">RAPPORT D'ANALYSE DES MENACES</h1>
            <p className="text-slate-400 text-lg">{report.filename}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {correctableIssues.length > 0 && onGenerateCorrections && (
            <button
              onClick={() => onGenerateCorrections(report)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-4 py-3 rounded-lg transition-all border border-green-400/50 hover:border-green-300 hover-lift"
            >
              <Wrench className="h-5 w-5" />
              <span className="font-bold">AUTO-RÉPARATION</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {correctableIssues.length}
              </span>
            </button>
          )}
          
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 px-4 py-3 rounded-lg transition-all border border-slate-500/50 hover:border-slate-400 hover-lift"
          >
            <Download className="h-4 w-4" />
            <span className="font-medium">EXPORTER</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-lg transition-all border border-blue-400/50 hover:border-blue-300 hover-lift">
            <Share2 className="h-4 w-4" />
            <span className="font-medium">TRANSMETTRE</span>
          </button>
        </div>
      </div>

      {/* Correction Banner */}
      {correctableIssues.length > 0 && (
        <div className="bg-gradient-to-r from-green-900/20 via-green-800/30 to-green-900/20 border-2 border-green-500/50 rounded-xl p-6 relative overflow-hidden glass-morphism">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent animate-pulse"></div>
          
          <div className="relative z-10 flex items-center space-x-4">
            <div className="p-3 bg-green-900/50 rounded-lg border border-green-500/50">
              <Zap className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-300 mb-1">
                PROTOCOLES AUTO-RÉPARATION DISPONIBLES
              </h3>
              <p className="text-green-400">
                {correctableIssues.length} menace{correctableIssues.length !== 1 ? 's' : ''} peuvent être neutralisée{correctableIssues.length !== 1 ? 's' : ''} automatiquement
              </p>
            </div>
            {onGenerateCorrections && (
              <button
                onClick={() => onGenerateCorrections(report)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg transition-all font-bold border border-green-400/50 hover:border-green-300 hover-lift"
              >
                INITIER RÉPARATION
              </button>
            )}
          </div>
        </div>
      )}

      {/* Score Card */}
      <div className={`glass-morphism rounded-xl shadow-2xl border-2 p-8 relative overflow-hidden ${getScoreColor(report.score)}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent animate-pulse"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-bold mb-2">{report.score}%</h2>
            <p className="text-xl font-bold mb-2">SCORE D'ACCESSIBILITÉ</p>
            <p className="text-sm opacity-75">
              Scanné: {report.timestamp.toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-4">
              {report.score >= 80 ? (
                <CheckCircle className="h-12 w-12 text-green-400" />
              ) : (
                <AlertTriangle className="h-12 w-12 text-red-400 animate-pulse" />
              )}
            </div>
            <p className="text-lg font-bold">
              {report.score >= 80 ? 'CIBLE SÉCURISÉE' : report.score >= 60 ? 'MENACES DÉTECTÉES' : 'VULNÉRABILITÉS CRITIQUES'}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-morphism rounded-xl p-6 border border-blue-500/30 hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-bold text-blue-300">STATUT CRITÈRES</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Sécurisés</span>
              <span className="font-bold text-green-400">{report.summary.conformCriteria}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Compromis</span>
              <span className="font-bold text-red-400">{report.summary.nonConformCriteria}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">N/A</span>
              <span className="font-bold text-slate-500">{report.summary.notApplicableCriteria}</span>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-6 border border-red-500/30 hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-red-400" />
            <h3 className="text-lg font-bold text-red-300">NIVEAUX DE MENACE</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Critiques</span>
              <span className="font-bold text-red-400">{report.summary.criticalIssues}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Majeurs</span>
              <span className="font-bold text-orange-400">{report.summary.majorIssues}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mineurs</span>
              <span className="font-bold text-yellow-400">{report.summary.minorIssues}</span>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-6 border border-green-500/30 hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <Wrench className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-bold text-green-300">STATUT RÉPARATION</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Auto-corrigeables</span>
              <span className="font-bold text-green-400">{correctableIssues.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Manuelles</span>
              <span className="font-bold text-orange-400">{filteredIssues.length - correctableIssues.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gain Score</span>
              <span className="font-bold text-blue-400">+{Math.round(correctableIssues.length * 2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-morphism rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-bold text-blue-300">FILTRES MENACES</h3>
          
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-200"
          >
            <option value="all">Toutes Sévérités</option>
            <option value="critical">Critiques</option>
            <option value="major">Majeurs</option>
            <option value="minor">Mineurs</option>
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-200"
          >
            <option value="all">Toutes Catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <span className="text-sm text-slate-400 font-medium">
            {filteredIssues.length} menace{filteredIssues.length !== 1 ? 's' : ''} détectée{filteredIssues.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Issues List */}
      <div className="glass-morphism rounded-xl shadow-2xl border border-red-500/30">
        <div className="p-6 border-b border-red-500/30">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h3 className="text-xl font-bold text-red-300">MENACES DÉTECTÉES</h3>
          </div>
        </div>
        
        <div className="divide-y divide-red-500/20">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="p-6 hover:bg-red-900/10 transition-all">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => toggleIssue(issue.id)}
              >
                <div className="flex items-center space-x-4">
                  {getSeverityIcon(issue.severity)}
                  <div>
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                        {issue.title}
                      </h4>
                      {issue.correctable && (
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs font-bold border border-green-500/50">
                          AUTO-CORRIGEABLE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 ${getSeverityBadge(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-slate-500">Ligne {issue.line}</span>
                      <span className="text-sm text-slate-500">{issue.category}</span>
                      <span className="text-sm text-slate-500">Niveau {issue.level}</span>
                    </div>
                  </div>
                </div>
                
                {expandedIssues.has(issue.id) ? (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                )}
              </div>
              
              {expandedIssues.has(issue.id) && (
                <div className="mt-4 pl-8 space-y-4">
                  <div>
                    <h5 className="font-bold text-blue-300 mb-2">DESCRIPTION MENACE</h5>
                    <p className="text-slate-400">{issue.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-blue-300 mb-2">ÉLÉMENT COMPROMIS</h5>
                    <code className="bg-slate-800/50 px-3 py-2 rounded-lg text-sm font-mono block border border-blue-500/30">
                      {issue.element}
                    </code>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-blue-300 mb-2">PROTOCOLE NEUTRALISATION</h5>
                    <p className="text-slate-400">{issue.recommendation}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-blue-300 mb-2">RÉFÉRENCES WCAG</h5>
                    <div className="flex flex-wrap gap-2">
                      {issue.wcag.map((wcagCriterion, index) => (
                        <span key={index} className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-sm border border-blue-500/50">
                          {wcagCriterion}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-700">
                    <a
                      href={`https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#${issue.criterion}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Voir Critère RGAA {issue.criterion}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};