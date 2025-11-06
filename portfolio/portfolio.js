jQuery(".share-toggle").click(function () {
            jQuery(".listing").fadeToggle(600);
        });



/* ======= Index des pages à chercher ======= */
/* AJOUTE/EDITE ici si tu crées d'autres pages */
const PAGES = [
  { title: "Accueil",        path: "index.html",                 tags: ["home","accueil"] },
  { title: "Portfolio",      path: "portfolio.html",             tags: ["portfolio","projets"] },
  { title: "BTS SIO",        path: "bts/bts.html",               tags: ["bts","sio","sisr","ecole"] },
  { title: "Entreprise",     path: "entreprise/entreprise.html", tags: ["entreprise","stage","alternance"] },
  { title: "Épreuve E5",     path: "five/five.html",             tags: ["e5","projet","examen","épreuve"] },
  { title: "Documentation",  path: "doc/docs.html",              tags: ["doc","documentation","tutoriels"] },
  { title: "Veille techno",  path: "veille/veille.html",         tags: ["veille","technologie","news"] },
];

/* ======= Elements ======= */
const openBtn   = document.getElementById('openSearch');
const overlay   = document.getElementById('searchOverlay');
const closeBtn  = document.getElementById('closeSearch');
const input     = document.getElementById('searchInput');
const resultsEl = document.getElementById('searchResults');

/* ======= Open / Close ======= */
function openSearch() {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  input.value = '';
  renderResults([]);
  setTimeout(() => input.focus(), 10);
}
function closeSearch() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  input.blur();
}
openBtn?.addEventListener('click', openSearch);
closeBtn?.addEventListener('click', closeSearch);
overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

/* ======= Recherche ======= */
function normalize(s){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }

function scorePage(page, terms){
  const hay = normalize(page.title + ' ' + page.path + ' ' + (page.tags||[]).join(' '));
  let score = 0;
  for(const t of terms){
    const idx = hay.indexOf(t);
    if (idx === -1) return -1;      // terme absent → exclu
    score += Math.max(1, 100 - idx); // bonus si le match est tôt
  }
  return score;
}

function highlight(text, terms){
  let out = text;
  terms.forEach(t=>{
    if(!t) return;
    const re = new RegExp('('+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');
    out = out.replace(re,'<mark>$1</mark>');
  });
  return out;
}

function search(q){
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PAGES
    .map(p => ({...p, _score: scorePage(p, terms)}))
    .filter(p => p._score >= 0)
    .sort((a,b)=> b._score - a._score)
    .slice(0, 20);
}

function renderResults(items){
  resultsEl.innerHTML = '';
  if (!items.length) return;
  const q = input.value.trim();
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  items.forEach((p,i)=>{
    const li = document.createElement('li');
    li.setAttribute('role','option');
    li.dataset.index = i;
    li.innerHTML = `
      <span class="title">${highlight(p.title, terms)}</span>
      <span class="path">${p.path}</span>
    `;
    li.addEventListener('click', ()=> { window.location.href = p.path; });
    resultsEl.appendChild(li);
  });
}

/* saisie + résultats */
let activeIndex = -1;
input.addEventListener('input', ()=>{
  activeIndex = -1;
  renderResults(search(input.value));
});

/* Navigation clavier dans la liste */
document.addEventListener('keydown', (e)=>{
  if (!overlay.classList.contains('open')) return;
  const items = Array.from(resultsEl.querySelectorAll('li'));
  if (e.key === 'ArrowDown'){
    e.preventDefault();
    if (!items.length) return;
    activeIndex = (activeIndex + 1) % items.length;
  } else if (e.key === 'ArrowUp'){
    e.preventDefault();
    if (!items.length) return;
    activeIndex = (activeIndex - 1 + items.length) % items.length;
  } else if (e.key === 'Enter'){
    if (activeIndex >= 0 && items[activeIndex]){
      items[activeIndex].click();
    }
  } else {
    return;
  }
  items.forEach((el,i)=> el.classList.toggle('active', i===activeIndex));
});

