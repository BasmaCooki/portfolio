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

  // =========================================
  // 3. THEME TRANSITION AMÉLIORÉE
  // =========================================
  const themeToggle = document.querySelector('#themeToggle, .theme-toggle, [data-theme-toggle]');

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



  // =========================================
  // 4. PARALLAX EFFECT
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

  let tickingParallax = false;
  window.addEventListener("scroll", () => {
    if (!tickingParallax) {
      requestAnimationFrame(() => {
        updateParallax();
        tickingParallax = false;
      });
      tickingParallax = true;
    }
  });


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


  // =========================================
  // 8. SMOOTH REVEAL ANIMATIONS
  // =========================================
  const revealElements = document.querySelectorAll(
    ".reveal, [data-reveal], .card, .project-card, .doc-card, .certif-module, .timeline-item, .profile-main, .profile-side, .cv-block"
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


  // =========================================
  // FIN DE L'INITIALISATION
  // =========================================
});
