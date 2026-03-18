// =========================================
// VEILLE TECHNOLOGIQUE - STYLE LOÏC
// Chargement d'articles par source
// =========================================

document.addEventListener("DOMContentLoaded", () => {

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

  const STORAGE_PREFIX = "veille-source-v2-";
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

    // Liste de proxies à essayer avec timeout (allorigins en premier = proxy direct, pas de cache serveur)
    const proxies = [
      { url: `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`, type: 'xml' },
      { url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&count=5`, type: 'json' },
      { url: `https://corsproxy.io/?${encodeURIComponent(source.url)}`, type: 'xml' }
    ];

    // Essayer chaque proxy avec timeout
    for (const proxy of proxies) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(proxy.url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const articles = [];

        if (proxy.type === 'json') {
          const data = await response.json();
          const items = data.items || [];

          items.slice(0, 5).forEach(item => {
            articles.push({
              title: cleanHtml(item.title || "Sans titre"),
              link: item.link || item.url || "#",
              description: cleanHtml(item.description || item.content || "").substring(0, 200) + "...",
              date: item.pubDate || item.published || "",
              source: source.name,
              sourceColor: source.color
            });
          });
        } else {
          const data = await response.json();
          const xmlText = data.contents || "";

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");
          const items = xmlDoc.querySelectorAll("item");

          Array.from(items).slice(0, 5).forEach(item => {
            const title = item.querySelector("title")?.textContent || "Sans titre";
            const linkEl = item.querySelector("link");
            // <link> en RSS peut être un nœud texte ou un élément
            const link = linkEl?.textContent?.trim() || linkEl?.nextSibling?.textContent?.trim() || "#";
            const description = item.querySelector("description")?.textContent || "";
            const pubDate = item.querySelector("pubDate")?.textContent || "";

            articles.push({
              title: cleanHtml(title),
              link: link,
              description: cleanHtml(description).substring(0, 200) + "...",
              date: pubDate,
              source: source.name,
              sourceColor: source.color
            });
          });
        }

        if (articles.length > 0) {
          setCachedArticles(sourceId, articles);
          return articles;
        }

      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn(`⏱️ ${sourceId}: Timeout (${proxy.url.split('?')[0]})`);
        } else {
          console.warn(`⚠️ ${sourceId}: Échec (${proxy.url.split('?')[0]}):`, error.message);
        }
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
            <div class="article-date">${formatDate(article.date)}</div>
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
    // Purger les anciennes entrées de cache (format pré-v2)
    Object.keys(localStorage)
      .filter(k => k.startsWith("veille-source-") && !k.startsWith("veille-source-v2-"))
      .forEach(k => localStorage.removeItem(k));

    initScrollAnimations();
    await loadAllSources();

    // Auto-refresh toutes les heures
    setInterval(async () => {
      await loadAllSources();
    }, CACHE_DURATION);
  }

  // Lancer l'initialisation
  init();
});