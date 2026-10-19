// ─────────────────────────────────────────────────────────────
//  Contenu du site — tout ce qui est modifiable est ici.
//
//  PHOTOS : déposez vos fichiers dans /public/images/ puis
//  renseignez le chemin dans le champ `src` correspondant,
//  ex. src: img('piscine.jpg').
//  Tant que `src` est vide, un encart « Photo à venir » s'affiche.
//  `position` (optionnel) règle le cadrage, ex. '60% center'.
// ─────────────────────────────────────────────────────────────

// Chemin vers /public/images/ (fonctionne aussi quand le site est dans un sous-dossier)
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`

export const villa = {
  name: 'Sunset Blue Villa',
  tagline: 'Là où l’océan rencontre le coucher du soleil',
  location: 'Votre ville, Votre région', // TODO
  email: 'contact@sunsetbluevilla.com', // TODO
  phone: '+33 6 00 00 00 00', // TODO
  instagram: '', // TODO ex. 'https://instagram.com/sunsetbluevilla'
}

// Animation de chargement : 'sunset' | 'signature' | 'logo' | 'rideau' | '' (aucune)
// Pour tester sans modifier ce fichier : ajouter ?loader=signature à l'adresse.
export const loader = 'sunset'

export const hero = {
  image: { src: img('piscine.jpg'), alt: 'Vue de la piscine et de l’océan au coucher du soleil' },
}

export const intro = {
  title: 'Une parenthèse hors du temps',
  paragraphs: [
    'Perchée face à l’océan, Sunset Blue Villa offre un cadre d’exception pour vos séjours en famille ou entre amis. Sa terrasse en bois exotique, sa piscine à débordement et ses palmiers composent un décor pensé pour la détente.',
    'Chaque soir, le soleil plonge dans l’océan juste devant vous : un spectacle qui a donné son nom à la villa et que vous savourerez depuis les transats ou la pergola.',
  ],
  images: [
    { src: img('coucher-de-soleil.jpg'), alt: 'Coucher de soleil depuis la terrasse', position: '60% center' },
    { src: '', alt: 'Salon intérieur' },
  ],
}

export const stats = [
  { value: '4', label: 'Chambres' },
  { value: '8', label: 'Voyageurs' },
  { value: '3', label: 'Salles de bain' },
  { value: '180', label: 'm² habitables' },
]

// Icônes disponibles : pool, wave, wifi, snow, kitchen, parking, sun, bbq, tv, washer
export const amenities = [
  { icon: 'pool', title: 'Piscine privée', text: 'Bassin chauffé avec plage immergée et transats.' },
  { icon: 'wave', title: 'Vue océan', text: 'Panorama sur la mer depuis la terrasse et les chambres.' },
  { icon: 'sun', title: 'Pergola & terrasse', text: 'Grand deck en bois exotique, salon d’extérieur ombragé.' },
  { icon: 'kitchen', title: 'Cuisine équipée', text: 'Four, plaques, lave-vaisselle, machine à café.' },
  { icon: 'snow', title: 'Climatisation', text: 'Dans toutes les chambres et les pièces de vie.' },
  { icon: 'wifi', title: 'Wi-Fi haut débit', text: 'Fibre optique pour rester connecté si besoin.' },
  { icon: 'bbq', title: 'Barbecue', text: 'Espace grillades face au coucher du soleil.' },
  { icon: 'parking', title: 'Parking privé', text: 'Stationnement sécurisé pour plusieurs véhicules.' },
]

export const rooms = [
  {
    name: 'Suite Océan',
    details: 'Lit king size · Salle de bain privative · Vue mer',
    image: { src: '', alt: 'Suite Océan' },
  },
  {
    name: 'Chambre Coucher de Soleil',
    details: 'Lit queen size · Accès terrasse',
    image: { src: '', alt: 'Chambre Coucher de Soleil' },
  },
  {
    name: 'Chambre Palmiers',
    details: 'Deux lits simples · Vue jardin tropical',
    image: { src: '', alt: 'Chambre Palmiers' },
  },
]

// Galerie : ajoutez autant de photos que vous voulez.
// `wide: true` = photo plus large dans la grille.
export const gallery = [
  { src: img('piscine.jpg'), alt: 'La piscine face à l’océan', wide: true },
  { src: img('coucher-de-soleil.jpg'), alt: 'Coucher de soleil sur la terrasse', position: '60% center' },
  { src: '', alt: 'Salon' },
  { src: '', alt: 'Cuisine' },
  { src: '', alt: 'Chambre principale', wide: true },
  { src: '', alt: 'Salle de bain' },
  { src: '', alt: 'Jardin tropical', wide: true },
  { src: '', alt: 'Terrasse de nuit', wide: true },
]

export const surroundings = [
  { distance: '5 min', label: 'Plage la plus proche' },
  { distance: '10 min', label: 'Commerces & restaurants' },
  { distance: '25 min', label: 'Aéroport' },
  { distance: '15 min', label: 'Randonnées & sentiers' },
]

// Réservation Airbnb : collez l'adresse de l'annonce, ex.
// 'https://www.airbnb.fr/rooms/12345678'
export const airbnb = {
  listingUrl: '', // TODO
  maxGuests: 8,
  minNights: 3,
  note: 'Réservation et paiement sécurisés via Airbnb.',
}

export const reviews = [
  {
    quote: 'Un endroit magique. Les couchers de soleil depuis la piscine sont inoubliables, et la villa est encore plus belle qu’en photo.',
    author: 'Camille & Thomas',
    origin: 'Lyon',
  },
  {
    quote: 'Tout était parfait : propreté, équipements, accueil. Nous avons déjà réservé pour l’année prochaine !',
    author: 'Famille Martin',
    origin: 'Bruxelles',
  },
  {
    quote: 'La vue est à couper le souffle. Idéal pour se ressourcer en toute intimité.',
    author: 'Sophie',
    origin: 'Paris',
  },
]
