import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CodeAnalyzer } from './components/CodeAnalyzer';
import { ReportViewer } from './components/ReportViewer';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { CorrectionGenerator } from './components/CorrectionGenerator';
import { SkynetBackground } from './components/BackgroundEffects';

export type ViewType = 'dashboard' | 'analyzer' | 'report' | 'history' | 'settings' | 'corrections';

export interface AnalysisResult {
  id: string;
  timestamp: Date;
  filename: string;
  originalCode: string;
  score: number;
  issues: Issue[];
  summary: Summary;
  corrections?: Correction[];
}

export interface Issue {
  id: string;
  criterion: string;
  level: 'A' | 'AA' | 'AAA';
  severity: 'critical' | 'major' | 'minor';
  category: string;
  title: string;
  description: string;
  element: string;
  line: number;
  recommendation: string;
  wcag: string[];
  correctable: boolean;
}

export interface Correction {
  issueId: string;
  originalCode: string;
  correctedCode: string;
  explanation: string;
  confidence: 'high' | 'medium' | 'low';
  lineStart: number;
  lineEnd: number;
}

export interface Summary {
  totalCriteria: number;
  conformCriteria: number;
  nonConformCriteria: number;
  notApplicableCriteria: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [currentReport, setCurrentReport] = useState<AnalysisResult | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResults(prev => [result, ...prev]);
    setCurrentReport(result);
    setCurrentView('report');
  };

  const handleViewReport = (result: AnalysisResult) => {
    setCurrentReport(result);
    setCurrentView('report');
  };

  const handleGenerateCorrections = (result: AnalysisResult) => {
    setCurrentReport(result);
    setCurrentView('corrections');
  };

  const handleUpdateReport = (updatedReport: AnalysisResult) => {
    setAnalysisResults(prev => 
      prev.map(r => r.id === updatedReport.id ? updatedReport : r)
    );
    setCurrentReport(updatedReport);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Effets de fond Skynet */}
      <SkynetBackground />
      
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex relative">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={sidebarOpen}
        />
        
        {/* Main content sans margin-left */}
        <main className="flex-1 transition-all duration-300 relative min-h-[calc(100vh-4rem)]">
          <div className="p-6 relative z-10">
            {currentView === 'dashboard' && (
              <Dashboard 
                analysisResults={analysisResults}
                onViewReport={handleViewReport}
              />
            )}
            
            {currentView === 'analyzer' && (
              <CodeAnalyzer onAnalysisComplete={handleAnalysisComplete} />
            )}
            
            {currentView === 'report' && currentReport && (
              <ReportViewer 
                report={currentReport} 
                onGenerateCorrections={handleGenerateCorrections}
              />
            )}

            {currentView === 'corrections' && currentReport && (
              <CorrectionGenerator 
                report={currentReport}
                onUpdateReport={handleUpdateReport}
                onBackToReport={() => setCurrentView('report')}
              />
            )}
            
            {currentView === 'history' && (
              <History 
                analysisResults={analysisResults}
                onViewReport={handleViewReport}
                onDeleteReport={(id) => {
                  setAnalysisResults(prev => prev.filter(r => r.id !== id));
                }}
              />
            )}
            
            {currentView === 'settings' && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;