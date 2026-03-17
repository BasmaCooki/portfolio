// ========================================================
// ACCUEIL.JS - EFFETS SPÉCIFIQUES À LA SECTION HÉRO
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    typingSpeed: 40,
    matrixChars: "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ",
  };

  // =====================================================
  // EFFET TYPING SUR LA CONSOLE
  // =====================================================
  const consoleText = document.getElementById("heroConsoleText");
  if (consoleText) {
    const fullText = consoleText.getAttribute("data-text") || "> Accès autorisé...";
    const lines = fullText.split("\\n");
    let currentLine = 0;
    let currentChar = 0;
    
    consoleText.textContent = ""; // Reset du contenu
    
    function typeNextCharacter() {
      if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
          consoleText.textContent += lines[currentLine][currentChar];
          currentChar++;
          setTimeout(typeNextCharacter, CONFIG.typingSpeed);
        } else {
          // Ligne terminée, passer à la suivante
          consoleText.textContent += "\n";
          currentLine++;
          currentChar = 0;
          setTimeout(typeNextCharacter, 200);
        }
      }
    }
    
    typeNextCharacter();
  }

  // =====================================================
  // MATRIX CODE RAIN (effet visuel de fond)
  // =====================================================
  const codeRain = document.querySelector(".code-rain");
  if (codeRain) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    codeRain.appendChild(canvas);
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const columns = Math.floor(canvas.width / 14);
    const drops = Array(columns).fill(1);
    
    function drawMatrix() {
      ctx.fillStyle = "rgba(5, 8, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#1af6c4";
      ctx.font = "14px monospace";
      
      drops.forEach((y, index) => {
        const char = CONFIG.matrixChars[Math.floor(Math.random() * CONFIG.matrixChars.length)];
        const x = index * 14;
        ctx.fillText(char, x, y * 14);
        
        // Réinitialiser la goutte si elle dépasse l'écran
        if (y * 14 > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }
        drops[index]++;
      });
    }
    
    const matrixInterval = setInterval(drawMatrix, 50);

    // Arrêter la boucle quand le canvas quitte le viewport
    const matrixObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          clearInterval(matrixInterval);
          matrixObserver.disconnect();
        }
      });
    });
    matrixObserver.observe(codeRain);
  }

  // =====================================================
  // ANIMATION DES MÉTRIQUES (compteur animé)
  // =====================================================
  const metricValues = document.querySelectorAll('.metric__value');
  if (metricValues.length > 0) {
    const animateMetric = (element) => {
      const target = parseInt(element.getAttribute('data-target')) || 0;
      const duration = 2000; // 2 secondes
      const increment = target / (duration / 16); // ~60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };
      
      updateCounter();
    };
    
    // Observer pour déclencher l'animation quand visible
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateMetric(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    metricValues.forEach(el => metricsObserver.observe(el));
  }

  // =====================================================
  // ANIMATION DES BARRES DE COMPÉTENCES
  // =====================================================
  const skillBars = document.querySelectorAll('.skill-bar__fill');
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const percent = entry.target.getAttribute('data-percent') || '0';
          // Petit délai pour l'effet visuel
          setTimeout(() => {
            entry.target.style.width = percent + '%';
          }, 100);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
  }


  // Listener .js-scroll-to supprimé : déjà géré dans portfolio.js
});