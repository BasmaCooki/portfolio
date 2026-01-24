// =========================================
// MOBILE MENU - Gestion du menu hamburger
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const navButtons = document.querySelectorAll(".nav-btn");

  if (!hamburger || !sidebar || !overlay) {
    console.warn("Mobile menu elements not found");
    return;
  }

  // Fonction pour ouvrir le menu
  function openMenu() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    hamburger.classList.add("active");
    document.body.style.overflow = "hidden"; // Bloquer le scroll
  }

  // Fonction pour fermer le menu
  function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = ""; // Rétablir le scroll
  }

  // Toggle menu au clic sur le hamburger
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fermer le menu au clic sur l'overlay
  overlay.addEventListener("click", closeMenu);

  // Fermer le menu au clic sur un bouton de navigation
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Délai pour permettre la navigation
      setTimeout(closeMenu, 300);
    });
  });

  // Fermer le menu avec la touche Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeMenu();
    }
  });

  // Gérer le redimensionnement de la fenêtre
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Si on passe en desktop (> 900px), fermer le menu et cacher le hamburger
      if (window.innerWidth > 900) {
        closeMenu();
      }
    }, 250);
  });

  // Empêcher le scroll du body quand le menu est ouvert
  sidebar.addEventListener("touchmove", (e) => {
    e.stopPropagation();
  });

  console.log(
    "%c📱 Menu mobile initialisé",
    "color: #1af6c4; font-weight: bold;"
  );
});
