export interface DaySchedule {
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayNameFr: string;
  dayNameAr: string;
  closed: boolean;
  open: string; // "09:30"
  close: string; // "20:00"
}

export interface ServiceItem {
  slug: string;
  name: string;
  nameAr: string;
  category: string;
  iconKey: 'sparkles' | 'droplet' | 'eye' | 'feather' | 'hand' | 'zap' | 'wind' | 'flame';
  shortDescription: string;
  shortDescriptionAr: string;
  longDescription: string;
  longDescriptionAr: string;
  duration: number; // minutes
  priceFrom: number; // MAD
  image: string;
  benefits: string[];
  processSteps: { title: string; detail: string }[];
  idealFor: string;
  seoKeywords: {
    fr: string[];
    ar: string[];
  };
  faqs: { question: string; answer: string }[];
}

export interface AreaItem {
  slug: string; // e.g., "founty-agadir"
  shortSlug: string; // e.g., "founty"
  name: string;
  nameAr: string;
  distanceMinutes: number;
  landmarks: string[];
  transportNote: string;
  neighborhoodVibe: string;
  customIntro: string;
  customSkinClimateNote: string;
  localKeywords: {
    fr: string[];
    ar: string[];
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleAr: string;
  specialty: string;
  experienceYears: number;
  photo: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'Soins Visage' | 'Regard & Sourcils' | 'Onglerie & Mains' | 'Clinique & Spa';
  caption: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  neighborhood: string;
  service: string;
  text: string;
  rating: number;
  source: string;
  date: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  labelAr: string;
  sublabel: string;
  iconKey: 'award' | 'users' | 'cpu' | 'star' | 'shield';
}

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTimeMinutes: number;
  category: string;
  image: string;
  author: string;
  relatedServiceSlugs: string[];
  relatedAreaSlugs: string[];
  seoKeywords: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  faqs: { question: string; answer: string }[];
}

