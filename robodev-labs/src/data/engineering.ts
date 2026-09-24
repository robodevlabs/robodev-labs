/* ==========================================================================
   RoboDev Labs — Engineering Services Data
   Single source of truth for all Engineering Services content.
   Adding a new object to `engineeringServices` automatically:
   1. Shows its card on /services
   2. Generates /services/[slug]
   3. Requires zero edits to index.astro or ServiceTemplate.astro
   ========================================================================== */

export interface EngineeringFAQ {
  q: string;
  a: string;
}

export interface EngineeringService {
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  summary: string;
  overview: string;
  problems: string[];
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
  idealFor: string[];
  process: { title: string; description: string }[];
  faqs?: EngineeringFAQ[];
  relatedSlugs?: string[];
}

export interface EngineeringPageContent {
  eyebrow: string;
  headline: string;
  intro: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesIntro: string;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: string[];
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  steps: { index: string; title: string; description: string }[];
  whyEyebrow: string;
  whyTitle: string;
  whyIntro: string;
  values: { title: string; description: string }[];
  proofEyebrow: string;
  proofTitle: string;
  proofIntro: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

export const engineeringPage: EngineeringPageContent = {
  eyebrow: 'Engineering Services',
  headline: 'Software that helps teams operate, launch, and grow.',
  intro:
    'We design and build maintainable web applications, automation systems, and product platforms for teams with real operational needs. Direct communication, clear scope, and production-quality engineering.',
  primaryCtaLabel: 'Start a project',
  secondaryCtaLabel: 'Explore services',
  servicesEyebrow: 'What we build',
  servicesTitle: 'Three focused engineering offers',
  servicesIntro:
    'Each service is a defined scope of work with clear deliverables. Select one to see the full offering.',
  capabilitiesEyebrow: 'Capabilities',
  capabilitiesTitle: 'Supporting engineering capabilities',
  capabilitiesIntro:
    'Applied across our core services where relevant. We use only what each project actually needs.',
  capabilities: [
    'Frontend Development',
    'Backend Development',
    'REST APIs',
    'Database Design',
    'AI Integrations',
    'Workflow Automation',
    'UI/UX Implementation',
    'Cloud Deployment',
    'Testing & QA',
    'Maintenance & Support',
  ],
  processEyebrow: 'How we work',
  processTitle: 'A straightforward delivery process',
  processIntro: 'The same disciplined flow for every engagement, sized to the project.',
  steps: [
    { index: '01', title: 'Discover', description: 'Goals, users, constraints, and success criteria.' },
    { index: '02', title: 'Design', description: 'Architecture, interfaces, and delivery plan.' },
    { index: '03', title: 'Build', description: 'Incremental implementation with regular reviews.' },
    { index: '04', title: 'Test', description: 'Functional checks, edge cases, and fixes.' },
    { index: '05', title: 'Deploy', description: 'Release, configuration, and handover.' },
    { index: '06', title: 'Support', description: 'Maintenance, improvements, and iteration.' },
  ],
  whyEyebrow: 'Why RoboDev',
  whyTitle: 'Practical engineering for real needs',
  whyIntro:
    'We focus on software that is understandable, maintainable, and useful in daily operation.',
  values: [
    {
      title: 'Practical over theoretical',
      description:
        'We build what the operation requires. No unnecessary architecture or speculative features.',
    },
    {
      title: 'Direct communication',
      description:
        'You work with the engineers building your system. Scope, trade-offs, and progress are explicit.',
    },
    {
      title: 'Maintainable by default',
      description:
        'Readable code, documented decisions, andhandoff-ready structure so your team can continue with confidence.',
    },
    {
      title: 'Built for business use',
      description:
        'Interfaces, workflows, and integrations shaped around how your team actually operates.',
    },
  ],
  proofEyebrow: 'Proof',
  proofTitle: 'Built by the same engineering team',
  proofIntro:
    'Our Product Studio applies the same engineering standards to internal products. Representative work includes:',
  ctaTitle: 'Have something to build?',
  ctaDescription:
    'Tell us about your operation, product idea, or workflow. We will discuss scope and a sensible starting point.',
  ctaPrimaryLabel: 'Start a project',
  ctaSecondaryLabel: 'Explore services',
};

export const engineeringServices: EngineeringService[] = [
  {
    slug: 'custom-software',
    title: 'Custom Software',
    shortTitle: 'Custom Software',
    tagline: 'Web applications and business systems tailored to how you operate.',
    summary:
      'Internal tools, dashboards, portals, and APIs designed around your workflows and built for long-term maintenance.',
    overview:
      'We design and build custom web applications, internal business systems, dashboards, customer portals, and integrations. Each system starts from your operational requirements and is engineered for clarity, reliability, and maintainability — not generic templates.',
    problems: [
      'Manual processes managed across spreadsheets, messages, and disconnected tools',
      'Off-the-shelf software that does not match how your team works',
      'Legacy interfaces that are slow, unclear, or difficult to maintain',
      'Data scattered across systems with no reliable single view',
    ],
    capabilities: [
      'Web application design and development',
      'Internal dashboards and admin systems',
      'Customer and partner portals',
      'REST API design and implementation',
      'Database modelling and optimisation',
      'Authentication, roles, and permissions',
    ],
    deliverables: [
      'Production-ready web application with documented codebase',
      'Database schema and deployment configuration',
      'User roles and access management as specified',
      'Handover documentation and walkthrough',
    ],
    technologies: ['TypeScript', 'Node.js', 'Astro', 'PostgreSQL', 'REST APIs', 'Git'],
    idealFor: [
      'Teams replacing manual workflows with internal tooling',
      'Businesses needing a customer or partner portal',
      'Organisations requiring dashboards over operational data',
    ],
    process: [
      { title: 'Discover', description: 'Map workflows, users, data sources, and constraints.' },
      { title: 'Design', description: 'Define architecture, data model, and key interfaces.' },
      { title: 'Build', description: 'Implement incrementally with review checkpoints.' },
      { title: 'Test', description: 'Validate flows, permissions, and edge cases.' },
      { title: 'Deploy', description: 'Release to your infrastructure with documentation.' },
      { title: 'Support', description: 'Fixes, adjustments, and planned improvements.' },
    ],
    faqs: [
      {
        q: 'Who owns the code?',
        a: 'You do. Deliverables include the full codebase, documentation, and deployment configuration.',
      },
      {
        q: 'Can you work with our existing systems?',
        a: 'Yes. We integrate with existing databases, APIs, and tools where practical, and document the boundaries clearly.',
      },
    ],
    relatedSlugs: ['ai-automation', 'saas-product-development'],
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    shortTitle: 'AI Automation',
    tagline: 'AI-powered workflows that reduce repetitive operational work.',
    summary:
      'Practical AI integrations, assistants, and document/data automation connected to your existing tools and processes.',
    overview:
      'We implement focused AI automation: connecting language models, document processing, and workflow triggers to real business tasks. The emphasis is on measurable operational relief — triage, drafting, extraction, and routing — with human oversight where it matters.',
    problems: [
      'Repetitive drafting, summarising, or categorisation consuming staff time',
      'Documents and messages requiring manual extraction into systems',
      'Inconsistent follow-ups across sales, support, or operations',
      'AI tools used in isolation without connection to workflows',
    ],
    capabilities: [
      'AI workflow design and implementation',
      'Custom assistants grounded in your content',
      'Document extraction and structuring',
      'CRM, email, and operations tool integrations',
      'Human-in-the-loop review patterns',
    ],
    deliverables: [
      'Working AI-assisted workflow connected to your tools',
      'Prompt and configuration documentation',
      'Review and fallback handling for low-confidence outputs',
      'Usage guidance and maintenance notes',
    ],
    technologies: ['LLM APIs', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Automation Platforms'],
    idealFor: [
      'Operations teams handling high volumes of documents or messages',
      'Support and sales workflows needing consistent triage and drafting',
      'Businesses piloting AI on one well-defined process before scaling',
    ],
    process: [
      { title: 'Discover', description: 'Select one workflow with clear inputs and outputs.' },
      { title: 'Design', description: 'Define triggers, AI steps, review points, and integrations.' },
      { title: 'Build', description: 'Implement the workflow against real examples.' },
      { title: 'Test', description: 'Evaluate accuracy, failure modes, and guardrails.' },
      { title: 'Deploy', description: 'Release with monitoring and review routines.' },
      { title: 'Support', description: 'Refine prompts, thresholds, and integrations.' },
    ],
    faqs: [
      {
        q: 'Do we need AI expertise in-house?',
        a: 'No. We design the workflow, document how it operates, and provide practical guidance for daily use.',
      },
      {
        q: 'How do you handle AI errors?',
        a: 'Workflows include confidence handling, review steps, and clear fallback behaviour for uncertain outputs.',
      },
    ],
    relatedSlugs: ['custom-software', 'saas-product-development'],
  },
  {
    slug: 'saas-product-development',
    title: 'SaaS & Product Development',
    shortTitle: 'SaaS & Products',
    tagline: 'MVPs and SaaS platforms engineered for launch and iteration.',
    summary:
      'Prototypes, MVPs, and scalable SaaS foundations for startups and teams validating and growing a product.',
    overview:
      'We help founders and teams move from concept to a working product: scoping the smallest valuable release, building the core platform, and establishing a codebase that can evolve. The focus is launch readiness, user feedback loops, and sustainable iteration.',
    problems: [
      'Product idea without a clear path to a testable release',
      'Prototype that cannot scale or onboard real users',
      'SaaS foundation missing billing, roles, or operational basics',
      'Technical decisions blocking iteration speed',
    ],
    capabilities: [
      'MVP scoping and phased roadmapping',
      'Multi-tenant SaaS architecture foundations',
      'Authentication, billing readiness, and user management',
      'Responsive product interfaces',
      'Analytics and feedback instrumentation',
    ],
    deliverables: [
      'Working MVP or SaaS release deployed to production',
      'Core user journeys implemented end to end',
      'Codebase structured for iteration with documentation',
      'Launch checklist and next-phase recommendations',
    ],
    technologies: ['TypeScript', 'Astro', 'Node.js', 'PostgreSQL', 'REST APIs', 'Cloud Hosting'],
    idealFor: [
      'Founders validating a SaaS concept with real users',
      'Startups needing a rebuildable MVP foundation',
      'Teams extending a prototype into a maintainable product',
    ],
    process: [
      { title: 'Discover', description: 'Define users, core jobs, and launch scope.' },
      { title: 'Design', description: 'Plan product architecture and key journeys.' },
      { title: 'Build', description: 'Ship the MVP in reviewable increments.' },
      { title: 'Test', description: 'Harden onboarding, billing paths, and critical flows.' },
      { title: 'Deploy', description: 'Launch with observability and support readiness.' },
      { title: 'Support', description: 'Iterate based on usage and feedback.' },
    ],
    faqs: [
      {
        q: 'How do you keep MVP scope under control?',
        a: 'We define the smallest release that tests real value, document deferred items explicitly, and build so they can be added later.',
      },
      {
        q: 'Can you continue after launch?',
        a: 'Yes. The codebase and process are set up for continued iteration and support.',
      },
    ],
    relatedSlugs: ['custom-software', 'ai-automation'],
  },
];

export function getEngineeringService(slug: string): EngineeringService | undefined {
  return engineeringServices.find((s) => s.slug === slug);
}

export function getEngineeringSlugs(): string[] {
  return engineeringServices.map((s) => s.slug);
}

export function getRelatedServices(slugs?: string[]): EngineeringService[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => getEngineeringService(slug))
    .filter((s): s is EngineeringService => s !== undefined);
}
