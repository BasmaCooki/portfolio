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
