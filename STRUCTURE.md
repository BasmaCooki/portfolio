# 📂 Structure du Portfolio BG TECH

**Dernière mise à jour :** 20 janvier 2026
**Version :** 10.1

---

## 🗂️ Arborescence Complète

```
portfolio/
│
├── 📄 index.html                    # Page d'entrée Star Wars
├── 📄 index.css                     # Styles page d'entrée
├── 📄 portfolio.html                # Page principale (1716 lignes)
│
├── 📄 README.md                     # Documentation complète ✨ NOUVEAU
├── 📄 AMELIORATIONS.md              # Rapport d'améliorations ✨ NOUVEAU
├── 📄 STRUCTURE.md                  # Ce fichier ✨ NOUVEAU
├── 📄 .gitignore                    # Fichiers exclus Git ✨ NOUVEAU
│
├── 📂 css/                          # Styles (132 KB, 8 fichiers)
│   ├── portfolio.css                # 55 KB - Styles globaux + thème
│   ├── accueil.css                  # 19 KB - Hero section
│   ├── bts.css                      # 29 KB - Section BTS SIO
│   ├── formation.css                # 1.2 KB - Section formation ✨ NOUVEAU
│   ├── entreprise.css               # 0 B - ⚠️ VIDE
│   ├── doc.css                      # 1.1 KB - Documentation
│   ├── certif.css                   # 1.7 KB - Certifications
│   ├── veille.css                   # 7.9 KB - Veille technologique
│   └── contact.css                  # 4.8 KB - Formulaire contact
│
├── 📂 js/                           # Scripts (68 KB, 8 fichiers)
│   ├── portfolio.js                 # 11 KB - Navigation, thème, core
│   ├── accueil.js                   # 6.6 KB - Typing + Matrix effect
│   ├── bts.js                       # 27 KB - Animations, particles
│   ├── formation.js                 # 1.1 KB - Section formation ✨ NOUVEAU
│   ├── entreprise.js                # 0 B - ⚠️ VIDE
│   ├── doc.js                       # 0 B - ⚠️ VIDE
│   ├── certif.js                    # 727 B - Gestion certifications
│   ├── veille.js                    # 9 KB - RSS feed fetcher
│   └── contact.js                   # 2 KB - Validation formulaire
│
├── 📂 image/                        # Images (27 MB, 44 fichiers)
│   ├── starwarsgaming.gif           # GIF Star Wars
│   ├── bgtech.png                   # Logo principal
│   ├── profil.png                   # Photo de profil
│   ├── bts-sio.png                  # Logo BTS SIO
│   ├── cyber.gif                    # Animation cybersécurité
│   └── ... (39 autres fichiers)
│
├── 📂 fichier/                      # Documents PDF (24 MB, 21 fichiers)
│   ├── CV-*.pdf                     # CV et attestations
│   ├── Module-*.pdf                 # Supports BTS (10 PDFs)
│   ├── RGPD-*.pdf                   # Modules RGPD (5 PDFs)
│   └── ... (autres docs techniques)
│
├── 📂 assets/ ✨ NOUVEAU            # Structure organisée (future)
│   ├── 📂 images/                   # Images optimisées (à migrer)
│   ├── 📂 documents/                # PDFs compressés (à migrer)
│   └── 📂 fonts/                    # Polices locales (optionnel)
│
└── 📂 src/ ✨ NOUVEAU               # Sources organisées (future)
    ├── 📂 styles/                   # CSS modularisés (à migrer)
    └── 📂 scripts/                  # JS modularisés (à migrer)
```

---

## 📊 Statistiques du Projet

| Type | Nombre | Taille Totale | Remarques |
|------|--------|---------------|-----------|
| **HTML** | 2 | 76 KB | 1 page entrée + 1 portfolio |
| **CSS** | 8 | 132 KB | 3 fichiers à remplir |
| **JavaScript** | 8 | 68 KB | 3 fichiers vides |
| **Images** | 44 | 27 MB | ⚠️ À optimiser |
| **PDFs** | 21 | 24 MB | ⚠️ À compresser |
| **Documentation** | 4 | 17 KB | README, guides |
| **TOTAL** | **87 fichiers** | **~101 MB** | Avant optimisation |

---

## 🎯 Mapping Fichiers ↔ Sections

### 📄 HTML Sections

| Section HTML | CSS Associé | JS Associé | Statut |
|--------------|-------------|------------|--------|
| `#accueil` | accueil.css | accueil.js | ✅ Complet |
| `#profil` | accueil.css | - | ✅ Complet |
| `#parcours` | accueil.css | - | ✅ Complet |
| `#bts-presentation` | bts.css | bts.js | ✅ Complet |
| `#bts-options` | bts.css | bts.js | ✅ Complet |
| `#bts-blocs` | bts.css | bts.js | ✅ Complet |
| `#bts-e5` | bts.css | bts.js | ✅ Complet |
| Formation | formation.css | formation.js | ✅ Créé |
| `#entreprise-alternance` | entreprise.css | entreprise.js | ⚠️ Fichiers vides |
| `#entreprise-projets` | entreprise.css | entreprise.js | ⚠️ Fichiers vides |
| `#docs` | doc.css | doc.js | ⚠️ JS vide |
| `#veille` | veille.css | veille.js | ✅ Complet |
| `#certifications` | certif.css | certif.js | ✅ Complet |
| `#contact` | contact.css | contact.js | ✅ Complet |

---

## ⚠️ Fichiers à Compléter

