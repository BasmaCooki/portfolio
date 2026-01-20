# 🔍 Debug - Veille Technologique

## Problème Identifié

La section veille technologique ne chargeait pas les articles RSS correctement.

### Causes Principales

1. **Filtrage trop strict** : Le code filtrait les articles uniquement par mots-clés, ce qui pouvait ne retourner aucun résultat
2. **Proxy unique** : Un seul proxy CORS était utilisé (allorigins.win), qui peut être indisponible
3. **Cache trop long** : 1 heure de cache empêchait de voir les nouveaux articles rapidement
4. **Gestion d'erreurs limitée** : Pas de fallback si le proxy échouait

---

## Solutions Appliquées

### 1. ✅ Affichage de TOUS les articles

**Avant :**
```javascript
// Filtrer par mots-clés
if (matchesKeywords) {
  articles.push(...);
}
```

**Après :**
```javascript
// Afficher TOUS les articles récents (pas de filtre par mots-clés)
articles.push({
  title: cleanHtml(title),
  link: link,
  description: cleanHtml(description),
  date: formatDate(pubDate)
});
```

### 2. ✅ Multi-Proxy avec Fallback

**Avant :**
```javascript
const proxyUrl = 'https://api.allorigins.win/get?url=...';
// Un seul essai
```

**Après :**
```javascript
const proxies = [
  'https://api.allorigins.win/get?url=...',
  'https://corsproxy.io/?...',
  'https://api.rss2json.com/v1/api.json?rss_url=...'
];

// Essayer chaque proxy jusqu'à ce qu'un fonctionne
for (let proxy of proxies) {
  try {
    // Tentative de chargement
  } catch {
    // Continuer avec le prochain
  }
}
```

### 3. ✅ Cache Optimisé

**Avant :**
```javascript
const CACHE_DURATION = 3600000; // 1 heure
```

**Après :**
```javascript
const CACHE_DURATION = 900000; // 15 minutes
```

### 4. ✅ Meilleure Gestion d'Erreurs

**Avant :**
```html
<div class="source-empty">
  <p>Aucun article récent trouvé</p>
</div>
```

**Après :**
```html
<div class="source-empty">
  <p>⚠️ Impossible de charger les articles pour le moment</p>
  <p>Les flux RSS peuvent être temporairement indisponibles.</p>
  <button onclick="window.location.reload()">🔄 Réessayer</button>
</div>
```

---

## Comment Tester

### 1. Ouvrir la Console du Navigateur

1. Ouvrir le portfolio dans Chrome/Firefox
2. Appuyer sur `F12` pour ouvrir DevTools
3. Aller dans l'onglet **Console**

### 2. Messages à Observer

Vous devriez voir :

```
🔍 Module Veille Technologique (style Loïc) chargé
🚀 Initialisation du module de veille...
🔄 Chargement de toutes les sources...

🔄 cert-fr: Tentative avec proxy 1...
✅ cert-fr: 5 articles trouvés

🔄 anssi: Tentative avec proxy 1...
✅ anssi: 5 articles trouvés

🔄 cybermalveillance: Tentative avec proxy 1...
✅ cybermalveillance: 5 articles trouvés

...

✅ Toutes les sources chargées
✅ Module de veille initialisé
```

### 3. Si une Source Échoue

```
🔄 hackernews: Tentative avec proxy 1...
⚠️ hackernews: Proxy 1 échoué: HTTP 429

🔄 hackernews: Tentative avec proxy 2...
✅ hackernews: 5 articles trouvés (proxy 2)
```

---

## Proxies Utilisés

| Proxy | URL | Avantages | Limitations |
|-------|-----|-----------|-------------|
| **AllOrigins** | api.allorigins.win | Gratuit, stable | Rate limit possible |
| **CORSProxy** | corsproxy.io | Rapide, backup fiable | Peut être lent |
| **RSS2JSON** | api.rss2json.com | Format JSON simple | 10k req/jour gratuit |

---

## Vérifier le Cache

### Voir le Cache dans localStorage

Ouvrir la console et taper :

```javascript
// Voir tous les articles en cache
Object.keys(localStorage)
  .filter(key => key.startsWith('veille-source-'))
  .forEach(key => {
    const data = JSON.parse(localStorage.getItem(key));
    console.log(key, data.articles.length + ' articles',
                'Age:', Math.floor((Date.now() - data.timestamp) / 60000) + ' min');
  });
```

### Vider le Cache

```javascript
// Forcer le rechargement des articles
Object.keys(localStorage)
  .filter(key => key.startsWith('veille-source-'))
  .forEach(key => localStorage.removeItem(key));

window.location.reload();
```

