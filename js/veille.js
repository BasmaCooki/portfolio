// =========================================
// VEILLE TECHNOLOGIQUE - STYLE LOÏC
// Chargement d'articles par source
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c🔍 Module Veille Technologique chargé", "color: #22d3ee; font-weight: bold;");

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
  const CACHE_DURATION = 900000; // 15 minutes (pour des articles plus frais)

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

    // Liste de proxies à essayer avec timeout
    const proxies = [
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`,
      `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`,
      `https://corsproxy.io/?${encodeURIComponent(source.url)}`
    ];

    // Essayer chaque proxy avec timeout
    for (let proxyIndex = 0; proxyIndex < proxies.length; proxyIndex++) {
      try {
        const proxyUrl = proxies[proxyIndex];
        console.log(`🔄 ${sourceId}: Tentative proxy ${proxyIndex + 1}/${proxies.length}...`);

        // Fetch avec timeout de 10 secondes
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const articles = [];

        // rss2json utilise un format JSON différent (proxy 0)
        if (proxyIndex === 0) {
          const items = data.items || [];

          items.forEach((item, index) => {
            if (index >= 5) return;

            articles.push({
              title: cleanHtml(item.title || "Sans titre"),
              link: item.link || item.url || "#",
              description: cleanHtml(item.description || item.content || "").substring(0, 200) + "...",
              date: formatDate(item.pubDate || item.published || ""),
              source: source.name,
              sourceColor: source.color
            });
          });

          if (articles.length > 0) {
            setCachedArticles(sourceId, articles);
            console.log(`✅ ${sourceId}: ${articles.length} articles (RSS2JSON)`);
            return articles;
          }
        } else {
          // Format allorigins/corsproxy
          const xmlText = data.contents || data;

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");

          const items = xmlDoc.querySelectorAll("item");

          items.forEach((item, index) => {
            if (index >= 5) return;

            const title = item.querySelector("title")?.textContent || "Sans titre";
            const link = item.querySelector("link")?.textContent || "#";
            const description = item.querySelector("description")?.textContent || "";
            const pubDate = item.querySelector("pubDate")?.textContent || "";

            articles.push({
              title: cleanHtml(title),
              link: link,
              description: cleanHtml(description).substring(0, 200) + "...",
              date: formatDate(pubDate),
              source: source.name,
              sourceColor: source.color
            });
          });

          if (articles.length > 0) {
            setCachedArticles(sourceId, articles);
            console.log(`✅ ${sourceId}: ${articles.length} articles`);
            return articles;
          }
        }

      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn(`⏱️ ${sourceId}: Timeout proxy ${proxyIndex + 1}`);
        } else {
          console.warn(`⚠️ ${sourceId}: Proxy ${proxyIndex + 1} échoué:`, error.message);
        }
        // Continuer avec le prochain proxy
      }
    }

    // Tous les proxies ont échoué - Retourner des articles de démonstration
    console.warn(`❌ ${sourceId}: Tous proxies échoués, affichage données démo`);

    const demoArticles = [
      {
        title: `Article récent de ${source.name}`,
        link: source.url.replace('/feed/', ''),
        description: "Les flux RSS sont temporairement indisponibles. Consultez directement le site pour les dernières actualités en cybersécurité...",
        date: "Aujourd'hui",
        source: source.name,
        sourceColor: source.color
      }
    ];

    return demoArticles;
  }

  // =========================================
  // AFFICHAGE ARTICLES POUR UNE SOURCE
  // =========================================
  function displayArticlesForSource(sourceId, articles) {
    const container = document.getElementById(`articles-${sourceId}`);
    if (!container) {
      console.error(`Container articles-${sourceId} non trouvé dans le DOM`);
      return;
    }

    if (!articles || articles.length === 0) {
      const source = SOURCES[sourceId];
      const siteUrl = source ? source.url.replace('/feed/', '') : '#';

      container.innerHTML = `
        <div class="source-empty">
          <p>⚠️ Flux RSS temporairement indisponible</p>
          <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.7;">
            <a href="${siteUrl}" target="_blank" rel="noopener noreferrer"
               style="color: var(--primary-color); text-decoration: underline;">
              Consulter directement le site
            </a>
            <br>
            <button onclick="localStorage.clear(); window.location.reload()"
                    style="margin-top: 1rem; padding: 0.5rem 1rem; border-radius: 6px;
                           border: 1px solid var(--primary-color); background: transparent;
                           color: var(--primary-color); cursor: pointer; transition: all 0.3s;">
              🔄 Réessayer
            </button>
          </p>
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

    console.log(`✅ ${sourceId}: ${articles.length} articles affichés`);
  }

  // =========================================
  // CHARGEMENT DE TOUTES LES SOURCES
  // =========================================
  async function loadAllSources() {
    const sourceIds = Object.keys(SOURCES);

    console.log(`🔄 Chargement de ${sourceIds.length} sources RSS...`);
    console.log(`Sources: ${sourceIds.join(', ')}`);

    let successCount = 0;
    let failCount = 0;

    for (const sourceId of sourceIds) {
      try {
        const articles = await fetchArticlesFromSource(sourceId);
        displayArticlesForSource(sourceId, articles);

        if (articles && articles.length > 0 && !articles[0].title.includes('temporairement')) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (error) {
        console.error(`❌ Erreur fatale pour ${sourceId}:`, error);
        failCount++;
        displayArticlesForSource(sourceId, []);
      }
    }

    console.log(`✅ Chargement terminé: ${successCount} OK, ${failCount} échecs`);
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
    const veilleSection = document.querySelector("#veille");
    if (!veilleSection) return;

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