// ========================================================
// PORTFOLIO.JS - VERSION ULTRA CYBER AMÉLIORÉE (CORRIGÉE)
// Gestion des thèmes, navigation, effets et animations
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c🚀 BG TECH Portfolio Ultra Cyber Initialisé", 
    "color: #1af6c4; font-size: 20px; font-weight: bold; text-shadow: 0 0 15px #1af6c4;");

  // ======================================================
  // CONFIGURATION CYBER
  // ======================================================
  const CONFIG = {
    scrollRevealThreshold: 0.15,
    particleCount: 40,
    scanlineSpeed: 3000,
    glitchFrequency: 10000,
  };

  // ======================================================
  // THEME SWITCHER ULTRA-SMOOTH
  // ======================================================
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "bgtech-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
      if (themeToggle) themeToggle.checked = false;
      createThemeTransitionEffect("light");
    } else {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
      if (themeToggle) themeToggle.checked = true;
      createThemeTransitionEffect("dark");
    }
  }

  // Effet visuel lors du changement de thème
  function createThemeTransitionEffect(theme) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: ${theme === 'dark' 
        ? 'radial-gradient(circle, #1af6c4, #050814)' 
        : 'radial-gradient(circle, #0369a1, #e0f2fe)'};
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: overlay;
      animation: theme-pulse 0.8s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes theme-pulse {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 0.3; transform: scale(1.2); }
        100% { opacity: 0; transform: scale(2); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.remove();
      style.remove();
    }, 800);
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      
      // Son cyber (optionnel)
      playThemeSwitchSound();
    });
  }

  // ======================================================
  // NAVIGATION ULTRA-INTERACTIVE
  // ======================================================
  const allNavBtns = Array.from(document.querySelectorAll(".nav-btn"));
  const allSubBtns = Array.from(document.querySelectorAll(".nav-sub-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  function scrollToTarget(targetSelector) {
    const section = document.querySelector(targetSelector);
    if (!section) return;
    
    // Effet de flash avant le scroll
    createScrollFlash();
    
    setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  function createScrollFlash() {
    const flash = document.createElement("div");
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "rgba(26, 246, 196, 0.3)" : "rgba(3, 105, 161, 0.3)";
    
    flash.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle, ${color}, transparent);
      pointer-events: none;
      z-index: 9998;
      animation: flash-out 0.4s ease-out;
    `;
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  }

  function clearActiveStates() {
    document.querySelectorAll(".nav-submenu--open").forEach((menu) => {
      menu.classList.remove("nav-submenu--open");
    });
    
    allNavBtns.forEach((btn) => {
      btn.classList.remove("nav-btn--active");
      btn.classList.remove("nav-btn--expanded");
    });
    allSubBtns.forEach((btn) => btn.classList.remove("nav-sub-btn--active"));
  }
 
  function openSubmenuForElement(el) {
    const submenu = el.closest(".nav-submenu");
    if (!submenu) return;
    
    submenu.classList.add("nav-submenu--open");
    const parentId = submenu.id;
    const parent = allNavBtns.find((b) => b.dataset.submenu === `#${parentId}`);
    if (parent) {
      parent.classList.add("nav-btn--active");
      parent.classList.add("nav-btn--expanded");
    }
  }

  function setActiveFromTarget(targetSelector) {
    if (!targetSelector) return;
    
    clearActiveStates();

    const id = targetSelector.startsWith("#") ? targetSelector : `#${targetSelector}`;

    const sub = allSubBtns.find((b) => b.dataset.target === id);
    if (sub) {
      sub.classList.add("nav-sub-btn--active");
      openSubmenuForElement(sub);
      createNavActiveEffect(sub);
      return;
    }

    const parent = allNavBtns.find((b) => b.dataset.target === id);
    if (parent) {
      parent.classList.add("nav-btn--active");
      if (parent.classList.contains("nav-btn--parent")) {
        const submenuId = parent.getAttribute("data-submenu");
        if (submenuId) {
          const submenu = document.querySelector(submenuId);
          if (submenu) {
            submenu.classList.add("nav-submenu--open");
            parent.classList.add("nav-btn--expanded");
          }
        }
      }
      createNavActiveEffect(parent);
    }
  }

  // Effet visuel lors de l'activation d'un bouton
  function createNavActiveEffect(button) {
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "#1af6c4" : "#0369a1";
    
    const pulse = document.createElement("span");
    pulse.style.cssText = `
      position: absolute;
      inset: -5px;
      border-radius: 14px;
      border: 2px solid ${color};
      opacity: 1;
      animation: nav-pulse-out 0.6s ease-out;
      pointer-events: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes nav-pulse-out {
        to { 
          inset: -15px; 
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(style);
    button.appendChild(pulse);
    
    setTimeout(() => {
      pulse.remove();
      style.remove();
    }, 600);
  }

// ----------------------------------------------------------------------------------
// DÉBUT DU BLOC CORRIGÉ : Gestion du Clic
// ----------------------------------------------------------------------------------

  allNavBtns.concat(allSubBtns).forEach((btn) => {
    const targetSelector = btn.getAttribute("data-target");
    const isParent = btn.classList.contains("nav-btn--parent"); // Simplifie la lecture

    btn.addEventListener("click", (e) => {
        // Empêche le comportement de lien par défaut si on a un target
        if (targetSelector) {
            e.preventDefault(); 
        }

        // 1. Logique de Scroll et d'Activation (pour TOUS les liens avec un target)
        if (targetSelector) {
            // Désactiver le Scroll Spy pendant le défilement
            document.body.classList.add('scrolling-manually');
            
            scrollToTarget(targetSelector);
            setActiveFromTarget(targetSelector); // Ouvre le sous-menu du parent

            // Réactiver le Scroll Spy après la fin du scroll
            setTimeout(() => {
                document.body.classList.remove('scrolling-manually');
            }, 800);
            
            // 🛑 CORRECTION CLASH: Si le bouton est un parent, on stoppe l'exécution.
            // Le sous-menu est déjà ouvert par setActiveFromTarget.
            // On évite ainsi que la logique de toggle (point 2) le referme immédiatement.
            if (isParent) {
                return;
            }
        }

        // 2. Logique de bascule d'accordéon (pour les liens parents NON gérés par le scroll)
        // Ce bloc n'est exécuté que si ce n'est pas un lien scrollable (ou un sous-lien)
        if (isParent) {
            const submenuId = btn.getAttribute("data-submenu");
            if (!submenuId) return;
            
            const submenu = document.querySelector(submenuId);
            if (!submenu) return;

            const currentlyOpen = submenu.classList.contains("nav-submenu--open");
            
            if (currentlyOpen) {
                submenu.classList.remove("nav-submenu--open");
                btn.classList.remove("nav-btn--expanded");
            } else {
                submenu.classList.add("nav-submenu--open");
                btn.classList.add("nav-btn--expanded");
            }
        }
    });

// ----------------------------------------------------------------------------------
// FIN DU BLOC CORRIGÉ
// ----------------------------------------------------------------------------------

    // Effet de particules au survol
    btn.addEventListener("mouseenter", (e) => {
      createHoverParticles(e.currentTarget);
    });
  });

  // ======================================================
  // EFFET DE PARTICULES AU SURVOL (avec couleurs du thème)
  // ======================================================
  function createHoverParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 8;
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "#1af6c4" : "#0369a1";
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 30 + Math.random() * 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px ${color};
        animation: particle-burst 0.6s ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particle-burst {
        to { 
          transform: translate(var(--tx), var(--ty));
          opacity: 0;
          scale: 0;
        }
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => style.remove(), 600);
  }

  // ======================================================
  // SCROLL SPY ULTRA-AMÉLIORÉ (Intersection Observer)
  // ======================================================
  
  const spyScrollOptions = {
    root: null,
    rootMargin: '0px 0px -60% 0px', 
    threshold: 0
  };

  const spyScrollCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (document.body.classList.contains('scrolling-manually')) {
        return; // IGNORER LES MISES À JOUR PENDANT LE DÉFILEMENT MANUEL
    }
      if (entry.isIntersecting) {
        const targetId = entry.target.id;
        setActiveFromTarget("#" + targetId); 
      }
    });
  };

  const spyScrollObserver = new IntersectionObserver(spyScrollCallback, spyScrollOptions);

  const revealOptions = {
    root: null,
    threshold: CONFIG.scrollRevealThreshold 
  };

  function createSectionRevealEffect(section) {
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "#1af6c4" : "#0369a1";
    
    const scanline = document.createElement("div");
    scanline.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${color}, transparent);
      box-shadow: 0 0 20px ${color};
      animation: section-scan 1s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    section.style.position = "relative";
    section.appendChild(scanline);
    
    setTimeout(() => scanline.remove(), 1000);
  }

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const panel = entry.target;
        if (!panel.classList.contains("panel--visible")) {
          panel.classList.add("panel--visible");
          createSectionRevealEffect(panel);
        }
        observer.unobserve(panel);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  panels.forEach((panel) => {
    spyScrollObserver.observe(panel);
    revealObserver.observe(panel);
  });
  
  function updateBackToTopVisibility() {
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", updateBackToTopVisibility);
  window.addEventListener("resize", updateBackToTopVisibility);
  updateBackToTopVisibility();

  // ======================================================
  // BOUTON RETOUR EN HAUT AMÉLIORÉ
  // ======================================================
  const backToTop = document.getElementById("backToTop");
  
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      backToTop.style.transform = "scale(0.85)";
      
      setTimeout(() => {
        backToTop.style.transform = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
        createScrollUpEffect();
      }, 150);
    });

    backToTop.addEventListener("mouseenter", () => {
      const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
      const glow = currentTheme === "dark" 
        ? "0 0 50px rgba(26, 246, 196, 1)" 
        : "0 0 50px rgba(3, 105, 161, 0.8)";
      backToTop.style.boxShadow = glow;
    });

    backToTop.addEventListener("mouseleave", () => {
      backToTop.style.boxShadow = "";
    });
  }

  function createScrollUpEffect() {
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "#1af6c4" : "#0369a1";
    
    const trail = document.createElement("div");
    trail.style.cssText = `
      position: fixed;
      right: 2rem;
      bottom: 2rem;
      width: 52px;
      height: 200px;
      background: linear-gradient(180deg, transparent, ${color}, transparent);
      border-radius: 999px;
      opacity: 0.6;
      pointer-events: none;
      z-index: 29;
      animation: trail-up 0.8s ease-out;
    `;
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
  }

  // ======================================================
  // RECHERCHE CYBER AMÉLIORÉE
  // ======================================================
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const PAGES = [
    { title: "Accueil", id: "accueil", tags: ["home", "accueil", "portfolio"] },
    { title: "Mon profil", id: "profil", tags: ["profil", "bio", "presentation"] },
    { title: "Parcours", id: "parcours", tags: ["parcours", "etudes", "experience"] },
    { title: "BTS SIO", id: "bts", tags: ["bts", "sio", "sisr", "slam"] },
    { title: "BTS - Présentation", id: "bts-presentation", tags: ["presentation", "formation"] },
    { title: "BTS - Options", id: "bts-options", tags: ["options", "sisr", "slam"] },
    { title: "BTS - Blocs", id: "bts-blocs", tags: ["blocs", "competences"] },
    { title: "Entreprise", id: "entreprise", tags: ["entreprise", "stage", "alternance"] },
    { title: "Documentation", id: "docs", tags: ["docs", "documentation"] },
    { title: "Veille techno", id: "veille", tags: ["veille", "cyber"] },
    { title: "Certifications", id: "certifications", tags: ["certifications", "formation"] },
    { title: "Contact", id: "contact", tags: ["contact", "email", "linkedin"] },
  ];

  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function scorePage(page, terms) {
    const hay = normalize(page.title + " " + (page.tags || []).join(" "));
    let score = 0;
    for (const t of terms) {
      const idx = hay.indexOf(t);
      if (idx === -1) return -1;
      score += Math.max(1, 100 - idx);
    }
    return score;
  }

  function highlight(text, terms) {
    let out = text;
    terms.forEach((t) => {
      if (!t) return;
      const re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }

  function search(q) {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return PAGES.map((p) => ({ ...p, _score: scorePage(p, terms) }))
      .filter((p) => p._score >= 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 15);
  }

  function renderResults(items) {
    if (!searchResults) return;
    searchResults.innerHTML = "";
    if (!items.length) {
      searchResults.classList.remove("search-results--visible");
      return;
    }
    
    const q = searchInput ? searchInput.value.trim() : "";
    const terms = normalize(q).split(/\s+/).filter(Boolean);

    items.forEach((p, index) => {
      const li = document.createElement("li");
      li.dataset.index = String(index);
      li.innerHTML = `
        <span class="search-results__title">${highlight(p.title, terms)}</span>
        <span class="search-results__path">#${p.id}</span>
      `;
      
      li.addEventListener("click", () => {
        const selector = "#" + p.id;
        scrollToTarget(selector);
        setActiveFromTarget(selector);
        searchResults.classList.remove("search-results--visible");
        createSearchSelectEffect(li);
      });
      
      li.addEventListener("mouseenter", () => {
        createHoverGlow(li);
      });
      
      searchResults.appendChild(li);
    });

    searchResults.classList.add("search-results--visible");
  }

  function createSearchSelectEffect(element) {
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "#1af6c4" : "#0369a1";
    
    const flash = document.createElement("div");
    flash.style.cssText = `
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, ${color}, transparent);
      animation: search-flash 0.4s ease-out;
      pointer-events: none;
    `;
    
    element.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  }

  function createHoverGlow(element) {
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" 
      ? "rgba(26, 246, 196, 0.1)" 
      : "rgba(3, 105, 161, 0.1)";
    
    const glow = document.createElement("div");
    glow.style.cssText = `
      position: absolute;
      inset: -2px;
      background: ${color};
      border-radius: 4px;
      pointer-events: none;
      z-index: -1;
      animation: glow-fade 0.3s ease-out;
    `;
    
    element.style.position = "relative";
    element.appendChild(glow);
    
    setTimeout(() => glow.remove(), 300);
  }

  let activeResultIndex = -1;

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      activeResultIndex = -1;
      renderResults(search(searchInput.value));
    });

    searchInput.addEventListener("keydown", (e) => {
      const items = searchResults ? Array.from(searchResults.querySelectorAll("li")) : [];
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeResultIndex = (activeResultIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeResultIndex = (activeResultIndex - 1 + items.length) % items.length;
      } else if (e.key === "Enter") {
        if (activeResultIndex >= 0 && items[activeResultIndex]) {
          items[activeResultIndex].click();
        }
        return;
      } else if (e.key === "Escape") {
        searchResults.classList.remove("search-results--visible");
        return;
      } else {
        return;
      }

      items.forEach((el, i) => {
        el.classList.toggle("active", i === activeResultIndex);
      });
    });

    searchInput.addEventListener("focus", () => {
      createInputFocusEffect(searchInput);
    });
  }

  function createInputFocusEffect(input) {
    const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
    const color = currentTheme === "dark" ? "#1af6c4" : "#0369a1";
    
    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: absolute;
      inset: -5px;
      border-radius: 999px;
      border: 2px solid ${color};
      animation: input-focus-ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    input.parentElement.style.position = "relative";
    input.parentElement.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  document.addEventListener("click", (e) => {
    if (!searchResults || !searchInput) return;
    const shell = document.querySelector(".topbar__search-shell");
    if (shell && !shell.contains(e.target)) {
      searchResults.classList.remove("search-results--visible");
    }
  });

  // ======================================================
  // EFFETS SONORES CYBER (OPTIONNELS)
  // ======================================================
  function playThemeSwitchSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported");
    }
  }

  // ======================================================
  // ANIMATIONS CSS DYNAMIQUES
  // ======================================================
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes flash-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes section-scan {
      0% { 
        transform: translateY(0); 
        opacity: 1; 
      }
      100% { 
        transform: translateY(100%); 
        opacity: 0; 
      }
    }
    
    @keyframes trail-up {
      from { 
        transform: translateY(0); 
        opacity: 0.6; 
      }
      to { 
        transform: translateY(-200px); 
        opacity: 0; 
      }
    }
    
    @keyframes search-flash {
      from { transform: translateX(-100%); }
      to { transform: translateX(100%); }
    }
    
    @keyframes glow-fade {
      from { opacity: 0; scale: 0.9; }
      to { opacity: 1; scale: 1; }
    }
    
    @keyframes input-focus-ripple {
      to { 
        inset: -15px; 
        opacity: 0; 
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // ======================================================
  // PERFORMANCES & ACCESSIBILITÉ
  // ======================================================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    console.log("♿ Mode accessibilité activé");
    document.body.classList.add("reduce-motion");
  }

  // ======================================================
  // MESSAGE FINAL
  // ======================================================
  console.log("%c✨ Système Ultra Cyber Opérationnel", "color: #22d3ee; font-size: 14px;");
  console.log("%c📊 Statistiques:", "color: #a5b4fc; font-weight: bold;");
  console.log(`  • Sections: ${panels.length}`);
  console.log(`  • Boutons navigation: ${allNavBtns.length + allSubBtns.length}`);
  console.log(`  • Mode: ${body.classList.contains('reduce-motion') ? 'Réduit' : 'Complet'}`);
  console.log(`  • Thème: ${body.classList.contains('theme-dark') ? 'Dark' : 'Light'}`);
});