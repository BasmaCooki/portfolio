// =========================================
// VEILLE TECHNOLOGIQUE
// Contenu statique curatéé + fetch live en arrière-plan
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // CONFIGURATION DES SOURCES
  // =========================================
  const SOURCES = {
    "cert-fr": {
      name: "CERT-FR",
      url: "https://www.cert.ssi.gouv.fr/feed/",
      siteUrl: "https://www.cert.ssi.gouv.fr/",
      color: "#ef4444"
    },
    "anssi": {
      name: "ANSSI",
      url: "https://www.ssi.gouv.fr/feed/",
      siteUrl: "https://www.ssi.gouv.fr/",
      color: "#3b82f6"
    },
    "cybermalveillance": {
      name: "Cybermalveillance",
      url: "https://www.cybermalveillance.gouv.fr/feed/",
      siteUrl: "https://www.cybermalveillance.gouv.fr/",
      color: "#8b5cf6"
    },
    "hackernews": {
      name: "The Hacker News",
      url: "https://feeds.feedburner.com/TheHackersNews",
      siteUrl: "https://thehackernews.com/",
      color: "#10b981"
    },
    "microsoft": {
      name: "Microsoft Security",
      url: "https://www.microsoft.com/en-us/security/blog/feed/",
      siteUrl: "https://www.microsoft.com/en-us/security/blog/",
      color: "#0ea5e9"
    },
    "bleeping": {
      name: "Bleeping Computer",
      url: "https://www.bleepingcomputer.com/feed/",
      siteUrl: "https://www.bleepingcomputer.com/",
      color: "#f59e0b"
    }
  };

  // =========================================
  // ARTICLES STATIQUES CURATÉÉS (toujours affichés si fetch échoue)
  // =========================================
  const STATIC_ARTICLES = {
    "cert-fr": [
      {
        title: "[MàJ] Vulnérabilité dans Cisco Catalyst SD-WAN",
        link: "https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-002/",
        description: "Une vulnérabilité permettant un contournement de politique de sécurité a été découverte dans Cisco Catalyst SD-WAN. Exploitation active confirmée (CVE-2026-20127).",
        date: "2026-02-25"
      },
      {
        title: "[MàJ] Multiples vulnérabilités dans Ivanti Endpoint Manager Mobile",
        link: "https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-001/",
        description: "Ivanti a publié des scripts de détection d'indicateurs de compromission pour EPMM. Mise à jour du guide d'analyse disponible.",
        date: "2026-01-30"
      },
      {
        title: "Campagne de phishing ciblant les identifiants Microsoft 365",
        link: "https://www.cert.ssi.gouv.fr/actualite/",
        description: "Le CERT-FR signale une vague de phishing sophistiquée visant à dérober des identifiants Microsoft 365 via de fausses pages de connexion.",
        date: "2026-01-15"
      }
    ],
    "anssi": [
      {
        title: "Guide de sécurisation des systèmes d'authentification",
        link: "https://www.ssi.gouv.fr/guide/recommandations-relatives-a-lauthentification-multifacteur-et-aux-mots-de-passe/",
        description: "L'ANSSI publie ses recommandations sur l'authentification multifacteur et la gestion des mots de passe pour les organisations.",
        date: "2025-11-20"
      },
      {
        title: "Panorama de la cybermenace 2025",
        link: "https://www.ssi.gouv.fr/uploads/2025/01/anssi-panorama-cybermenace-2025.pdf",
        description: "Analyse des principales menaces cyber observées en 2025 : ransomwares, espionnage étatique, et attaques sur les infrastructures critiques.",
        date: "2025-10-10"
      },
      {
        title: "Zero Trust : principes et mise en œuvre",
        link: "https://www.ssi.gouv.fr/guide/",
        description: "Publication du guide ANSSI sur l'architecture Zero Trust, principe clé pour sécuriser les accès dans un environnement hybride.",
        date: "2025-09-05"
      }
    ],
    "cybermalveillance": [
      {
        title: "Arnaque au faux support technique : comment se protéger",
        link: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/assistance-technique-fraude",
        description: "Des escrocs se font passer pour le support Microsoft ou Apple pour prendre le contrôle des ordinateurs et soutirer des fonds.",
        date: "2026-02-10"
      },
      {
        title: "Hameçonnage : les bons réflexes face aux faux e-mails",
        link: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing",
        description: "Guide pratique pour reconnaître et éviter les tentatives d'hameçonnage ciblant les particuliers et les entreprises.",
        date: "2026-01-22"
      },
      {
        title: "Mots de passe : les règles d'hygiène essentielles",
        link: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/mots-de-passe",
        description: "Rappel des bonnes pratiques pour créer et gérer ses mots de passe, et pourquoi activer la double authentification.",
        date: "2025-12-15"
      }
    ],
    "hackernews": [
      {
        title: "New Phishing Campaign Bypasses MFA Using Adversary-in-the-Middle Attacks",
        link: "https://thehackernews.com/search/label/phishing",
        description: "Security researchers have identified a sophisticated phishing campaign that uses AiTM (Adversary-in-the-Middle) techniques to steal session cookies and bypass MFA protections.",
        date: "2026-03-10"
      },
      {
        title: "Critical Zero-Day in Windows Authentication Protocol Exploited in the Wild",
        link: "https://thehackernews.com/search/label/vulnerability",
        description: "Microsoft has released an emergency patch for a critical vulnerability in the Windows authentication system being actively exploited by threat actors.",
        date: "2026-02-28"
      },
      {
        title: "Passkeys Adoption Grows as Major Platforms Drop Password Support",
        link: "https://thehackernews.com/search/label/password",
        description: "Major tech companies are accelerating passkey adoption, with Google, Apple and Microsoft reporting significant increases in passwordless authentication usage.",
        date: "2026-02-14"
      }
    ],
    "microsoft": [
      {
        title: "How Microsoft Entra ID protects against token theft attacks",
        link: "https://www.microsoft.com/en-us/security/blog/topic/identity-access/",
        description: "Microsoft details new Conditional Access policies and token protection features in Entra ID designed to prevent session hijacking and token theft attacks.",
        date: "2026-03-05"
      },
      {
        title: "Zero Trust deployment guide for hybrid environments",
        link: "https://www.microsoft.com/en-us/security/blog/topic/zero-trust/",
        description: "A comprehensive guide to implementing Zero Trust architecture across hybrid cloud and on-premises environments using Microsoft security tools.",
        date: "2026-02-18"
      },
      {
        title: "Microsoft Authenticator app adds number matching to combat MFA fatigue",
        link: "https://www.microsoft.com/en-us/security/blog/topic/identity-access/",
        description: "New features in Microsoft Authenticator address MFA fatigue attacks by requiring users to enter a number displayed on screen before approving authentication requests.",
        date: "2026-01-30"
      }
    ],
    "bleeping": [
      {
        title: "Hackers abuse legitimate RMM tools to bypass security software",
        link: "https://www.bleepingcomputer.com/tag/remote-access/",
        description: "Threat actors are increasingly using legitimate remote monitoring and management tools to maintain access to compromised networks while evading detection.",
        date: "2026-03-12"
      },
      {
        title: "New credential-stealing malware targets password manager vaults",
        link: "https://www.bleepingcomputer.com/tag/password/",
        description: "A new infostealer malware variant has been discovered that specifically targets popular password managers to extract stored credentials.",
        date: "2026-03-01"
      },
      {
        title: "CISA warns of actively exploited authentication bypass vulnerability",
        link: "https://www.bleepingcomputer.com/tag/vulnerability/",
        description: "CISA added a critical authentication bypass flaw to its Known Exploited Vulnerabilities catalog, urging organizations to apply patches immediately.",
        date: "2026-02-20"
      }
    ]
  };

  const STORAGE_PREFIX = "veille-source-v3-";
  const CACHE_DURATION = 3600000; // 1 heure

  // =========================================
  // CACHE LOCAL
  // =========================================
  function getCachedArticles(sourceId) {
    try {
      const cached = localStorage.getItem(STORAGE_PREFIX + sourceId);
      if (!cached) return null;
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_DURATION) return data.articles;
      return null;
    } catch (e) {
      return null;
    }
  }

  function setCachedArticles(sourceId, articles) {
    try {
      localStorage.setItem(STORAGE_PREFIX + sourceId, JSON.stringify({
        articles,
        timestamp: Date.now()
      }));
    } catch (e) {}
  }

  // =========================================
  // FETCH LIVE EN ARRIÈRE-PLAN
  // =========================================
  async function tryFetchLive(sourceId) {
    const source = SOURCES[sourceId];

    const proxies = [
      {
        url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&count=5`,
        parse: async (r) => {
          const data = await r.json();
          if (data.status !== 'ok' || !data.items?.length) return [];
          return data.items.slice(0, 5).map(item => ({
            title: cleanHtml(item.title || ""),
            link: item.link || item.url || source.siteUrl,
            description: cleanHtml(item.description || item.content || "").substring(0, 200) + "...",
            date: item.pubDate || item.published || "",
            source: source.name,
            sourceColor: source.color
          }));
        }
      },
      {
        url: `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`,
        parse: async (r) => {
          const xmlText = await r.text();
          return parseXmlItems(xmlText, source);
        }
      },
      {
        url: `https://corsproxy.io/?${encodeURIComponent(source.url)}`,
        parse: async (r) => {
          const xmlText = await r.text();
          return parseXmlItems(xmlText, source);
        }
      }
    ];

    for (const proxy of proxies) {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 8000);
        const response = await fetch(proxy.url, { signal: controller.signal });
        if (!response.ok) continue;
        const articles = await proxy.parse(response);
        if (articles.length > 0) {
          setCachedArticles(sourceId, articles);
          return articles;
        }
      } catch (_) {
        // Proxy suivant
      }
    }
    return null;
  }

  function parseXmlItems(xmlText, source) {
    if (!xmlText || xmlText.length < 100) return [];
    try {
      const xmlDoc = new DOMParser().parseFromString(xmlText, "text/xml");
      const items = Array.from(xmlDoc.querySelectorAll("item"));
      if (!items.length) return [];
      return items.slice(0, 5).map(item => ({
        title: cleanHtml(item.querySelector("title")?.textContent || ""),
        link: item.querySelector("link")?.textContent?.trim() || source.siteUrl,
        description: cleanHtml(item.querySelector("description")?.textContent || "").substring(0, 200) + "...",
        date: item.querySelector("pubDate")?.textContent || "",
        source: source.name,
        sourceColor: source.color
      }));
    } catch (_) {
      return [];
    }
  }

  // =========================================
  // AFFICHAGE
  // =========================================
  function buildArticles(articles) {
    return `
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
              Lire l'article <i class="fa fa-external-link"></i>
            </a>
          </article>
        `).join('')}
      </div>
    `;
  }

  function displayArticlesForSource(sourceId, articles) {
    const container = document.getElementById(`articles-${sourceId}`);
    if (!container) return;

    container.innerHTML = buildArticles(articles);

    setTimeout(() => {
      container.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }, 100);
  }

  // =========================================
  // CHARGEMENT
  // =========================================
  async function loadAllSources() {
    for (const sourceId of Object.keys(SOURCES)) {
      const source = SOURCES[sourceId];

      // 1. Afficher le cache live si disponible
      const cached = getCachedArticles(sourceId);
      if (cached?.length) {
        displayArticlesForSource(sourceId, cached);
        // Refresh silencieux en arrière-plan
        tryFetchLive(sourceId).then(live => {
          if (live?.length) displayArticlesForSource(sourceId, live);
        });
        continue;
      }

      // 2. Afficher le statique immédiatement (garantit un contenu visible)
      const statics = (STATIC_ARTICLES[sourceId] || []).map(a => ({
        ...a,
        source: source.name,
        sourceColor: source.color
      }));
      displayArticlesForSource(sourceId, statics);

      // 3. Tenter le fetch live en arrière-plan et remplacer si réussi
      tryFetchLive(sourceId).then(live => {
        if (live?.length) displayArticlesForSource(sourceId, live);
      });
    }
  }

  // =========================================
  // UTILITAIRES
  // =========================================
  function cleanHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return dateString;
      const diffDays = Math.ceil(Math.abs(Date.now() - date) / 86400000);
      if (diffDays === 0) return "Aujourd'hui";
      if (diffDays === 1) return "Hier";
      if (diffDays < 7) return `Il y a ${diffDays} jours`;
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (_) {
      return dateString;
    }
  }

  // =========================================
  // ANIMATIONS AU SCROLL
  // =========================================
  function initScrollAnimations() {
    const veilleSection = document.querySelector("#veille");
    if (!veilleSection) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    veilleSection.querySelectorAll('.veille-tool, .veille-source-item').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // =========================================
  // INITIALISATION
  // =========================================
  // Purger les anciens caches
  Object.keys(localStorage)
    .filter(k => k.startsWith("veille-source-") && !k.startsWith(STORAGE_PREFIX))
    .forEach(k => localStorage.removeItem(k));

  initScrollAnimations();
  loadAllSources();

  // Auto-refresh toutes les heures
  setInterval(loadAllSources, CACHE_DURATION);
});
