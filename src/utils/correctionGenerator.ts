import { AnalysisResult, Correction, Issue } from '../App';

export async function generateCorrections(report: AnalysisResult): Promise<Correction[]> {
  const corrections: Correction[] = [];
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  for (const issue of report.issues) {
    if (issue.correctable) {
      const correction = generateCorrectionForIssue(issue, report.originalCode);
      if (correction) {
        corrections.push(correction);
      }
    }
  }
  
  return corrections;
}

function generateCorrectionForIssue(issue: Issue, originalCode: string): Correction | null {
  switch (issue.id.split('-')[0]) {
    case 'img':
      return generateImageCorrection(issue, originalCode);
    case 'link':
      return generateLinkCorrection(issue, originalCode);
    case 'input':
      return generateInputCorrection(issue, originalCode);
    case 'no':
      return generateStructureCorrection(issue, originalCode);
    case 'table':
      return generateTableCorrection(issue, originalCode);
    default:
      return null;
  }
}

function generateImageCorrection(issue: Issue, originalCode: string): Correction | null {
  const element = issue.element;
  
  if (issue.id.includes('no-alt')) {
    // Add alt attribute to images without alt
    const correctedElement = element.replace(/<img([^>]*)>/i, (match, attributes) => {
      if (attributes.includes('src=')) {
        const srcMatch = attributes.match(/src=["']([^"']*)["']/);
        const filename = srcMatch ? srcMatch[1].split('/').pop()?.split('.')[0] || 'image' : 'image';
        return `<img${attributes} alt="Description de ${filename}">`;
      }
      return `<img${attributes} alt="Description de l'image">`;
    });
    
    return {
      issueId: issue.id,
      originalCode: element,
      correctedCode: correctedElement,
      explanation: "Ajout d'un attribut alt descriptif à l'image pour améliorer l'accessibilité.",
      confidence: 'medium',
      lineStart: issue.line,
      lineEnd: issue.line
    };
  }
  
  if (issue.id.includes('empty-alt')) {
    // Add role="presentation" to decorative images
    const correctedElement = element.replace(/<img([^>]*)>/i, (match, attributes) => {
      return `<img${attributes} role="presentation">`;
    });
    
    return {
      issueId: issue.id,
      originalCode: element,
      correctedCode: correctedElement,
      explanation: "Ajout de role=\"presentation\" pour identifier l'image comme décorative.",
      confidence: 'high',
      lineStart: issue.line,
      lineEnd: issue.line
    };
  }
  
  return null;
}

function generateLinkCorrection(issue: Issue, originalCode: string): Correction | null {
  if (issue.id.includes('no-text')) {
    const element = issue.element;
    
    // Extract href if available
    const hrefMatch = element.match(/href=["']([^"']*)["']/);
    const href = hrefMatch ? hrefMatch[1] : '';
    
    let linkText = 'Lien';
    if (href) {
      if (href.includes('mailto:')) {
        linkText = 'Envoyer un email';
      } else if (href.includes('tel:')) {
        linkText = 'Appeler';
      } else if (href.startsWith('http')) {
        linkText = 'Visiter le site';
      } else {
        linkText = 'Aller à la page';
      }
    }
    
    const correctedElement = element.replace(/(<a[^>]*>)(\s*)(.*?)(\s*)(<\/a>)/i, 
      `$1$2${linkText}$4$5`
    );
    
    return {
      issueId: issue.id,
      originalCode: element,
      correctedCode: correctedElement,
      explanation: `Ajout d'un texte descriptif "${linkText}" au lien pour améliorer l'accessibilité.`,
      confidence: 'medium',
      lineStart: issue.line,
      lineEnd: issue.line
    };
  }
  
  return null;
}

