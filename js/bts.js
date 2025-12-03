// js/bts.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".bts-card");
  // petites animations au survol par exemple
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hover");
    });
  });
});
