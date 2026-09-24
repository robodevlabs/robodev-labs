/* ==========================================================================
   RoboDev Academy — Workshop / Course Data
   This is the single source of truth for all academy workshops.
   Individual course pages import their own slice; the catalog imports all.
   ========================================================================== */

export interface CurriculumLesson {
  title: string;
  duration?: string;
}

export interface CurriculumModule {
  title: string;
  lessons: CurriculumLesson[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Workshop {
  /* ─── Core identity ─── */
  id: string;
  slug: string;           // used in URL: /academy/courses/[slug]
  title: string;
  shortTitle?: string;    // for catalog list rows
  description: string;    // 1-2 sentence catalog description
  tagline?: string;       // outcome-focused hero sentence for course detail page

  /* ─── Classification ─── */
  level: string;
  format: string;
  duration: string;
  date?: string;

  /* ─── Pricing / access ─── */
  price: string;
  isFree: boolean;
  registrationUrl: string;
  paymentUrl?: string;

  /* ─── Status ─── */
  isFeatured?: boolean;
  status: 'upcoming' | 'open' | 'completed';

  /* ─── Course detail page fields ─── */
  outcomes?: string[];             // concrete learning outcomes
  whatYouWillBuild?: string[];     // project/use-case descriptions
  curriculum?: CurriculumModule[]; // modules with lesson lists
  skills?: string[];               // skills you'll gain
  tools?: string[];                // technologies/tools used
  longDescription?: string;        // extended markdown/html description with read more
  faqs?: FAQ[];                    // frequently asked questions
  relatedIds?: string[];           // IDs of related workshops
  hasCertificate?: boolean;        // true if confirmed
  instructor?: string;             // instructor name
  instructorTitle?: string;        // instructor title
  instructorBio?: string;          // bio
  provider?: string;               // e.g. "RoboDev Academy"
  targetAudience?: string[];       // target audience list
  prerequisites?: string[];        // prerequisites list
  includes?: string[];             // what the workshop includes
  language?: string;               // session language
  testimonials?: Array<{           // optional testimonials (rendered only when populated)
    name: string;
    role?: string;
    quote: string;
    avatar?: string;
  }>;
  reviews?: Array<{                // optional reviews (rendered only when populated)
    author: string;
    rating?: number;
    comment: string;
    date?: string;
  }>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   WORKSHOP DATA
   ─────────────────────────────────────────────────────────────────────────── */

export const workshopsData: Workshop[] = [
  /* ══════════════════════════════════════════════════════════════════════════
     1. AI AUTOMATION FOR BEGINNERS
     ══════════════════════════════════════════════════════════════════════════ */
  {
    id: 'ws-ai-automation',
    slug: 'ai-automation',
    title: 'AI Automation for Beginners',
    shortTitle: 'AI Automation',
    description:
      'A beginner-friendly introduction to AI automation, showing how AI can be connected to useful tasks and workflows without requiring a machine learning background.',
    tagline:
      'Understand AI automation, see how real workflows are built, and create your first useful AI-powered automation.',
    level: 'Beginner',
    format: 'Live Online · Introductory Workshop',
    duration: '1.5 Hours',
    date: 'Date to be announced',
    price: 'FREE',
    isFree: true,
    isFeatured: true,
    status: 'upcoming',

    instructor: 'Safal Bhattarai',
    instructorTitle: 'Founder, RoboDev Labs',
    instructorBio:
      'Safal is the founder of RoboDev Labs, a technology company focused on practical software, AI solutions, and opportunities for students and young engineers.',

    outcomes: [
      'Understand what AI automation is and how it differs from simply using AI chat tools',
      'Identify everyday tasks that can be improved through AI-powered automation',
      'Understand the basic building blocks of an AI automation workflow',
      'See how AI tools, APIs, and automation platforms work together',
      'Create a simple AI-powered workflow during the live workshop',
    ],

    whatYouWillBuild: [
      'A simple AI-powered workflow connected to a real-world task',
      'A practical automation that demonstrates the full input → AI → output flow',
    ],

    curriculum: [
      {
        title: 'Part 1 — What Is AI Automation?',
        lessons: [
          { title: 'AI vs. AI automation' },
          { title: 'Where automation can save time and effort' },
          { title: 'Real-world AI automation examples' },
        ],
      },
      {
        title: 'Part 2 — How AI Workflows Work',
        lessons: [
          { title: 'Inputs, AI processing, and outputs' },
          { title: 'Connecting tools inside a workflow' },
          { title: 'Building a simple automation step by step' },
        ],
      },
      {
        title: 'Part 3 — Start Building',
        lessons: [
          { title: 'Create your first practical workflow' },
          { title: 'Common beginner mistakes' },
          { title: 'Ideas for your next automation' },
        ],
      },
    ],

    skills: [
      'AI Workflow Design',
      'Task Automation',
      'API Integration Basics',
      'Prompt Optimization',
      'No-Code/Low-Code Automations',
    ],

    tools: [
      'AI Tools',
      'Automation Platforms',
      'APIs',
      'Web Applications',
    ],

    faqs: [
      {
        q: 'Do I need prior AI experience?',
        a: 'No. This workshop is designed for complete beginners and does not require a machine learning background.',
      },
      {
        q: 'Do I need programming experience?',
        a: 'No advanced programming knowledge is required. The workshop focuses on understanding and building practical automation workflows.',
      },
      {
        q: 'Is the workshop free?',
        a: 'Yes. This introductory workshop is completely free to attend.',
      },
      {
        q: 'Will I receive a certificate?',
        a: 'Yes. Participants who attend the workshop will receive a free RoboDev Academy certificate.',
      },
    ],

    relatedIds: [],
    hasCertificate: true,

    targetAudience: [
      'Students curious about AI',
      'Beginners exploring automation',
      'Freelancers and creators',
      'Anyone looking to automate repetitive tasks',
    ],

    prerequisites: [
      'No prior AI or machine learning experience required',
      'A laptop with a stable internet connection',
    ],

    includes: [
      'Live interactive session',
      'Practical guided activity',
      'Workshop resources',
      'Free certificate',
    ],

    language: 'English',

    registrationUrl: 'https://forms.gle/robodev-ai-workshop',
  },

  /* ══════════════════════════════════════════════════════════════════════════
     2. UI/UX DESIGN WITH FIGMA
     ══════════════════════════════════════════════════════════════════════════ */
  {
    id: 'ws-uiux-figma',
    slug: 'ui-ux-design-figma',
    title: 'UI/UX Design with Figma',
    shortTitle: 'UI/UX Design with Figma',
    description:
      'A practical introduction to UI/UX design using Figma, covering the process of turning ideas into clear, usable, and visually consistent digital interfaces.',
    tagline:
      'Learn the fundamentals of UI/UX design and turn an idea into a polished interface in Figma.',
    level: 'Beginner',
    format: 'Live Online · Practical Workshop',
    duration: '3 Hours',
    date: 'Date to be announced',
    price: 'Coming Soon',
    isFree: false,
    isFeatured: true,
    status: 'upcoming',

    instructor: 'RoboDev Academy',
    instructorTitle: 'Design & Product Team, RoboDev Labs',
    instructorBio:
      'The RoboDev Academy team teaches practical design skills through real product-oriented exercises, helping students understand how good interfaces are planned, designed, and communicated.',

    outcomes: [
      'Understand the difference between UI design and UX design',
      'Learn how to turn a product idea into a simple user flow',
      'Understand layout, spacing, typography, hierarchy, and visual consistency',
      'Use Figma to create and organize a practical interface design',
      'Create a polished screen that can be handed off for development',
    ],

    whatYouWillBuild: [
      'A simple user flow for a real digital product idea',
      'A polished Figma interface with reusable visual patterns',
    ],

    curriculum: [
      {
        title: 'Part 1 — UI vs. UX: What Are We Designing?',
        lessons: [
          { title: 'UI vs. UX and why both matter' },
          { title: 'User flows and product thinking' },
          { title: 'Reading and sketching an interface' },
        ],
      },
      {
        title: 'Part 2 — Figma Fundamentals',
        lessons: [
          { title: 'Figma workspace and tools overview' },
          { title: 'Frames, grids, and layout' },
          { title: 'Typography, color, and spacing' },
          { title: 'Components and reusable elements' },
        ],
      },
      {
        title: 'Part 3 — Build Your Interface',
        lessons: [
          { title: 'Design a real product screen step by step' },
          { title: 'Applying visual hierarchy' },
          { title: 'Preparing your design for handoff' },
        ],
      },
    ],

    skills: [
      'UI Design',
      'UX Flow Mapping',
      'Figma Components',
      'Visual Hierarchy',
      'Design System Foundations',
    ],

    tools: [
      'Figma',
      'Wireframing',
      'Prototyping',
      'Design Systems',
    ],
    faqs: [
      {
        q: 'Do I need previous design experience?',
        a: 'No. This workshop starts with the fundamentals and is designed for beginners.',
      },
      {
        q: 'Do I need a Figma account?',
        a: 'Yes. A free Figma account is sufficient for the workshop.',
      },
      {
        q: 'Will we design a real interface?',
        a: 'Yes. The workshop is practical and includes guided work on a real product-style interface.',
      },
      {
        q: 'Will I receive a certificate?',
        a: 'Yes. Participants who complete the workshop will receive a free RoboDev Academy certificate.',
      },
    ],

    relatedIds: ['ws-ai-automation', 'ws-seo'],
    hasCertificate: true,

    targetAudience: [
      'Students learning product design',
      'Aspiring UI/UX designers',
      'Developers wanting better design skills',
      'Founders and creators building digital products',
    ],

    prerequisites: [
      'No previous UI/UX experience required',
      'A laptop with Figma access',
    ],

    includes: [
      'Live practical instruction',
      'Guided Figma exercise',
      'Workshop resources',
      'Free certificate',
    ],

    language: 'English',

    registrationUrl: 'https://forms.gle/robodev-uiux-workshop',
  },

  /* ══════════════════════════════════════════════════════════════════════════
     3. SEO FUNDAMENTALS
     ══════════════════════════════════════════════════════════════════════════ */
  {
    id: 'ws-seo',
    slug: 'seo-fundamentals',
    title: 'SEO Fundamentals: Get Your Website Found',
    shortTitle: 'SEO Fundamentals',
    description:
      'A practical introduction to SEO covering how search engines discover websites, what makes pages searchable, and the core improvements beginners can make to their own websites.',
    tagline:
      'Learn the fundamentals of SEO and start improving how your website appears in search.',
    level: 'Beginner',
    format: 'Live Online · Practical Workshop',
    duration: '2.5 Hours',
    date: 'Date to be announced',
    price: 'Coming Soon',
    isFree: false,
    isFeatured: true,
    status: 'upcoming',

    instructor: 'RoboDev Academy',
    instructorTitle: 'RoboDev Labs',
    instructorBio:
      'RoboDev Academy focuses on practical digital skills that help students and creators build, launch, and grow useful products on the web.',

    outcomes: [
      'Understand how search engines discover, crawl, and index websites',
      'Learn the fundamentals of on-page SEO and search-friendly content',
      'Understand keywords, search intent, titles, descriptions, and page structure',
      'Identify common technical SEO problems that can affect visibility',
      'Build a practical SEO checklist you can apply to your own website',
    ],

    whatYouWillBuild: [
      'An SEO audit checklist for a real website',
      'Improved page titles, descriptions, headings, and content structure',
      'A simple action plan for improving a website\'s search visibility',
    ],

    curriculum: [
      {
        title: 'Part 1 — How Search Works',
        lessons: [
          { title: 'How search engines discover and index pages' },
          { title: 'Search intent and what users are looking for' },
          { title: 'The difference between ranking and visibility' },
        ],
      },
      {
        title: 'Part 2 — On-Page SEO',
        lessons: [
          { title: 'Keywords and search intent' },
          { title: 'Titles, meta descriptions, and headings' },
          { title: 'Content structure and internal links' },
          { title: 'Images, URLs, and accessibility basics' },
        ],
      },
      {
        title: 'Part 3 — Technical SEO & Action Plan',
        lessons: [
          { title: 'Technical SEO fundamentals' },
          { title: 'Mobile performance and page experience' },
          { title: 'Basic SEO tools and reporting' },
          { title: 'Create your website improvement checklist' },
        ],
      },
    ],

    skills: [
      'On-Page SEO',
      'Search Intent Analysis',
      'Technical SEO Basics',
      'Meta Tags Optimization',
      'Site Audit Checklist',
    ],

    tools: [
      'Google Search',
      'Google Search Console',
      'Google Analytics',
      'SEO Audit Tools',
    ],

    faqs: [
      {
        q: 'Is this workshop suitable for beginners?',
        a: 'Yes. The workshop starts with the fundamentals and does not require previous SEO experience.',
      },
      {
        q: 'Do I need to own a website?',
        a: 'No. You can follow the workshop using examples, but having your own website will make the practical exercises more useful.',
      },
      {
        q: 'Does SEO guarantee higher rankings?',
        a: 'No. SEO helps improve a website’s technical quality, relevance, and discoverability, but search rankings are influenced by many factors and cannot be guaranteed.',
      },
      {
        q: 'Will I receive a certificate?',
        a: 'Yes. Participants who complete the workshop will receive a free RoboDev Academy certificate.',
      },
    ],

    relatedIds: ['ws-ai-automation', 'ws-uiux-figma'],
    hasCertificate: true,

    targetAudience: [
      'Students learning digital marketing',
      'Website owners and creators',
      'Developers and designers',
      'Freelancers and small business owners',
    ],

    prerequisites: [
      'No previous SEO experience required',
      'A laptop with internet access',
    ],

    includes: [
      'Live practical instruction',
      'SEO checklist and resources',
      'Guided website analysis',
      'Free certificate',
    ],

    language: 'English',

    registrationUrl: 'https://forms.gle/robodev-seo-workshop',
  },
];

/* ─── Convenience lookup ─── */
export function getWorkshopById(id: string): Workshop | undefined {
  return workshopsData.find((w) => w.id === id);
}

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshopsData.find((w) => w.slug === slug);
}

export function getRelatedWorkshops(ids: string[]): Workshop[] {
  return ids
    .map((id) => getWorkshopById(id))
    .filter((w): w is Workshop => w !== undefined);
}