function generateInputCorrection(issue: Issue, originalCode: string): Correction | null {
  const element = issue.element;
  
  if (issue.id.includes('no-label')) {
    // Generate a label for the input
    const idMatch = element.match(/id=["']([^"']*)["']/);
    const typeMatch = element.match(/type=["']([^"']*)["']/);
    const placeholderMatch = element.match(/placeholder=["']([^"']*)["']/);
    
    if (idMatch) {
      const id = idMatch[1];
      const type = typeMatch ? typeMatch[1] : 'text';
      const placeholder = placeholderMatch ? placeholderMatch[1] : '';
      
      let labelText = '';
      switch (type) {
        case 'email':
          labelText = placeholder || 'Adresse email';
          break;
        case 'password':
          labelText = placeholder || 'Mot de passe';
          break;
        case 'text':
        default:
          labelText = placeholder || 'Champ de texte';
          break;
      }
      
      const correctedCode = `<label for="${id}">${labelText}</label>\n${element}`;
      
      return {
        issueId: issue.id,
        originalCode: element,
        correctedCode: correctedCode,
        explanation: `Ajout d'une étiquette "${labelText}" associée au champ de formulaire.`,
        confidence: 'high',
        lineStart: issue.line,
        lineEnd: issue.line
      };
    }
  }
  
  if (issue.id.includes('no-id')) {
    // Add an ID to the input
    const typeMatch = element.match(/type=["']([^"']*)["']/);
    const type = typeMatch ? typeMatch[1] : 'text';
    const id = `${type}-${Date.now()}`;
    
    const correctedElement = element.replace(/<input/, `<input id="${id}"`);
    
    return {
      issueId: issue.id,
      originalCode: element,
      correctedCode: correctedElement,
      explanation: `Ajout d'un attribut id unique "${id}" au champ de formulaire.`,
      confidence: 'high',
      lineStart: issue.line,
      lineEnd: issue.line
    };
  }
  
  return null;
}

function generateStructureCorrection(issue: Issue, originalCode: string): Correction | null {
  if (issue.id === 'no-lang') {
    // Add lang attribute to html element
    const htmlMatch = originalCode.match(/<html[^>]*>/i);
    if (htmlMatch) {
      const htmlElement = htmlMatch[0];
      const correctedElement = htmlElement.replace(/<html([^>]*)>/i, '<html$1 lang="fr">');
      
      return {
        issueId: issue.id,
        originalCode: htmlElement,
        correctedCode: correctedElement,
        explanation: 'Ajout de l\'attribut lang="fr" à l\'élément html pour spécifier la langue du document.',
        confidence: 'high',
        lineStart: issue.line,
        lineEnd: issue.line
      };
    }
  }
  
  if (issue.id === 'no-h1') {
    // Add an h1 element after body opening tag
    const bodyMatch = originalCode.match(/<body[^>]*>/i);
    if (bodyMatch) {
      const bodyElement = bodyMatch[0];
      const correctedCode = bodyElement + '\n    <h1>Titre principal de la page</h1>';
      
      return {
        issueId: issue.id,
        originalCode: bodyElement,
        correctedCode: correctedCode,
        explanation: 'Ajout d\'un titre principal h1 à la page pour améliorer la structure.',
        confidence: 'medium',
        lineStart: issue.line,
        lineEnd: issue.line
      };
    }
  }
  
  return null;
}

function generateTableCorrection(issue: Issue, originalCode: string): Correction | null {
  if (issue.id.includes('no-headers')) {
    const tableMatch = originalCode.match(/<table[^>]*>.*?<\/table>/is);
    if (tableMatch) {
      const tableElement = tableMatch[0];
      
      // Simple correction: convert first row cells to th elements
      const correctedElement = tableElement.replace(
        /<tr[^>]*>\s*(<td[^>]*>.*?<\/td>\s*)+<\/tr>/is,
        (match) => {
          return match.replace(/<td([^>]*)>/g, '<th$1 scope="col">').replace(/<\/td>/g, '</th>');
        }
      );
      
      return {
        issueId: issue.id,
        originalCode: tableElement,
        correctedCode: correctedElement,
        explanation: 'Conversion de la première ligne du tableau en en-têtes avec scope="col".',
        confidence: 'medium',
        lineStart: issue.line,
        lineEnd: issue.line + 5
      };
    }
  }
  
  return null;
}