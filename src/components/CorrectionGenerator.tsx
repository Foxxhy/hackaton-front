import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Download,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle,
  Code,
  Zap,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { AnalysisResult, Correction } from '../App';
import { generateCorrections } from '../utils/correctionGenerator';

interface CorrectionGeneratorProps {
  report: AnalysisResult;
  onUpdateReport: (report: AnalysisResult) => void;
  onBackToReport: () => void;
}

export const CorrectionGenerator: React.FC<CorrectionGeneratorProps> = ({
  report,
  onUpdateReport,
  onBackToReport
}) => {
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedCorrections, setAppliedCorrections] = useState<Set<string>>(new Set());
  const [correctedCode, setCorrectedCode] = useState(report.originalCode);
  const [showDiff, setShowDiff] = useState(true);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    generateCorrectionsForReport();
  }, []);

  const generateCorrectionsForReport = async () => {
    setIsGenerating(true);
    try {
      const generatedCorrections = await generateCorrections(report);
      setCorrections(generatedCorrections);
      
      // Update the report with corrections
      const updatedReport = {
        ...report,
        corrections: generatedCorrections
      };
      onUpdateReport(updatedReport);
    } catch (error) {
      console.error('Échec de génération des corrections:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyCorrection = (correction: Correction) => {
    const newApplied = new Set(appliedCorrections);
    let newCode = correctedCode;

    if (appliedCorrections.has(correction.issueId)) {
      // Unapply correction
      newApplied.delete(correction.issueId);
      // Revert to original and reapply other corrections
      newCode = report.originalCode;
      corrections.forEach(c => {
        if (newApplied.has(c.issueId)) {
          newCode = newCode.replace(c.originalCode, c.correctedCode);
        }
      });
    } else {
      // Apply correction
      newApplied.add(correction.issueId);
      newCode = newCode.replace(correction.originalCode, correction.correctedCode);
    }

    setAppliedCorrections(newApplied);
    setCorrectedCode(newCode);
  };

  const applyAllCorrections = () => {
    const allCorrectionIds = new Set(corrections.map(c => c.issueId));
    setAppliedCorrections(allCorrectionIds);
    
    let newCode = report.originalCode;
    corrections.forEach(correction => {
      newCode = newCode.replace(correction.originalCode, correction.correctedCode);
    });
    setCorrectedCode(newCode);
  };

  const resetCorrections = () => {
    setAppliedCorrections(new Set());
    setCorrectedCode(report.originalCode);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (error) {
      console.error('Échec de copie dans le presse-papiers:', error);
    }
  };

  const downloadCorrectedCode = () => {
    const blob = new Blob([correctedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.filename.replace(/\.[^/.]+$/, '')}-corrige.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const potentialScoreImprovement = Math.round((appliedCorrections.size / corrections.length) * 20);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToReport}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Corrections automatiques</h1>
            <p className="text-gray-600">{report.filename}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowDiff(!showDiff)}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            {showDiff ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showDiff ? 'Masquer' : 'Afficher'} les différences</span>
          </button>
          
          <button
            onClick={downloadCorrectedCode}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Télécharger le code corrigé</span>
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                {appliedCorrections.size} / {corrections.length} corrections appliquées
              </h3>
              <p className="text-green-800">
                Amélioration potentielle du score : +{potentialScoreImprovement}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={resetCorrections}
              className="flex items-center space-x-2 bg-white border border-green-300 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Réinitialiser</span>
            </button>
            
            <button
              onClick={applyAllCorrections}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Appliquer tout</span>
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(appliedCorrections.size / corrections.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Génération des corrections...</h3>
          <p className="text-gray-600">Analyse du code et création des corrections automatiques</p>
        </div>
      )}

      {/* Corrections List */}
      {!isGenerating && corrections.length > 0 && (
        <div className="space-y-4">
          {corrections.map((correction, index) => {
            const isApplied = appliedCorrections.has(correction.issueId);
            const issue = report.issues.find(i => i.id === correction.issueId);
            
            return (
              <div key={correction.issueId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        #{index + 1}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">
                        {issue?.title || 'Correction automatique'}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(correction.confidence)}`}>
                        Confiance {correction.confidence}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => applyCorrection(correction)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isApplied
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Appliquée</span>
                        </>
                      ) : (
                        <>
                          <Code className="h-4 w-4" />
                          <span>Appliquer</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{correction.explanation}</p>
                  
                  {showDiff && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Original Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-red-700">Code original</h4>
                          <button
                            onClick={() => copyToClipboard(correction.originalCode, `original-${correction.issueId}`)}
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700"
                          >
                            {copiedStates[`original-${correction.issueId}`] ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span>Copier</span>
                          </button>
                        </div>
                        <pre className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm font-mono overflow-x-auto">
                          <code className="text-red-800">{correction.originalCode}</code>
                        </pre>
                      </div>
                      
                      {/* Corrected Code */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-green-700">Code corrigé</h4>
                          <button
                            onClick={() => copyToClipboard(correction.correctedCode, `corrected-${correction.issueId}`)}
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700"
                          >
                            {copiedStates[`corrected-${correction.issueId}`] ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span>Copier</span>
                          </button>
                        </div>
                        <pre className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm font-mono overflow-x-auto">
                          <code className="text-green-800">{correction.correctedCode}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Final Code Preview */}
      {appliedCorrections.size > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Code final corrigé</h3>
              <button
                onClick={() => copyToClipboard(correctedCode, 'final-code')}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
              >
                {copiedStates['final-code'] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>Copier tout</span>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono overflow-x-auto max-h-96">
              <code>{correctedCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* No Corrections Available */}
      {!isGenerating && corrections.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune correction automatique disponible</h3>
          <p className="text-gray-600">
            Les problèmes détectés nécessitent une intervention manuelle ou ne peuvent pas être corrigés automatiquement.
          </p>
        </div>
      )}
    </div>
  );
};