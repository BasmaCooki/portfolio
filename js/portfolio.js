// js/portfolio.js

document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // THEME (dark / light)
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
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
    });
  }

  // ======================================================
  // NAVIGATION (parents + sous-menus + scroll)
  // ======================================================
  const allNavBtns = Array.from(document.querySelectorAll(".nav-btn"));
  const allSubBtns = Array.from(document.querySelectorAll(".nav-sub-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  function scrollToTarget(targetSelector) {
    const section = document.querySelector(targetSelector);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearActiveStates() {
    allNavBtns.forEach((btn) => btn.classList.remove("nav-btn--active"));
    allSubBtns.forEach((btn) => btn.classList.remove("nav-sub-btn--active"));
  }

  function openSubmenuForElement(el) {
    const submenu = el.closest(".nav-submenu");
    if (!submenu) return;
    submenu.classList.add("nav-submenu--open");
    const parentId = submenu.id;
    const parent = allNavBtns.find(
      (b) => b.dataset.submenu === parentId
    );
    if (parent) parent.classList.add("nav-btn--active");
  }

  function setActiveFromTarget(targetSelector) {
    if (!targetSelector) return;
    clearActiveStates();

    // Essayer d'abord les sous-boutons
    const sub = allSubBtns.find((b) => b.dataset.target === targetSelector);
    if (sub) {
      sub.classList.add("nav-sub-btn--active");
      openSubmenuForElement(sub);
      return;
    }

    // Sinon bouton parent simple
    const parent = allNavBtns.find((b) => b.dataset.target === targetSelector);
    if (parent) {
      parent.classList.add("nav-btn--active");
    }
  }

  allNavBtns.concat(allSubBtns).forEach((btn) => {
    const targetSelector = btn.getAttribute("data-target");

    btn.addEventListener("click", () => {
      if (targetSelector) {
        scrollToTarget(targetSelector);
        setActiveFromTarget(targetSelector);
      }

      // Gestion ouverture / fermeture des sous-menus sur les parents
      if (btn.classList.contains("nav-btn--parent")) {
        const submenuId = btn.getAttribute("data-submenu");
        if (!submenuId) return;
        const submenu = document.getElementById(submenuId);
        if (!submenu) return;

        const currentlyOpen = submenu.classList.contains("nav-submenu--open");
        // Si déjà ouvert -> fermer
        if (currentlyOpen) {
          submenu.classList.remove("nav-submenu--open");
          btn.classList.remove("nav-btn--expanded");
        } else {
          submenu.classList.add("nav-submenu--open");
          btn.classList.add("nav-btn--expanded");
        }
      }
    });
  });

  // ======================================================
  // SCROLL SPY + ANIMATION SECTIONS
  // ======================================================
  function updateOnScroll() {
    let bestSection = null;
    let bestOffset = Infinity;
    const triggerLine = window.innerHeight * 0.25;

    panels.forEach((panel) => {
      const rect = panel.getBoundingClientRect();

      // animation apparition
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        panel.classList.add("panel--visible");
      }

      const offset = Math.abs(rect.top - triggerLine);
      if (offset < bestOffset) {
        bestOffset = offset;
        bestSection = panel;
      }
    });

    if (bestSection && bestSection.id) {
      setActiveFromTarget("#" + bestSection.id);
    }

    // bouton back-to-top
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", updateOnScroll);
  window.addEventListener("resize", updateOnScroll);
  updateOnScroll();

  // ======================================================
  // BOUTON RETOUR HAUT
  // ======================================================
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ======================================================
  // RECHERCHE (barre cyber en haut)
  // ======================================================
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const PAGES = [
    { title: "Accueil", id: "accueil", tags: ["home", "accueil", "portfolio"] },
    { title: "Mon profil", id: "profil", tags: ["profil", "bio", "presentation"] },
    { title: "Parcours", id: "parcours", tags: ["parcours", "etudes", "experience"] },
    { title: "BTS SIO", id: "bts", tags: ["bts", "sio", "sisr", "slam"] },
    {
      title: "BTS - Présentation",
      id: "bts-presentation",
      tags: ["presentation", "formation"],
    },
    {
      title: "BTS - Options",
      id: "bts-options",
      tags: ["options", "sisr", "slam"],
    },
    {
      title: "BTS - Blocs de compétences",
      id: "bts-blocs",
      tags: ["blocs", "competences"],
    },
    {
      title: "Entreprise",
      id: "entreprise",
      tags: ["entreprise", "stage", "alternance"],
    },
    { title: "Épreuve E5", id: "e5", tags: ["e5", "projets", "dossiers"] },
    { title: "Documentation", id: "docs", tags: ["docs", "documentation"] },
    { title: "Veille technologique", id: "veille", tags: ["veille", "cyber"] },
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
    const terms = normalize(q)
      .split(/\s+/)
      .filter(Boolean);
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
    const terms = normalize(q)
      .split(/\s+/)
      .filter(Boolean);

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
      });
      searchResults.appendChild(li);
    });

    searchResults.classList.add("search-results--visible");
  }

  let activeResultIndex = -1;

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      activeResultIndex = -1;
      renderResults(search(searchInput.value));
    });

    searchInput.addEventListener("keydown", (e) => {
      const items = searchResults
        ? Array.from(searchResults.querySelectorAll("li"))
        : [];

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
  }

  document.addEventListener("click", (e) => {
    if (!searchResults || !searchInput) return;
    const shell = document.querySelector(".topbar__search-shell");
    if (shell && !shell.contains(e.target)) {
      searchResults.classList.remove("search-results--visible");
    }
  });
});
