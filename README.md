# Sunset Blue Villa — site vitrine

Vue 3 + Vite + Tailwind CSS v4.

```bash
npm install
npm run dev      # développement → http://localhost:5173
npm run build    # version production dans dist/
```

## Modifier le contenu

Tous les textes, chiffres, tarifs, équipements et avis sont dans **`src/data/villa.js`**.

## Ajouter les photos

1. Déposer les fichiers dans `public/images/` (ex. `public/images/piscine.jpg`).
2. Dans `src/data/villa.js`, renseigner le chemin dans le champ `src` :
   ```js
   { src: img('piscine.jpg'), alt: 'Piscine', wide: true }
   ```
Tant qu'un `src` est vide, un encart « Photo à venir » s'affiche à sa place.

Emplacements : photo principale (`hero`), 2 photos de présentation (`intro`), une par chambre (`rooms`), et la galerie (`gallery`, nombre libre ; `wide: true` = photo double largeur, cliquable en plein écran).

## Déploiement

Le site est publié automatiquement sur GitHub Pages à chaque `git push` sur `main`
(workflow `.github/workflows/deploy.yml`) : https://theogrosjean.github.io/SunsetBlue/

Conseil : photos en JPG/WebP, ~2000 px de large max pour le hero, ~1200 px pour le reste.

## Réservation Airbnb

Dans `src/data/villa.js`, renseigner l'adresse de l'annonce :
```js
export const airbnb = { listingUrl: 'https://www.airbnb.fr/rooms/12345678', ... }
```
Le sélecteur de dates ouvre alors l'annonce avec les dates et voyageurs pré-remplis (disponibilités et prix affichés par Airbnb), et la carte officielle de l'annonce s'affiche à côté.

## Carte

Remplacer l'encart « Carte à venir » dans `src/components/LocationSection.vue` par un `<iframe>` Google Maps.

## Formulaire de contact

Sans serveur, il ouvre la messagerie du visiteur avec la demande pré-remplie vers `villa.email`. Pour un envoi direct, brancher Formspree ou EmailJS dans `src/components/ContactSection.vue`.

## Charte graphique

Définie dans `src/style.css` (`@theme`) : or (`gold-*`), bleu roi (`ocean-*`), orange coucher de soleil (`sunset-*`), crème (`sand-*`). Polices : Great Vibes (script), Cormorant Garamond (titres), Montserrat (texte).
