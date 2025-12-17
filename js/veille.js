// =========================================
// VEILLE — Animations d'apparition au scroll
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const veilleSection = document.querySelector("#veille");
  if (!veilleSection) return;

  // On cible les blocs à animer (cartes + articles)
  const targets = veilleSection.querySelectorAll(".veille-card, .veille-article");

  // Ajoute la classe "reveal" pour l'état initial
  targets.forEach((el) => el.classList.add("reveal"));

  // IntersectionObserver = apparition au scroll
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.12,
    }
  );

  targets.forEach((el) => observer.observe(el));
});
