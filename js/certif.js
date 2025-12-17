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
});