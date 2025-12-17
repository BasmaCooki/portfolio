// =========================================
// VEILLE TECHNOLOGIQUE - AUTO-ACTUALISATION
// Récupération automatique d'articles depuis plusieurs sources
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const veilleSection = document.querySelector("#veille");
  if (!veilleSection) return;

  console.log("%c🔍 Module Veille Technologique chargé", "color: #22d3ee; font-weight: bold;");

  // =========================================
  // CONFIGURATION DES SOURCES
  // =========================================
  const SOURCES = {
    certfr: {
      name: "CERT-FR",
      url: "https://www.cert.ssi.gouv.fr/feed/",
      color: "#ef4444",
      keywords: ["authentification", "identité", "MFA", "phishing", "mot de passe"]
    },
    anssi: {
      name: "ANSSI",
      url: "https://www.ssi.gouv.fr/feed/",
      color: "#3b82f6",
      keywords: ["sécurité", "authentification", "zero trust", "identité"]
    },
    cybermalveillance: {
      name: "Cybermalveillance",
      url: "https://www.cybermalveillance.gouv.fr/feed/",
      color: "#8b5cf6",
      keywords: ["phishing", "arnaque", "compte", "mot de passe"]
    }
  };

  // =========================================
  // STOCKAGE LOCAL DES ARTICLES
  // =========================================
  const STORAGE_KEY = "veille-articles-cache";
  const CACHE_DURATION = 3600000; // 1 heure en millisecondes

  function getCachedArticles() {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (!cached) return null;
      
      const data = JSON.parse(cached);
      const now = Date.now();
      
      // Vérifier si le cache est encore valide
      if (now - data.timestamp < CACHE_DURATION) {
        console.log("✅ Articles chargés depuis le cache");
        return data.articles;
      }
      
      console.log("⏰ Cache expiré, rechargement...");
      return null;
    } catch (e) {
      console.error("Erreur lecture cache:", e);
      return null;
    }
  }

  function setCachedArticles(articles) {
    try {
      const data = {
        articles: articles,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("💾 Articles mis en cache");
    } catch (e) {
      console.error("Erreur sauvegarde cache:", e);
    }
  }

  // =========================================
  // RÉCUPÉRATION DES ARTICLES (via proxy CORS)
  // =========================================
  async function fetchArticlesFromSource(source) {
    try {
      // Utilisation d'un proxy CORS pour contourner les restrictions
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`;
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const xmlText = data.contents;

      // Parser le XML (RSS)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      const items = xmlDoc.querySelectorAll("item");
      const articles = [];

      items.forEach((item, index) => {
        if (index >= 3) return; // Max 3 articles par source

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
            description: cleanHtml(description).substring(0, 200) + "...",
            date: formatDate(pubDate),
            source: source.name,
            sourceColor: source.color
          });
        }
      });

      console.log(`✅ ${articles.length} articles trouvés depuis ${source.name}`);
      return articles;

    } catch (error) {
      console.error(`❌ Erreur ${source.name}:`, error);
      return [];
    }
  }

  // =========================================
  // RÉCUPÉRATION DE TOUS LES ARTICLES
  // =========================================
  async function fetchAllArticles() {
    // Vérifier le cache d'abord
    const cached = getCachedArticles();
    if (cached && cached.length > 0) {
      return cached;
    }

    showLoadingState();

    const allArticles = [];
    
    // Récupérer depuis toutes les sources en parallèle
    const promises = Object.values(SOURCES).map(source => 
      fetchArticlesFromSource(source)
    );

    const results = await Promise.all(promises);
    
    // Fusionner tous les articles
    results.forEach(articles => {
      allArticles.push(...articles);
    });

    // Trier par date (plus récent en premier)
    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Limiter à 6 articles max
    const limitedArticles = allArticles.slice(0, 6);

    // Mettre en cache
    if (limitedArticles.length > 0) {
      setCachedArticles(limitedArticles);
    }

    hideLoadingState();

    return limitedArticles;
  }

  // =========================================
  // AFFICHAGE DES ARTICLES
  // =========================================
  function displayArticles(articles) {
    const container = veilleSection.querySelector(".veille-articles-container");
    
    if (!container) {
      console.error("❌ Container .veille-articles-container non trouvé");
      return;
    }

    if (articles.length === 0) {
      container.innerHTML = `
        <div class="veille-empty">
          <p>Aucun article récent trouvé. Les articles seront chargés automatiquement.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = articles.map((article, index) => `
      <div class="veille-article reveal" style="animation-delay: ${index * 0.1}s">
        <div class="veille-article-header">
          <span class="veille-source-badge" style="background: ${article.sourceColor}">
            ${article.source}
          </span>
          <span class="veille-date">${article.date}</span>
        </div>
        
        <div class="veille-article-body">
          <h4 class="veille-article-title">${article.title}</h4>
          <p class="veille-article-description">${article.description}</p>
          
          <a 
            href="${article.link}" 
            class="veille-article-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Lire l'article complet
            <i class="fa fa-external-link"></i>
          </a>
        </div>
      </div>
    `).join('');

    // Animer l'apparition
    animateArticles();
  }

  // =========================================
  // ÉTATS DE CHARGEMENT
  // =========================================
  function showLoadingState() {
    const container = veilleSection.querySelector(".veille-articles-container");
    if (!container) return;

    container.innerHTML = `
      <div class="veille-loading">
        <div class="loading-spinner"></div>
        <p>Chargement des derniers articles...</p>
      </div>
    `;
  }

  function hideLoadingState() {
    const loading = veilleSection.querySelector(".veille-loading");
    if (loading) loading.remove();
  }

  // =========================================
  // ANIMATIONS
  // =========================================
  function animateArticles() {
    const articles = veilleSection.querySelectorAll(".veille-article.reveal");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    articles.forEach(article => observer.observe(article));
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
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  }

  // =========================================
  // BOUTON DE RAFRAÎCHISSEMENT MANUEL
  // =========================================
  function createRefreshButton() {
    const header = veilleSection.querySelector(".section-header");
    if (!header) return;

    const refreshBtn = document.createElement("button");
    refreshBtn.className = "veille-refresh-btn";
    refreshBtn.innerHTML = `
      <i class="fa fa-refresh"></i>
      <span>Actualiser</span>
    `;
    
    refreshBtn.addEventListener("click", async () => {
      refreshBtn.classList.add("loading");
      localStorage.removeItem(STORAGE_KEY); // Forcer le rechargement
      const articles = await fetchAllArticles();
      displayArticles(articles);
      refreshBtn.classList.remove("loading");
    });

    header.appendChild(refreshBtn);
  }

  // =========================================
  // INITIALISATION
  // =========================================
  async function init() {
    console.log("🔄 Initialisation du module de veille...");
    
    createRefreshButton();
    
    const articles = await fetchAllArticles();
    displayArticles(articles);

    // Auto-refresh toutes les heures
    setInterval(async () => {
      console.log("🔄 Auto-refresh des articles...");
      const freshArticles = await fetchAllArticles();
      displayArticles(freshArticles);
    }, CACHE_DURATION);

    console.log("✅ Module de veille initialisé");
  }

  // Lancer l'initialisation
  init();
});