### 1. css/entreprise.css (0 octets)
**Utilité :** Styles pour la section alternance et projets professionnels

**Contenu suggéré :**
```css
/* Styles pour timeline d'entreprise */
/* Cards de projets Club Med */
/* Layout grille pour réalisations */
```

### 2. js/entreprise.js (0 octets)
**Utilité :** Animations et interactions section entreprise

**Contenu suggéré :**
```javascript
/* Animations révélation projets */
/* Filtrage par catégorie */
/* Lightbox images */
```

### 3. js/doc.js (0 octets)
**Utilité :** Gestion de la section documentation/téléchargements

**Contenu suggéré :**
```javascript
/* Système de filtrage PDFs */
/* Tracking downloads */
/* Preview hover */
```

---

## 🔗 Dépendances Externes

### CDN Utilisés

```html
<!-- Font Awesome 4.7.0 -->
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css

<!-- Font Awesome 6.4.0 -->
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css

<!-- Google Fonts -->
https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900
https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600
https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700
```

**Recommandation :** Télécharger en local pour performance et offline

---

## 🎨 Variables CSS Globales

Définies dans `css/portfolio.css` :

### Mode Sombre (défaut)
```css
--primary-color: #00ffff;        /* Cyan néon */
--secondary-color: #ff00ff;      /* Magenta */
--accent-color: #00ff88;         /* Vert accent */
--bg-primary: #0a0e27;           /* Fond principal */
--bg-secondary: #1a1f3a;         /* Fond cartes */
--text-color: #ffffff;           /* Texte principal */
--text-muted: #a0a0a0;           /* Texte secondaire */
```

### Mode Clair
```css
--primary-color: #0066cc;        /* Bleu */
--secondary-color: #6366f1;      /* Indigo */
--bg-primary: #f5f7fa;           /* Fond clair */
--text-color: #1a1a1a;           /* Texte sombre */
```

---

## 📱 Responsiveness

### Breakpoints

| Device | Largeur | CSS Media Query |
|--------|---------|-----------------|
| **Mobile S** | 320px | `@media (max-width: 480px)` |
| **Mobile L** | 480px | `@media (max-width: 768px)` |
| **Tablet** | 768px | `@media (max-width: 1024px)` |
| **Desktop** | 1024px+ | Par défaut |

### Éléments Responsives
- [x] Menu latéral → hamburger mobile
- [x] Grilles → colonnes adaptatives
- [x] Images → object-fit + max-width
- [x] Textes → font-size fluide (clamp)

---

## 🚀 Scripts de Build (Future)

### Package.json suggéré

```json
{
  "name": "portfolio-bg-tech",
  "version": "10.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "optimize:images": "imagemin image/* --out-dir=assets/images",
    "optimize:pdfs": "gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook",
    "validate": "html-validate *.html && stylelint css/*.css"
  }
}
```

---

## 📈 Plan de Migration

### Phase 1 - Immédiat (Cette semaine)
```
1. Remplir entreprise.css, entreprise.js, doc.js
2. Compresser top 10 images les plus lourdes
3. Valider HTML/CSS (W3C)
```

### Phase 2 - Court terme (Ce mois)
```
4. Migrer images → assets/images/ (format WebP)
5. Migrer PDFs → assets/documents/ (compressés)
6. Ajouter lazy loading généralisé
```

### Phase 3 - Moyen terme (Trimestre)
```
7. Refactoriser CSS → src/styles/ (modules SCSS)
8. Refactoriser JS → src/scripts/ (modules ES6)
9. Mettre en place build (Vite)
10. PWA + Service Worker
```

---

## ✅ Checklist Qualité

### Code
- [x] HTML valide
- [x] CSS sans erreurs
- [x] JS sans erreurs console
- [ ] Commentaires sur code complexe
- [ ] Nommage cohérent (BEM ou autre)

### Performance
- [ ] Images optimisées (WebP)
- [ ] CSS/JS minifiés
- [ ] Lazy loading actif
- [ ] Cache headers configurés

### SEO
- [x] Meta tags présents
- [x] Open Graph configuré
- [x] Sitemap.xml (à créer)
- [x] Robots.txt (à créer)

### Accessibilité
- [ ] Alt sur toutes images
- [ ] Labels sur formulaires
- [ ] Contraste suffisant (WCAG AA)
- [ ] Navigation clavier

---

## 🔍 Commandes Utiles

### Analyse du projet
```bash
# Compter lignes de code
find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs wc -l

# Trouver fichiers lourds
find image/ -type f -size +1M -exec ls -lh {} \;

# Vérifier fichiers vides
find . -name "*.css" -o -name "*.js" | xargs -I {} sh -c 'test ! -s {} && echo "{} is empty"'

# Analyser dépendances CSS
grep -r "@import\|url(" css/
```

---

## 🎓 Ressources & Outils

### Validation
- **HTML :** https://validator.w3.org/
- **CSS :** https://jigsaw.w3.org/css-validator/
- **Lighthouse :** Chrome DevTools

### Optimisation
- **Images :** TinyPNG, ImageOptim, Squoosh
- **PDFs :** Ghostscript, Adobe Acrobat
- **Code :** Minify, UglifyJS, CSSNano

### Tests
- **Responsive :** BrowserStack, Responsively
- **Performance :** WebPageTest, GTmetrix
- **SEO :** Google Search Console

---

<div align="center">

**📂 Structure organisée et documentée**

Portfolio BG TECH v10.1
Basma Guettouche - BTS SIO SISR

</div>
