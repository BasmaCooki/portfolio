// =============================
// NAVIGATION + IFRAME
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const iframe = document.querySelector('iframe[name="contentFrame"]');

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (iframe && target) {
        iframe.src = target;
      }

      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // =============================
  // THEME SWITCH (dark / light)
  // =============================

  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Récupérer le thème déjà choisi
  const savedTheme = localStorage.getItem("bgtech-theme");

  if (savedTheme === "light") {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    if (themeToggle) themeToggle.checked = false;
  } else {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        localStorage.setItem("bgtech-theme", "dark");
      } else {
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
        localStorage.setItem("bgtech-theme", "light");
      }
    });
  }

  // =============================
  // RECHERCHE VIA OVERLAY
  // =============================

  const openBtn = document.getElementById("openSearch");
  const overlay = document.getElementById("searchOverlay");
  const closeBtn = document.getElementById("closeSearch");
  const input = document.getElementById("searchInput");
  const resultsEl = document.getElementById("searchResults");

  const PAGES = [
    {
      title: "Accueil",
      path: "../accueil/accueil.html",
      tags: ["home", "accueil"],
    },
    {
      title: "Portfolio",
      path: "portfolio.html",
      tags: ["portfolio", "bg tech"],
    },
    {
      title: "BTS SIO",
      path: "../bts/bts.html",
      tags: ["bts", "sio", "sisr", "école"],
    },
    {
      title: "Entreprise",
      path: "../entreprise/entreprise.html",
      tags: ["entreprise", "stage", "alternance"],
    },
    {
      title: "Épreuve E5",
      path: "../five/five.html",
      tags: ["e5", "épreuve", "projet"],
    },
    {
      title: "Documentation",
      path: "../doc/docs.html",
      tags: ["documentation", "docs", "tutoriels"],
    },
    {
      title: "Veille technologique",
      path: "../veille/veille.html",
      tags: ["veille", "techno", "technologie"],
    },
    {
      title: "Contact",
      path: "../contact/contact.html",
      tags: ["contact", "email"],
    },
  ];

  function openSearch() {
    if (!overlay) return;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    if (input) {
      input.value = "";
      renderResults([]);
      setTimeout(() => input.focus(), 20);
    }
  }

  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  openBtn && openBtn.addEventListener("click", openSearch);
  closeBtn && closeBtn.addEventListener("click", closeSearch);

  overlay &&
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSearch();
    });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });

  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function scorePage(page, terms) {
    const hay = normalize(
      page.title + " " + page.path + " " + (page.tags || []).join(" ")
    );
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
      .slice(0, 20);
  }

  function renderResults(items) {
    if (!resultsEl) return;
    resultsEl.innerHTML = "";
    if (!items.length) return;

    const q = input ? input.value.trim() : "";
    const terms = normalize(q)
      .split(/\s+/)
      .filter(Boolean);

    items.forEach((p, i) => {
      const li = document.createElement("li");
      li.dataset.index = String(i);
      li.innerHTML = `
        <span class="title">${highlight(p.title, terms)}</span>
        <span class="path">${p.path}</span>
      `;
      li.addEventListener("click", () => {
        if (iframe) iframe.src = p.path;

        // mettre le bouton actif si le chemin correspond
        navButtons.forEach((btn) => {
          const target = btn.getAttribute("data-target");
          if (target === p.path) {
            navButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
          }
        });

        closeSearch();
      });
      resultsEl.appendChild(li);
    });
  }

  let activeIndex = -1;

  input &&
    input.addEventListener("input", () => {
      activeIndex = -1;
      renderResults(search(input.value));
    });

  document.addEventListener("keydown", (e) => {
    if (!overlay || !overlay.classList.contains("open")) return;
    if (!resultsEl) return;

    const items = Array.from(resultsEl.querySelectorAll("li"));
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].click();
      }
    } else {
      return;
    }

    items.forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
    });
  });
});
