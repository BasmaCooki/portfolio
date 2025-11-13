// Année dans la sidebar / footer si besoin (facultatif, ici non affichée ailleurs)
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Navigation par les boutons de la sidebar
const navButtons = document.querySelectorAll(".nav-item");

function goToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  window.scrollTo({
    top: section.offsetTop - 20,
    behavior: "smooth",
  });

  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.target === id);
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    goToSection(target);
  });
});

// Bouton scroll-top
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => goToSection("accueil"));

// ---------------- RECHERCHE ----------------

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

// Index de recherche (tu peux adapter les mots-clés)
const searchIndex = [
  {
    id: "accueil",
    title: "Accueil",
    path: "Section",
    keywords: "bienvenue portfolio sisr tableau de synthese dossier u5 attestation",
  },
  {
    id: "bts",
    title: "BTS SIO – SISR",
    path: "Section",
    keywords: "bts sio option sisr referentiel competences formation",
  },
  {
    id: "entreprise",
    title: "Entreprise",
    path: "Section",
    keywords: "entreprise stage alternance missions contexte reseau",
  },
  {
    id: "e5",
    title: "Épreuve E5",
    path: "Section",
    keywords: "e5 situations professionnelles tableau de synthese projet",
  },
  {
    id: "docs",
    title: "Documentation",
    path: "Section",
    keywords: "documentation procedure configuration vlan dhcp dns",
  },
  {
    id: "veille",
    title: "Veille technologique",
    path: "Section",
    keywords: "veille techno cybersécurité reseaux articles actualite",
  },
  {
    id: "contact",
    title: "Contact",
    path: "Section",
    keywords: "contact email telephone",
  },
];

function renderResults(results) {
  searchResults.innerHTML = "";

  if (!results.length) {
    searchResults.classList.add("empty");
    searchResults.hidden = false;
    return;
  }

  searchResults.classList.remove("empty");

  results.forEach((item) => {
    const div = document.createElement("div");
    div.className = "search-item";

    const title = document.createElement("div");
    title.className = "search-item-title";
    title.textContent = item.title;

    const path = document.createElement("div");
    path.className = "search-item-path";
    path.textContent = item.path;

    div.appendChild(title);
    div.appendChild(path);

    div.addEventListener("click", () => {
      goToSection(item.id);
      searchResults.hidden = true;
    });

    searchResults.appendChild(div);
  });

  searchResults.hidden = false;
}

function doSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResults.hidden = true;
    return;
  }

  const results = searchIndex.filter((item) => {
    const text = (item.title + " " + item.path + " " + item.keywords).toLowerCase();
    return text.includes(q);
  });

  renderResults(results);
}

searchButton.addEventListener("click", doSearch);

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    doSearch();
  } else if (e.key === "Escape") {
    searchResults.hidden = true;
    searchInput.blur();
  } else {
    doSearch();
  }
});

// Fermer les résultats si click en dehors
document.addEventListener("click", (e) => {
  if (!searchResults.hidden) {
    const inside =
      searchResults.contains(e.target) ||
      searchInput.contains(e.target) ||
      searchButton.contains(e.target);
    if (!inside) {
      searchResults.hidden = true;
    }
  }
});

// Bouton Share
const shareToggle = document.querySelector(".share-toggle");
const shareContainer = document.querySelector(".share-container");

shareToggle.addEventListener("click", () => {
  shareContainer.classList.toggle("active");
});

