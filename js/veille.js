// =========================================
// VEILLE TECHNOLOGIQUE - STYLE LOÏC
// Chargement d'articles par source
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const veilleSection = document.querySelector("#veille");
  if (!veilleSection) return;

  console.log("%c🔍 Module Veille Technologique (style Loïc) chargé", "color: #22d3ee; font-weight: bold;");

  // =========================================
  // CONFIGURATION DES SOURCES
  // =========================================
  const SOURCES = {
    "cert-fr": {
      name: "CERT-FR",
      url: "https://www.cert.ssi.gouv.fr/feed/",
      color: "#ef4444",
      keywords: ["authentification", "identité", "MFA", "phishing", "mot de passe", "compte"]
    },
    "anssi": {
      name: "ANSSI",
      url: "https://www.ssi.gouv.fr/feed/",
      color: "#3b82f6",
      keywords: ["sécurité", "authentification", "zero trust", "identité", "accès"]
    },
    "cybermalveillance": {
      name: "Cybermalveillance",
      url: "https://www.cybermalveillance.gouv.fr/feed/",
      color: "#8b5cf6",
      keywords: ["phishing", "arnaque", "compte", "mot de passe", "hameçonnage"]
    },
    "hackernews": {
      name: "The Hacker News",
      url: "https://feeds.feedburner.com/TheHackersNews",
      color: "#10b981",
      keywords: ["MFA", "authentication", "identity", "phishing", "password", "credentials"]
    },
    "microsoft": {
      name: "Microsoft Security",
      url: "https://www.microsoft.com/en-us/security/blog/feed/",
      color: "#0ea5e9",
      keywords: ["identity", "authentication", "zero trust", "MFA", "Azure AD"]
    },
    "bleeping": {
      name: "Bleeping Computer",
      url: "https://www.bleepingcomputer.com/feed/",
      color: "#f59e0b",
      keywords: ["authentication", "password", "credentials", "phishing", "identity"]
    }
  };

  const STORAGE_PREFIX = "veille-source-";
  const CACHE_DURATION = 3600000; // 1 heure

  // =========================================
  // CACHE LOCAL
  // =========================================
  function getCachedArticles(sourceId) {
    try {
      const cached = localStorage.getItem(STORAGE_PREFIX + sourceId);
      if (!cached) return null;
      
      const data = JSON.parse(cached);
      const now = Date.now();
      
      if (now - data.timestamp < CACHE_DURATION) {
        console.log(`✅ ${sourceId}: articles chargés depuis le cache`);
        return data.articles;
      }
      
      return null;
    } catch (e) {
      return null;
    }
  }

  function setCachedArticles(sourceId, articles) {
    try {
      const data = {
        articles: articles,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_PREFIX + sourceId, JSON.stringify(data));
    } catch (e) {
      console.error(`Erreur cache ${sourceId}:`, e);
    }
  }

  // =========================================
  // RÉCUPÉRATION ARTICLES PAR SOURCE
  // =========================================
  async function fetchArticlesFromSource(sourceId) {
    const source = SOURCES[sourceId];
    if (!source) return [];

    // Vérifier le cache
    const cached = getCachedArticles(sourceId);
    if (cached && cached.length > 0) {
      return cached;
    }

    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`;
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const xmlText = data.contents;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      const items = xmlDoc.querySelectorAll("item");
      const articles = [];

      items.forEach((item, index) => {
        if (index >= 4) return; // Max 4 articles par source

        const title = item.querySelector("title")?.textContent || "Sans titre";
        const link = item.querySelector("link")?.textContent || "#";
        const description = item.querySelector("description")?.textContent || "";
        const pubDate = item.querySelector("pubDate")?.textContent || "";

        // Filtrer par mots-clés
        const content = (title + " " + description).toLowerCase();
        const matchesKeywords = source.keywords.some(keyword => 
          content.includes(keyword.toLowerCase())
        );

        if (matchesKeywords) {
          articles.push({
            title: cleanHtml(title),
            link: link,
            description: cleanHtml(description).substring(0, 150) + "...",
            date: formatDate(pubDate),
            source: source.name,
            sourceColor: source.color
          });
        }
      });

      // Mettre en cache
      if (articles.length > 0) {
        setCachedArticles(sourceId, articles);
      }

      console.log(`✅ ${sourceId}: ${articles.length} articles trouvés`);
      return articles;

    } catch (error) {
      console.error(`❌ Erreur ${sourceId}:`, error);
      return [];
    }
  }

  // =========================================
  // AFFICHAGE ARTICLES POUR UNE SOURCE
  // =========================================
  function displayArticlesForSource(sourceId, articles) {
    const container = document.getElementById(`articles-${sourceId}`);
    if (!container) return;

    if (articles.length === 0) {
      container.innerHTML = `
        <div class="source-empty">
          <p>Aucun article récent trouvé pour cette source</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="source-articles-list">
        ${articles.map((article, index) => `
          <article class="source-article reveal" style="animation-delay: ${index * 0.1}s">
            <div class="article-date">${article.date}</div>
            <h5 class="article-title">
              <a href="${article.link}" target="_blank" rel="noopener noreferrer">
                ${article.title}
              </a>
            </h5>
            <p class="article-excerpt">${article.description}</p>
            <a href="${article.link}" class="article-link" target="_blank" rel="noopener noreferrer">
              Lire l'article
              <i class="fa fa-external-link"></i>
            </a>
          </article>
        `).join('')}
      </div>
    `;

    // Animer l'apparition
    setTimeout(() => {
      container.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('is-visible');
      });
    }, 100);
  }

  // =========================================
  // CHARGEMENT DE TOUTES LES SOURCES
  // =========================================
  async function loadAllSources() {
    const sourceIds = Object.keys(SOURCES);
    
    console.log("🔄 Chargement de toutes les sources...");

    for (const sourceId of sourceIds) {
      const articles = await fetchArticlesFromSource(sourceId);
      displayArticlesForSource(sourceId, articles);
    }

    console.log("✅ Toutes les sources chargées");
  }

  // =========================================
  // UTILITAIRES
  // =========================================
  function cleanHtml(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Aujourd'hui";
      if (diffDays === 1) return "Hier";
      if (diffDays < 7) return `Il y a ${diffDays} jours`;

      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  }

  // =========================================
  // ANIMATIONS AU SCROLL
  // =========================================
  function initScrollAnimations() {
    const tools = veilleSection.querySelectorAll('.veille-tool, .veille-source-item');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    tools.forEach(tool => {
      tool.classList.add('reveal');
      observer.observe(tool);
    });
  }

  // =========================================
  // INITIALISATION
  // =========================================
  async function init() {
    console.log("🚀 Initialisation du module de veille...");
    
    initScrollAnimations();
    await loadAllSources();

    // Auto-refresh toutes les heures
    setInterval(async () => {
      console.log("🔄 Auto-refresh des articles...");
      await loadAllSources();
    }, CACHE_DURATION);

    console.log("✅ Module de veille initialisé");
  }

  // Lancer l'initialisation
  init();
});