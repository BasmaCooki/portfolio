// ========================================================
// BTS SECTION - JavaScript Cyber Ultra-Dynamique
// Animations et interactions spécifiques
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c⚡ BTS Section Cyber Activée", 
    "color: #1af6c4; font-size: 16px; font-weight: bold;");

  // ======================================================
  // INTERSECTION OBSERVER - Animations au scroll
  // ======================================================
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  // Observer pour les cartes example-block
  const exampleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Déclenche l'animation CSS
        entry.target.classList.add('visible');
        
        // Effet de particules à l'apparition
        setTimeout(() => {
          createRevealParticles(entry.target);
        }, 300);
        
        // Stop d'observer une fois révélé
        exampleObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer pour les bloc-card
  const blocObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Effet de scan à l'apparition
        setTimeout(() => {
          createScanEffect(entry.target);
        }, 200);
        
        blocObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer pour les images hero
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        createHeroGlitch(entry.target);
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Appliquer les observers
  document.querySelectorAll('.example-block').forEach((el) => {
    exampleObserver.observe(el);
  });

  document.querySelectorAll('.bloc-card').forEach((el) => {
    blocObserver.observe(el);
  });

  document.querySelectorAll('.section-hero-media').forEach((el) => {
    heroObserver.observe(el);
  });

  // ======================================================
  // EFFETS DE PARTICULES À LA RÉVÉLATION
  // ======================================================
  
  function createRevealParticles(element) {
    const rect = element.getBoundingClientRect();
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' ? '#1af6c4' : '#0369a1';
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 80 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 15px ${color}, 0 0 30px ${color};
        animation: particle-explode 1.2s ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1200);
    }
    
    // Ajouter l'animation si elle n'existe pas
    if (!document.getElementById('particle-explode-anim')) {
      const style = document.createElement('style');
      style.id = 'particle-explode-anim';
      style.textContent = `
        @keyframes particle-explode {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ======================================================
  // EFFET DE SCAN VERTICAL
  // ======================================================
  
  function createScanEffect(element) {
    const rect = element.getBoundingClientRect();
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' 
      ? 'rgba(26, 246, 196, 0.6)' 
      : 'rgba(3, 105, 161, 0.4)';
    
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${color}, transparent);
      box-shadow: 0 0 20px ${color};
      animation: scan-down 1s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(scanLine);
    
    setTimeout(() => scanLine.remove(), 1000);
    
    // Ajouter l'animation
    if (!document.getElementById('scan-down-anim')) {
      const style = document.createElement('style');
      style.id = 'scan-down-anim';
      style.textContent = `
        @keyframes scan-down {
          from { 
            top: 0;
            opacity: 1;
          }
          to { 
            top: 100%;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ======================================================
  // EFFET GLITCH SUR LES IMAGES HERO
  // ======================================================
  
  function createHeroGlitch(element) {
    const img = element.querySelector('.section-hero-image');
    if (!img) return;
    
    let glitchCount = 0;
    const maxGlitches = 3;
    
    const glitchInterval = setInterval(() => {
      img.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      img.style.filter = `hue-rotate(${Math.random() * 90}deg) saturate(${1 + Math.random() * 0.5})`;
      
      setTimeout(() => {
        img.style.transform = '';
        img.style.filter = '';
      }, 50);
      
      glitchCount++;
      if (glitchCount >= maxGlitches) {
        clearInterval(glitchInterval);
      }
    }, 100);
  }

  // ======================================================
  // EFFET DE HOVER AVANCÉ SUR LES CARTES
  // ======================================================
  
  document.querySelectorAll('.example-block, .bloc-card').forEach((card) => {
    // Suivre la souris pour effet de lumière
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Créer un effet de lueur qui suit la souris
      createMouseGlow(card, x, y);
    });
    
    // Effet de pulse au clic
    card.addEventListener('click', () => {
      createClickPulse(card);
    });
  });

  function createMouseGlow(element, x, y) {
    // Supprimer l'ancien glow s'il existe
    const oldGlow = element.querySelector('.mouse-glow');
    if (oldGlow) oldGlow.remove();
    
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' 
      ? 'rgba(26, 246, 196, 0.15)' 
      : 'rgba(3, 105, 161, 0.1)';
    
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, ${color}, transparent);
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1;
    `;
    
    element.appendChild(glow);
  }

  function createClickPulse(element) {
    const rect = element.getBoundingClientRect();
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' ? '#1af6c4' : '#0369a1';
    
    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position: absolute;
      inset: -10px;
      border-radius: 24px;
      border: 3px solid ${color};
      opacity: 1;
      animation: pulse-out 0.8s ease-out;
      pointer-events: none;
      z-index: 100;
    `;
    
    element.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 800);
    
    if (!document.getElementById('pulse-out-anim')) {
      const style = document.createElement('style');
      style.id = 'pulse-out-anim';
      style.textContent = `
        @keyframes pulse-out {
          to {
            inset: -30px;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ======================================================
  // EFFET DE TYPING SUR LES TITRES
  // ======================================================
  
  function createTypingEffect() {
    const titles = document.querySelectorAll('#bts .section-title, #bts-options .section-title, #bts-blocs .section-title');
    
    titles.forEach((title) => {
      const text = title.textContent;
      title.textContent = '';
      title.style.opacity = '1';
      
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          title.textContent += text[index];
          index++;
          
          // Son de frappe (optionnel - très discret)
          if (index % 3 === 0) {
            playTypeSound();
          }
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    });
  }

  // Observer pour déclencher le typing
  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const title = entry.target.querySelector('.section-title');
        if (title && !title.dataset.typed) {
          title.dataset.typed = 'true';
          animateTitle(title);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('#bts .section-header, #bts-options .section-header, #bts-blocs .section-header').forEach((header) => {
    typingObserver.observe(header);
  });

  function animateTitle(title) {
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        title.textContent += text[index];
        index++;
      } else {
        clearInterval(typingInterval);
        // Effet final
        title.style.textShadow = '0 0 20px var(--bts-glow), 0 0 40px var(--bts-glow)';
      }
    }, 50);
  }

  // ======================================================
  // SON CYBER DISCRET
  // ======================================================
  
  function playTypeSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      oscillator.type = "square";
      
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
      // Audio non supporté
    }
  }

  // ======================================================
  // PARALLAX LÉGER SUR LES IMAGES
  // ======================================================
  
  document.querySelectorAll('.example-image, .section-hero-image').forEach((img) => {
    const parent = img.closest('.example-media, .section-hero-media, .bloc-media');
    
    if (parent) {
      parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
      });
      
      parent.addEventListener('mouseleave', () => {
        img.style.transform = '';
      });
    }
  });

  // ======================================================
  // EFFET DE CHARGEMENT PROGRESSIF
  // ======================================================
  
  document.querySelectorAll('.example-text li, .bloc-column li').forEach((li, index) => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      li.style.transition = 'all 0.4s ease';
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    }, index * 50);
  });

  // ======================================================
  // NETTOYAGE DES GLOWS AU MOUSELEAVE
  // ======================================================
  
  document.querySelectorAll('.example-block, .bloc-card').forEach((card) => {
    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.mouse-glow');
      if (glow) {
        glow.style.opacity = '0';
        setTimeout(() => glow.remove(), 300);
      }
    });
  });

  // ======================================================
  // STATS & DEBUG
  // ======================================================
  
  console.log("%c✨ BTS Section Stats:", "color: #22d3ee; font-weight: bold;");
  console.log(`  • Example blocks: ${document.querySelectorAll('.example-block').length}`);
  console.log(`  • Bloc cards: ${document.querySelectorAll('.bloc-card').length}`);
  console.log(`  • Hero images: ${document.querySelectorAll('.section-hero-media').length}`);
  console.log(`  • Animations activées: ✓`);
});