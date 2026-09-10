export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  status: 'Live' | 'Beta' | 'In Development' | 'In Research';
  description: string;
  highlights: string[];
  tags: string[];
  metrics?: { label: string; value: string }[];
  ctaText?: string;
  ctaUrl?: string;
  isFeatured?: boolean;
}

export const productsData: ProductItem[] = [
  {
    id: 'busly',
    name: 'Busly',
    badge: 'Flagship Mobility Product',
    tagline: 'Intelligent Public Transit & Smart Route Navigation',
    status: 'In Development',
    description:
      'Busly is a smart urban transit platform engineered to eliminate public transport unpredictability. By combining real-time GPS fleet tracking, intelligent arrival prediction algorithms, and intuitive commuter navigation, Busly turns chaotic daily commutes into effortless, planned journeys.',
    highlights: [
      'Real-time vehicle telemetry and ETA prediction engine',
      'Dynamic multi-modal route optimization across bus networks',
      'Offline-first mobile client architecture for spotty connectivity',
      'Fleet operator analytics dashboard for route efficiency',
    ],
    tags: ['Transit Tech', 'Real-Time Telemetry', 'Smart Mobility', 'Mobile Platform'],
    metrics: [
      { label: 'Target Market', value: 'Urban Commuters' },
      { label: 'Telemetry Precision', value: '< 15s Latency' },
      { label: 'Network Mode', value: 'Multi-Modal Transit' },
    ],
    ctaText: 'Learn About Busly',
    ctaUrl: '#contact',
    isFeatured: true,
  },
  {
    id: 'future-studio-ip',
    name: 'Autonomous Systems & Edge Tools',
    badge: 'Incubation Pipeline',
    tagline: 'Exploring edge computing and smart operational hardware-software integration.',
    status: 'In Research',
    description:
      'Our Product Studio actively prototypes internal software tools, developer utilities, and integrated edge systems. We identify friction points in real-world workflows and engineer software assets with long-term compound value.',
    highlights: [
      'Internal developer ergonomics and tooling experimentation',
      'Edge telemetry sensors paired with cloud data aggregation',
      'Reusable proprietary component libraries and SDKs',
    ],
    tags: ['Edge Computing', 'Developer Tooling', 'Venture IP'],
    ctaText: 'Partner With Our Studio',
    ctaUrl: '#contact',
    isFeatured: false,
  },
];
