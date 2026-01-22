// =========================================
// CONTACT — Formulaire de contact fonctionnel
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
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn?.querySelector(".btn-text");
  const btnLoader = submitBtn?.querySelector(".btn-loader");

  // Ajoute une zone de statut sous le bouton si pas déjà là
  let status = section.querySelector(".contact-status");
  if (!status) {
    status = document.createElement("p");
    status.className = "contact-status";
    form.appendChild(status);
  }

  // ========================================
  // CONFIGURATION WEB3FORMS
  // ========================================
  const WEB3FORMS_KEY = "5b92ba39-faae-479f-926d-0a0f9bbb3b08";

  // Mise à jour de la clé dans le formulaire
  const accessKeyInput = form.querySelector('input[name="access_key"]');
  if (accessKeyInput) {
    accessKeyInput.value = WEB3FORMS_KEY;
  }

  // Animation des champs de formulaire
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    // Animation au focus
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
      if (input.value.trim()) {
        input.parentElement.classList.add("filled");
      } else {
        input.parentElement.classList.remove("filled");
      }
    });

    // Validation en temps réel
    input.addEventListener("input", () => {
      if (input.validity.valid) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      } else {
        input.classList.remove("valid");
        if (input.value.trim()) {
          input.classList.add("invalid");
        }
      }
    });
  });

  // Fonction pour afficher le statut
  function showStatus(message, type) {
    status.textContent = message;
    status.className = `contact-status contact-status--${type}`;
    status.style.display = "block";

    // Animation d'apparition
    status.style.opacity = "0";
    status.style.transform = "translateY(-10px)";
    requestAnimationFrame(() => {
      status.style.transition = "all 0.3s ease";
      status.style.opacity = "1";
      status.style.transform = "translateY(0)";
    });
  }

  // Fonction pour masquer le statut
  function hideStatus() {
    status.style.opacity = "0";
    status.style.transform = "translateY(-10px)";
    setTimeout(() => {
      status.style.display = "none";
    }, 300);
  }

  // Fonction pour activer/désactiver le mode chargement
  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add("sending");
      if (btnText) btnText.style.display = "none";
      if (btnLoader) btnLoader.style.display = "inline-flex";
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove("sending");
      if (btnText) btnText.style.display = "inline";
      if (btnLoader) btnLoader.style.display = "none";
    }
  }

  // Soumission du formulaire
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#contact-name")?.value.trim();
    const email = form.querySelector("#contact-email")?.value.trim();
    const message = form.querySelector("#contact-message")?.value.trim();

    // Validation
    if (!name || !email || !message) {
      showStatus("Merci de remplir tous les champs.", "err");
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus("Veuillez entrer une adresse email valide.", "err");
      return;
    }

    // Si pas de clé Web3Forms configurée
    if (WEB3FORMS_KEY === "YOUR_WEB3FORMS_KEY") {
      showStatus("Configuration en cours... Contactez-moi directement à basma.guettouche.etudiant@gmail.com", "err");
      console.warn("Web3Forms key not configured. Get a free key at https://web3forms.com/");
      return;
    }

    // Envoi via Web3Forms
    setLoading(true);
    showStatus("Envoi en cours...", "loading");

    try {
      const formData = new FormData(form);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showStatus("Message envoyé avec succès ! Je vous répondrai rapidement.", "ok");
        form.reset();

        // Réinitialiser les classes de validation
        inputs.forEach((input) => {
          input.classList.remove("valid", "invalid");
          input.parentElement.classList.remove("filled");
        });

        // Masquer le message après 5 secondes
        setTimeout(hideStatus, 5000);
      } else {
        throw new Error(data.message || "Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      showStatus(
        "Une erreur est survenue. Vous pouvez me contacter directement par email.",
        "err"
      );

      // Proposer le fallback mailto après une erreur
      setTimeout(() => {
        const fallbackLink = document.createElement("a");
        fallbackLink.href = `mailto:basma.guettouche.etudiant@gmail.com?subject=${encodeURIComponent(`[Portfolio] Message de ${name}`)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        fallbackLink.textContent = "Cliquez ici pour envoyer par email";
        fallbackLink.style.cssText = "display: block; margin-top: 8px; color: var(--primary); text-decoration: underline;";
        status.appendChild(fallbackLink);
      }, 100);
    } finally {
      setLoading(false);
    }
  });

  // Animation de typing pour le placeholder (effet immersif)
  const messageTextarea = form.querySelector("#contact-message");
  if (messageTextarea) {
    const originalPlaceholder = messageTextarea.placeholder;
    let placeholderIndex = 0;
    let isTyping = true;

    function animatePlaceholder() {
      if (!document.activeElement === messageTextarea) {
        if (isTyping) {
          messageTextarea.placeholder = originalPlaceholder.substring(0, placeholderIndex);
          placeholderIndex++;
          if (placeholderIndex > originalPlaceholder.length) {
            isTyping = false;
            setTimeout(animatePlaceholder, 2000);
            return;
          }
        } else {
          placeholderIndex = 0;
          isTyping = true;
        }
        setTimeout(animatePlaceholder, 50);
      }
    }

    // Démarrer l'animation après un délai
    setTimeout(animatePlaceholder, 1000);

    // Arrêter l'animation au focus
    messageTextarea.addEventListener("focus", () => {
      messageTextarea.placeholder = originalPlaceholder;
    });
  }

  console.log("%c📧 Module Contact initialisé", "color: #22d3ee; font-weight: bold;");
});
