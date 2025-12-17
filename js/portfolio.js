// ========================================================
// PORTFOLIO.JS - VERSION ULTRA-SIMPLIFIÉE ET ROBUSTE
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c🚀 Portfolio initialisé", "color: #1af6c4; font-weight: bold; font-size: 16px;");

  // ======================================================
  // GESTION DU THÈME
  // ======================================================
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "bgtech-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
      if (themeToggle) themeToggle.checked = false;
    } else {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
      if (themeToggle) themeToggle.checked = true;
    }
    console.log(`✓ Thème appliqué : ${theme}`);
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
    });
  }

  // ======================================================
  // NAVIGATION - GESTION DES MENUS
  // ======================================================
  
  // Fonction pour fermer tous les sous-menus
  function closeAllSubmenus() {
    document.querySelectorAll('.nav-submenu').forEach(submenu => {
      submenu.classList.remove('nav-submenu--open');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('nav-btn--expanded', 'nav-btn--active');
    });
    document.querySelectorAll('.nav-sub-btn').forEach(btn => {
      btn.classList.remove('nav-sub-btn--active');
    });
  }

  // Fonction pour ouvrir un sous-menu
  function openSubmenu(submenuId, parentButton) {
    const submenu = document.querySelector(submenuId);
    if (!submenu) {
      console.warn(`Sous-menu non trouvé : ${submenuId}`);
      return;
    }

    console.log(`📂 Ouverture du sous-menu : ${submenuId}`);
    
    // Fermer les autres
    closeAllSubmenus();
    
    // Ouvrir celui-ci
    submenu.classList.add('nav-submenu--open');
    parentButton.classList.add('nav-btn--expanded', 'nav-btn--active');
    
    // Activer le premier sous-bouton
    const firstSubBtn = submenu.querySelector('.nav-sub-btn');
    if (firstSubBtn) {
      firstSubBtn.classList.add('nav-sub-btn--active');
      const target = firstSubBtn.getAttribute('data-target');
      if (target) {
        scrollToSection(target);
      }
    }
  }

  // Fonction pour scroll vers une section
  function scrollToSection(targetId) {
    const section = document.querySelector(targetId);
    if (!section) {
      console.warn(`Section non trouvée : ${targetId}`);
      return;
    }

    console.log(`➡️ Scroll vers : ${targetId}`);
    
    // Indiquer qu'on scroll manuellement
    body.classList.add('scrolling-manually');
    
    section.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });

    // Retirer l'indicateur après 1.5s
    setTimeout(() => {
      body.classList.remove('scrolling-manually');
    }, 1500);
  }

  // ======================================================
  // GESTION DES CLICS - BOUTONS PARENTS
  // ======================================================
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const submenuId = button.getAttribute('data-submenu');
      const targetId = button.getAttribute('data-target');

      console.log(`🖱️ Clic sur bouton parent :`, { submenuId, targetId });

      // CAS 1 : Bouton avec sous-menu (Accueil, BTS SIO, Entreprise)
      if (submenuId) {
        const submenu = document.querySelector(submenuId);
        const isOpen = submenu && submenu.classList.contains('nav-submenu--open');
        
        if (isOpen) {
          // Fermer si déjà ouvert
          console.log(`🔒 Fermeture du sous-menu`);
          closeAllSubmenus();
        } else {
          // Ouvrir le sous-menu
          openSubmenu(submenuId, button);
        }
      }
      // CAS 2 : Bouton sans sous-menu (Documentation, Veille, etc.)
      else if (targetId) {
        closeAllSubmenus();
        button.classList.add('nav-btn--active');
        scrollToSection(targetId);
      }
    });
  });

  // ======================================================
  // GESTION DES CLICS - SOUS-BOUTONS
  // ======================================================
  document.querySelectorAll('.nav-sub-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = button.getAttribute('data-target');
      
      if (!targetId) {
        console.warn('Sous-bouton sans data-target');
        return;
      }

      console.log(`🖱️ Clic sur sous-bouton : ${targetId}`);

      // Désactiver tous les sous-boutons
      document.querySelectorAll('.nav-sub-btn').forEach(btn => {
        btn.classList.remove('nav-sub-btn--active');
      });

      // Activer celui-ci
      button.classList.add('nav-sub-btn--active');

      // Scroll vers la section
      scrollToSection(targetId);
    });
  });

  // ======================================================
  // SCROLL SPY - Détection automatique
  // ======================================================
  const panels = document.querySelectorAll('.panel[id]');
  
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Ignorer si on scroll manuellement
      if (body.classList.contains('scrolling-manually')) return;
      
      if (entry.isIntersecting) {
        const sectionId = '#' + entry.target.id;
        console.log(`👁️ Section visible : ${sectionId}`);
        
        // Trouver le bouton correspondant
        const matchingSubBtn = document.querySelector(`.nav-sub-btn[data-target="${sectionId}"]`);
        const matchingBtn = document.querySelector(`.nav-btn[data-target="${sectionId}"]`);
        
        if (matchingSubBtn) {
          document.querySelectorAll('.nav-sub-btn').forEach(b => b.classList.remove('nav-sub-btn--active'));
          matchingSubBtn.classList.add('nav-sub-btn--active');
          
          // S'assurer que le parent est ouvert
          const submenu = matchingSubBtn.closest('.nav-submenu');
          if (submenu && !submenu.classList.contains('nav-submenu--open')) {
            const parentBtn = document.querySelector(`[data-submenu="#${submenu.id}"]`);
            if (parentBtn) {
              submenu.classList.add('nav-submenu--open');
              parentBtn.classList.add('nav-btn--expanded', 'nav-btn--active');
            }
          }
        } else if (matchingBtn) {
          closeAllSubmenus();
          matchingBtn.classList.add('nav-btn--active');
        }
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  panels.forEach(panel => scrollSpyObserver.observe(panel));

  // ======================================================
  // RÉVÉLATION DES SECTIONS
  // ======================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('panel--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  panels.forEach(panel => revealObserver.observe(panel));

  // ======================================================
  // RECHERCHE
  // ======================================================
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (searchInput && searchResults) {
    const searchableContent = Array.from(panels).map(panel => ({
      id: panel.id,
      title: (panel.querySelector('.section-title, .hero-title')?.textContent || '').trim(),
      content: panel.textContent.toLowerCase()
    })).filter(item => item.id);

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.classList.remove("search-results--visible");
        searchResults.innerHTML = "";
        return;
      }

      const matches = searchableContent
        .filter(item => item.content.includes(query))
        .slice(0, 5);

      if (matches.length === 0) {
        searchResults.innerHTML = '<li style="padding: 15px;">Aucun résultat</li>';
      } else {
        searchResults.innerHTML = matches.map(match => `
          <li data-target="#${match.id}" style="cursor: pointer;">
            <span>${match.title}</span>
            <span style="opacity: 0.6; font-size: 0.8em;">${match.id}</span>
          </li>
        `).join('');

        searchResults.querySelectorAll('li[data-target]').forEach(li => {
          li.addEventListener('click', () => {
            const target = li.getAttribute('data-target');
            searchInput.value = "";
            searchResults.classList.remove("search-results--visible");
            scrollToSection(target);
          });
        });
      }

      searchResults.classList.add("search-results--visible");
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar__search-shell')) {
        searchResults.classList.remove("search-results--visible");
      }
    });
  }

  // ======================================================
  // BOUTON RETOUR EN HAUT
  // ======================================================
  const backToTop = document.getElementById("backToTop");
  
  window.addEventListener("scroll", () => {
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ======================================================
  // BOUTONS JS-SCROLL-TO
  // ======================================================
  document.querySelectorAll('.js-scroll-to').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const target = button.getAttribute('data-target');
      if (target) scrollToSection(target);
    });
  });

  // ======================================================
  // INITIALISATION : Ouvrir Accueil par défaut
  // ======================================================
  setTimeout(() => {
    const accueilBtn = document.querySelector('[data-submenu="#submenu-accueil"]');
    if (accueilBtn) {
      console.log('🏠 Ouverture automatique du menu Accueil');
      openSubmenu('#submenu-accueil', accueilBtn);
    }
  }, 300);

  console.log("%c✅ Tout est prêt !", "color: #22c55e; font-weight: bold;");
});