export const siteConfig = {
  businessName: "Maison Argana",
  businessSubname: "Beauté & Clinique Esthétique",
  tagline: "Sublimez, Révélez, Rayonnez",
  taglineAr: "تألقي، اكشفي عن جمالك الطبيعي، وأشرقي",
  heroTitlePrefix: "Révélez votre",
  heroTitleHighlight: "beauté naturelle",
  heroTitleAr: "اكشفي عن جمالك الطبيعي في أكادير",
  heroDescription:
    "Votre sanctuaire exclusivement féminin à Agadir dédié aux soins esthétiques de pointe, à l'éclat de la peau et aux rituels de bien-être sur-mesure.",
  heroDescriptionAr:
    "وجهتك النسائية الفاخرة في أكادير للعناية بالبشرة، الهيدرافيشل، إزالة الشعر بالليزر وطقوس الحمام المغربي الأصيل.",
  logo: "/logo.svg",
  siteUrl: "https://maison-argana-agadir.vercel.app",
  city: "Agadir",
  cityAr: "أكادير",
  region: "Souss-Massa",
  country: "MA",
  address: "Boulevard Mohamed V, Résidence Jardins de Founty, Imm. B, Agadir 80000",
  postalCode: "80000",
  geo: {
    latitude: 30.4069,
    longitude: -9.5892,
  },
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Founty+Agadir+Maroc",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Founty,Agadir,Morocco&hl=fr&z=14&output=embed",
  instagram: "https://instagram.com/maisonargana.agadir",
  facebook: "https://facebook.com/maisonargana.agadir",
  tiktok: "https://tiktok.com/@maisonargana.agadir",

  // SINGLE SOURCE OF TRUTH FOR PHONE & WHATSAPP
  phoneDisplay: "06 33 22 67 14",
  whatsappNumber: "212633226714", // International format, no plus or spaces

  language: "fr" as "fr" | "ar",
  supportedLanguages: ["fr", "ar"] as const,

  announcementBar: {
    textFr: "Nouvelles clientes : -10% sur le premier soin — Réservation rapide sur WhatsApp",
    textAr: "زبوناتنا الجديدات: تخفيض -10% على أول حصة عناية — حجز سريع عبر واتساب",
    badgeDiscount: "-10%",
    badgeLabel: "Premier soin",
    badgeSublabel: "Nouvelles clientes",
  },

  theme: {
    background: "#F4EFEA",
    primary: "#1F3A33",
    accent: "#B8935A",
    card: "#FFFFFF",
    textDark: "#182622",
    textMuted: "#5A6B65",
  },

  heroImage: "/images/hero-glowing-skin.jpg",
  aboutImage: "/images/salon-interior-about.jpg",
  bookingImage: "/images/treatment-laser-hammam.jpg",

  trustPillars: [
    {
      title: "Équipe qualifiée",
      subtitle: "Praticiennes diplômées & formées aux protocoles internationaux",
      iconKey: "user-check",
    },
    {
      title: "Produits premium",
      subtitle: "Actifs dermo-cosmétiques certifiés & huiles d'argan pures",
      iconKey: "sparkles",
    },
    {
      title: "Hygiène irréprochable",
      subtitle: "Stérilisation médicale autoclave & consommables à usage unique",
      iconKey: "shield-check",
    },
    {
      title: "Cliente avant tout",
      subtitle: "Diagnostic personnalisé & espace 100% intimité féminine",
      iconKey: "heart",
    },
  ],

  openingHours: [
    { dayIndex: 1, dayNameFr: "Lundi", dayNameAr: "الإثنين", closed: false, open: "09:30", close: "19:30" },
    { dayIndex: 2, dayNameFr: "Mardi", dayNameAr: "الثلاثاء", closed: false, open: "09:30", close: "19:30" },
    { dayIndex: 3, dayNameFr: "Mercredi", dayNameAr: "الأربعاء", closed: false, open: "09:30", close: "19:30" },
    { dayIndex: 4, dayNameFr: "Jeudi", dayNameAr: "الخميس", closed: false, open: "09:30", close: "20:00" },
    { dayIndex: 5, dayNameFr: "Vendredi", dayNameAr: "الجمعة", closed: false, open: "10:00", close: "20:00" },
    { dayIndex: 6, dayNameFr: "Samedi", dayNameAr: "السبت", closed: false, open: "09:30", close: "20:00" },
    { dayIndex: 0, dayNameFr: "Dimanche", dayNameAr: "الأحد", closed: true, open: "00:00", close: "00:00" },
  ] as DaySchedule[],

  services: [
    {
      slug: "hydrafacial",
      name: "Hydrafacial",
      nameAr: "هيدرافيشل الطبي للوجه",
      category: "Visage & Éclat",
      iconKey: "droplet",
      shortDescription: "Nettoyage profond par hydro-dermabrasion, extraction douce et infusion d'antioxydants.",
      shortDescriptionAr: "تنظيف عميق للبشرة وتقشير مائي مع ترطيب فوري وإشراقة طبيعية.",
      longDescription:
        "Le soin Hydrafacial Signature chez Maison Argana combine un nettoyage en profondeur, une exfoliation douce aux acides de fruits, une extraction par aspiration indolore des comédons et une infusion de sérums concentrés en acide hyaluronique, peptides et antioxydants. Idéal face au soleil et à l'air marin d'Agadir, il redonne un effet « glass skin » immédiat sans aucune éviction sociale.",
      longDescriptionAr:
        "يجمع علاج الهيدرافيشل في ميزون أركانة بين التنظيف العميق، التقشير اللطيف، إزالة الرؤوس السوداء بدون ألم، وضخ سيرومات غنية بحمض الهيالورونيك ومضادات الأكسدة لمنح بشرتك إشراقة فورية.",
      duration: 60,
      priceFrom: 650,
      image: "/images/treatment-hydrafacial.jpg",
      benefits: [
        "Teint lumineux et pores visiblement resserrés dès la première séance",
        "Extraction indolore des points noirs et sébum excédentaire",
        "Hydratation intense à l'acide hyaluronique de bas poids moléculaire",
        "Zéro rougeur persistante : maquillage possible le jour même",
      ],
      processSteps: [
        { title: "01. Diagnostic & Nettoyage Vortex", detail: "Analyse de votre grain de peau sous lampe loupe et démaquillage enzymatique suivi d'un balayage hydro-exfoliant." },
        { title: "02. Peeling Doux & Extraction", detail: "Application d'une solution d'acide glycolique et salicylique doux pour déloger les impuretés aspirées sans douleur." },
        { title: "03. Infusion & Photomodulation LED", detail: "Saturation dermique en peptides antioxydants suivie de 15 minutes de lumière LED régénérante." },
      ],
      idealFor: "Peaux ternes, déshydratées par le soleil d'Agadir, pores dilatés, ridules de déshydratation.",
      seoKeywords: {
        fr: ["hydrafacial prix Agadir", "soin hydrafacial Agadir", "nettoyage de peau dermatologique Agadir", "hydrafacial Founty Agadir"],
        ar: ["هيدرافيشل أكادير", "ثمن هيدرافيشل في أكادير", "تنظيف البشرة العميق أكادير"],
      },
      faqs: [
        {
          question: "Quel est le prix d'un soin Hydrafacial à Agadir chez Maison Argana ?",
          answer: "Notre protocole complet Hydrafacial Signature (60 minutes incluant le peeling doux, l'extraction Vortex, les boosters d'acide hyaluronique et la séance de LED) est proposé dès 650 MAD. Les nouvelles clientes bénéficient de -10% sur leur premier rendez-vous.",
        },
        {
          question: "À quelle fréquence faut-il faire un Hydrafacial ?",
          answer: "Pour maintenir un éclat optimal et des pores nets sous le climat ensoleillé d'Agadir, nous recommandons une séance toutes les 4 à 6 semaines, ou avant un événement important (mariage, fête, vacances).",
        },
        {
          question: "Le soin Hydrafacial convient-il aux peaux sensibles ?",
          answer: "Absolument. La puissance d'aspiration et la concentration des sérums sont ajustées sur-mesure par notre esthéticienne diplômée selon la réactivité de votre peau.",
        },
        {
          question: "Y a-t-il des rougeurs après la séance ?",
          answer: "Non, contrairement aux nettoyages manuels classiques, l'extraction sous vide couplée à la photothérapie LED apaise immédiatement l'épiderme. Vous sortez du salon avec un teint frais et lumineux.",
        },
      ],
    },
    {
      slug: "soin-du-visage",
      name: "Soin du visage",
      nameAr: "عناية متكاملة بالوجه",
      category: "Visage & Anti-Âge",
      iconKey: "sparkles",
      shortDescription: "Protocole dermo-esthétique sur-mesure pour purifier, repulper et illuminer votre teint.",
      shortDescriptionAr: "بروتوكول مخصص لتنقية البشرة، شد الوجه ومنحه نضارة فائقة.",
      longDescription:
        "Chaque peau possède ses propres besoins. Notre Soin du Visage Haute Précision débute par un bilan cutané approfondi afin de composer un rituel sur-mesure : vapozone à l'ozone doux, gommage enzymatique, modelage liftant Kobido du visage et du décolleté à l'élixir d'argan bio et masque alginate cryo-raffermissant.",
      longDescriptionAr:
        "تبدأ حصة العناية بالوجه بتشخيص دقيق لنوع بشرتك، يليها بخار الأوزون اللطيف، تقشير إنزيمي، مساج ياباني لشد عضلات الوجه وقناع غني بذهب الأركان الطبيعي.",
      duration: 75,
      priceFrom: 450,
      image: "/images/hero-glowing-skin.jpg",
      benefits: [
        "Bilan cutané personnalisé inclus avant chaque séance",
        "Massage facial liftant inspiré du Kobido pour détendre les traits",
        "Oxygénation cellulaire et réduction des taches pigmentaires",
        "Actifs nobles adaptés aux peaux sèches, mixtes ou matures",
      ],
      processSteps: [
        { title: "01. Bilan Cutané & Bain de Vapeur Doux", detail: "Évaluation de l'hydratation et ouverture délicate des pores à la vapeur d'eau florale de rose de Kelaat M'Gouna." },
        { title: "02. Purification & Massage Sculptant", detail: "Exfoliation enzymatique et 25 minutes de manoeuvres drainantes et liftantes sur l'ovale du visage." },
        { title: "03. Masque Haute Nutrition & Protection SPF50", detail: "Pose d'un masque biocellulose collagène suivi d'une protection solaire invisible." },
      ],
      idealFor: "Fatigue cutanée, relâchement de l'ovale, taches de soleil, besoin de détente absolue.",
      seoKeywords: {
        fr: ["soin du visage Agadir", "nettoyage de peau femme Agadir", "soin anti-âge Agadir", "institut de beauté soin visage Agadir"],
        ar: ["تنظيف البشرة في أكادير", "عناية بالوجه أكادير", "صالون تجميل للنساء أكادير"],
      },
      faqs: [
        {
          question: "Quelle est la différence entre le Soin du Visage classique et l'Hydrafacial ?",
          answer: "Le Soin du Visage sur-mesure (75 min, dès 450 MAD) privilégie le travail manuel expert, la vapeur douce et un long massage liftant Kobido de 25 minutes, tandis que l'Hydrafacial utilise une technologie médicale d'hydro-dermabrasion par aspiration.",
        },
        {
          question: "Quels produits utilisez-vous pour les soins du visage ?",
          answer: "Nous utilisons exclusivement des gammes dermo-cosmétiques professionnelles sans parabènes ni silicones occlusifs, associées à des extraits purs d'argan et de figue de barbarie certifiés bio du Souss.",
        },
        {
          question: "Puis-je réserver ce soin si j'ai de l'acné ou des taches brunes ?",
          answer: "Oui, nous adaptons les actifs : niacinamide et zinc pour les peaux à imperfections, ou vitamine C stabilisée et acide azélaïque pour les taches pigmentaires.",
        },
        {
          question: "Combien de temps dure la séance ?",
          answer: "Comptez 1h15 de prise en charge complète en cabine privée climatisée et apaisante.",
        },
      ],
    },
    {
      slug: "restructuration-des-sourcils",
      name: "Restructuration des sourcils",
      nameAr: "تصميم ورفع الحواجب",
      category: "Regard & Sourcils",
      iconKey: "eye",
      shortDescription: "Architecture géométrique au fil ou à la pince, Brow Lift kératine et teinture hybride.",
      shortDescriptionAr: "رسم هندسي للحواجب بالخيط أو الملقط مع برو ليفت بالكيراتين وصبغة طبيعية.",
      longDescription:
        "Sublimez l'intensité de votre regard grâce à notre Restructuration Architecturale des Sourcils. Par la technique du nombre d'or (mapping au fil), nous redessinons une ligne parfaitement harmonieuse avec la morphologie de votre visage, complétée au choix par un Brow Lift disciplinant à la kératine et une teinture végétale longue tenue.",
      longDescriptionAr:
        "ابرزي جمال عينيك من خلال تصميم الحواجب الهندسي المناسب لتقاسيم وجهك، مع إمكانية إضافة تقنية رفع الحواجب بالكيراتين المغذي والصبغة النباتية.",
      duration: 45,
      priceFrom: 200,
      image: "/images/treatment-brows-lashes.jpg",
      benefits: [
        "Tracé sur-mesure respectant l'épaisseur naturelle de vos sourcils",
        "Épilation haute précision au fil de coton bio ou à la pince stérilisée",
        "Option Brow Lift à la kératine pour gainer et étoffer les sourcils",
        "Effet liftant immédiat sur les paupières et le regard",
      ],
      processSteps: [
        { title: "01. Brow Mapping Morphologique", detail: "Mesure précise des points d'équilibre de votre regard et validation du tracé au crayon poudré avec vous." },
        { title: "02. Restructuration Douce & Brow Lift", detail: "Épilation minutieuse au fil ou à la cire tiède hypoallergénique et application du soin fixateur à la kératine." },
        { title: "03. Teinture Hybride & Soin au Ricin", detail: "Pigmentation sur-mesure et application d'un sérum fortifiant à l'huile de ricin et peptides." },
      ],
      idealFor: "Sourcils asymétriques, clairsemés, indisciplinés ou regard manquant d'expression.",
      seoKeywords: {
        fr: ["restructuration sourcils Agadir", "brow lift Agadir prix", "épilation au fil sourcils Agadir", "teinture sourcils Agadir"],
        ar: ["تصميم الحواجب أكادير", "برو ليفت أكادير", "رسم الحواجب بالخيط أكادير"],
      },
      faqs: [
        {
          question: "Combien de temps dure le résultat d'un Brow Lift ?",
          answer: "Le Brow Lift à la kératine maintient vos sourcils galbés, fournis et faciles à coiffer pendant 5 à 7 semaines sans abîmer le poil.",
        },
        {
          question: "Réalisez-vous l'épilation au fil à Agadir ?",
          answer: "Oui, nos techniciennes maîtrisent parfaitement l'épilation indienne au fil de coton antibactérien, idéale pour définir une ligne nette sans irriter les peaux sensibles.",
        },
        {
          question: "La teinture des sourcils fait-elle un effet trop foncé ?",
          answer: "Jamais. Nous travaillons avec des pigments hybrides que nous mélangeons sur-mesure selon votre carnation et la couleur de vos cheveux pour un rendu poudré très naturel.",
        },
        {
          question: "Puis-je combiner sourcils et extensions de cils dans le même rendez-vous ?",
          answer: "Tout à fait, c'est même notre duo Regard le plus demandé. Indiquez-le simplement dans les notes de votre réservation WhatsApp.",
        },
      ],
    },
    {
      slug: "extensions-de-cils",
      name: "Extensions de cils",
      nameAr: "تركيب ورفع الرموش",
      category: "Regard & Sourcils",
      iconKey: "feather",
      shortDescription: "Pose cil à cil soyeuse, volume russe léger ou rehaussement Lash Lift à la kératine.",
      shortDescriptionAr: "تركيب رموش شعره بشعره، فوليوم روسي ناعم أو رفع الرموش الطبيعي بالكيراتين.",
      longDescription:
        "Dites adieu au mascara qui coule à la plage ou à la piscine. Nos techniciennes certifiées réalisent votre pose d'extensions de cils en fibre de soie ultra-légère (Pose Cil à Cil naturelle, Pose Mixte ou Volume Russe aérien) ainsi que le Rehaussement de Cils (Lash Lift + Botox) dans le respect absolu de vos cils naturels.",
      longDescriptionAr:
        "استمتعي بنظرة ساحرة بدون ماسكارا مع تركيب الرموش الحريرية الخفيفة (كلاسيك أو فوليوم ناعم) أو رفع الرموش الطبيعي المعزز بالكيراتين والفيتامينات.",
      duration: 90,
      priceFrom: 400,
      image: "/images/treatment-brows-lashes.jpg",
      benefits: [
        "Fibres de cachemire et soie ultra-légères imperceptibles sur les yeux",
        "Colle médicale hypoallergénique sans vapeurs irritantes",
        "Courbure, longueur et densité adaptées à la forme de vos yeux",
        "Tenue longue durée (4 à 5 semaines) résistante à l'eau et à la chaleur",
      ],
      processSteps: [
        { title: "01. Consultation Regard & Choix du Style", detail: "Sélection de la courbure (C, CC, D) et de la longueur (8 à 13 mm) pour un effet oeil de biche ou naturel sophistiqué." },
        { title: "02. Pose Isolée Cil par Cil", detail: "Application minutieuse sur chaque cil adulte isolé, les yeux fermés sur des patchs hydrogel au collagène." },
        { title: "03. Brume Nano-Mister & Conseils d'Entretien", detail: "Polymérisation douce à la brume d'eau et remise de votre goupillon de brossage offert." },
      ],
      idealFor: "Femmes actives souhaitant un regard intense dès le réveil, mariées, vacances balnéaires.",
      seoKeywords: {
        fr: ["extension de cils Agadir prix", "pose cil à cil Agadir", "rehaussement de cils Agadir", "volume russe cils Agadir"],
        ar: ["تركيب الرموش في أكادير", "ثمن تركيب الرموش أكادير", "لاش ليفت أكادير"],
      },
      faqs: [
        {
          question: "Quel est le tarif d'une pose d'extensions de cils à Agadir ?",
          answer: "Nos poses débutent à 400 MAD pour le Rehaussement Lash Lift + Kératine ou la pose Cil à Cil découverte, et jusqu'à 550 MAD pour un Volume Russe soyeux sur-mesure.",
        },
        {
          question: "Les extensions abîment-elles les cils naturels ?",
          answer: "Non, lorsque l'isolation cil par cil est respectée et que le poids de l'extension est adapté à votre cil naturel, le cycle de pousse n'est aucunement altéré.",
        },
        {
          question: "Combien de temps dure la séance de pose complète ?",
          answer: "Prévoyez environ 1h30 d'allongement confortable sur notre matelas ergonomique chauffant ou climatisé, bercée par une ambiance sonore relaxante.",
        },
        {
          question: "Proposez-vous le remplissage à 3 semaines ?",
          answer: "Oui, nous assurons les retouches de remplissage à 2 ou 3 semaines à tarif préférentiel pour garder une frange toujours impeccable.",
        },
      ],
    },
    {
      slug: "manucure-et-pose-gel",
      name: "Manucure et pose gel",
      nameAr: "مانيكير وجيل الأظافر",
      category: "Onglerie & Mains",
      iconKey: "hand",
      shortDescription: "Manucure russe de précision, gainage BIAB sur ongles naturels et vernis gel permanent.",
      shortDescriptionAr: "مانيكير روسي دقيق، تقوية الأظافر الطبيعية بالبياب (BIAB) وطلاء جيل دائم.",
      longDescription:
        "Des mains élégantes et soignées jusqu'au bout des ongles. Notre pôle onglerie pratique la Manucure Russe douce pour un contour des cuticules net et durable, associée au gainage BIAB (Builder In A Bottle) ou à la pose de Gel Chablon haute résistance, dans une palette de teintes nude lactées, French intemporelle ou couleurs vibrantes.",
      longDescriptionAr:
        "احصلي على أظافر أنيقة ومرتبة مع تقنية المانيكير الروسي الاحترافي وتقوية الأظافر الطبيعية بالجيل أو البياب بألوان نود راقية وأدوات معقمة طبيا.",
      duration: 60,
      priceFrom: 250,
      image: "/images/treatment-manicure-gel.jpg",
      benefits: [
        "Stérilisation hospitalière en sachets scellés de chaque embout et pince",
        "Gainage BIAB fortifiant qui protège et fait pousser vos ongles naturels",
        "Finition ultra-fine et bombé naturel sans épaisseur artificielle",
        "Brillance miroir impeccable pendant 3 à 4 semaines sans écailles",
      ],
      processSteps: [
        { title: "01. Préparation & Manucure Russe Douce", detail: "Travail délicat des cuticules à la ponceuse micromoteur et aux ciseaux de précision stérilisés." },
        { title: "02. Gainage BIAB ou Construction Gel", detail: "Renforcement structurel de la plaque de l'ongle pour une solidité parfaite et un galbe élégant." },
        { title: "03. Couleur Sous-Cuticule & Rituel Hydratant", detail: "Application précise de la couleur sous la cuticule, top coat diamant et massage des mains à l'huile d'argan." },
      ],
      idealFor: "Ongles cassants, mous ou rongés, mariées, femmes recherchant une manucure nette pendant un mois.",
      seoKeywords: {
        fr: ["pose de gel ongles Agadir", "manucure russe Agadir", "gainage BIAB Agadir", "bar à ongles Agadir Founty"],
        ar: ["مانيكير وجيل أكادير", "تركيب الأظافر في أكادير", "صالون أظافر أكادير"],
      },
      faqs: [
        {
          question: "Comment garantissez-vous l'hygiène pour la manucure et pédicure ?",
          answer: "Chaque cliente dispose d'un kit lime et buffer à usage unique, et tous les instruments métalliques passent au bain à ultrasons puis à l'autoclave médical classe B sous sachet scellé ouvert devant vous.",
        },
        {
          question: "Qu'est-ce que le gainage BIAB que vous proposez à Agadir ?",
          answer: "Le BIAB (Builder In A Bottle) est un gel souple enrichi en agents fortifiants qui gaine votre ongle naturel sans l'étouffer, permettant de le faire pousser sans casse avec un rendu nude lacté très chic.",
        },
        {
          question: "Quel est le prix d'une manucure et pose gel à Agadir ?",
          answer: "Le forfait Manucure Russe + Vernis Semi-Permanent renforcé ou Gainage BIAB débute à 250 MAD.",
        },
        {
          question: "Faites-vous également la beauté des pieds et pédicure spa ?",
          answer: "Oui, nous proposons le soin Calluspeeling des pieds avec bain hydromassant et pose gel assortie.",
        },
      ],
    },
    {
      slug: "epilation-laser",
      name: "Epilation laser",
      nameAr: "إزالة الشعر بالليزر الطبي",
      category: "Technologie & Corps",
      iconKey: "zap",
      shortDescription: "Épilation définitive indolore par Laser Diode nouvelle génération à refroidissement glacé.",
      shortDescriptionAr: "إزالة الشعر النهائية بدون ألم بجهاز ليزر ديود الحديث مع تبريد فوري للبشرة.",
      longDescription:
        "Libérez-vous durablement de la corvée d'épilation et des poils incarnés. Notre clinique esthétique à Agadir est équipée d'un Laser Diode dernière génération à triple longueur d'onde (755nm, 808nm, 1064nm) avec tête saphir refroidie à -15°C, permettant de traiter en toute sécurité et sans douleur tous les phototypes de peaux, y compris les peaux mates et bronzées.",
      longDescriptionAr:
        "تخلصي نهائيا من الشعر غير المرغوب فيه مع أحدث جهاز ليزر ديود ثلاثي الموجات المزود بنظام تبريد الكريستال، الآمن والفعال لجميع أنواع البشرة المغربية.",
      duration: 45,
      priceFrom: 350,
      image: "/images/treatment-laser-hammam.jpg",
      benefits: [
        "Technologie tri-onde efficace sur peaux claires, mates et méditerranéennes",
        "Pièce à main refroidie par cristal saphir pour une séance quasi indolore",
        "Élimination définitive des poils sous peau et douceur satinée dès la 2e séance",
        "Consultation et test de sensibilité gratuits avant tout protocole",
      ],
      processSteps: [
        { title: "01. Bilan Phototype & Paramétrage Sécurisé", detail: "Analyse de la mélanine cutanée et de l'épaisseur du poil, protection des grains de beauté au crayon blanc." },
        { title: "02. Balayage Laser Glacé Haute Fréquence", detail: "Application d'un gel conducteur frais et passage rapide de la pièce à main refroidie sur la zone ciblée." },
        { title: "03. Soin Apaisant Post-Laser", detail: "Application d'une émulsion réparatrice au panthénol et aloe vera bio et programmation de l'intervalle idéal." },
      ],
      idealFor: "Jambes, maillot, aisselles, visage, bras — poils incarnés ou repousse rapide.",
      seoKeywords: {
        fr: ["épilation laser femme Agadir", "épilation définitive prix Agadir", "centre laser esthétique Agadir", "épilation laser diode Agadir"],
        ar: ["إزالة الشعر بالليزر أكادير", "ثمن الليزر في أكادير", "مركز ليزر للنساء أكادير"],
      },
      faqs: [
        {
          question: "Combien de séances d'épilation laser faut-il prévoir ?",
          answer: "En moyenne, 6 à 8 séances espacées de 5 à 8 semaines permettent d'éliminer 90% à 95% de la pilosité sur le corps. Dès la première séance, la repousse est ralentie et la peau devient nettement plus lisse.",
        },
        {
          question: "Peut-on faire du laser à Agadir si l'on a la peau mate ?",
          answer: "Oui, notre plateforme Laser Diode intègre la longueur d'onde 1064nm spécialement conçue pour cibler le bulbe pileux sans chauffer la mélanine des peaux mates. Il suffit d'éviter le bronzage actif 10 jours avant et après la séance.",
        },
        {
          question: "Quel est le tarif de l'épilation laser chez Maison Argana ?",
          answer: "Les petites zones (lèvre supérieure, menton, aisselles) débutent dès 350 MAD la séance, avec des forfaits multi-zones très avantageux présentés lors de votre bilan gratuit.",
        },
        {
          question: "L'épilation laser est-elle douloureuse ?",
          answer: "Grâce au système de refroidissement par contact Ice-Tip à -15°C, vous ne ressentez qu'une sensation de fraîcheur accompagnée de légers picotements très supportables.",
        },
      ],
    },
    {
      slug: "brushing-et-coiffure",
      name: "Brushing et coiffure",
      nameAr: "تصفيف الشعر والعناية بالكيراتين",
      category: "Coiffure & Soins Capillaires",
      iconKey: "wind",
      shortDescription: "Brushing wavy ou lisse soyeux, soin Botox capillaire profond et coiffure d'événement.",
      shortDescriptionAr: "بروشينغ ناعم أو مموج، علاج البوتوكس المغذي للشعر وتسريحات للمناسبات.",
      longDescription:
        "Confiez votre chevelure à nos expertes visagistes dans un espace 100% dédié aux femmes (sans vis-à-vis, respectueux des femmes voilées et non voilées). Du Brushing Wavy glamour au Soin Botox Capillaire reconstructeur à la kératine et huile d'argan pure, nous redonnons souplesse, brillance miroir et vitalité aux cheveux sensibilisés par le sel et le calcaire.",
      longDescriptionAr:
        "دللي شعرك في فضاء نسائي خاص ومريح 100% (مناسب للمحجبات وغير المحجبات) مع بروشينغ احترافي، علاج البوتوكس والكيراتين المغذي لإعادة اللمعان والحيوية لشعرك.",
      duration: 60,
      priceFrom: 200,
      image: "/images/hero-glowing-skin.jpg",
      benefits: [
        "Espace coiffure 100% privé et sans vis-à-vis (adapté Hijab-friendly)",
        "Shampooings et masques professionnels sans sulfates agressifs",
        "Protection thermique systématique avant chaque brushing ou wavy",
        "Soins profonds Botox et protéines pour réparer la fibre capillaire",
      ],
      processSteps: [
        { title: "01. Bain Lavant & Massage Crânien Relaxant", detail: "Double shampooing adapté à votre cuir chevelu suivi d'un massage shiatsu crânien de 10 minutes." },
        { title: "02. Masque Infusé sous Serviette Chaude", detail: "Pose d'un soin profond aux céramides et huile d'argan tiède pour sceller les écailles." },
        { title: "03. Brushing Sur-Mesure & Sérum Éclat", detail: "Mise en forme souple, lisse ou wavy hollywoodien avec brosses en céramique et touche finale de soie." },
      ],
      idealFor: "Cheveux secs, ternes, frisottis liés à l'humidité côtière d'Agadir, mise en beauté soirée.",
      seoKeywords: {
        fr: ["salon de coiffure femme Agadir", "brushing Agadir Founty", "soin botox cheveux Agadir", "coiffeur femme voilée Agadir"],
        ar: ["صالون حلاقة للنساء في أكادير", "بروشينغ أكادير", "علاج الشعر بالبروتين أكادير"],
      },
      faqs: [
        {
          question: "L'espace coiffure est-il totalement privé pour les femmes voilées ?",
          answer: "Oui, l'intégralité de Maison Argana est strictement réservée à une clientèle et un personnel 100% féminins, sans aucun vis-à-vis extérieur.",
        },
        {
          question: "Quelle est la différence entre un lissage et un soin Botox capillaire ?",
          answer: "Le soin Botox capillaire est un bain de nutrition intense (acide hyaluronique, kératine, acides aminés) qui répare les cheveux abîmés, élimine les frisottis et apporte une brillance spectaculaire sans modifier la nature de vos boucles.",
        },
        {
          question: "Quel est le tarif d'un brushing avec soin à Agadir ?",
          answer: "Notre rituel Shampooing Pro + Masque Hydratant + Brushing sur-mesure est proposé dès 200 MAD.",
        },
        {
          question: "Réalisez-vous des chignons et coiffures d'invitée ou de mariée ?",
          answer: "Oui, nos coiffeuses studio réalisent des attaches bohèmes, chignons bas structurés et wavy de cérémonie sur rendez-vous.",
        },
      ],
    },
    {
      slug: "hammam-et-gommage",
      name: "Hammam et gommage",
      nameAr: "الحمام المغربي الملكي والتقشير",
      category: "Hammam & Spa Marocain",
      iconKey: "flame",
      shortDescription: "Hammam privatif en marbre chaud, gommage au savon noir beldi à l'eucalyptus et enveloppement ghassoul.",
      shortDescriptionAr: "حمام مغربي فردي فاخر بالصابون البلدي والأوكالبتوس مع تبريمة الأعشاب والغاسول الملكي.",
      longDescription:
        "Vivez l'authenticité du rituel ancestral marocain réinventé dans le cadre raffiné de notre Hammam Privatif en marbre chauffé. Notre Kessala dédiée vous prodigue un gommage traditionnel au savon noir beldi infusé à l'eucalyptus, une Tebrima royale aux plantes de l'Atlas, un enveloppement au ghassoul des sept plantes à l'eau de rose et un savonnage relaxant à la fleur d'oranger.",
      longDescriptionAr:
        "عيشي تجربة الحمام المغربي الملكي في غرفة رخامية خاصة دافئة، مع تقشير بالصابون البلدي والأوكالبتوس، تبريمة الأعشاب الطبيعية، وقناع الغاسول بماء الورد الحر.",
      duration: 90,
      priceFrom: 500,
      image: "/images/treatment-laser-hammam.jpg",
      benefits: [
        "Hammam 100% privatif (seule ou en duo entre amies/mère-fille)",
        "Kessa neuve personnelle offerte à chaque cliente pour une hygiène totale",
        "Savon noir beldi artisanal, Tebrima aux herbes et Ghassoul pur de l'Atlas",
        "Tisane détox aux plantes et pause repos au salon de relaxation incluses",
      ],
      processSteps: [
        { title: "01. Bain de Vapeur Douce & Savon Noir à l'Eucalyptus", detail: "Sudation purifiante sur marbre tiède et enduction de savon noir beldi riche en vitamine E." },
        { title: "02. Gommage Traditionnel & Tebrima Royale", detail: "Exfoliation corps entier avec un gant Kessa neuf suivie d'un masque éclaircissant aux plantes." },
        { title: "03. Enveloppement au Ghassoul & Douche Fleur d'Oranger", detail: "Masque corporel et capillaire au ghassoul à l'eau de rose, savonnage mousseux et hydratation à l'huile d'argan." },
      ],
      idealFor: "Détente profonde, préparation de la peau avant l'été ou un mariage, élimination des toxines.",
      seoKeywords: {
        fr: ["hammam et gommage Agadir", "hammam privatif femme Agadir", "meilleur spa hammam Agadir Founty", "rituel hammam royal Agadir"],
        ar: ["حمام مغربي في أكادير", "أفضل حمام وسبا للنساء أكادير", "حمام ملكي أكادير"],
      },
      faqs: [
        {
          question: "Le hammam chez Maison Argana est-il privatif ?",
          answer: "Oui, contrairement aux hammams collectifs, notre suite Hammam est réservée exclusivement pour vous (ou en duo avec votre maman, soeur ou amie) pendant toute la durée de votre rituel.",
        },
        {
          question: "Que dois-je apporter pour ma séance de Hammam à Agadir ?",
          answer: "Vous n'avez rien à prévoir : peignoir moelleux, serviettes chaudes, sous-vêtements jetables, sandales antidérapantes et votre gant Kessa neuf personnel sont intégralement fournis.",
        },
        {
          question: "Peut-on associer le Hammam Royal avec un massage à l'huile d'argan ?",
          answer: "Absolument. À la sortie du hammam, votre peau réceptive profite idéalement d'un massage relaxant de 30 ou 60 minutes à l'huile d'argan chaude.",
        },
        {
          question: "Quel est le tarif du Hammam et Gommage à Agadir ?",
          answer: "Notre Rituel Hammam Royal Privatif de 90 minutes (incluant savon noir, gommage, tebrima, enveloppement ghassoul et tisane) est proposé à 500 MAD.",
        },
      ],
    },
  ] as ServiceItem[],

  areas: [
    {
      slug: "founty-agadir",
      shortSlug: "founty",
      name: "Founty",
      nameAr: "فونتي",
      distanceMinutes: 2,
      landmarks: ["Haut Founty", "Esplanade de la Marina & Corniche", "Palais Royal & Résidences Jardins de Founty"],
      transportNote: "Au coeur même de Founty, avec stationnement gratuit et sécurisé juste devant la clinique.",
      neighborhoodVibe: "quartier résidentiel et balnéaire prisé d'Agadir",
      customIntro:
        "Située directement au coeur du quartier Founty à Agadir, Maison Argana accueille les résidentes de Haut Founty, Sonaba et les visiteuses des hôtels de la baie dans un écrin calme, lumineux et facile d'accès.",
      customSkinClimateNote:
        "À Founty, la proximité immédiate de l'océan Atlantique et l'ensoleillement généreux sollicitent particulièrement la barrière hydrolipidique de la peau : nos protocoles privilégient la réhydratation profonde et la réparation solaire.",
      localKeywords: {
        fr: ["salon de beauté Agadir Founty", "clinique esthétique Haut Founty Agadir", "institut de beauté femme Founty"],
        ar: ["صالون تجميل في فونتي أكادير", "مركز تجميل حي فونتي أكادير"],
      },
    },
    {
      slug: "talborjt-agadir",
      shortSlug: "talborjt",
      name: "Talborjt",
      nameAr: "تالبرجت",
      distanceMinutes: 8,
      landmarks: ["Mosquée Mohammed V", "Jardin d'Olhão", "Place Tamri & Avenue du Président Kennedy"],
      transportNote: "À seulement 8 minutes en voiture ou petit taxi depuis le centre historique de Talborjt via le Boulevard Mohamed V.",
      neighborhoodVibe: "quartier historique, vivant et central d'Agadir",
      customIntro:
        "De nombreuses clientes du quartier emblématique de Talborjt rejoignent Maison Argana en moins de dix minutes pour s'offrir une parenthèse de calme absolu loin de l'effervescence du centre-ville.",
      customSkinClimateNote:
        "Pour nos clientes actives de Talborjt et du centre d'Agadir, nous concevons des soins détoxifiants et antipollution qui oxygènent l'épiderme et offrent des résultats durables en une seule séance.",
      localKeywords: {
        fr: ["salon de beauté Talborjt Agadir", "institut esthétique près de Talborjt", "soin visage Talborjt Agadir"],
        ar: ["صالون تجميل تالبرجت أكادير", "تنظيف البشرة تالبرجت أكادير"],
      },
    },
    {
      slug: "hay-mohammadi-agadir",
      shortSlug: "hay-mohammadi",
      name: "Hay Mohammadi",
      nameAr: "الحي المحمدي",
      distanceMinutes: 12,
      landmarks: ["Avenue des FAR", "Complexe Commercial & Cafés de Hay Mohammadi", "Parc Al Inbiaat"],
      transportNote: "Accès fluide en 12 minutes depuis Hay Mohammadi par la rocade ou l'Avenue des FAR avec parking dédié à l'arrivée.",
      neighborhoodVibe: "quartier moderne en plein essor d'Agadir",
      customIntro:
        "Les femmes de Hay Mohammadi apprécient l'exigence clinique, la ponctualité des rendez-vous et la réservation instantanée sur WhatsApp qu'offre Maison Argana.",
      customSkinClimateNote:
        "L'air plus sec des hauteurs de Hay Mohammadi demande des soins riches en céramides, acide hyaluronique et huiles précieuses pour préserver la souplesse de la peau et la brillance des cheveux.",
      localKeywords: {
        fr: ["salon de beauté Hay Mohammadi Agadir", "épilation laser Hay Mohammadi Agadir", "hydrafacial Hay Mohammadi Agadir"],
        ar: ["صالون تجميل الحي المحمدي أكادير", "مركز تجميل الحي المحمدي أكادير"],
      },
    },
    {
      slug: "anza-agadir",
      shortSlug: "anza",
      name: "Anza",
      nameAr: "أنزا",
      distanceMinutes: 16,
      landmarks: ["Corniche d'Anza", "Anza Supérieur (Taddart)", "Port & Marina d'Agadir"],
      transportNote: "Trajet direct par la route côtière panoramique depuis Anza et Taddart en une quinzaine de minutes.",
      neighborhoodVibe: "quartier côtier dynamique au nord d'Agadir",
      customIntro:
        "Depuis la corniche d'Anza et Taddart Anza, nos clientes viennent chez Maison Argana pour bénéficier d'équipements esthétiques de dernière génération (Hydrafacial, Laser Diode, BIAB) dans un cadre intimiste.",
      customSkinClimateNote:
        "Exposées aux embruns iodés et au vent côtier d'Anza, la peau et la fibre capillaire retrouvent chez nous confort, nutrition intense et protection longue durée.",
      localKeywords: {
        fr: ["salon de beauté Anza Agadir", "soin visage et laser près d'Anza Agadir", "institut femme Anza"],
        ar: ["صالون تجميل أنزا أكادير", "تنظيف البشرة أنزا أكادير"],
      },
    },
    {
      slug: "cite-dakhla-agadir",
      shortSlug: "cite-dakhla",
      name: "Cité Dakhla",
      nameAr: "حي الداخلة",
      distanceMinutes: 10,
      landmarks: ["Avenue du Prince Héritier", "Faculté Ibn Zohr & Quartier El Houda", "Place Salam"],
      transportNote: "À 10 minutes à peine de Cité Dakhla, El Houda et Al Massira via les grands boulevards d'Agadir.",
      neighborhoodVibe: "quartier familial et universitaire incontournable d'Agadir",
      customIntro:
        "Étudiantes, cadres et mères de famille de Cité Dakhla et d'El Houda choisissent Maison Argana pour la transparence de nos tarifs en dirhams, notre hygiène médicale et nos horaires continus jusqu'à 20h.",
      customSkinClimateNote:
        "Que ce soit pour un nettoyage dermatologique purifiant, une épilation laser définitive ou une manucure BIAB durable, nous adaptons nos protocoles au rythme soutenu des résidentes de Cité Dakhla.",
      localKeywords: {
        fr: ["salon de beauté Cité Dakhla Agadir", "institut esthétique Dakhla Agadir", "manucure gel Cité Dakhla Agadir"],
        ar: ["صالون تجميل حي الداخلة أكادير", "مركز تجميل الداخلة أكادير"],
      },
    },
    {
      slug: "sonaba-agadir",
      shortSlug: "sonaba",
      name: "Sonaba",
      nameAr: "سونابا",
      distanceMinutes: 4,
      landmarks: ["Promenade de la Plage de Sonaba", "Secteur Touristique & Villas de Sonaba", "Avenue Mohammed V"],
      transportNote: "À 4 minutes à pied ou en voiture des résidences et hôtels de Sonaba.",
      neighborhoodVibe: "secteur balnéaire chic et verdoyant d'Agadir",
      customIntro:
        "Voisine immédiate du quartier Sonaba, notre clinique esthétique est l'adresse privilégiée des résidentes de Sonaba pour leurs rituels hebdomadaires de beauté, de coiffure et de hammam privatif.",
      customSkinClimateNote:
        "Après une journée en bord de mer à Sonaba, nos soins cryo-apaisants, nos rituels de hammam à l'argan et nos soins capillaires profonds régénèrent instantanément la peau et les cheveux.",
      localKeywords: {
        fr: ["salon de beauté Sonaba Agadir", "spa et hammam privatif Sonaba Agadir", "esthéticienne Sonaba Agadir"],
        ar: ["صالون تجميل سونابا أكادير", "حمام مغربي سونابا أكادير"],
      },
    },
  ] as AreaItem[],

  team: [
    {
      id: "kenza",
      name: "Dr. Kenza Bennani",
      role: "Directrice & Experte Dermo-Esthétique",
      roleAr: "مديرة المركز وخبيرة العناية بالبشرة والليزر",
      specialty: "Hydrafacial, Laser Diode & Diagnostic Cutané",
      experienceYears: 11,
      photo: "/images/hero-glowing-skin.jpg",
    },
    {
      id: "salma",
      name: "Salma El Amrani",
      role: "Master Lash & Brow Artist",
      roleAr: "خبيرة تصميم الحواجب وتركيب الرموش",
      specialty: "Restructuration au fil, Brow Lift & Extensions de cils",
      experienceYears: 8,
      photo: "/images/treatment-brows-lashes.jpg",
    },
    {
      id: "nadia",
      name: "Nadia Tazi",
      role: "Styliste Ongulaire & Coiffure Studio",
      roleAr: "أخصائية الأظافر الروسية وتصفيف الشعر",
      specialty: "Manucure Russe, Gainage BIAB & Botox Capillaire",
      experienceYears: 9,
      photo: "/images/treatment-manicure-gel.jpg",
    },
  ] as TeamMember[],

  stats: [
    {
      id: "experience",
      value: 10,
      suffix: "+",
      label: "Années d'expérience",
      labelAr: "سنوات من الخبرة",
      sublabel: "Savoir-faire dermo-esthétique",
      iconKey: "award",
    },
    {
      id: "clients",
      value: 2800,
      suffix: "+",
      label: "Clientes satisfaites",
      labelAr: "زبونة راضية في أكادير",
      sublabel: "À Agadir & Souss-Massa",
      iconKey: "users",
    },
    {
      id: "tech",
      value: 100,
      suffix: "%",
      label: "Technologie moderne",
      labelAr: "أحدث الأجهزة الطبية",
      sublabel: "Équipements certifiés CE Médical",
      iconKey: "cpu",
    },
    {
      id: "rating",
      value: 4.9,
      suffix: "/5",
      label: "Note sur Google",
      labelAr: "تقييم ممتاز على جوجل",
      sublabel: "Basé sur +340 avis vérifiés",
      iconKey: "star",
    },
    {
      id: "safety",
      value: 100,
      suffix: "%",
      label: "Sécurité & Hygiène",
      labelAr: "تعقيم طبي وأمان تام",
      sublabel: "Stérilisation autoclave classe B",
      iconKey: "shield",
    },
  ] as StatItem[],

  gallery: [
    {
      id: "gal-1",
      src: "/images/salon-interior-about.jpg",
      alt: "Réception en marbre et espace d'accueil de Maison Argana à Agadir Founty",
      category: "Clinique & Spa",
      caption: "Notre réception pensée comme un cocon apaisant au coeur de Founty",
    },
    {
      id: "gal-2",
      src: "/images/treatment-hydrafacial.jpg",
      alt: "Séance de soin Hydrafacial éclat en cabine privée à Agadir",
      category: "Soins Visage",
      caption: "Protocole Hydrafacial Signature pour un teint lumineux immédiat",
    },
    {
      id: "gal-3",
      src: "/images/treatment-brows-lashes.jpg",
      alt: "Résultat de restructuration des sourcils Brow Lift et extensions de cils",
      category: "Regard & Sourcils",
      caption: "Architecture du regard : Brow Lift à la kératine et cils soyeux",
    },
    {
      id: "gal-4",
      src: "/images/treatment-manicure-gel.jpg",
      alt: "Manucure russe et pose de gel BIAB nude lacté à Agadir",
      category: "Onglerie & Mains",
      caption: "Manucure Russe de précision et gainage BIAB naturel",
    },
    {
      id: "gal-5",
      src: "/images/treatment-laser-hammam.jpg",
      alt: "Rituel de Hammam Royal à l'huile d'argan bio et eucalyptus à Agadir",
      category: "Clinique & Spa",
      caption: "Élixir d'argan pur et soin aromatique pour notre Hammam Royal",
    },
    {
      id: "gal-6",
      src: "/images/hero-glowing-skin.jpg",
      alt: "Résultat coup d'éclat après un soin du visage anti-âge chez Maison Argana",
      category: "Soins Visage",
      caption: "Effet peau de pêche et éclat naturel après notre Soin Signature",
    },
  ] as GalleryItem[],

  testimonials: [
    {
      id: "rev-1",
      name: "Yasmine Alaoui",
      neighborhood: "Founty, Agadir",
      service: "Hydrafacial & Brow Lift",
      text: "Un vrai bijou à Agadir ! L'hygiène est irréprochable, la décoration apaise dès l'entrée et mon teint après l'Hydrafacial était incroyablement lumineux sans aucune rougeur. La réservation par WhatsApp est super fluide.",
      rating: 5,
      source: "Avis Google Vérifié",
      date: "Il y a 2 semaines",
    },
    {
      id: "rev-2",
      name: "Meriem Ouazzani",
      neighborhood: "Hay Mohammadi, Agadir",
      service: "Épilation Laser Diode",
      text: "Je suis à ma 4ème séance d'épilation laser chez Maison Argana et plus de 80% de mes poils ont disparu. La machine à froid ne fait vraiment pas mal et Kenza prend le temps de tout expliquer avec douceur.",
      rating: 5,
      source: "Avis Google Vérifié",
      date: "Il y a 1 mois",
    },
    {
      id: "rev-3",
      name: "Sofia Berrada",
      neighborhood: "Sonaba, Agadir",
      service: "Manucure Russe & Gainage BIAB",
      text: "De loin la meilleure manucure russe d'Agadir ! Les instruments sont déballés de sachets stériles devant nous, le gainage BIAB est fin, chic et tient 4 semaines sans bouger même avec la plage.",
      rating: 5,
      source: "Avis Google Vérifié",
      date: "Il y a 3 semaines",
    },
    {
      id: "rev-4",
      name: "Hajar El Mansouri",
      neighborhood: "Talborjt, Agadir",
      service: "Hammam Royal & Brushing",
      text: "J'ai privatisé le hammam pour l'anniversaire de ma maman : savon noir à l'eucalyptus, tebrima royale et brushing dans un espace 100% intime pour femmes. Accueil cinq étoiles du début à la fin.",
      rating: 5,
      source: "Avis Google Vérifié",
      date: "Il y a 1 mois",
    },
    {
      id: "rev-5",
      name: "Inès Chraïbi",
      neighborhood: "Cité Dakhla, Agadir",
      service: "Extensions de Cils",
      text: "Le rendu cil à cil est ultra naturel et léger, personne ne devine que ce sont des extensions ! Salma a parfaitement respecté la forme de mes yeux.",
      rating: 5,
      source: "Avis Instagram",
      date: "Il y a 2 mois",
    },
  ] as TestimonialItem[],

  blogPosts: [
    {
      slug: "hydrafacial-agadir-guide-complet-prix-bienfaits",
      title: "Hydrafacial à Agadir : prix, déroulement et bienfaits pour une peau éclatante",
      excerpt:
        "Pourquoi l'Hydrafacial est devenu le soin numéro 1 des femmes à Agadir pour contrer la déshydratation solaire et resserrer les pores sans éviction sociale.",
      publishedAt: "2026-09-18",
      readTimeMinutes: 5,
      category: "Soins du Visage",
      image: "/images/treatment-hydrafacial.jpg",
      author: "Dr. Kenza Bennani",
      relatedServiceSlugs: ["hydrafacial", "soin-du-visage"],
      relatedAreaSlugs: ["founty-agadir", "hay-mohammadi-agadir", "sonaba-agadir"],
      seoKeywords: ["hydrafacial prix Agadir", "soin hydrafacial Agadir", "nettoyage de peau dermatologique Agadir"],
      sections: [
        {
          heading: "Pourquoi le climat d'Agadir exige un nettoyage hydro-dermabrasif ?",
          paragraphs: [
            "Avec plus de 300 jours d'ensoleillement par an et un air marin chargé d'embruns, la peau des femmes résidant à Agadir — que ce soit à Founty, Sonaba ou Hay Mohammadi — subit un épaississement de la couche cornée et une oxydation accélérée du sébum.",
            "L'application quotidienne de crèmes solaires SPF50, indispensable au Maroc, finit également par obstruer les pores si elle n'est pas associée à une exfoliation professionnelle régulière. C'est précisément là qu'intervient le protocole Hydrafacial.",
          ],
          bulletPoints: [
            "Exfoliation douce par vortex d'eau sans micro-griffures cutanées",
            "Extraction sous vide indolore des points noirs sur la zone T",
            "Infusion immédiate d'acide hyaluronique et de peptides antioxydants",
          ],
        },
        {
          heading: "Quel est le prix d'un vrai soin Hydrafacial à Agadir ?",
          paragraphs: [
            "À Agadir, le tarif d'un soin Hydrafacial varie selon la durée du protocole et la qualité des sérums utilisés. Chez Maison Argana, notre protocole Signature de 60 minutes incluant la photomodulation par LED médicale est proposé au tarif transparent de 650 MAD.",
            "Chaque étape est personnalisée selon votre diagnostic cutané : booster éclaircissant à la vitamine C pour les taches pigmentaires ou complexe apaisant au zinc pour les peaux sujettes aux imperfections.",
          ],
        },
      ],
      faqs: [
        {
          question: "Peut-on faire un Hydrafacial en été à Agadir ?",
          answer: "Oui, c'est un soin quatre saisons non photosensibilisant lorsqu'il est suivi d'une protection solaire SPF50.",
        },
        {
          question: "À partir de quel âge commencer l'Hydrafacial ?",
          answer: "Dès 18 ans pour purifier les peaux jeunes, et à tout âge pour prévenir le relâchement et illuminer le teint.",
        },
      ],
    },
    {
      slug: "epilation-laser-femme-agadir-peaux-mates-conseils",
      title: "Épilation laser femme à Agadir : tout savoir sur le Laser Diode pour peaux marocaines",
      excerpt:
        "Nombre de séances, sécurité sur les phototypes mats, budget en dirhams et précautions vis-à-vis du soleil : le guide médical complet.",
      publishedAt: "2026-09-22",
      readTimeMinutes: 6,
      category: "Laser & Technologie",
      image: "/images/treatment-laser-hammam.jpg",
      author: "Dr. Kenza Bennani",
      relatedServiceSlugs: ["epilation-laser", "soin-du-visage"],
      relatedAreaSlugs: ["talborjt-agadir", "cite-dakhla-agadir", "founty-agadir"],
      seoKeywords: ["épilation laser femme Agadir", "centre laser Agadir prix", "épilation définitive Agadir"],
      sections: [
        {
          heading: "Comment fonctionne le Laser Diode tri-onde sur les peaux mates ?",
          paragraphs: [
            "Longtemps réservée aux peaux très claires, l'épilation laser a connu une révolution grâce à la technologie Diode combinant les longueurs d'onde 755nm, 808nm et 1064nm.",
            "Cette synergie permet de cibler sélectivement la mélanine du bulbe pileux en profondeur tout en préservant l'épiderme des phototypes III à V, très fréquents au Maroc.",
          ],
          bulletPoints: [
            "Tête de traitement en cristal saphir refroidie à -15°C pour un confort optimal",
            "Éradication définitive des poils incarnés sur les jambes et le maillot",
            "Bilan pré-laser et test d'impact gratuits avant de débuter",
          ],
        },
        {
          heading: "Comment préparer sa séance d'épilation laser à Agadir ?",
          paragraphs: [
            "Arrêtez toute épilation à la cire ou à la pince au moins 3 semaines avant votre rendez-vous afin de conserver les bulbes en phase anagène. Rasez la zone 24 heures avant la séance et évitez l'exposition solaire directe pendant les 10 jours précédant votre visite.",
          ],
        },
      ],
      faqs: [
        {
          question: "L'épilation laser est-elle définitive ?",
          answer: "À l'issue du protocole de 6 à 8 séances, 90% à 95% des poils terminaux sont détruits durablement. Une séance d'entretien annuelle suffit ensuite.",
        },
      ],
    },
    {
      slug: "manucure-russe-gainage-biab-agadir-tendance-ongles",
      title: "Manucure Russe et Gainage BIAB à Agadir : le secret d'ongles naturels parfaits pendant 4 semaines",
      excerpt:
        "Découvrez pourquoi le gainage BIAB associé à la manucure russe remplace les capsules classiques chez les femmes élégantes d'Agadir.",
      publishedAt: "2026-09-25",
      readTimeMinutes: 4,
      category: "Onglerie & Mains",
      image: "/images/treatment-manicure-gel.jpg",
      author: "Nadia Tazi",
      relatedServiceSlugs: ["manucure-et-pose-gel", "brushing-et-coiffure"],
      relatedAreaSlugs: ["founty-agadir", "sonaba-agadir", "cite-dakhla-agadir"],
      seoKeywords: ["pose de gel ongles Agadir", "manucure russe Agadir", "gainage BIAB Agadir"],
      sections: [
        {
          heading: "Qu'est-ce qui rend la Manucure Russe et le BIAB si durables ?",
          paragraphs: [
            "Contrairement à une pose de vernis semi-permanent ordinaire qui laisse apparaître une repousse dès la première semaine, la Manucure Russe nettoie le repli proximal avec une précision microscopique.",
            "Le gel BIAB (Builder In A Bottle) vient ensuite créer une gaine souple et protectrice sur votre ongle naturel. Résultat : vos ongles poussent sans jamais se dédoubler ni casser, avec un fini nude lacté (« clean girl nails ») d'une finesse absolue.",
          ],
        },
      ],
      faqs: [
        {
          question: "Le retrait du BIAB abîme-t-il l'ongle ?",
          answer: "Non, lors du remplissage nous ne retirons que 80% de la matière en laissant une fine base protectrice, ce qui préserve totalement la kératine naturelle de votre ongle.",
        },
      ],
    },
    {
      slug: "extensions-de-cils-ou-rehaussement-lash-lift-agadir",
      title: "Extensions de cils ou Rehaussement Lash Lift à Agadir : comment choisir selon votre regard ?",
      excerpt:
        "Pose cil à cil soyeuse, volume russe léger ou rehaussement à la kératine : comparatif complet des prestations regard chez Maison Argana.",
      publishedAt: "2026-09-29",
      readTimeMinutes: 5,
      category: "Regard & Sourcils",
      image: "/images/treatment-brows-lashes.jpg",
      author: "Salma El Amrani",
      relatedServiceSlugs: ["extensions-de-cils", "restructuration-des-sourcils"],
      relatedAreaSlugs: ["talborjt-agadir", "hay-mohammadi-agadir", "anza-agadir"],
      seoKeywords: ["extension de cils Agadir prix", "rehaussement de cils Agadir", "brow lift Agadir"],
      sections: [
        {
          heading: "Lash Lift à la kératine vs Extensions en soie : le match",
          paragraphs: [
            "Si vous avez déjà des cils de longueur moyenne mais droits et que vous souhaitez zéro entretien pendant 6 semaines, le Rehaussement Lash Lift couplé au soin Botox Kératine et à une teinture noire intense est votre meilleur allié.",
            "Si vous rêvez d'allonger visiblement votre frange de cils et d'intensifier la ligne des paupières avec un effet oeil de biche sur-mesure, la pose d'extensions Cil à Cil ou Mixte répondra parfaitement à vos attentes.",
          ],
        },
      ],
      faqs: [
        {
          question: "Peut-on se baigner à la plage d'Agadir avec des extensions de cils ?",
          answer: "Oui, après les premières 24 heures de polymérisation, vos extensions résistent parfaitement à l'eau de mer. Il suffit de les rincer à l'eau douce et de les brosser délicatement.",
        },
      ],
    },
    {
      slug: "rituel-hammam-royal-privatif-agadir-bienfaits-argan",
      title: "Hammam privatif à Agadir : les secrets de notre rituel au savon noir beldi, tebrima et ghassoul",
      excerpt:
        "Comment le rituel ancestral du hammam marocain régénère la peau, stimule la circulation et prépare l'épiderme aux soins esthétiques.",
      publishedAt: "2026-10-01",
      readTimeMinutes: 5,
      category: "Hammam & Bien-Être",
      image: "/images/treatment-laser-hammam.jpg",
      author: "Dr. Kenza Bennani",
      relatedServiceSlugs: ["hammam-et-gommage", "soin-du-visage"],
      relatedAreaSlugs: ["founty-agadir", "sonaba-agadir", "talborjt-agadir"],
      seoKeywords: ["hammam et gommage Agadir", "hammam privatif femme Agadir", "spa marocain Agadir"],
      sections: [
        {
          heading: "L'alliance de la vapeur douce et des trésors botaniques du Souss",
          paragraphs: [
            "Dans notre suite Hammam privative en marbre chaud à Agadir, chaque ingrédient est sélectionné auprès de coopératives féminines de la région Souss-Massa et de l'Atlas : savon noir à l'huile d'olive première pression, Tebrima aux 14 plantes aromatiques et Ghassoul pur tamisé.",
            "Ce rituel élimine en douceur les cellules mortes, affine le grain de peau du corps entier et procure un lâcher-prise nerveux immédiat.",
          ],
        },
      ],
      faqs: [
        {
          question: "Faut-il faire le hammam avant ou après une épilation ?",
          answer: "Toujours avant l'épilation (idéalement 24 à 48h avant) afin de libérer les poils sous peau sans irriter les follicules fraîchement épilés.",
        },
      ],
    },
    {
      slug: "routine-beaute-mariage-agadir-preparer-peau-cheveux",
      title: "Future mariée à Agadir : le rétro-planning beauté sur 30 jours pour rayonner le jour J",
      excerpt:
        "Soins du visage éclat, restructuration des sourcils, hammam royal, manucure BIAB et soin botox capillaire : quand planifier chaque étape ?",
      publishedAt: "2026-10-04",
      readTimeMinutes: 6,
      category: "Conseils Mariée",
      image: "/images/salon-interior-about.jpg",
      author: "Dr. Kenza Bennani",
      relatedServiceSlugs: ["hydrafacial", "hammam-et-gommage", "manucure-et-pose-gel", "extensions-de-cils"],
      relatedAreaSlugs: ["founty-agadir", "hay-mohammadi-agadir", "cite-dakhla-agadir", "anza-agadir"],
      seoKeywords: ["forfait mariée salon de beauté Agadir", "préparation mariée hammam soin visage Agadir"],
      sections: [
        {
          heading: "Le calendrier idéal des soins esthétiques avant votre cérémonie",
          paragraphs: [
            "Pour que votre maquillage de mariée fusionne parfaitement avec votre peau et tienne jusqu'au bout de la nuit, la préparation cutanée commence 3 à 4 semaines avant l'événement par un premier soin Hydrafacial et un soin Botox capillaire.",
            "À J-3, place au Hammam Royal privatif avec Tebrima éclaircissante, suivi à J-2 de la restructuration des sourcils, de la pose d'extensions de cils et de la manucure-pédicure gel.",
          ],
        },
      ],
      faqs: [
        {
          question: "Puis-je privatiser le salon avec mes demoiselles d'honneur ?",
          answer: "Oui, contactez-nous directement sur WhatsApp pour organiser une demi-journée privative sur-mesure à Agadir.",
        },
      ],
    },
  ] as BlogPostItem[],
};

/**
 * Helper to construct a WhatsApp URL using ONLY siteConfig.whatsappNumber
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) {
    const defaultMsg =
      siteConfig.language === "ar"
        ? `السلام عليكم ${siteConfig.businessName}، أود حجز موعد للعناية بالجمال في ${siteConfig.city}.`
        : `Bonjour ${siteConfig.businessName}, je souhaite prendre rendez-vous pour un soin dans votre clinique à ${siteConfig.city}.`;
    return `${base}?text=${encodeURIComponent(defaultMsg)}`;
  }
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper to get clean tel: URI from siteConfig.whatsappNumber / phoneDisplay
 */
export function buildTelUrl(): string {
  return `tel:+${siteConfig.whatsappNumber}`;
}
