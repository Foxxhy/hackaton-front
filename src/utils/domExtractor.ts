interface ExtractedData {
  html: string;
  title: string;
  url: string;
  timestamp: Date;
}

export async function extractDOMFromURL(url: string): Promise<ExtractedData> {
  // Validate URL
  try {
    new URL(url);
  } catch {
    throw new Error(
      "URL invalide. Veuillez fournir une URL complète (ex: https://exemple.com)"
    );
  }

  // Simulate DOM extraction with a proxy service
  // In a real implementation, you would use a service like:
  // - Puppeteer/Playwright for server-side rendering
  // - A CORS proxy service
  // - A dedicated scraping API

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, we'll use a CORS proxy to fetch the page
    const proxyUrl = `https://hackaton-back-mj32.onrender.com/report`;

    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }), // Ici tu envoies { url: "ta valeur" }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    const html = data.contents;

    if (!html) {
      throw new Error("Impossible d'extraire le contenu de la page");
    }

    // Extract title from HTML
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname;

    // Clean and format HTML
    const cleanedHtml = cleanHTML(html);

    return {
      html: cleanedHtml,
      title,
      url,
      timestamp: new Date(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erreur lors de l'extraction: ${error.message}`);
    }
    throw new Error("Erreur inconnue lors de l'extraction du DOM");
  }
}

function cleanHTML(html: string): string {
  // Remove scripts and styles for security and focus on structure
  let cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Format for better readability
  cleaned = cleaned.replace(/>\s+</g, ">\n<").replace(/^\s+|\s+$/gm, "");

  return cleaned;
}

// Alternative method using a different CORS proxy
export async function extractDOMWithFallback(
  url: string
): Promise<ExtractedData> {
  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    `https://cors-anywhere.herokuapp.com/${url}`,
    `https://thingproxy.freeboard.io/fetch/${url}`,
  ];

  for (const proxyUrl of proxies) {
    try {
      const response = await fetch(proxyUrl);
      if (response.ok) {
        const data = await response.json();
        const html = data.contents || data;

        if (html && typeof html === "string") {
          const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
          const title = titleMatch
            ? titleMatch[1].trim()
            : new URL(url).hostname;

          return {
            html: cleanHTML(html),
            title,
            url,
            timestamp: new Date(),
          };
        }
      }
    } catch (error) {
      console.warn(`Proxy failed: ${proxyUrl}`, error);
      continue;
    }
  }

  throw new Error(
    "Impossible d'extraire le DOM avec tous les proxies disponibles"
  );
}

// Mock function for development/demo
export function getMockHTML(url: string): ExtractedData {
  const mockHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page de démonstration - ${new URL(url).hostname}</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <h1>Bienvenue sur notre site</h1>
        
        <section>
            <h2>Nos services</h2>
            <img src="service1.jpg">
            <p>Découvrez nos services innovants.</p>
            
            <form>
                <input type="email" placeholder="Votre email">
                <input type="password" placeholder="Mot de passe">
                <button type="submit">Se connecter</button>
            </form>
        </section>
        
        <section>
            <h2>Tableau de données</h2>
            <table>
                <tr>
                    <td>Nom</td>
                    <td>Email</td>
                    <td>Téléphone</td>
                </tr>
                <tr>
                    <td>Jean Dupont</td>
                    <td>jean@exemple.com</td>
                    <td>01 23 45 67 89</td>
                </tr>
            </table>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Mon Site Web</p>
    </footer>
</body>
</html>`;

  return {
    html: mockHTML,
    title: `Page de démonstration - ${new URL(url).hostname}`,
    url,
    timestamp: new Date(),
  };
}
