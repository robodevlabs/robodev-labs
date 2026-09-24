/* ==========================================================================
   RoboDev Labs — Product Studio Data
   Single source of truth for all Product Studio content.
   Adding a new object to `productsData` automatically:
   1. Shows it on /products
   2. Generates /products/[slug]
   3. Requires zero edits to index.astro or ProductTemplate.astro
   Real supplied data only. No invented metrics, users, revenue, or claims.
   ========================================================================== */

export interface ProductResearch {
  surveyParticipants: string;
  routeDifficulty: string;
  missedOrWrongBus: string;
  transferDifficulty: string;
}

export interface ProductUserFeedback {
  routeSearch: string;
  booking: string;
  payment: string;
  map: string;
  saveRoutes: string;
}

export interface ProductRatings {
  routeSearch: string;
  map: string;
  overallUsability: string;
}

export interface ProductTechnical {
  frontend: string;
  styling: string;
  mapping: string;
  backend: string;
  database: string;
  distanceCalculation: string;
  payment: string;
  frontendDeployment: string;
  backendDeployment: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  logo: string;
  tech: string[];
  details: string;
  description: string;
  tag: string;
  category: string;
  role: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  research: ProductResearch;
  userFeedback: ProductUserFeedback;
  ratings: ProductRatings;
  technical: ProductTechnical;
  futureScope: string[];
  images: string[];

  /* ── Optional for future products with different amounts of info ── */
  shortTitle?: string;
  demoUrl?: string;
  demoLabel?: string;
  relatedSlugs?: string[];