---

## Sources RSS Configurées

| Source | URL | Statut |
|--------|-----|--------|
| **CERT-FR** | cert.ssi.gouv.fr/feed/ | ✅ Actif |
| **ANSSI** | ssi.gouv.fr/feed/ | ✅ Actif |
| **Cybermalveillance** | cybermalveillance.gouv.fr/feed/ | ✅ Actif |
| **The Hacker News** | feeds.feedburner.com/TheHackersNews | ✅ Actif |
| **Microsoft Security** | microsoft.com/security/blog/feed/ | ✅ Actif |
| **Bleeping Computer** | bleepingcomputer.com/feed/ | ✅ Actif |

---

## Problèmes Possibles et Solutions

### Problème 1 : "Aucun article trouvé"

**Causes :**
- Tous les proxies sont down
- Le flux RSS du site est cassé
- Problème de réseau local

**Solutions :**
1. Ouvrir la console et vérifier les erreurs
2. Vider le cache : `localStorage.clear()`
3. Attendre 5 minutes et réessayer
4. Vérifier votre connexion internet

### Problème 2 : Articles en double

**Cause :** Cache non vidé après modification du code

**Solution :**
```javascript
localStorage.clear();
window.location.reload();
```

### Problème 3 : Articles très anciens

**Cause :** Cache trop long (ancienne version)

**Solution :**
- Le nouveau code utilise 15 min au lieu d'1h
- Vider le cache pour appliquer le changement

### Problème 4 : Erreur CORS

**Message :** `Access to fetch... has been blocked by CORS policy`

**Solution :**
- C'est normal, c'est pourquoi on utilise des proxies
- Vérifier que les 3 proxies sont configurés
- Un des proxies devrait fonctionner

---

## Améliorations Futures

### Court Terme
- [ ] Ajouter un indicateur de chargement animé
- [ ] Bouton "Rafraîchir" par source
- [ ] Compteur d'articles par source

### Moyen Terme
- [ ] Backend Node.js pour contourner CORS
- [ ] Système de favoris pour articles
- [ ] Partage d'articles sur réseaux sociaux

### Long Terme
- [ ] Recherche dans les articles
- [ ] Tags et catégories
- [ ] Système de notifications

---

## Code Modifié

### Fichier : js/veille.js

**Lignes modifiées :**
- Ligne 55 : `CACHE_DURATION` 1h → 15 min
- Lignes 94-161 : Nouvelle fonction `fetchArticlesFromSource()` avec multi-proxy
- Lignes 166-205 : Amélioration `displayArticlesForSource()` avec meilleur message d'erreur

**Nombre de lignes de code ajoutées :** ~50 lignes
**Impact :** Meilleure fiabilité, plus d'articles visibles

---

## Tester les Modifications

### Test 1 : Chargement Initial

1. Ouvrir portfolio.html
2. Naviguer vers "Veille techno"
3. Attendre 5-10 secondes
4. **Résultat attendu :** Articles apparaissent avec animation

### Test 2 : Cache

1. Rafraîchir la page (F5)
2. Naviguer vers "Veille techno"
3. **Résultat attendu :** Articles chargent instantanément (depuis cache)

### Test 3 : Rechargement Forcé

1. Console : `localStorage.clear()`
2. Rafraîchir la page
3. **Résultat attendu :** Articles rechargent depuis les flux RSS

### Test 4 : Gestion d'Erreur

1. Débrancher internet
2. Console : `localStorage.clear()`
3. Rafraîchir la page
4. **Résultat attendu :** Message "Impossible de charger" avec bouton réessayer

---

## Logs de Debug Détaillés

Pour activer des logs plus détaillés, ajouter dans la console :

```javascript
// Mode debug verbeux
localStorage.setItem('veille-debug', 'true');
window.location.reload();
```

Cela affichera :
- Timestamp exact de chaque requête
- Headers de réponse
- Contenu XML brut
- Détails parsing

---

## Support

Si les articles ne se chargent toujours pas après ces modifications :

1. **Vérifier la console** pour messages d'erreur spécifiques
2. **Vider complètement le cache** : `Ctrl+Shift+Delete`
3. **Tester sur un autre navigateur** (Chrome vs Firefox)
4. **Vérifier les URLs RSS** en les ouvrant directement dans le navigateur

---

<div align="center">

**✅ Veille Technologique Corrigée**

Portfolio BG TECH - Basma Guettouche
BTS SIO SISR

*Dernière modification : 20 janvier 2026*

</div>
