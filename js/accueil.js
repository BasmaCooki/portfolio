// ========================================================
// ACCUEIL.JS - JAVASCRIPT DÉDIÉ À LA SECTION ACCUEIL
// (Hero, Profil, Parcours)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ==================== CONFIGURATION ====================
  const CONFIG = {
    glitchInterval: 8000,
    particleCount: 25,
    typingSpeed: 40,
    matrixChars: "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
    metricAnimationDuration: 2000
  };

  // ==================== UTILITAIRES ====================
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  // ==================== SCROLL DOUX ====================
  const scrollButtons = document.querySelectorAll(".js-scroll-to");
  
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-target");
      if (!target) return;

      const section = document.querySelector(target);
      if (!section) return;

      // Effet de "compression" avant le scroll
      btn.style.transform = "scale(0.92)";
      btn.style.transition = "transform 0.1s ease";
      
      setTimeout(() => {
        btn.style.transform = "";
        section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    // Effet ripple au survol
    btn.addEventListener("mouseenter", (e) => {
      createRipple(e.currentTarget, e);
    });
  });

  // ==================== EFFET RIPPLE ====================
  function createRipple(element, event) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(26, 246, 196, 0.4), transparent 70%);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: ripple-expand 0.7s cubic-bezier(0, 0, 0.2, 1);
      z-index: 10;
    `;
    
    const pos = getComputedStyle(element).position;
    if (pos !== "relative" && pos !== "absolute") {
      element.style.position = "relative";
    }
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  // ==================== EFFET TYPING CONSOLE ====================
  const consoleText = document.getElementById("heroConsoleText");
  
  if (consoleText) {
    const fullText = consoleText.getAttribute("data-text") || "> Accès autorisé. Chargement des systèmes BG TECH...";
    const lines = fullText.split("\\n");
    consoleText.textContent = "";
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeWriter() {
      if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
        
        if (charIndex < currentLine.length) {
          consoleText.textContent += currentLine.charAt(charIndex);
          charIndex++;
          
          const randomDelay = CONFIG.typingSpeed + Math.random() * 40;
          setTimeout(typeWriter, randomDelay);
        } else {
          if (lineIndex < lines.length - 1) {
            consoleText.textContent += "\n";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 200);
          } else {
            setTimeout(() => {
              consoleText.style.textShadow = "0 0 12px rgba(34, 211, 238, 0.9)";
              setTimeout(() => {
                consoleText.style.textShadow = "";
              }, 300);
            }, 400);
          }
        }
      }
    }
    
    setTimeout(typeWriter, 800);
  }

  // ==================== EFFET GLITCH SUR LE TITRE ====================
  const heroTitle = document.querySelector(".hero-title__highlight");
  
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    
    function applyGlitch() {
      const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
      let iterations = 0;
      const maxIterations = 10;
      
      const glitchInterval = setInterval(() => {
        heroTitle.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("");
        
        iterations += 1;
        
        if (iterations > maxIterations) {
          clearInterval(glitchInterval);
          heroTitle.textContent = originalText;
        }
      }, 50);
    }
    
    setInterval(() => {
      if (Math.random() > 0.3) {
        applyGlitch();
      }
    }, CONFIG.glitchInterval);
    
    heroTitle.addEventListener("mouseenter", applyGlitch);
  }

  // ==================== PARTICULES CYBER FLOTTANTES ====================
  const heroSection = document.querySelector(".panel--accueil");
  
  if (heroSection) {
    const particleContainer = document.createElement("div");
    particleContainer.className = "cyber-particles";
    particleContainer.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    heroSection.appendChild(particleContainer);

    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "cyber-particle";
      
      const size = randomBetween(1, 4);
      const startX = randomBetween(0, 100);
      const duration = randomBetween(12, 20);
      const delay = randomBetween(0, 5);
      const opacity = randomBetween(0.2, 0.7);
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(26, 246, 196, ${opacity});
        border-radius: 50%;
        left: ${startX}%;
        bottom: -10px;
        box-shadow: 0 0 ${size * 4}px rgba(26, 246, 196, 0.6);
        animation: float-up ${duration}s linear ${delay}s infinite;
      `;
      
      particleContainer.appendChild(particle);
    }

    for (let i = 0; i < CONFIG.particleCount; i++) {
      createParticle();
    }
  }

  // ==================== CODE RAIN (MATRIX EFFECT) ====================
  const codeRain = document.querySelector(".code-rain");
  
  if (codeRain) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    codeRain.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = "width: 100%; height: 100%;";

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(5, 8, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#1af6c4";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = CONFIG.matrixChars[Math.floor(Math.random() * CONFIG.matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 50);

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ==================== ANIMATION CARTE HERO (TILT 3D) ====================
  const heroCard = document.querySelector(".hero-card");
  
  if (heroCard) {
    let isHovering = false;

    heroCard.addEventListener("mouseenter", () => {
      isHovering = true;
    });

    heroCard.addEventListener("mouseleave", () => {
      isHovering = false;
      heroCard.style.transform = "";
      heroCard.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    heroCard.addEventListener("mousemove", (e) => {
      if (!isHovering) return;

      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((centerX - x) / centerX) * 8;
      
      heroCard.style.transition = "none";
      heroCard.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.02, 1.02, 1.02)
      `;
    });
  }

  // ==================== ANIMATION DES BARRES DE COMPÉTENCES ====================
  const skillBars = document.querySelectorAll(".skill-bar__fill");
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute("data-percent");
        entry.target.style.width = `${percent}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));

  // ==================== ANIMATION DES TAGS AU SCROLL ====================
  const tags = document.querySelectorAll(".tag");
  
  const tagObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = "tag-appear 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        }, index * 80);
        tagObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  tags.forEach(tag => {
    tag.style.opacity = "0";
    tag.style.transform = "translateY(15px)";
    tagObserver.observe(tag);
  });

  // ==================== COMPTEUR ANIMÉ POUR LES MÉTRIQUES ====================
  const metrics = document.querySelectorAll(".metric__value");
  
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-target")) || 0;
        animateCounter(entry.target, 0, target, CONFIG.metricAnimationDuration);
        metricObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  metrics.forEach(metric => metricObserver.observe(metric));

  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const current = Math.floor(start + (end - start) * easedProgress);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end;
      }
    }
    
    requestAnimationFrame(update);
  }

  // ==================== PARALLAX LÉGER AU SCROLL ====================
  const heroContent = document.querySelector(".hero-content");
  const heroCardParallax = document.querySelector(".hero-card");
  const heroOverlay = document.querySelector(".hero-overlay");
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.scrollY;
    
    if (scrolled < 800) {
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        heroContent.style.opacity = 1 - (scrolled / 900);
      }
      
      if (heroCardParallax) {
        heroCardParallax.style.transform = `translateY(${scrolled * 0.12}px)`;
      }

      if (heroOverlay) {
        heroOverlay.style.opacity = 0.5 + (scrolled / 1600);
      }
    }
    
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // ==================== INITIALISATION DES ANIMATIONS CSS ====================
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple-expand {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }

    @keyframes float-up {
      to {
        transform: translateY(-110vh) translateX(${randomBetween(-30, 30)}px);
        opacity: 0;
      }
    }

    @keyframes tag-appear {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .btn-primary:focus-visible,
    .btn-ghost:focus-visible {
      outline: 3px solid #1af6c4;
      outline-offset: 4px;
      animation: focus-pulse 1.2s ease infinite;
    }

    @keyframes focus-pulse {
      0%, 100% { outline-color: #1af6c4; }
      50% { outline-color: rgba(26, 246, 196, 0.4); }
    }
  `;
  document.head.appendChild(style);

  // ==================== DÉTECTION DE LA PERFORMANCE ====================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    console.log("🎯 Mode réduit de mouvements détecté - Animations simplifiées");
    document.body.classList.add("reduce-motion");
  }

  // ==================== MESSAGE DE DÉMARRAGE ====================
  console.log("%c🔐 Section ACCUEIL Initialisée", "color: #1af6c4; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #1af6c4;");
  console.log("%c⚡ Tous les systèmes cyber sont opérationnels", "color: #22d3ee; font-size: 13px;");
  console.log("%c📊 Métriques:", "color: #a5b4fc; font-weight: bold;");
  console.log(`  • Particules actives: ${CONFIG.particleCount}`);
  console.log(`  • Mode performance: ${prefersReducedMotion ? "Réduit" : "Complet"}`);
});