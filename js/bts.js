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



// ========================================================
// BTS E5 SECTION - JavaScript Ultra-Interactif
// Modal d'agrandissement + animations
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c📄 BTS E5 Section Activée", 
    "color: #1af6c4; font-size: 16px; font-weight: bold;");

  // ======================================================
  // CRÉATION DE LA MODAL D'AGRANDISSEMENT
  // ======================================================
  
  function createImageModal() {
    // Vérifier si la modal existe déjà
    if (document.getElementById('e5-modal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'e5-modal';
    modal.className = 'e5-modal';
    modal.innerHTML = `
      <div class="e5-modal-content">
        <button class="e5-modal-close" aria-label="Fermer">✕</button>
        <img src="" alt="Tableau E5 agrandi" />
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fermeture de la modal
    const closeBtn = modal.querySelector('.e5-modal-close');
    closeBtn.addEventListener('click', () => closeModal());
    
    // Fermeture au clic sur le fond
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Fermeture avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
  
  function openModal(imageSrc) {
    const modal = document.getElementById('e5-modal');
    if (!modal) return;
    
    const img = modal.querySelector('img');
    img.src = imageSrc;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
    
    // Effet de particules à l'ouverture
    createModalParticles();
  }
  
  function closeModal() {
    const modal = document.getElementById('e5-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurer le scroll
  }

  // ======================================================
  // GESTION DU CLIC SUR L'APERÇU
  // ======================================================
  
  const e5Preview = document.querySelector('.e5-preview');
  const e5PreviewImage = document.querySelector('.e5-preview-image');
  
  if (e5Preview && e5PreviewImage) {
    createImageModal();
    
    // Ajouter les coins décoratifs
    for (let i = 0; i < 4; i++) {
      const corner = document.createElement('div');
      corner.className = 'e5-preview-corner';
      e5Preview.appendChild(corner);
    }
    
    // Ajouter l'overlay
    const overlay = document.createElement('div');
    overlay.className = 'e5-preview-overlay';
    e5Preview.appendChild(overlay);
    
    // Clic pour agrandir
    e5Preview.addEventListener('click', () => {
      openModal(e5PreviewImage.src);
      createClickPulse(e5Preview);
    });
    
    // Effet de parallax léger
    e5Preview.addEventListener('mousemove', (e) => {
      const rect = e5Preview.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      e5PreviewImage.style.transform = `scale(1.02) translate(${x * 10}px, ${y * 10}px)`;
    });
    
    e5Preview.addEventListener('mouseleave', () => {
      e5PreviewImage.style.transform = '';
    });
  }

  // ======================================================
  // EFFET DE PARTICULES À L'OUVERTURE DE LA MODAL
  // ======================================================
  
  function createModalParticles() {
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' ? '#1af6c4' : '#0369a1';
    const particleCount = 20;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 100 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 15px ${color}, 0 0 30px ${color};
        animation: modal-particle-burst 1.2s ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1200);
    }
    
    // Ajouter l'animation si elle n'existe pas
    if (!document.getElementById('modal-particle-anim')) {
      const style = document.createElement('style');
      style.id = 'modal-particle-anim';
      style.textContent = `
        @keyframes modal-particle-burst {
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
  // EFFET DE PULSE AU CLIC
  // ======================================================
  
  function createClickPulse(element) {
    const rect = element.getBoundingClientRect();
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' ? '#1af6c4' : '#0369a1';
    
    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      border-radius: 20px;
      border: 4px solid ${color};
      opacity: 1;
      pointer-events: none;
      z-index: 9998;
      animation: click-pulse-out 0.8s ease-out;
    `;
    
    document.body.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 800);
    
    if (!document.getElementById('click-pulse-anim')) {
      const style = document.createElement('style');
      style.id = 'click-pulse-anim';
      style.textContent = `
        @keyframes click-pulse-out {
          to {
            transform: scale(1.1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ======================================================
  // ANIMATION DU BOUTON DE TÉLÉCHARGEMENT
  // ======================================================
  
  const downloadBtn = document.querySelector('.e5-actions .btn-primary');
  
  if (downloadBtn) {
    // Effet de particules au clic
    downloadBtn.addEventListener('click', (e) => {
      createDownloadParticles(e);
      createDownloadWave(downloadBtn);
      
      // Animation de téléchargement
      animateDownload(downloadBtn);
    });
    
    // Effet de glow qui suit la souris
    downloadBtn.addEventListener('mousemove', (e) => {
      const rect = downloadBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      downloadBtn.style.setProperty('--mouse-x', `${x}px`);
      downloadBtn.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  // ======================================================
  // PARTICULES DE TÉLÉCHARGEMENT
  // ======================================================
  
  function createDownloadParticles(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' ? '#1af6c4' : '#0369a1';
    
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 10;
      const distance = 40 + Math.random() * 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance + 20; // Biais vers le bas
      
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + x}px;
        top: ${rect.top + y}px;
        width: 5px;
        height: 5px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 12px ${color};
        animation: download-particle 1s ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
    
    if (!document.getElementById('download-particle-anim')) {
      const style = document.createElement('style');
      style.id = 'download-particle-anim';
      style.textContent = `
        @keyframes download-particle {
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
  // ONDE DE TÉLÉCHARGEMENT
  // ======================================================
  
  function createDownloadWave(button) {
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const color = currentTheme === 'dark' ? 'rgba(26, 246, 196, 0.6)' : 'rgba(3, 105, 161, 0.4)';
    
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: 14px;
      border: 3px solid ${color};
      animation: wave-expand 1s ease-out;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(wave);
    
    setTimeout(() => wave.remove(), 1000);
    
    if (!document.getElementById('wave-expand-anim')) {
      const style = document.createElement('style');
      style.id = 'wave-expand-anim';
      style.textContent = `
        @keyframes wave-expand {
          to {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ======================================================
  // ANIMATION DE TÉLÉCHARGEMENT
  // ======================================================
  
  function animateDownload(button) {
    const originalText = button.textContent;
    const originalHTML = button.innerHTML;
    
    // Phase 1: Téléchargement
    button.innerHTML = '<span>⏳ Téléchargement...</span>';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
      // Phase 2: Succès
      button.innerHTML = '<span>✓ Téléchargé !</span>';
      button.style.background = 'linear-gradient(135deg, #27c93f, #1ea830)';
      
      setTimeout(() => {
        // Phase 3: Retour à la normale
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.pointerEvents = '';
      }, 1500);
    }, 1000);
  }

  // ======================================================
  // INTERSECTION OBSERVER POUR L'APPARITION
  // ======================================================
  
  const e5Section = document.getElementById('bts-e5');
  
  if (e5Section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Effet de scan à l'apparition
          createSectionScan(e5Section);
          
          // Animation des éléments
          const e5Layout = e5Section.querySelector('.e5-layout');
          if (e5Layout) {
            e5Layout.style.animation = 'fade-slide-up 0.8s ease-out 0.3s forwards';
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(e5Section);
  }

  
  // ======================================================
  // COMPTEUR DE TÉLÉCHARGEMENTS (simulation)
  // ======================================================
  
  let downloadCount = 0;
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadCount++;
      console.log(`%c📥 Téléchargement #${downloadCount}`, 
        "color: #1af6c4; font-weight: bold;");
    });
  }

  // ======================================================
  // STATS & DEBUG
  // ======================================================
  
  console.log("%c✨ BTS E5 Stats:", "color: #22d3ee; font-weight: bold;");
  console.log(`  • Modal créée: ✓`);
  console.log(`  • Preview interactive: ✓`);
  console.log(`  • Bouton téléchargement: ${downloadBtn ? '✓' : '✗'}`);
  console.log(`  • Animations activées: ✓`);
});