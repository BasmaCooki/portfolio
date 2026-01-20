# 🚀 Portfolio BG TECH - Basma Guettouche

Portfolio professionnel présentant mon parcours en BTS SIO SISR, mes compétences en administration systèmes & réseaux, et ma passion pour la cybersécurité.

![Version](https://img.shields.io/badge/version-10.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Sections du Portfolio](#sections-du-portfolio)
- [Personnalisation](#personnalisation)
- [Performances](#performances)
- [Contributions](#contributions)
- [Auteur](#auteur)
- [License](#license)

---

## 🎯 Aperçu

Portfolio moderne avec une esthétique **cybersécurité/networking** et des animations interactives inspirées de l'univers Star Wars. Le site présente mon parcours académique, mes projets professionnels, et ma veille technologique en sécurité informatique.

**🔗 URL de démo :** [Déployez sur GitHub Pages]

### Caractéristiques visuelles
- 🎨 **Design cyberpunk** avec néons cyan/violet
- 🌓 **Mode sombre/clair** avec animation BB-8
- ✨ **Animations Matrix** (code rain, effets de scan)
- 📱 **Responsive** sur tous les appareils
- ⚡ **Interactions fluides** (smooth scroll, hover effects)

---

## ✨ Fonctionnalités

### 🔧 Fonctionnalités Principales

| Fonctionnalité | Description |
|----------------|-------------|
| **Navigation Dynamique** | Menu latéral expandable avec navigation smooth scroll |
| **Thème Switcher** | Bascule entre mode sombre (neon) et clair avec persistance localStorage |
| **Matrix Effect** | Animation de code rain sur canvas dans la section hero |
| **Typing Animation** | Effet machine à écrire pour le texte d'introduction |
| **Veille Technologique** | Agrégateur RSS temps réel depuis 6 sources cybersécurité |
| **Formulaire Contact** | Validation côté client avec intégration mailto |
| **Intersection Observer** | Animations déclenchées au scroll |
| **Recherche Live** | Recherche dans le contenu du portfolio |

### 🎬 Animations Avancées
- Particle effects sur révélation d'éléments
- Scan line effects sur médias
- Glitch effects sur images
- Gradient borders animés
- Skill bars progressives

---

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Animations, Grid, Flexbox, CSS Variables
- **JavaScript ES6+** - Vanilla JS, aucun framework

### Bibliothèques Externes
- **Font Awesome** 4.7.0 & 6.4.0 - Icônes
- **Google Fonts** - Orbitron, Poppins, Inter
- **Canvas API** - Effet Matrix code rain

### Hébergement
- Compatible **GitHub Pages**
- Pas de backend requis
- Formulaire via `mailto:`

---

## 📁 Structure du Projet

```
portfolio/
│
├── 📄 index.html              # Page d'entrée (Star Wars game)
├── 📄 index.css               # Styles page d'entrée
├── 📄 portfolio.html          # Page principale du portfolio
│
├── 📂 css/                    # Feuilles de style (132 KB)
│   ├── portfolio.css          # Styles globaux + thème
│   ├── accueil.css            # Hero section
│   ├── bts.css                # Section BTS SIO
│   ├── formation.css          # Section formation
│   ├── entreprise.css         # Section entreprise
│   ├── doc.css                # Section documentation
│   ├── certif.css             # Certifications
│   ├── veille.css             # Veille technologique
│   └── contact.css            # Formulaire de contact
│
├── 📂 js/                     # Scripts JavaScript (68 KB)
│   ├── portfolio.js           # Navigation, thème, core
│   ├── accueil.js             # Typing + Matrix effect
│   ├── bts.js                 # Animations BTS, particles
│   ├── formation.js           # Section formation
│   ├── entreprise.js          # Section entreprise
│   ├── doc.js                 # Section documentation
│   ├── certif.js              # Gestion certifications
│   ├── veille.js              # RSS feed fetcher
│   └── contact.js             # Validation formulaire
│
├── 📂 image/                  # Ressources visuelles (27 MB)
│   ├── *.gif                  # Animations (Star Wars, cyber)
│   ├── *.png                  # Logos, screenshots
│   └── *.jpg                  # Photos, bannières
│
├── 📂 fichier/                # Documents PDF (24 MB)
│   ├── CV-*.pdf               # CV et attestations
│   ├── Module-*.pdf           # Supports de formation BTS
│   └── RGPD-*.pdf             # Modules RGPD
│
├── 📂 assets/                 # Structure organisée (nouvelle)
│   ├── images/                # Images optimisées
│   ├── documents/             # PDFs compressés
│   └── fonts/                 # Polices locales (si besoin)
│
├── 📂 src/                    # Sources organisées (future structure)
│   ├── styles/                # CSS modularisés
│   └── scripts/               # JS modularisés
│
├── 📄 .gitignore              # Fichiers exclus du versioning
└── 📄 README.md               # Ce fichier
```

---

## 🚀 Installation

### Prérequis
- Navigateur moderne (Chrome, Firefox, Edge, Safari)
- Serveur web local ou GitHub Pages

### Étapes d'Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-username/portfolio.git
   cd portfolio
   ```

2. **Ouvrir le projet**
   ```bash
   # Option 1 : Ouvrir directement dans le navigateur
   open index.html

   # Option 2 : Utiliser un serveur local
   python -m http.server 8000
   # ou
   npx serve .
   ```

3. **Accéder au portfolio**
   - Ouvrir `http://localhost:8000` dans votre navigateur
   - Le jeu Star Wars s'affiche, cliquer pour accéder au portfolio

---

## 💻 Utilisation

### Navigation

1. **Page d'entrée** - Jeu Star Wars interactif
   - Cliquer sur l'écran pour lancer le portfolio

2. **Navigation latérale**
   - Cliquer sur les sections du menu pour naviguer
   - Scroll smooth automatique

3. **Thème**
   - Cliquer sur l'icône BB-8 en haut à droite pour changer de thème
   - Le choix est sauvegardé dans localStorage

4. **Recherche**
   - Utiliser la barre de recherche pour filtrer le contenu

---

## 📌 Sections du Portfolio

| Section | Description | Fichiers Associés |
|---------|-------------|-------------------|
| **🏠 Accueil** | Hero avec typing animation + Matrix effect | `accueil.css`, `accueil.js` |
| **👤 Profil** | Présentation personnelle, compétences | Intégré dans accueil |
| **🎓 Parcours** | Timeline de formation et diplômes | Intégré dans accueil |
| **📚 BTS SIO** | Présentation du BTS, blocs, projets | `bts.css`, `bts.js` |
| **💼 Entreprise** | Alternance Club Med, projets pro | `entreprise.css`, `entreprise.js` |
| **📄 Documentation** | Fiches techniques, supports PDF | `doc.css`, `doc.js` |
| **🔍 Veille Techno** | Flux RSS cybersécurité (ANSSI, CERT-FR...) | `veille.css`, `veille.js` |
| **🏆 Certifications** | Modules RGPD, attestations | `certif.css`, `certif.js` |
| **📧 Contact** | Formulaire de contact + réseaux sociaux | `contact.css`, `contact.js` |

---

## 🎨 Personnalisation

### Modifier les Couleurs

Éditer les variables CSS dans [css/portfolio.css](css/portfolio.css) :

```css
:root {
  /* Mode sombre (défaut) */
  --primary-color: #00ffff;      /* Cyan principal */
  --secondary-color: #ff00ff;    /* Magenta/Violet */
  --accent-color: #00ff88;       /* Vert accent */
  --bg-primary: #0a0e27;         /* Fond principal */
  --text-color: #ffffff;         /* Texte */
}

.theme-light {
  /* Mode clair */
  --primary-color: #0066cc;
  --secondary-color: #6366f1;
  /* ... */
}
```

### Ajouter une Section

1. Ajouter l'entrée dans le menu (portfolio.html, ligne ~50-150)
2. Créer la section HTML correspondante
3. Créer les fichiers CSS et JS dédiés
4. Référencer les fichiers dans le `<head>` de portfolio.html

### Modifier les Sources RSS

Dans [js/veille.js](js/veille.js), modifier le tableau `RSS_FEEDS` :

```javascript
const RSS_FEEDS = [
  {
    name: 'Votre Source',
    url: 'https://example.com/feed.xml',
    color: '#ff0000'
  }
];
```

---

## ⚡ Performances

### Optimisations Actuelles
- Scripts chargés avec `defer`
- CSS critique inline (à implémenter)
- Lazy loading des images via Intersection Observer
- Cache localStorage pour RSS (1h)

### Améliorations Recommandées
- ✅ Minifier CSS/JS (webpack, Vite)
- ✅ Compresser les images (ImageOptim, TinyPNG)
- ✅ Utiliser WebP pour les images
- ✅ Lazy load des PDFs
- ✅ Service Worker pour offline
- ✅ CDN pour assets statiques

### Métriques Cibles
- **LCP** : < 2.5s
- **FID** : < 100ms
- **CLS** : < 0.1
- **Lighthouse Score** : > 90

---

## 🤝 Contributions

Les contributions ne sont pas acceptées pour ce portfolio personnel. Cependant, vous pouvez :

1. **Forker** le projet pour créer votre propre portfolio
2. **Signaler** des bugs via Issues
3. **Proposer** des améliorations via Pull Requests

---

## 👩‍💻 Auteur

**Basma Guettouche**
Étudiante en BTS SIO SISR - INGETIS Paris
Spécialisation : Administration Systèmes & Réseaux | Cybersécurité

- 🌐 Portfolio : [https://votre-portfolio.github.io](https://votre-portfolio.github.io)
- 💼 LinkedIn : [linkedin.com/in/basma-guettouche](https://www.linkedin.com/in/basma-guettouche-b659432b9/)
- 🐙 GitHub : [github.com/basma-guettouche](https://github.com/votre-username)
- 📧 Email : basma.guettouche.etudiant@gmail.com
- 📝 Blog : [WordPress](https://basmaguettouche.wordpress.com/)

---

## 📜 License

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.

```
MIT License

Copyright (c) 2026 Basma Guettouche

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Remerciements

- **INGETIS Paris** - Formation BTS SIO
- **Club Med** - Opportunité d'alternance
- **Font Awesome** - Bibliothèque d'icônes
- **Google Fonts** - Polices Orbitron & Poppins
- **Communauté Dev** - Inspiration et ressources

---

## 📊 Statistiques du Projet

- **Lignes de code HTML** : ~1,716
- **Lignes de code CSS** : ~7,766
- **Lignes de code JS** : ~1,756
- **Nombre de fichiers** : 73+
- **Taille totale** : ~101 MB (avant optimisation)

---

## 🗺️ Roadmap

### Version Actuelle : 10.0

### Prochaines Améliorations
- [ ] Migration vers une architecture modulaire (composants)
- [ ] Optimisation des images (WebP, compression)
- [ ] Ajout d'un blog technique intégré
- [ ] Dark/Light mode avec plus de variantes
- [ ] Système de traduction FR/EN
- [ ] Intégration API GitHub pour afficher les repos
- [ ] Mode accessibilité (WCAG 2.1 AA)
- [ ] PWA (Progressive Web App)
- [ ] Analytics (respect RGPD)

---

<div align="center">

**⭐ Si ce portfolio vous a plu, n'hésitez pas à le star sur GitHub ! ⭐**

Made with 💙 by Basma Guettouche | BG TECH

</div>
