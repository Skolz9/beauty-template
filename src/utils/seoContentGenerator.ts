import { siteConfig, ServiceItem, AreaItem, BlogPostItem } from "../config";

export interface PageSEOData {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage: string;
  ogType?: "website" | "article";
  keywords: string[];
  jsonLd: Record<string, unknown>[];
}

export function getBaseLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteConfig.siteUrl}/#beautysalon`,
    name: `${siteConfig.businessName} — ${siteConfig.businessSubname}`,
    description: siteConfig.heroDescription,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}${siteConfig.logo}`,
    image: `${siteConfig.siteUrl}${siteConfig.heroImage}`,
    telephone: `+${siteConfig.whatsappNumber}`,
    priceRange: "200 MAD - 950 MAD",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.openingHours
      .filter((d) => !d.closed)
      .map((d) => {
        const dayNamesEn = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayNamesEn[d.dayIndex],
          opens: d.open,
          closes: d.close,
        };
      }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "340",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [siteConfig.instagram, siteConfig.facebook, siteConfig.tiktok],
  };
}

export function buildServiceAreaContent(service: ServiceItem, area: AreaItem) {
  const h1 = `${service.name} près de ${area.name} à ${siteConfig.city}`;
  const subtitle = `Protocole dermo-esthétique sur-mesure à ${area.distanceMinutes} min de ${area.name} (${area.landmarks[0]}) — Dès ${service.priceFrom} MAD`;

  const leadParagraph = `Vous résidez ou séjournez dans le ${area.neighborhoodVibe} de ${area.name} (${area.nameAr}) et recherchez une adresse de confiance pour votre ${service.name.toLowerCase()} à ${siteConfig.city} ? Située à seulement ${area.distanceMinutes} minutes de ${area.landmarks.slice(0, 2).join(" et ")}, ${siteConfig.businessName} vous accueille dans un cadre 100% féminin, intimiste et équipé des dernières technologies esthétiques.`;

  const climateAndLocalSection = `${area.customSkinClimateNote} C'est pourquoi notre protocole de ${service.name} (${service.duration} minutes) est spécifiquement calibré pour répondre aux attentes des femmes de ${area.name} : ${service.longDescription}`;

  const accessParagraph = `${area.transportNote} Que vous veniez de ${area.landmarks.join(", ")}, vous bénéficiez d'une réservation prioritaire sur WhatsApp au ${siteConfig.phoneDisplay} sans attente sur place.`;

  // Generate 5 genuinely localized & service-specific FAQs
  const localizedFaqs = [
    {
      question: `Quel est le prix d'un ${service.name} pour les clientes de ${area.name} à ${siteConfig.city} ?`,
      answer: `Chez ${siteConfig.businessName} (à ${area.distanceMinutes} min de ${area.name}), la séance complète de ${service.name} d'une durée de ${service.duration} minutes débute à ${service.priceFrom} MAD. Pour votre première visite, bénéficiez de notre offre de bienvenue de ${siteConfig.announcementBar.badgeDiscount} sur réservation WhatsApp.`,
    },
    {
      question: `Combien de temps faut-il pour rejoindre la clinique depuis ${area.name} (${area.landmarks[0]}) ?`,
      answer: `Notre clinique située ${siteConfig.address} se trouve à environ ${area.distanceMinutes} minutes de ${area.name}. ${area.transportNote}`,
    },
    ...service.faqs.slice(1, 4),
    {
      question: `Comment réserver mon créneau de ${service.name} depuis ${area.name} ?`,
      answer: `Sélectionnez simplement « ${service.name} » et votre horaire préféré dans notre module de réservation en ligne ci-dessous, puis cliquez sur « Confirmer sur WhatsApp ». Notre équipe au ${siteConfig.phoneDisplay} valide votre rendez-vous immédiatement.`,
    },
  ];

  const combinedKeywords = [
    `${service.name.toLowerCase()} ${area.name} ${siteConfig.city}`,
    `${service.name.toLowerCase()} prix ${area.name}`,
    ...service.seoKeywords.fr,
    ...area.localKeywords.fr,
    ...service.seoKeywords.ar,
    ...area.localKeywords.ar,
  ];

  return {
    h1,
    subtitle,
    leadParagraph,
    climateAndLocalSection,
    accessParagraph,
    localizedFaqs,
    combinedKeywords,
  };
}

export function buildAreaPageContent(area: AreaItem) {
  const h1 = `Salon de Beauté & Clinique Esthétique près de ${area.name} (${siteConfig.city})`;
  const subtitle = `L'excellence des soins visage, laser, regard, onglerie et hammam privatif à ${area.distanceMinutes} minutes de ${area.name}`;

  const localizedFaqs = [
    {
      question: `Où se situe ${siteConfig.businessName} par rapport au quartier ${area.name} à ${siteConfig.city} ?`,
      answer: `Nous sommes installées au ${siteConfig.address}, à seulement ${area.distanceMinutes} minutes de ${area.name} (proche de ${area.landmarks.join(", ")}). ${area.transportNote}`,
    },
    {
      question: `Quels sont les soins les plus demandés par vos clientes de ${area.name} ?`,
      answer: `Les résidentes de ${area.name} plébiscitent particulièrement notre soin Hydrafacial Signature (650 MAD), l'Épilation Laser Diode indolore (dès 350 MAD), la Manucure Russe avec gainage BIAB (250 MAD) ainsi que notre Hammam Royal privatif (500 MAD).`,
    },
    {
      question: `Le salon est-il exclusivement réservé aux femmes ?`,
      answer: `Oui, l'ensemble de notre clinique esthétique, de l'espace coiffure aux cabines de soins et au hammam, est 100% réservé aux femmes, sans aucun vis-à-vis, garantissant intimité et sérénité aux femmes voilées comme non voilées.`,
    },
    {
      question: `Quels sont vos horaires d'ouverture pour prendre rendez-vous depuis ${area.name} ?`,
      answer: `Nous vous accueillons du lundi au samedi en horaire continu dès 09h30 et jusqu'à 19h30 ou 20h00 (fermé le dimanche). Vous pouvez réserver votre créneau 24h/24 via notre formulaire relié à WhatsApp (${siteConfig.phoneDisplay}).`,
    },
    {
      question: `Proposez-vous une remise pour une première visite ?`,
      answer: `Oui ! Toutes nos nouvelles clientes venant de ${area.name} et d'${siteConfig.city} profitent de ${siteConfig.announcementBar.badgeDiscount} sur leur premier soin sur simple réservation en ligne.`,
    },
  ];

  return {
    h1,
    subtitle,
    localizedFaqs,
  };
}

/**
 * Generates full list of all static routes to prerender at build time (71 routes)
 */
export function getAllStaticRoutes(): string[] {
  const routes: string[] = ["/", "/reservation", "/blog"];

  // 8 Service pages
  for (const s of siteConfig.services) {
    routes.push(`/soins/${s.slug}`);
  }

  // 6 Area pages
  for (const a of siteConfig.areas) {
    routes.push(`/salon-de-beaute/${a.slug}`);
  }

  // 8 x 6 = 48 Service x Area programmatic SEO pages
  for (const s of siteConfig.services) {
    for (const a of siteConfig.areas) {
      routes.push(`/soins/${s.slug}/${a.slug}`);
    }
  }

  // 6 Blog articles
  for (const post of siteConfig.blogPosts) {
    routes.push(`/blog/${post.slug}`);
  }

  return routes;
}