  /* ── Legacy compat mirrors (derived from real fields; existing cards) ── */
  name: string;
  badge: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  targetUsers: string[];
  status: 'In Development' | 'Live' | 'Beta' | 'Concept' | 'In Research';
  technologies: string[];
  stage: string;
  highlights: string[];
  tags: string[];
  isFeatured?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

/** @deprecated Use `Product` for new code. Kept for ProductCard compat. */
export type ProductItem = Product;

export interface StudioPageContent {
  eyebrow: string;
  headline: string;
  intro: string;
  productsEyebrow: string;
  productsTitle: string;
  productsIntro: string;
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyIntro: string;
  philosophyPoints: { title: string; description: string }[];
  lifecycleEyebrow: string;
  lifecycleTitle: string;
  lifecycleIntro: string;
  lifecycleSteps: { index: string; title: string; description: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyCtaLabel: string;
}

export const studioPage: StudioPageContent = {
  eyebrow: 'Product Studio',
  headline: "We don't only build software for others. We build products ourselves.",
  intro:
    'Product Studio is RoboDev Labs’ place for building and experimenting with its own digital products — exploring ideas, solving real problems, and turning experiments into usable software.',
  productsEyebrow: 'Portfolio',
  productsTitle: 'What we are building',
  productsIntro:
    'Each product is developed and maintained by our own engineering team, using the same standards as our client work.',
  philosophyEyebrow: 'Philosophy',
  philosophyTitle: 'Why we build our own products',
  philosophyIntro:
    'Building products keeps our engineering honest. We encounter the same constraints our clients face — scope, maintenance, and real usage.',
  philosophyPoints: [
    {
      title: 'Explore real problems',
      description:
        'We start from observed friction in daily workflows, not trends. If a problem is worth solving for ourselves, it is worth building well.',
    },
    {
      title: 'Experiment in the open',
      description:
        'Prototypes are tested early against practical use. What survives becomes maintainable software; what does not becomes learning.',
    },
    {
      title: 'Compound engineering',
      description:
        'Reusable patterns, components, and infrastructure from studio work improve everything else we build.',
    },
  ],
  lifecycleEyebrow: 'From idea to product',
  lifecycleTitle: 'A simple product lifecycle',
  lifecycleIntro: 'The same disciplined flow behind every studio experiment.',
  lifecycleSteps: [
    { index: '01', title: 'Idea', description: 'A concrete problem worth solving.' },
    { index: '02', title: 'Explore', description: 'Research, constraints, and scope.' },
    { index: '03', title: 'Build', description: 'Working prototype with real data.' },
    { index: '04', title: 'Test', description: 'Validate with practical use.' },
    { index: '05', title: 'Launch', description: 'Release a usable, supported version.' },
    { index: '06', title: 'Iterate', description: 'Improve based on actual usage.' },
  ],
  ctaTitle: 'Follow what we build',
  ctaDescription:
    'Explore our products or connect with the team behind them. Studio work is ongoing — new experiments ship as they become usable.',
  ctaPrimaryLabel: 'Explore products',
  ctaSecondaryLabel: 'Contact us',
  emptyTitle: 'No products published yet',
  emptyDescription:
    'We are currently experimenting behind the scenes. Check back soon or contact us to learn what the studio is exploring.',
  emptyCtaLabel: 'Contact us',
};

export const productsData: Product[] = [
  {
    id: 1,
    title: 'Busly – Smart Route Search & Booking System',
    slug: 'busly',

    logo: '/assets/images/products/Busly_Logo.png',

    tech: [
      'React',
      'Vite.js',
      'Tailwind CSS',
      'Leaflet',
      'React Leaflet',
      'Django',
      'Django REST Framework',
      'Supabase PostgreSQL',
      'Khalti API',
    ],

    details:
      'Busly is a smart urban bus route search and booking platform that helps users discover bus routes, plan journeys with transfers, explore routes on an interactive map, save routes, and access booking and digital payment features.',

    description:
      'The system combines route search, transfer planning, interactive mapping, bus schedules, booking, and digital payments into a single web platform.',

    tag: 'Transit & Booking',

    category: 'Mobility & Transportation',

    role: 'Full-Stack Developer',

    problem:
      'Urban bus transportation can be difficult to navigate due to fragmented route information, unclear transfers, and difficulty identifying the correct bus.',

    solution:
      'Busly structures route information and provides route discovery, map visualization, transfer planning, booking, and digital payment features through one platform.',

    keyFeatures: [
      'Bus route search',
      'Origin-to-destination route discovery',
      'Transfer-aware journey planning',
      'Interactive map visualization',
      'Haversine-based distance calculation',
      'Schedule-based bus status',
      'Saved routes',
      'Bus booking',
      'Khalti payment integration',
      'REST API backend',
    ],

    research: {
      surveyParticipants: '100+',
      routeDifficulty: '52.7%',
      missedOrWrongBus: '89.1%',
      transferDifficulty: '86.4%',
    },

    userFeedback: {
      routeSearch: '95.8%',
      booking: '50%',
      payment: '54%',
      map: '83.3%',
      saveRoutes: '70.8%',
    },

    ratings: {
      routeSearch: '4.75/5',
      map: '4.63/5',
      overallUsability: '4.7+/5',
    },

    technical: {
      frontend: 'React + Vite.js',
      styling: 'Tailwind CSS',
      mapping: 'Leaflet + React Leaflet',
      backend: 'Django + Django REST Framework',
      database: 'Supabase PostgreSQL',
      distanceCalculation: 'Haversine formula',
      payment: 'Khalti API',
      frontendDeployment: 'Netlify',
      backendDeployment: 'Render',
    },

    futureScope: [
      'Real-time GPS-based bus tracking',
      'Expanded route and operator coverage',
      'Improved fare and ticket management',
      'Mobile application support',
      'Personalized route recommendations',
    ],

    images: [
      '/assets/images/products/busly_img1.webp',
      '/assets/images/products/busly_img2.webp',
      '/assets/images/products/busly_img3.webp',
      '/assets/images/products/busly_img4.webp',
      '/assets/images/products/busly_img5.webp',
      '/assets/images/products/busly_img6.webp',
      '/assets/images/products/busly_img7.webp',
    ],

    /* ── Legacy compat mirrors (same real content, existing components) ── */
    name: 'Busly',
    badge: 'Transit & Booking',
    tagline: 'Smart urban bus route search and booking platform.',
    shortDescription:
      'Busly is a smart urban bus route search and booking platform that helps users discover bus routes, plan journeys with transfers, explore routes on an interactive map, save routes, and access booking and digital payment features.',
    overview:
      'The system combines route search, transfer planning, interactive mapping, bus schedules, booking, and digital payments into a single web platform.',
    targetUsers: ['Urban bus commuters', 'Transit operators', 'Daily route planners'],
    status: 'In Development',
    technologies: [
      'React',
      'Vite.js',
      'Tailwind CSS',
      'Leaflet',
      'React Leaflet',
      'Django',
      'Django REST Framework',
      'Supabase PostgreSQL',
      'Khalti API',
    ],
    stage: 'Built as a full-stack route search and booking system with research and usability evaluation.',
    highlights: [
      'Bus route search',
      'Origin-to-destination route discovery',
      'Transfer-aware journey planning',
      'Interactive map visualization',
    ],
    tags: ['Transit Tech', 'Route Finder', 'Smart Mobility', 'Booking'],
    isFeatured: true,
    ctaText: 'Explore Busly',
    ctaUrl: '/products/busly',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return productsData.map((p) => p.slug);
}

export function getRelatedProducts(slugs?: string[]): Product[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}
