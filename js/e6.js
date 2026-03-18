// =========================================================
// E6.JS — Modale de visualisation PDF (Épreuve E6)
// =========================================================

/**
 * Ouvre la modale PDF.
 * @param {string} pdfPath  - Chemin vers le fichier PDF
 *                            TODO: remplacer docs/e6/... par le chemin réel
 * @param {string} fileName - Nom affiché dans la barre de la modale
 */
function openE6PdfModal(pdfPath, fileName) {
  const modal  = document.getElementById('e6PdfModal');
  const frame  = document.getElementById('e6PdfModalFrame');
  const nameEl = document.getElementById('e6PdfModalName');
  const dlBtn  = document.getElementById('e6PdfModalDl');

  if (!modal || !frame) return;

  // Injecter le PDF dans l'iframe
  frame.src = pdfPath;

  // Mettre à jour la barre (nom + lien téléchargement)
  nameEl.textContent = fileName || 'Document';
  dlBtn.href         = pdfPath;
  dlBtn.download     = (fileName || 'document').replace(/\s+/g, '_') + '.pdf';

  // Afficher la modale
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/**
 * Ferme la modale PDF.
 * Vide l'iframe pour interrompre le chargement du PDF.
 * @param {Event} [event] - Événement de clic (optionnel)
 */
function closeE6PdfModal(event) {
  // Si clic, s'assurer qu'il vient de l'overlay (pas de la barre ou du frame)
  if (event && event.currentTarget !== event.target) return;

  const modal = document.getElementById('e6PdfModal');
  const frame = document.getElementById('e6PdfModalFrame');

  if (!modal) return;

  // Vider l'iframe pour stopper le rendu PDF
  if (frame) frame.src = '';

  modal.style.display  = 'none';
  document.body.style.overflow = '';
}

// Fermeture via la touche Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const modal = document.getElementById('e6PdfModal');
  if (modal && modal.style.display === 'flex') closeE6PdfModal();
});
