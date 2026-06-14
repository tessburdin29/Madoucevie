# Ma Douce Vie — Site vitrine

Landing page immersive et vendeuse pour le carnet **Ma Douce Vie**
(carnet de bien-être, d'introspection & de voyage), avec redirection
vers la fiche produit Amazon.

## ✨ Ce que contient le site

- **Hero** plein écran avec mockup du carnet et accroche émotionnelle
- **Fond aurora animé** (dégradés fuchsia · beige · jaune · bleu lagon)
- **Bandeau de mots-clés défilants** (SEO émotionnel)
- Sections : concept, contenu du carnet, aperçu des pages réelles,
  « pourquoi maintenant » avec **compteurs animés**, ce que tu reçois,
  **avis clientes**, appel à l'action final, **FAQ**
- **Bouton d'achat flottant** + barre de progression de lecture
- Révélations au scroll, micro-animations, **100 % responsive**

## 🔗 Changer le lien Amazon

Le lien produit est défini **à un seul endroit** :

`assets/js/main.js` → constante `AMAZON_URL` (tout en haut).

```js
const AMAZON_URL = "https://amzn.eu/d/0axtAiyB";
```

Tous les boutons « commander » pointent automatiquement vers cette adresse.

## 💌 Newsletter (capture email)

La section newsletter fonctionne déjà (validation + message de succès).
Pour **recevoir réellement les emails**, renseigne ton service d'emailing
dans `assets/js/main.js` → constante `NEWSLETTER_ENDPOINT` :

```js
// Exemple avec Formspree (gratuit) :
const NEWSLETTER_ENDPOINT = "https://formspree.io/f/xxxxxx";
```

Tant que la valeur reste vide, le formulaire affiche un remerciement
sans rien envoyer (parfait pour tester l'affichage).

## 🖼️ Images

Les visuels sont dans `assets/img/` :

| Fichier | Usage |
|---|---|
| `book-3d.png` | Mockup principal (hero) |
| `recois.png` | Section « Ce que tu reçois » |
| `features-fleur.jpeg` | Atouts du carnet |
| `page-meteo.jpeg`, `page-film.jpeg`, `page-mandala.jpeg` | Aperçu des pages |
| `cover.png`, `soin.png` | Visuels complémentaires |

Pour remplacer une image, dépose un fichier du même nom dans `assets/img/`.

## 🚀 Mettre le site en ligne

C'est un site **statique** (HTML/CSS/JS, aucune dépendance, aucun build).

**Tester en local :** ouvre simplement `index.html` dans ton navigateur.

**Publier gratuitement**, au choix :

- **Netlify** : glisse-dépose le dossier sur https://app.netlify.com/drop
- **Vercel** : `vercel` à la racine du projet
- **GitHub Pages (automatique)** : un workflow est déjà prêt
  (`.github/workflows/deploy.yml`). Active-le une seule fois :
  **Settings → Pages → Source : GitHub Actions**. À chaque push, le site
  est republié automatiquement.

## 📁 Structure

```
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/…
└── README.md
```

---

© Ma Douce Vie · ImparableStore
