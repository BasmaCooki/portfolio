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
