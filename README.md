# Template Salon de Beauté & Clinique Esthétique (Maroc) — Vite + React + TypeScript + Prerender SEO

Ce template mobile-first avec **pré-rendu HTML statique au build (SSG)** est conçu pour les salons de beauté pour femmes et cliniques esthétiques au Maroc. Toute la configuration métier est centralisée dans **un seul fichier** : `src/config.ts`.

---

## Adapter le template pour une nouvelle cliente en 2 minutes (`src/config.ts`)

Ouvrez uniquement **`src/config.ts`** et modifiez les champs suivants :

1. **Identité & Localisation** :
   - `businessName` : Nom du salon ou de la clinique (ex. `"Maison Argana"`).
   - `tagline` / `taglineAr` : Slogan affiché au-dessus du titre principal.
   - `logo` : Chemin du logo dans `public/` (ex. `"/logo.svg"`).
   - `siteUrl` : URL finale de production (utilisée pour les balises `canonical`, Open Graph et `sitemap.xml`).
   - `city` / `address` / `geo` / `googleMapsLink` / `googleMapsEmbedUrl` : Ville, adresse complète, coordonnées GPS et lien Google Maps.

2. **Téléphone & WhatsApp (Source Unique)** :
   - `phoneDisplay` : Numéro formaté pour l'affichage (ex. `"06 33 22 67 14"`).
   - `whatsappNumber` : Numéro au format international **sans `+` ni espaces** (ex. `"212633226714"`).
   - *Règle d'or* : Ce numéro n'est écrit en dur nulle part ailleurs. Il alimente automatiquement la barre de navigation, le Hero, le formulaire de réservation (`wa.me`), le bouton flottant, la barre mobile, la section Contact, le Footer et le Schema.org `BeautySalon`.

3. **Horaires d'ouverture (`openingHours`)** :
   - Définissez les heures `open` et `close` par jour (`dayIndex` de `0` pour Dimanche à `6` pour Samedi) ou `closed: true`.
   - Le badge **« Prochain créneau disponible »** du Hero, le badge **« Ouvert / Fermé »** en direct de la section Contact, les jours désactivés sur le calendrier (14 prochains jours) et les créneaux horaires du formulaire sont calculés automatiquement.

4. **Prestations & Tarifs en MAD (`services`)** :
   - Chaque soin comporte : `slug`, `name`, `nameAr`, `shortDescription`, `longDescription`, `duration` (en minutes), `priceFrom` (en MAD), `image`, `benefits`, `processSteps`, `seoKeywords` (`fr` + `ar`) et `faqs`.

5. **Quartiers pour le SEO Local Programmatique (`areas`)** :
   - Listez les quartiers cibles de la ville (ex. pour Agadir : `founty-agadir`, `talborjt-agadir`, `hay-mohammadi-agadir`, `anza-agadir`, `cite-dakhla-agadir`, `sonaba-agadir`).
   - Le build génère automatiquement :
     - Toutes les pages `/soins/[service]` (8 pages)
     - Toutes les pages `/salon-de-beaute/[area]` (6 pages)
     - Toutes les pages croisées `/soins/[service]/[area]` (8 × 6 = 48 pages)
     - Les 6 articles de blog `/blog/[slug]` + `/blog` + `/reservation` + `/`
     - Soit **71 pages HTML statiques pré-rendues** avec `sitemap.xml` et `robots.txt`.

6. **Couleurs & Langue (`theme` & `language`)** :
   - Modifiez `theme.background` (`#F4EFEA`), `theme.primary` (`#1F3A33`), `theme.accent` (`#B8935A`) et `theme.card` (`#FFFFFF`).
   - Choisissez la langue par défaut `language: "fr"` ou `"ar"` (support RTL complet inclus).

---

## Commandes & Déploiement sur Vercel

```bash
# Développement local (port 3000)
npm run dev

# Build de production + Pré-rendu statique des 71 routes + génération de sitemap.xml & robots.txt
npm run build
```

### Déploiement zéro configuration sur Vercel
1. Poussez ce dépôt sur GitHub / GitLab.
2. Importez le projet sur **Vercel** : `vercel.json` configure automatiquement `npm run build` et publie le dossier `dist/` contenant toutes les pages HTML pré-rendues pour Google.
