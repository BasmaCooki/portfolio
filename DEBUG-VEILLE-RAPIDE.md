# 🔧 Debug Rapide - Veille Technologique

## Le problème : "Chargement des articles..." mais rien ne s'affiche

---

## ✅ Solution Rapide (3 étapes)

### Étape 1: Ouvrir la Console

1. Ouvrir [portfolio.html](portfolio.html) dans Chrome ou Firefox
2. Appuyer sur **F12** (ou Cmd+Option+I sur Mac)
3. Cliquer sur l'onglet **Console**

### Étape 2: Vider le Cache

Dans la console, taper:
```javascript
localStorage.clear()
```

Puis appuyer sur **Entrée**, et recharger la page (**F5**)

### Étape 3: Observer les Messages

Vous devriez voir dans la console:

```
✅ Module Veille Technologique chargé
🔄 Chargement de 6 sources RSS...
🔄 cert-fr: Tentative proxy 1/3...
```

---

## 📊 Diagnostics Possibles

### Cas 1: Vous voyez "✅ cert-fr: 5 articles (RSS2JSON)"

**Statut:** ✅ **FONCTIONNE**

Les articles devraient s'afficher. Si ce n'est pas le cas:
- Vérifier qu'il n'y a pas d'erreur rouge dans la console
- Vérifier que `#articles-cert-fr` existe dans le HTML

### Cas 2: Vous voyez "⏱️ cert-fr: Timeout proxy 1"

**Statut:** ⚠️ **LENT**

Les proxies sont lents. Attendre 30 secondes, le script essaiera les autres proxies.

### Cas 3: Vous voyez "❌ cert-fr: Tous proxies échoués, affichage données démo"

**Statut:** ⚠️ **PROXIES DOWN**

Les 3 proxies sont indisponibles. Un article de démonstration s'affiche avec un lien vers le site.

### Cas 4: Erreur "Container articles-cert-fr non trouvé"

**Statut:** ❌ **ERREUR HTML**

Le conteneur n'existe pas dans le HTML. Vérifier [portfolio.html](portfolio.html) ligne 1448.

---

## 🧪 Page de Test

J'ai créé une **page de test dédiée** : [test-veille.html](test-veille.html)

### Comment l'utiliser:

1. Ouvrir [test-veille.html](test-veille.html) dans le navigateur
2. Cliquer sur **"Tester RSS2JSON"**
3. Observer les résultats

**Si le test fonctionne**, le problème vient du fichier [veille.js](js/veille.js) principal.
**Si le test échoue aussi**, le problème vient des proxies CORS.

---

## 🔍 Commandes de Debug

### Voir le contenu du cache

```javascript
Object.keys(localStorage)
  .filter(key => key.startsWith('veille-source-'))
  .forEach(key => {
    const data = JSON.parse(localStorage.getItem(key));
    console.log(key, ':', data.articles.length, 'articles');
  });
```

### Forcer le rechargement d'une source

```javascript
localStorage.removeItem('veille-source-cert-fr');
window.location.reload();
```

### Vérifier si les conteneurs existent

```javascript
['cert-fr', 'anssi', 'cybermalveillance', 'hackernews', 'microsoft', 'bleeping'].forEach(id => {
  const container = document.getElementById(`articles-${id}`);
  console.log(`articles-${id}:`, container ? '✅ Existe' : '❌ N\'existe pas');
});
```

### Test manuel d'un proxy

```javascript
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.cert.ssi.gouv.fr/feed/')
  .then(r => r.json())
  .then(data => console.log('Articles:', data.items.length))
  .catch(err => console.error('Erreur:', err));
```

---

## 🚨 Erreurs Communes

### Erreur: "Failed to fetch"

**Cause:** Problème réseau ou proxy CORS bloqué

**Solution:**
1. Vérifier votre connexion internet
2. Essayer un autre navigateur
3. Désactiver les extensions de blocage (AdBlock, Privacy Badger)

### Erreur: "CORS policy"

**Cause:** Politique CORS du navigateur

**Solution:** Les proxies sont censés contourner ça. Si l'erreur persiste:
- Vider le cache du navigateur (Ctrl+Shift+Delete)
- Essayer en navigation privée

### Erreur: "Container non trouvé"

**Cause:** L'ID du conteneur dans le HTML ne correspond pas

**Solution:** Vérifier dans [portfolio.html](portfolio.html):
```html
<div class="source-articles" id="articles-cert-fr">
```

L'ID doit être exactement `articles-cert-fr` (avec le tiret).

---

## 🎯 Test Final

Pour vérifier que tout fonctionne:

### 1. Recharger depuis zéro

```javascript
// Vider TOUT le cache
localStorage.clear();
sessionStorage.clear();

// Recharger
window.location.reload();
```

### 2. Attendre 30 secondes

Le chargement de 6 sources peut prendre du temps.

### 3. Vérifier la console

Vous devriez voir:
```
✅ Chargement terminé: 6 OK, 0 échecs
```

Ou au pire:
```
✅ Chargement terminé: 3 OK, 3 échecs
```

---

## 📞 Si Rien ne Marche

### Option 1: Mode Démo

Les articles de démonstration devraient au moins s'afficher avec des liens vers les sites.

### Option 2: Test Manuel

Ouvrir directement les URLs dans le navigateur:
- https://www.cert.ssi.gouv.fr/feed/
- https://www.ssi.gouv.fr/feed/
- https://www.cybermalveillance.gouv.fr/feed/

Si ces URLs ne fonctionnent pas, votre connexion internet bloque peut-être les flux RSS.

### Option 3: Consulter les Logs Détaillés

Activer le mode debug:
```javascript
localStorage.setItem('veille-debug', 'true');
window.location.reload();
```

---

## 📁 Fichiers Modifiés

- ✅ [js/veille.js](js/veille.js) - Version améliorée avec multi-proxy + timeout
- ✅ [test-veille.html](test-veille.html) - Page de test dédiée
- ✅ Ce fichier - Guide de debug

---

## ✨ Version Simplifiée (Si Tout Échoue)

Si vous voulez une version plus simple sans proxies, je peux créer une version qui:
1. Affiche juste des liens vers les sites
2. Utilise des données statiques
3. Ne dépend pas des proxies CORS

Dites-moi si vous voulez cette version de secours.

---

<div align="center">

**🔧 Guide de Dépannage Veille Technologique**

Portfolio BG TECH - Basma Guettouche

*Dernière mise à jour : 20 janvier 2026*

</div>
