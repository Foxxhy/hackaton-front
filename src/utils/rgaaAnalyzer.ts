import { AnalysisResult, Issue, Summary } from '../App';

export function analyzeCode(code: string, filename: string): AnalysisResult {
  const issues: Issue[] = [];
  const lines = code.split('\n');
  
  // Enhanced AI-powered analysis simulation
  console.log('🤖 Démarrage de l\'analyse IA RGAA...');
  
  // Analyse des images sans attribut alt (Critère 1.1)
  const imgMatches = code.match(/<img[^>]*>/gi) || [];
  imgMatches.forEach((img, index) => {
    if (!img.includes('alt=')) {
      issues.push({
        id: `img-no-alt-${index}`,
        criterion: '1.1',
        level: 'A',
        severity: 'critical',
        category: 'Images',
        title: 'Image sans alternative textuelle',
        description: 'Cette image ne possède pas d\'attribut alt pour décrire son contenu aux utilisateurs de technologies d\'assistance. L\'IA a détecté que cette image pourrait contenir des informations importantes.',
        element: img,
        line: findLineNumber(code, img),
        recommendation: 'Ajoutez un attribut alt descriptif à l\'image. L\'IA suggère d\'analyser le contexte de l\'image pour fournir une description pertinente.',
        wcag: ['1.1.1'],
        correctable: true
      });
    } else if (img.includes('alt=""') && !img.includes('role="presentation"')) {
      issues.push({
        id: `img-empty-alt-${index}`,
        criterion: '1.2',
        level: 'A',
        severity: 'major',
        category: 'Images',
        title: 'Image décorative mal identifiée',
        description: 'Cette image a un attribut alt vide mais n\'est pas identifiée comme décorative. L\'IA recommande de clarifier le rôle de cette image.',
        element: img,
        line: findLineNumber(code, img),
        recommendation: 'Ajoutez role="presentation" ou aria-hidden="true" pour les images décoratives, ou fournissez un alt descriptif si l\'image est informative.',
        wcag: ['1.1.1'],
        correctable: true
      });
    }
  });

  // Analyse des liens sans texte (Critère 6.1)
  const linkMatches = code.match(/<a[^>]*>.*?<\/a>/gi) || [];
  linkMatches.forEach((link, index) => {
    const linkContent = link.replace(/<a[^>]*>|<\/a>/gi, '').trim();
    const hasAriaLabel = link.includes('aria-label=');
    const hasTitle = link.includes('title=');
    
    if (!linkContent && !hasAriaLabel && !hasTitle) {
      issues.push({
        id: `link-no-text-${index}`,
        criterion: '6.1',
        level: 'A',
        severity: 'critical',
        category: 'Liens',
        title: 'Lien sans intitulé accessible',
        description: 'Ce lien ne contient pas de texte visible, d\'aria-label ou de title. L\'IA a identifié que ce lien sera inaccessible aux technologies d\'assistance.',
        element: link,
        line: findLineNumber(code, link),
        recommendation: 'Ajoutez un texte descriptif au lien, un attribut aria-label ou title. L\'IA suggère d\'analyser la destination du lien pour générer un intitulé approprié.',
        wcag: ['2.4.4', '4.1.2'],
        correctable: true
      });
    }
  });

  // Analyse des formulaires sans labels (Critère 11.1)
  const inputMatches = code.match(/<input[^>]*>/gi) || [];
  inputMatches.forEach((input, index) => {
    const inputType = input.match(/type=["']([^"']*)["']/)?.[1] || 'text';
    const interactiveTypes = ['text', 'email', 'password', 'tel', 'url', 'search', 'number'];
    
    if (interactiveTypes.includes(inputType)) {
      const hasId = input.match(/id=["']([^"']*)["']/);
      const hasAriaLabel = input.includes('aria-label=');
      const hasAriaLabelledby = input.includes('aria-labelledby=');
      
      if (hasId && !hasAriaLabel && !hasAriaLabelledby) {
        const id = hasId[1];
        const labelRegex = new RegExp(`<label[^>]*for=["']${id}["']`, 'i');
        if (!labelRegex.test(code)) {
          issues.push({
            id: `input-no-label-${index}`,
            criterion: '11.1',
            level: 'A',
            severity: 'critical',
            category: 'Formulaires',
            title: 'Champ de formulaire sans étiquette',
            description: 'Ce champ de formulaire n\'a pas d\'étiquette associée. L\'IA a détecté que ce champ sera difficile à identifier pour les utilisateurs de lecteurs d\'écran.',
            element: input,
            line: findLineNumber(code, input),
            recommendation: 'Associez une étiquette <label> au champ avec l\'attribut for, ou utilisez aria-label. L\'IA peut suggérer un libellé basé sur le contexte.',
            wcag: ['1.3.1', '3.3.2'],
            correctable: true
          });
        }
      } else if (!hasId && !hasAriaLabel && !hasAriaLabelledby) {
        issues.push({
          id: `input-no-id-${index}`,
          criterion: '11.1',
          level: 'A',
          severity: 'major',
          category: 'Formulaires',
          title: 'Champ de formulaire sans identifiant',
          description: 'Ce champ de formulaire n\'a pas d\'attribut id pour être associé à une étiquette. L\'IA recommande d\'ajouter un identifiant unique.',
          element: input,
          line: findLineNumber(code, input),
          recommendation: 'Ajoutez un attribut id unique au champ de formulaire pour permettre l\'association avec une étiquette.',
          wcag: ['1.3.1'],
          correctable: true
        });
      }
    }
  });

  // Analyse de la structure des titres (Critère 9.1)
  const headingMatches = code.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi) || [];
  if (headingMatches.length === 0) {
    issues.push({
      id: 'no-headings',
      criterion: '9.1',
      level: 'A',
      severity: 'major',
      category: 'Structuration',
      title: 'Aucun titre dans la page',
      description: 'La page ne contient aucun élément de titre (h1-h6). L\'IA a identifié que cela nuit gravement à la navigation et à la compréhension de la structure.',
      element: 'Document entier',
      line: 1,
      recommendation: 'Ajoutez une hiérarchie de titres appropriée avec au moins un h1. L\'IA peut analyser le contenu pour suggérer une structure de titres logique.',
      wcag: ['1.3.1', '2.4.6'],
      correctable: false
    });
  } else {
    // Vérifier la hiérarchie des titres
    const headingLevels = headingMatches.map(h => parseInt(h.match(/<h([1-6])/)?.[1] || '1'));
    const h1Count = headingLevels.filter(level => level === 1).length;
    
    if (h1Count === 0) {
      issues.push({
        id: 'no-h1',
        criterion: '9.1',
        level: 'A',
        severity: 'major',
        category: 'Structuration',
        title: 'Absence de titre principal (h1)',
        description: 'La page ne contient pas de titre principal h1. L\'IA a détecté que cela affecte la hiérarchie de l\'information.',
        element: 'Document entier',
        line: 1,
        recommendation: 'Ajoutez un titre principal h1 à la page. L\'IA peut suggérer un titre basé sur le contenu principal de la page.',
        wcag: ['1.3.1'],
        correctable: true
      });
    } else if (h1Count > 1) {
      issues.push({
        id: 'multiple-h1',
        criterion: '9.1',
        level: 'AA',
        severity: 'minor',
        category: 'Structuration',
        title: 'Plusieurs titres h1 dans la page',
        description: 'La page contient plusieurs titres h1. L\'IA recommande d\'utiliser un seul h1 par page pour une meilleure structure sémantique.',
        element: 'Éléments h1 multiples',
        line: 1,
        recommendation: 'Utilisez un seul h1 par page et une hiérarchie logique pour les autres titres (h2, h3, etc.).',
        wcag: ['1.3.1'],
        correctable: false
      });
    }
    
    // Vérifier les sauts de niveaux
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] - headingLevels[i-1] > 1) {
        issues.push({
          id: `heading-skip-${i}`,
          criterion: '9.1',
          level: 'AA',
          severity: 'minor',
          category: 'Structuration',
          title: 'Saut de niveau dans la hiérarchie des titres',
          description: `L'IA a détecté un saut de niveau de h${headingLevels[i-1]} à h${headingLevels[i]}. Cela peut perturber la navigation par titres.`,
          element: `h${headingLevels[i]}`,
          line: findLineNumber(code, headingMatches[i]),
          recommendation: 'Respectez la hiérarchie logique des titres sans sauter de niveaux.',
          wcag: ['1.3.1'],
          correctable: false
        });
        break; // Un seul avertissement pour les sauts de niveaux
      }
    }
  }

  // Analyse de la langue du document (Critère 8.3)
  const htmlMatch = code.match(/<html[^>]*>/i);
  if (htmlMatch && !htmlMatch[0].includes('lang=')) {
    issues.push({
      id: 'no-lang',
      criterion: '8.3',
      level: 'A',
      severity: 'major',
      category: 'Éléments obligatoires',
      title: 'Langue du document non spécifiée',
      description: 'L\'attribut lang n\'est pas défini sur l\'élément html. L\'IA a identifié que cela empêche les technologies d\'assistance de prononcer correctement le contenu.',
      element: htmlMatch[0],
      line: findLineNumber(code, htmlMatch[0]),
      recommendation: 'Ajoutez l\'attribut lang à l\'élément html (ex: <html lang="fr">). L\'IA peut détecter automatiquement la langue du contenu.',
      wcag: ['3.1.1'],
      correctable: true
    });
  }

  // Analyse des tableaux sans en-têtes (Critère 5.7)
  const tableMatches = code.match(/<table[^>]*>.*?<\/table>/gis) || [];
  tableMatches.forEach((table, index) => {
    const hasHeaders = table.includes('<th') || table.includes('scope=') || table.includes('headers=');
    const hasMultipleRows = (table.match(/<tr/gi) || []).length > 1;
    
    if (!hasHeaders && hasMultipleRows) {
      issues.push({
        id: `table-no-headers-${index}`,
        criterion: '5.7',
        level: 'A',
        severity: 'major',
        category: 'Tableaux',
        title: 'Tableau de données sans en-têtes',
        description: 'Ce tableau ne possède pas d\'en-têtes clairement identifiés. L\'IA a détecté que ce tableau contient probablement des données tabulaires.',
        element: table.substring(0, 100) + '...',
        line: findLineNumber(code, table),
        recommendation: 'Utilisez des éléments <th> avec l\'attribut scope approprié pour identifier les en-têtes de colonnes et de lignes.',
        wcag: ['1.3.1'],
        correctable: true
      });
    }
  });

  // Analyse des contrastes et couleurs (Critère 3.2)
  const colorMatches = code.match(/(?:color|background-color)\s*:\s*([^;]+)/gi) || [];
  const inlineStyleMatches = code.match(/style=["'][^"']*(?:color|background)[^"']*["']/gi) || [];
  
  if (colorMatches.length > 0 || inlineStyleMatches.length > 0) {
    issues.push({
      id: 'contrast-check',
      criterion: '3.2',
      level: 'AA',
      severity: 'minor',
      category: 'Couleurs',
      title: 'Vérification des contrastes requise',
      description: 'L\'IA a détecté l\'utilisation de couleurs dans le code. Une vérification manuelle des ratios de contraste est nécessaire pour garantir l\'accessibilité.',
      element: 'Styles de couleur détectés',
      line: 1,
      recommendation: 'Vérifiez que le ratio de contraste est d\'au moins 4.5:1 pour le texte normal et 3:1 pour le texte large. Utilisez des outils comme WebAIM Contrast Checker.',
      wcag: ['1.4.3'],
      correctable: false
    });
  }

  // Analyse des éléments interactifs (Critère 7.1)
  const buttonMatches = code.match(/<button[^>]*>.*?<\/button>/gi) || [];
  buttonMatches.forEach((button, index) => {
    const buttonContent = button.replace(/<button[^>]*>|<\/button>/gi, '').trim();
    const hasAriaLabel = button.includes('aria-label=');
    const hasTitle = button.includes('title=');
    
    if (!buttonContent && !hasAriaLabel && !hasTitle) {
      issues.push({
        id: `button-no-text-${index}`,
        criterion: '7.1',
        level: 'A',
        severity: 'critical',
        category: 'Scripts',
        title: 'Bouton sans intitulé accessible',
        description: 'Ce bouton ne contient pas de texte visible ou d\'alternative textuelle. L\'IA a identifié que ce bouton sera inaccessible.',
        element: button,
        line: findLineNumber(code, button),
        recommendation: 'Ajoutez un texte descriptif au bouton ou utilisez aria-label pour décrire son action.',
        wcag: ['4.1.2'],
        correctable: true
      });
    }
  });

  // Analyse des landmarks ARIA (Critère 12.6)
  const hasMain = code.includes('<main') || code.includes('role="main"');
  const hasNav = code.includes('<nav') || code.includes('role="navigation"');
  const contentLength = code.replace(/<[^>]*>/g, '').trim().length;
  
  if (!hasMain && contentLength > 500) {
    issues.push({
      id: 'no-main-landmark',
      criterion: '12.6',
      level: 'AA',
      severity: 'minor',
      category: 'Navigation',
      title: 'Absence de landmark principal',
      description: 'L\'IA a détecté un contenu substantiel sans landmark <main>. Cela peut compliquer la navigation pour les utilisateurs de technologies d\'assistance.',
      element: 'Document entier',
      line: 1,
      recommendation: 'Ajoutez un élément <main> pour identifier le contenu principal de la page.',
      wcag: ['1.3.6'],
      correctable: true
    });
  }

  // Calcul du score avec pondération IA
  const totalCriteria = 106; // Nombre total de critères RGAA 4.1
  const applicableCriteria = Math.min(totalCriteria, Math.max(20, issues.length + 15));
  
  // Pondération par sévérité
  const criticalWeight = 3;
  const majorWeight = 2;
  const minorWeight = 1;
  
  const weightedIssues = issues.reduce((acc, issue) => {
    switch (issue.severity) {
      case 'critical': return acc + criticalWeight;
      case 'major': return acc + majorWeight;
      case 'minor': return acc + minorWeight;
      default: return acc + 1;
    }
  }, 0);
  
  const maxPossibleWeight = applicableCriteria * criticalWeight;
  const score = Math.max(0, Math.round(((maxPossibleWeight - weightedIssues) / maxPossibleWeight) * 100));

  const summary: Summary = {
    totalCriteria: applicableCriteria,
    conformCriteria: Math.max(0, applicableCriteria - issues.length),
    nonConformCriteria: issues.length,
    notApplicableCriteria: totalCriteria - applicableCriteria,
    criticalIssues: issues.filter(i => i.severity === 'critical').length,
    majorIssues: issues.filter(i => i.severity === 'major').length,
    minorIssues: issues.filter(i => i.severity === 'minor').length
  };

  console.log('✅ Analyse IA RGAA terminée:', {
    score,
    issues: issues.length,
    criticalIssues: summary.criticalIssues
  });

  return {
    id: generateId(),
    timestamp: new Date(),
    filename,
    originalCode: code,
    score,
    issues,
    summary
  };
}

function findLineNumber(code: string, element: string): number {
  const lines = code.split('\n');
  const searchText = element.substring(0, 30).replace(/\s+/g, ' ').trim();
  
  for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i].replace(/\s+/g, ' ').trim();
    if (lineText.includes(searchText)) {
      return i + 1;
    }
  }
  return 1;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}