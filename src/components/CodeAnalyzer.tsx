import React, { useState } from "react";
import {
  Upload,
  FileText,
  Play,
  Loader2,
  AlertCircle,
  CheckCircle,
  Code,
  Globe,
  Zap,
  ExternalLink,
  Eye,
  Cpu,
  Target,
  Shield,
} from "lucide-react";
import { AnalysisResult } from "../App";
import { analyzeCode } from "../utils/rgaaAnalyzer";
import { extractDOMFromURL } from "../utils/domExtractor";

interface CodeAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const CodeAnalyzer: React.FC<CodeAnalyzerProps> = ({
  onAnalysisComplete,
}) => {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<"url" | "paste" | "upload">(
    "url"
  );
  const [extractionError, setExtractionError] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const downloadReport = (reportString: string) => {
    // Création d'un blob avec le contenu texte
    const blob = new Blob([reportString], { type: "text/plain" });

    // Création d'une URL locale pour le blob
    const url = window.URL.createObjectURL(blob);

    // Création d'un lien <a> temporaire
    const a = document.createElement("a");
    a.href = url;
    a.download = "rapport.txt"; // Nom du fichier téléchargé
    document.body.appendChild(a);

    // Lancement du téléchargement
    a.click();

    // Nettoyage : suppression du lien et libération de l'URL blob
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleURLExtraction = async () => {
    if (!url.trim()) return;

    setIsExtracting(true);
    setExtractionError("");

    try {
      const extractedData = await extractDOMFromURL(url);
      setCode(extractedData.html);
      setFilename(extractedData.title || new URL(url).hostname);

      // Supposons que ton backend renvoie l'objet { data: 'le texte du rapport' }
      if (extractedData.data) {
        downloadReport(extractedData.data);
      }
    } catch (error) {
      setExtractionError(
        error instanceof Error
          ? error.message
          : "Échec de l'extraction du réseau neural"
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis time
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const result = analyzeCode(code, filename || "Cible analysée");
      onAnalysisComplete(result);
    } catch (error) {
      console.error("Échec de l'analyse neurale:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sampleCode = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Cyberdyne Systems - Interface Neurale</title>
</head>
<body>
    <header>
        <h1>Cyberdyne Systems</h1>
        <nav>
            <ul>
                <li><a href="#accueil">Base d'Accueil</a></li>
                <li><a href="#systemes">Réseaux Neuraux</a></li>
                <li><a href="#contact">Protocole Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Briefing de Mission</h2>
            <img src="skynet.jpg">
            <p>Initialisation du scan de protocole d'accessibilité.</p>
            
            <form>
                <input type="email" placeholder="Email cible">
                <input type="password" placeholder="Code d'accès">
                <button type="submit">Exécuter</button>
            </form>
        </section>
    </main>
</body>
</html>`;

  const loadSample = () => {
    setCode(sampleCode);
    setFilename("cyberdyne-cible.html");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Eye className="h-8 w-8 text-blue-500 animate-pulse" />
          <h1 className="text-3xl font-bold gradient-text-blue">
            PROTOCOLE SCANNER NEURAL
          </h1>
          <Target
            className="h-8 w-8 text-red-500 animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>
        <p className="text-slate-400 text-lg">
          Système d'Analyse d'Accessibilité Skynet
        </p>
      </div>

      {/* Analysis Mode Toggle */}
      <div className="glass-morphism rounded-xl shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent"></div>

        <div className="relative z-10">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setAnalysisMode("url")}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover-lift ${
                analysisMode === "url"
                  ? "bg-gradient-to-r from-blue-900/50 to-blue-800/30 text-blue-300 border-2 border-blue-500/50 shadow-lg"
                  : "text-slate-400 hover:bg-blue-900/20 border-2 border-blue-500/20 hover:border-blue-500/40"
              }`}
            >
              <Globe className="h-5 w-5" />
              <span className="font-medium">URL CIBLE</span>
            </button>

            <button
              onClick={() => setAnalysisMode("paste")}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover-lift ${
                analysisMode === "paste"
                  ? "bg-gradient-to-r from-blue-900/50 to-blue-800/30 text-blue-300 border-2 border-blue-500/50 shadow-lg"
                  : "text-slate-400 hover:bg-blue-900/20 border-2 border-blue-500/20 hover:border-blue-500/40"
              }`}
            >
              <Code className="h-5 w-5" />
              <span className="font-medium">INJECTER CODE</span>
            </button>

            <button
              onClick={() => setAnalysisMode("upload")}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover-lift ${
                analysisMode === "upload"
                  ? "bg-gradient-to-r from-blue-900/50 to-blue-800/30 text-blue-300 border-2 border-blue-500/50 shadow-lg"
                  : "text-slate-400 hover:bg-blue-900/20 border-2 border-blue-500/20 hover:border-blue-500/40"
              }`}
            >
              <Upload className="h-5 w-5" />
              <span className="font-medium">TÉLÉCHARGER FICHIER</span>
            </button>
          </div>

          {analysisMode === "url" ? (
            <div>
              <label className="block text-sm font-medium text-blue-400 mb-3">
                URL CIBLE POUR EXTRACTION NEURALE
              </label>
              <div className="flex space-x-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://systeme-cible.com"
                  className="flex-1 px-4 py-3 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-slate-200 placeholder-slate-500"
                />
                <button
                  onClick={handleURLExtraction}
                  disabled={!url.trim() || isExtracting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:cursor-not-allowed border-2 border-blue-400/50 hover:border-blue-300 hover-lift"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>EXTRACTION...</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-5 w-5" />
                      <span>EXTRAIRE</span>
                    </>
                  )}
                </button>
              </div>

              {extractionError && (
                <div className="mt-3 p-3 bg-red-900/30 border-2 border-red-500/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <p className="text-sm text-red-300">{extractionError}</p>
                  </div>
                </div>
              )}

              {code && (
                <div className="mt-4 p-4 bg-green-900/20 border-2 border-green-500/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                    <p className="text-sm font-medium text-green-300">
                      CIBLE ACQUISE
                    </p>
                  </div>
                  <p className="text-sm text-green-400">
                    {code.split("\n").length} lignes extraites • Analyse neurale
                    prête
                  </p>
                </div>
              )}
            </div>
          ) : analysisMode === "upload" ? (
            <div>
              <label className="block text-sm font-medium text-blue-400 mb-3">
                TÉLÉCHARGER FICHIER CIBLE
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".html,.css,.js,.htm,.jsx,.tsx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-8 text-center hover:border-blue-400/50 transition-all duration-300 bg-blue-900/10 hover-lift">
                  <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-lg font-medium text-blue-300 mb-2">
                    DÉPOSER FICHIER CIBLE ICI
                  </p>
                  <p className="text-slate-400 mb-4">
                    ou cliquer pour sélectionner un fichier
                  </p>
                  <p className="text-sm text-slate-500">
                    Formats supportés: HTML, CSS, JS, JSX, TSX
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-blue-400">
                  INJECTER CODE SOURCE
                </label>
                <button
                  onClick={loadSample}
                  className="text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  CHARGER CIBLE EXEMPLE
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Collez votre code HTML, CSS ou JavaScript ici pour l'analyse neurale..."
                className="w-full h-64 p-4 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 resize-y text-slate-200 placeholder-slate-500"
              />

              <div className="mt-3">
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Nom de fichier cible (optionnel)"
                  className="w-full px-3 py-2 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-slate-200 placeholder-slate-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Analysis Info */}
      <div className="bg-gradient-to-r from-blue-900/20 via-slate-800/50 to-purple-900/20 rounded-xl border-2 border-blue-500/50 p-6 relative overflow-hidden glass-morphism">
        <div className="absolute inset-0 opacity-10">
          <Cpu className="h-full w-full" />
        </div>

        <div className="relative z-10 flex items-start space-x-4">
          <div className="p-3 bg-blue-900/50 rounded-lg border border-blue-500/50">
            <Shield className="h-6 w-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-300 mb-2">
              PROTOCOLE D'ANALYSE NEURALE SKYNET
            </h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>
                • Détection avancée de menaces IA pour violations
                d'accessibilité
              </li>
              <li>• Analyse par réseau neural de 106 critères RGAA</li>
              <li>
                • Classification automatique de sévérité
                (CRITIQUE/MAJEUR/MINEUR)
              </li>
              <li>• Protocoles de correction intelligents et suggestions</li>
              <li>• Vérification complète de conformité WCAG 2.1</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={!code.trim() || isAnalyzing}
          className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-lg font-bold transition-all disabled:cursor-not-allowed shadow-2xl border-2 border-blue-400/50 hover:border-blue-300 text-lg relative overflow-hidden hover-lift"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 animate-pulse"></div>
          {isAnalyzing ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>ANALYSE NEURALE EN COURS...</span>
            </>
          ) : (
            <>
              <Eye className="h-6 w-6 animate-pulse" />
              <span>INITIER SCAN NEURAL</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Stats */}
      {code && (
        <div className="glass-morphism rounded-xl shadow-2xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-bold text-blue-300 mb-4">
            ANALYSE CIBLE
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30 hover-lift">
              <p className="text-2xl font-bold text-blue-400">
                {code.split("\n").length}
              </p>
              <p className="text-sm text-slate-500">LIGNES</p>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30 hover-lift">
              <p className="text-2xl font-bold text-blue-400">{code.length}</p>
              <p className="text-sm text-slate-500">CARACTÈRES</p>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30 hover-lift">
              <p className="text-2xl font-bold text-blue-400">
                {(code.match(/<[^>]+>/g) || []).length}
              </p>
              <p className="text-sm text-slate-500">BALISES</p>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30 hover-lift">
              <p className="text-2xl font-bold text-blue-400">
                {Math.round(code.length / 1024)}KB
              </p>
              <p className="text-sm text-slate-500">TAILLE</p>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="glass-morphism rounded-xl shadow-2xl p-6 relative overflow-hidden border border-blue-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent animate-pulse"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <h3 className="text-xl font-bold text-blue-300">
                ANALYSE NEURALE EN COURS...
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Extraction DOM terminée</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Analyse des critères RGAA
                </span>
                <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Génération évaluation menaces
                </span>
                <div className="h-4 w-4 rounded-full border-2 border-blue-500/30"></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Calcul protocoles correction
                </span>
                <div className="h-4 w-4 rounded-full border-2 border-blue-500/30"></div>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full bg-slate-700/50 rounded-full h-3 border border-blue-500/50">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full animate-pulse shadow-lg"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
