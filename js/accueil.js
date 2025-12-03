document.addEventListener("DOMContentLoaded", () => {
  // ===== scroll doux pour les boutons js-scroll-to =====
  const scrollButtons = document.querySelectorAll(".js-scroll-to");

  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (!target) return;

      const section = document.querySelector(target);
      if (!section) return;

      section.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== bouton retour en haut =====
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateBackToTop);

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // appel initial
  updateBackToTop();
});

// js/accueil.js
document.addEventListener("DOMContentLoaded", () => {
  // Quand on clique sur "Scroll pour découvrir" -> descend à la section suivante
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextPanel = document.querySelector("#profil") || document.querySelector("#bts");
      if (nextPanel) {
        nextPanel.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

