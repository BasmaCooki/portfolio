document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const certifImages = document.querySelectorAll('.certif-image');

    certifImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche l'ouverture du lien target="_blank"
            const src = img.getAttribute('src');
            lightboxImg.setAttribute('src', src);
            lightbox.classList.add('active');
        });
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
});/**
 * DOC.JS - Gestion de la section Documentation
 * Animations et interactions pour les documents téléchargeables
 */

document.addEventListener('DOMContentLoaded', function() {

  // Animation des items de documentation au scroll
  const docItems = document.querySelectorAll('.tp-item');

  if (docItems.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const docObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 50);

          docObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    docItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'all 0.4s ease';
      docObserver.observe(item);
    });
  }

  console.log('Doc.js chargé avec succès');
});
/**
 * ENTREPRISE.JS - Gestion de la section Entreprise & Alternance
 * Animations pour projets professionnels et timeline
 */

document.addEventListener('DOMContentLoaded', function() {

  // Animation des cartes de projets au scroll
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length > 0) {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);

          projectObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      projectObserver.observe(card);
    });
  }

  console.log('Entreprise.js chargé avec succès');
});
/**
 * FORMATION.JS - Gestion de la section Formation
 * Animations et interactions pour la timeline de formation
 */

document.addEventListener('DOMContentLoaded', function() {

  // Animation au scroll pour les items de formation
  const formationItems = document.querySelectorAll('.formation-item');

  if (formationItems.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';

          setTimeout(() => {
            entry.target.style.transition = 'all 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    formationItems.forEach(item => {
      observer.observe(item);
    });
  }

  console.log('Formation.js chargé avec succès');
});
