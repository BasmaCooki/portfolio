// =========================================
// EFFECTS.JS - Effets visuels et interactions avancées
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. PARTICLES BACKGROUND
  // =========================================
  const particlesContainer = document.getElementById("particles-container");

  function createParticles() {
    if (!particlesContainer) return;

    // Ne pas créer de particules sur mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle-float";

      // Propriétés aléatoires
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.4 + 0.2;
      const moveX = (Math.random() - 0.5) * 200;
      const moveY = (Math.random() - 0.5) * 200;

      particle.style.cssText = `
        --size: ${size}px;
        --opacity: ${opacity};
        --duration: ${duration}s;
        --delay: ${delay}s;
        --move-x: ${moveX}px;
        --move-y: ${moveY}px;
        left: ${x}%;
        top: ${y}%;
      `;

      particlesContainer.appendChild(particle);
    }
  }

  createParticles();
  console.log("%c🌟 Particules créées", "color: #22d3ee; font-weight: bold;");

  // =========================================
  // 3. THEME TRANSITION AMÉLIORÉE
  // =========================================
  const themeToggle = document.querySelector('.theme-toggle, [data-theme-toggle], #theme-toggle');

  // Créer l'overlay de transition
  const transitionOverlay = document.createElement("div");
  transitionOverlay.className = "theme-transition-overlay";
  document.body.appendChild(transitionOverlay);

  function enhancedThemeToggle(e) {
    // Position du clic pour l'effet de ripple
    const x = e ? (e.clientX / window.innerWidth) * 100 : 50;
    const y = e ? (e.clientY / window.innerHeight) * 100 : 50;

    transitionOverlay.style.setProperty("--x", `${x}%`);
    transitionOverlay.style.setProperty("--y", `${y}%`);

    // Activer l'overlay
    transitionOverlay.classList.add("active");

    // Désactiver après la transition
    setTimeout(() => {
      transitionOverlay.classList.remove("active");
    }, 400);
  }

  // Observer les changements de thème
  if (themeToggle) {
    themeToggle.addEventListener("click", enhancedThemeToggle);
  }

  // Observer les changements de classe sur body pour le thème
  const bodyObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const isLight = document.body.classList.contains("theme-light");
        // Mettre à jour les couleurs des particules
        document.querySelectorAll(".particle-float").forEach((p) => {
          p.style.background = isLight ? "#0369a1" : "#1af6c4";
        });
      }
    });
  });

  bodyObserver.observe(document.body, { attributes: true });

  console.log("%c🎨 Transition de thème améliorée", "color: #8000ff; font-weight: bold;");

  // =========================================
  // 4. BACK TO TOP BUTTON
  // =========================================
  let backToTopBtn = document.querySelector(".back-to-top");

  // Créer le bouton s'il n'existe pas
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.className = "back-to-top";
    backToTopBtn.innerHTML = `
      <div class="back-to-top__progress"></div>
      <i class="fa fa-arrow-up back-to-top__icon"></i>
    `;
    backToTopBtn.setAttribute("aria-label", "Retour en haut");
    document.body.appendChild(backToTopBtn);
  }

  function updateBackToTop() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    // Afficher/cacher le bouton
    if (scrollTop > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    // Mettre à jour la barre de progression
    const progressEl = backToTopBtn.querySelector(".back-to-top__progress");
    if (progressEl) {
      progressEl.style.setProperty("--progress", `${progress}%`);
    }
  }

  // Scroll fluide vers le haut
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Mise à jour au scroll avec throttle
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  console.log("%c⬆️ Bouton retour en haut initialisé", "color: #1af6c4; font-weight: bold;");

  // =========================================
  // 5. PARALLAX EFFECT
  // =========================================
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  const heroSection = document.querySelector("#accueil, .hero, .panel[data-section='accueil']");

  function updateParallax() {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(scrollTop * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax sur le hero
    if (heroSection && scrollTop < window.innerHeight) {
      const heroElements = heroSection.querySelectorAll(".parallax-layer");
      heroElements.forEach((el) => {
        const speed = parseFloat(getComputedStyle(el).getPropertyValue("--parallax-speed")) || 0.5;
        const yPos = scrollTop * speed;
        el.style.transform = `translateY(${yPos}px)`;
      });
    }
  }

  // Activer le parallax au mouvement de souris sur le hero
  if (heroSection && !window.matchMedia("(max-width: 768px)").matches) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const elements = heroSection.querySelectorAll(".parallax-layer, .hero-content, .cyber-grid");
      elements.forEach((el, index) => {
        const depth = (index + 1) * 10;
        const moveX = x * depth;
        const moveY = y * depth;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      const elements = heroSection.querySelectorAll(".parallax-layer, .hero-content, .cyber-grid");
      elements.forEach((el) => {
        el.style.transform = "translate(0, 0)";
        el.style.transition = "transform 0.5s ease";
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
      });
    }
  });

  console.log("%c🎭 Effet parallaxe activé", "color: #22d3ee; font-weight: bold;");

  // =========================================
  // 6. LAZY LOADING IMAGES
  // =========================================
  const lazyImages = document.querySelectorAll("img[data-src], img[loading='lazy']");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Si l'image a un data-src, l'utiliser
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }

          img.classList.add("lazy-image");

          img.onload = () => {
            img.classList.add("loaded");
          };

          // Si l'image est déjà en cache
          if (img.complete) {
            img.classList.add("loaded");
          }

          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1
    }
  );

  lazyImages.forEach((img) => {
    img.classList.add("lazy-image");
    imageObserver.observe(img);
  });

  // Appliquer le lazy loading à toutes les images
  document.querySelectorAll("img:not([data-src]):not(.lazy-image)").forEach((img) => {
    if (!img.complete) {
      img.classList.add("lazy-image");
      img.onload = () => img.classList.add("loaded");
    } else {
      img.classList.add("lazy-image", "loaded");
    }
  });

  console.log("%c🖼️ Lazy loading activé", "color: #8000ff; font-weight: bold;");

  // =========================================
  // 7. TYPING ANIMATION AMÉLIORÉE
  // =========================================
  const typingElements = document.querySelectorAll(".typing-effect, [data-typing]");

  typingElements.forEach((el) => {
    const text = el.textContent || el.dataset.typing;
    const speed = parseInt(el.dataset.speed) || 80;
    const delay = parseInt(el.dataset.delay) || 0;

    // Vider l'élément
    el.textContent = "";
    el.classList.add("typing-container");

    // Créer l'élément pour le texte
    const textSpan = document.createElement("span");
    textSpan.className = "typing-text typing";
    el.appendChild(textSpan);

    // Créer le curseur
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    el.appendChild(cursor);

    let index = 0;

    function typeChar() {
      if (index < text.length) {
        textSpan.textContent += text.charAt(index);
        textSpan.classList.add("typing-glow");
        index++;
        setTimeout(typeChar, speed);
      } else {
        textSpan.classList.remove("typing", "typing-glow");
        // Optionnel: cacher le curseur après avoir fini
        // cursor.style.display = 'none';
      }
    }

    // Observer pour déclencher l'animation quand visible
    const typingObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeChar, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    typingObserver.observe(el);
  });

  console.log("%c⌨️ Animation typing améliorée", "color: #1af6c4; font-weight: bold;");

  // =========================================
  // 8. SMOOTH REVEAL ANIMATIONS
  // =========================================
  const revealElements = document.querySelectorAll(
    ".reveal, [data-reveal], .card, .project-card, .doc-card, .certif-module"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Animation décalée pour les enfants
          const children = entry.target.querySelectorAll("[data-reveal-child]");
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("is-visible");
            }, index * 100);
          });
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  console.log("%c👁️ Animations de révélation activées", "color: #22d3ee; font-weight: bold;");

  // =========================================
  // FIN DE L'INITIALISATION
  // =========================================
  console.log(
    "%c🚀 Tous les effets visuels sont initialisés!",
    "color: #1af6c4; font-weight: bold; font-size: 14px; padding: 5px;"
  );
});
