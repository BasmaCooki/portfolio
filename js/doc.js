/**
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
