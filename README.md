# 🎓 Portfolio BTS SIO SISR - Basma Guettouche

Portfolio professionnel pour la présentation de mon parcours en BTS SIO (Services Informatiques aux Organisations) option SISR (Solutions d'Infrastructure, Systèmes et Réseaux).

![Version](https://img.shields.io/badge/version-2.1-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Optimisations](#optimisations)
- [Responsive Design](#responsive-design)
- [Accessibilité](#accessibilité)
- [SEO](#seo)
- [Auteur](#auteur)

---

## 🌟 Aperçu

Portfolio interactif et moderne présentant :
- Mon parcours en BTS SIO SISR
- Mes compétences en administration systèmes et réseaux
- Mon expérience en alternance chez Club Med
- Ma veille technologique sur la cybersécurité
- Mes certifications (ANSSI, RGPD)
- Mes projets et documentations techniques

**🔗 URL :** [Votre domaine ici]

### Thème

Design cyberpunk/tech avec :
- **Mode sombre** (par défaut) : Palette cyan/violet néon
- **Mode clair** : Palette bleue/indigo professionnelle
- Animations fluides et effets visuels immersifs
- Curseur personnalisé réactif

---

## ✨ Fonctionnalités

### Navigation
- 🎯 **Sidebar interactive** avec navigation par sections
- 📱 **Menu hamburger** responsive pour mobile/tablette
- 🔄 **Scroll fluide** entre les sections
- 🎨 **Toggle thème clair/sombre** avec transition animée

### Effets visuels
- ✨ **Particules flottantes** en arrière-plan
- 🖱️ **Curseur personnalisé** avec effet hover
- 🎭 **Effet parallaxe** sur la section hero
- 💫 **Animations au scroll** (reveal progressif)
- ⌨️ **Animation typing** pour le terminal

### Sections principales

1. **🏠 Accueil / Hero**
   - Badge de statut en ligne
   - Carte profil rapide avec avatar
   - Métriques clés (2 ans d'études, 15 projets)
   - Terminal avec animation typing
   - Tags de compétences

2. **👤 Profil**
   - Présentation personnelle
   - Compétences techniques
   - Qualités professionnelles
   - Langues et centres d'intérêt

3. **🎓 Parcours**
   - CV téléchargeable (PDF)
   - Timeline interactive du parcours scolaire
   - Tableau de synthèse E5

4. **💼 BTS SIO**
   - Présentation du BTS SIO
   - Options SISR et SLAM
   - Blocs de compétences détaillés

5. **🏢 Alternance**
   - Expérience chez Club Med
   - Missions et responsabilités
   - Projets réalisés
   - Outils utilisés (Intune, GLPI, PowerShell)

6. **📚 Documentation**
   - Procédures techniques (Club Med)
   - TPs (Windows Server, DHCP, Réseau)
   - Documentation système et réseau

7. **📡 Veille technologique**
   - Sujet : Cybersécurité des identités (MFA, Zero Trust)
   - 7 outils de veille
   - 4 sources principales (CERT-FR, The Hacker News, etc.)

8. **🏆 Certifications**
   - ANSSI SecNum Académie
   - CNIL - RGPD (5 modules)
   - Visualisation des certificats

9. **📧 Contact**
   - Formulaire fonctionnel (Web3Forms)
   - Informations de contact
   - Carte de localisation (OpenStreetMap)
   - Liens réseaux sociaux

### Performance
- ⚡ **Lazy loading** des images
- 🗜️ **Images optimisées** (WebP, JPG compressés)
- 📦 **CSS/JS consolidés** (réduction des requêtes HTTP)
- ⬆️ **Bouton retour en haut** avec barre de progression

---

## 🛠️ Technologies utilisées

### Front-end
- **HTML5** - Structure sémantique
- **CSS3** - Styles et animations
  - CSS Variables pour le theming
  - Flexbox & Grid Layout
  - Animations & Transitions
  - Media Queries responsive
- **JavaScript (Vanilla)** - Interactivité
  - ES6+ features
  - DOM Manipulation
  - Event Handling
  - IntersectionObserver API

### Bibliothèques & Services
- **Font Awesome 6** - Icônes
- **Google Fonts** - Polices (Orbitron, Poppins, Inter)
- **Web3Forms** - Service de formulaire de contact
- **OpenStreetMap** - Carte de localisation

### Outils de développement
- **Git** - Contrôle de version
- **VS Code** - Éditeur de code
- **sips** (macOS) - Optimisation d'images

---

## 📁 Structure du projet

```
portfolio/
├── index.html              # Page d'entrée (thème Star Wars)
├── portfolio.html          # Portfolio principal
├── README.md              # Documentation
├── robots.txt             # Configuration SEO
├── sitemap.xml            # Plan du site
├── .gitignore             # Exclusions Git
│
├── css/                   # Feuilles de style
│   ├── portfolio.css      # Styles principaux (68 KB)
│   ├── accueil.css        # Section hero/accueil
│   ├── bts.css            # Section BTS
│   ├── sections.css       # Sections consolidées (certif, doc, entreprise, formation)
│   ├── veille.css         # Veille technologique
│   ├── contact.css        # Formulaire de contact
│   ├── animations.css     # Animations et effets
│   ├── responsive.css     # Media queries responsive
│   └── index.css          # Page d'entrée
│
├── js/                    # Scripts JavaScript
│   ├── portfolio.js       # Script principal
│   ├── accueil.js         # Section accueil
│   ├── bts.js             # Section BTS
│   ├── sections.js        # Sections consolidées
│   ├── contact.js         # Formulaire Web3Forms
│   ├── cursor.js          # Curseur personnalisé
│   ├── effects.js         # Effets visuels (particules, parallaxe, lazy loading)
│   └── mobile-menu.js     # Menu hamburger mobile
│
├── images/                # Images et médias (16 MB)
│   ├── bgtech.png         # Logo BG TECH
│   ├── profil.png         # Photo de profil
│   ├── cv.png             # Aperçu CV
│   ├── *.gif              # Animations (Star Wars, diagrammes)
│   ├── *.jpg              # Images compressées
│   └── *.webp             # Images WebP (format moderne)
│
└── documents/             # Documents PDF (24 MB)
    ├── CV_GUETTOUCHE_Basma.pdf
    ├── Tableau_Synthese_E5.pdf
    ├── *.pdf              # Procédures techniques, TPs, certifications
```

### Fichiers par taille
- **Total projet :** 91 MB
- **Code (HTML/CSS/JS) :** ~500 KB
- **Images :** 16 MB
- **Documents PDF :** 24 MB
- **Git history :** ~50 MB

---

## 🚀 Installation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel) : Live Server, Python SimpleHTTPServer, etc.

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/portfolio.git
cd portfolio
```

2. **Ouvrir le projet**
```bash
# Option 1 : Directement dans le navigateur
open index.html

# Option 2 : Avec un serveur local (recommandé)
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000

# Option 3 : Avec Live Server (VS Code)
# Clic droit sur index.html > Open with Live Server
```

3. **Configuration du formulaire de contact**
   - Obtenir une clé API sur [Web3Forms](https://web3forms.com)
   - Remplacer la clé dans `js/contact.js` :
   ```javascript
   const WEB3FORMS_KEY = "VOTRE_CLE_ICI";
   ```

---

## ⚡ Optimisations

### Images
- ✅ **Compression** : Images PNG/JPG compressées à 80-85% qualité
- ✅ **Redimensionnement** : Images redimensionnées aux dimensions d'affichage
- ✅ **Formats modernes** : Utilisation de WebP quand possible
- ✅ **Lazy loading** : Chargement différé des images au scroll
- 💾 **Économie** : 4 MB d'espace disque

### Code
- ✅ **CSS consolidé** : 4 petits fichiers fusionnés → `sections.css`
- ✅ **JS consolidé** : 4 petits fichiers fusionnés → `sections.js`
- ✅ **Moins de requêtes HTTP** : 8 requêtes en moins
- ⚡ **Performance** : Temps de chargement réduit

### Nettoyage
- ✅ **7 images inutilisées supprimées** (6-10 MB)
- ✅ **Dossiers vides supprimés** (/assets, /src)
- ✅ **Structure organisée** : Noms de dossiers standards

**Résultat final :**
- Avant optimisation : 101 MB
- Après optimisation : 91 MB
- **💾 Économie totale : 10 MB (-10%)**

---

## 📱 Responsive Design

Le portfolio est entièrement responsive et testé sur tous les appareils.

### Breakpoints
- **1200px+** : Desktop large
- **1024px** : Desktop standard
- **900px** : Tablette paysage (navigation hamburger activée)
- **768px** : Tablette portrait / iPad
- **640px** : Mobile large
- **480px** : Mobile standard
- **375px** : Petits mobiles (iPhone SE)

### Adaptations par appareil

**📱 Mobile (< 900px)**
- Menu hamburger avec overlay
- Sidebar cachée par défaut
- Layout à 1 colonne
- Boutons pleine largeur
- Typographie adaptée
- Espacement réduit
- Touch-friendly (zones tactiles 44×44px min)

**📱 Tablette (768px-1024px)**
- Grids à 2 colonnes
- Padding réduits
- Navigation optimisée
- Images responsive

**🖥️ Desktop (> 1024px)**
- Sidebar fixe
- Layout multi-colonnes
- Effets hover activés
- Particules et animations complètes

### Fonctionnalités responsive
- ✅ Désactivation du curseur custom sur mobile
- ✅ Désactivation des particules sur mobile
- ✅ Animations réduites sur `prefers-reduced-motion`
- ✅ Support orientation paysage/portrait
- ✅ Styles d'impression optimisés

---

## ♿ Accessibilité

### Standards respectés
- ✅ **ARIA labels** sur les boutons interactifs
- ✅ **Alt text** sur toutes les images
- ✅ **Contraste** : Ratios WCAG AA respectés
- ✅ **Navigation clavier** : Tous les éléments accessibles au clavier
- ✅ **Focus visible** : Indicateurs de focus clairs
- ✅ **Semantic HTML** : Structure logique avec balises sémantiques

### Thèmes
- **Mode sombre** : Contraste élevé (texte clair sur fond sombre)
- **Mode clair** : Contraste renforcé (texte foncé sur fond clair)

---

## 🔍 SEO

### Optimisations SEO

**Meta tags**
- ✅ Title descriptif
- ✅ Meta description
- ✅ Meta keywords
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Meta author
- ✅ Meta language

**Fichiers SEO**
- ✅ `robots.txt` - Configuration des crawlers
- ✅ `sitemap.xml` - Plan du site pour Google
- ✅ Favicon et Apple Touch Icon
- ✅ Theme color pour navigateurs mobiles

**Bonnes pratiques**
- ✅ URLs sémantiques
- ✅ Structure HTML logique (h1, h2, h3...)
- ✅ Images avec attributs alt
- ✅ Liens internes et externes
- ✅ Temps de chargement optimisé

---

## 🎨 Personnalisation

### Changer les couleurs du thème

**Mode sombre** (`portfolio.css`)
```css
body.theme-dark {
  --primary: #1af6c4;        /* Couleur principale (cyan néon) */
  --secondary: #8000ff;      /* Couleur secondaire (violet) */
  --accent: #22d3ee;         /* Accent (cyan clair) */
  --text: #f6f7ff;           /* Texte */
  --bg-base: #050814;        /* Fond principal */
}
```

**Mode clair** (`portfolio.css`)
```css
body.theme-light {
  --primary: #0369a1;        /* Couleur principale (bleu) */
  --secondary: #4f46e5;      /* Couleur secondaire (indigo) */
  --accent: #0284c7;         /* Accent (bleu clair) */
  --text: #0f172a;           /* Texte */
  --bg-base: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%);
}
```

### Modifier le contenu

Tous les contenus sont dans `portfolio.html`. Sections facilement identifiables par commentaires :
```html
<!-- ===================== NOM DE LA SECTION ===================== -->
```

---

## 📊 Statistiques du projet

- **Lignes de code HTML :** ~1500
- **Lignes de code CSS :** ~3000
- **Lignes de code JavaScript :** ~800
- **Nombre de sections :** 9
- **Nombre de projets documentés :** 15+
- **Certifications présentées :** 2 (ANSSI, RGPD)
- **Documents techniques :** 19 PDFs

---

## 🐛 Problèmes connus

Aucun problème majeur identifié. Le portfolio a été testé sur :
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Edge (Desktop)

---

## 🔮 Améliorations futures

- [ ] Ajouter une section Projets détaillée avec cas d'étude
- [ ] Ajouter des schémas d'infrastructure réseau
- [ ] Créer un blog technique
- [ ] Ajouter des vidéos de démonstration
- [ ] Implémenter un système de gestion de contenu (CMS)
- [ ] Ajouter l'internationalisation (EN/FR)
- [ ] Créer une PWA (Progressive Web App)
- [ ] Ajouter Google Analytics

---

## 📄 Licence

Ce projet est à usage personnel et éducatif dans le cadre du BTS SIO SISR.

---

## 👤 Auteur

**Basma Guettouche**
- 🎓 Étudiante en BTS SIO SISR à INGETIS Paris
- 💼 Alternante chez Club Med (IT Kiosk Informatique)
- 📧 Email : basma.guettouche.etudiant@gmail.com
- 💼 LinkedIn : [Votre profil LinkedIn]
- 🐱 GitHub : [Votre profil GitHub]

---

## 🙏 Remerciements

- **INGETIS Paris** - Formation BTS SIO SISR
- **Club Med** - Opportunité d'alternance
- **Web3Forms** - Service de formulaire gratuit
- **Font Awesome** - Bibliothèque d'icônes
- **Google Fonts** - Polices web

---

**Fait avec ❤️ pour le BTS SIO SISR 2024-2026**
