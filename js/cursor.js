// =========================================
// CURSEUR PERSONNALISÉ RÉACTIF
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // Ne pas activer sur mobile/tablette
  if (window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  // Créer les éléments du curseur
  const cursorDot = document.createElement("div");
  const cursorOutline = document.createElement("div");

  cursorDot.className = "cursor-dot";
  cursorOutline.className = "cursor-outline";

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  // Ajouter la classe pour cacher le curseur par défaut
  document.body.classList.add("custom-cursor");

  // Variables pour le suivi fluide
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  // Suivi de la souris
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Le point suit immédiatement
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  // Animation fluide pour le cercle extérieur
  function animateOutline() {
    // Interpolation pour un mouvement fluide
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Éléments interactifs
  const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, .nav-btn, .nav-sub-btn, .social-btn, ' +
    '.btn, .tag, .veille-tool, .doc-card, .certif-module, .project-card, ' +
    '.timeline-card, .example-block, .bloc-card, .contact-col, ' +
    '[data-target], [onclick], .clickable'
  );

  // Effet au survol des éléments interactifs
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-hover");
      cursorOutline.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-hover");
      cursorOutline.classList.remove("cursor-hover");
    });
  });

  // Effet au clic
  document.addEventListener("mousedown", () => {
    cursorDot.classList.add("cursor-click");
    cursorOutline.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    cursorDot.classList.remove("cursor-click");
    cursorOutline.classList.remove("cursor-click");
  });

  // Cacher le curseur quand il sort de la fenêtre
  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorOutline.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";
  });

  // Observer pour les nouveaux éléments ajoutés dynamiquement
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const newInteractive = node.querySelectorAll?.(
            'a, button, input, textarea, .nav-btn, .nav-sub-btn, .social-btn, ' +
            '.btn, .tag, .veille-tool, .doc-card, .certif-module, .project-card'
          );

          newInteractive?.forEach((el) => {
            el.addEventListener("mouseenter", () => {
              cursorDot.classList.add("cursor-hover");
              cursorOutline.classList.add("cursor-hover");
            });

            el.addEventListener("mouseleave", () => {
              cursorDot.classList.remove("cursor-hover");
              cursorOutline.classList.remove("cursor-hover");
            });
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log("%c🖱️ Curseur personnalisé activé", "color: #1af6c4; font-weight: bold;");
});
