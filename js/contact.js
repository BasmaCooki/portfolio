// =========================================
// CONTACT — Animation + "envoi" (GitHub Pages)
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#contact");
  if (!section) return;

  // Reveal animation
  const targets = section.querySelectorAll(".contact-col, .section-header");
  targets.forEach((el) => el.classList.add("reveal"));

  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        o.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => obs.observe(el));

  // Form handling
  const form = section.querySelector(".contact-form");
  if (!form) return;

  // Ajoute une zone de statut sous le bouton si pas déjà là
  let status = section.querySelector(".contact-status");
  if (!status) {
    status = document.createElement("p");
    status.className = "contact-status";
    form.appendChild(status);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#contact-name")?.value.trim();
    const email = form.querySelector("#contact-email")?.value.trim();
    const message = form.querySelector("#contact-message")?.value.trim();

    // Validation simple
    if (!name || !email || !message) {
      status.textContent = "Merci de remplir tous les champs.";
      status.className = "contact-status contact-status--err";
      return;
    }

    // Mailto (fonctionne sur GitHub Pages)
    const to = "basma.guettouche.etudiant@gmail.com";
    const subject = encodeURIComponent(`[Portfolio] Message de ${name}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );

    status.textContent = "Ouverture de votre messagerie…";
    status.className = "contact-status contact-status--ok";

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});
