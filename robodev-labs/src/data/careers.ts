/* ==========================================================================
   RoboDev Labs — Careers Data
   Single source of truth for all career content.
   Adding a new object to `careersData` automatically:
   1. Shows it on /career
   2. Generates /careers/[slug]
   3. Requires zero edits to career.astro or CareerTemplate.astro
   ========================================================================== */

import { siteConfig } from '../config/site';

export type CareerStatus = 'Open' | 'Closed' | 'Upcoming';

export interface Career {
  slug: string;
  title: string;
  shortTitle?: string;
  status: CareerStatus;
  employmentType: string;
  department: string;
  location: string;
  workMode: string;
  duration?: string;
  experience: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred?: string[];
  technologies: string[];
  learningOutcomes?: string[];
  benefits?: string[];
  applicationEmail: string;
  applicationSubject: string;
  applicationInstructions: string;
}

export interface CareersValue {
  title: string;
  description: string;
}

export interface CareersProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface CareersPageContent {
  eyebrow: string;
  headline: string;
  intro: string;
  positionsEyebrow: string;
  positionsTitle: string;
  positionsIntro: string;
  valuesEyebrow: string;
  valuesTitle: string;
  valuesIntro: string;
  values: CareersValue[];
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  steps: CareersProcessStep[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyCtaLabel: string;
}

/* ── Page copy: presentation files must not hardcode this ── */
export const careersPage: CareersPageContent = {
  eyebrow: 'Careers at RoboDev Labs',
  headline: 'Build real software. Grow as an engineer.',
  intro:
    'We hire people who want to work on production systems, take ownership of their work, and keep improving their craft. Every role at RoboDev Labs involves real projects, direct mentorship, and clear engineering standards.',
  positionsEyebrow: 'Open positions',
  positionsTitle: 'Current openings',
  positionsIntro:
    'These are the roles we are actively hiring for. Each posting describes the work, the expectations, and how to apply.',
  valuesEyebrow: 'Why work here',
  valuesTitle: 'An environment built for engineers',
  valuesIntro:
    'We keep teams small, expectations clear, and the work practical. You will know what you are building and why it matters.',
  values: [
    {
      title: 'Real projects, not shadowing',
      description:
        'You contribute to live codebases, client systems, and internal products from early on, with review and guidance from experienced engineers.',
    },
    {
      title: 'Ownership with support',
      description:
        'You take responsibility for defined tasks and deliverables. Scope is explicit, feedback is direct, and help is available when you need it.',
    },
    {
      title: 'Structured learning',
      description:
        'Roles include the technologies, patterns, and workflows you will practise, so growth is tied to the work itself rather than abstract training.',
    },
    {
      title: 'Engineering standards',
      description:
        'We value readable code, careful testing, clear communication, and steady iteration over speed alone.',
    },
  ],
  processEyebrow: 'What to expect',
  processTitle: 'A simple application process',
  processIntro:
    'No lengthy portals or automated filters. We read every application ourselves.',
  steps: [
    {
      index: '01',
      title: 'Apply by email',
      description:
        'Send your background, relevant work, and the role you are applying for to our hiring inbox.',
    },
    {
      index: '02',
      title: 'Introductory conversation',
      description:
        'A short discussion about your experience, interests, and the specifics of the role.',
    },
    {
      index: '03',
      title: 'Practical task',
      description:
        'A focused, role-relevant exercise that reflects the actual work you would do.',
    },
    {
      index: '04',
      title: 'Decision and onboarding',
      description:
        'Clear next steps, expectations, and a structured start if there is a mutual fit.',
    },
  ],
  ctaTitle: 'Do not see the right fit?',
  ctaDescription:
    'If your background aligns with the work we do, you can still reach out. Tell us what you build and what you want to work on.',
  ctaPrimaryLabel: 'View open positions',
  ctaSecondaryLabel: 'Contact us',
  emptyTitle: 'No open positions right now',
  emptyDescription:
    'We are not actively hiring at the moment. You can still contact us with your background and interests, and we will keep it in mind for future roles.',
  emptyCtaLabel: 'Contact us',
};

/* ── Open positions ── */
export const careersData: Career[] = [
  {
    slug: 'frontend-development-intern',
    title: 'Frontend Development Intern',
    shortTitle: 'Frontend Intern',
    status: 'Open',
    employmentType: 'Internship',
    department: 'Engineering',
    location: 'Nepal',
    workMode: 'Hybrid / Remote-friendly',
    duration: '3 months, with possible extension based on performance',
    experience: 'Beginner — suitable for students and recent learners with frontend fundamentals',
    summary:
      'A hands-on internship focused on building production-quality web interfaces with modern frontend tools, guided by practising engineers.',
    description:
      'As a Frontend Development Intern, you will work on real interface tasks across RoboDev Labs projects. You will implement layouts from designs, improve existing components, fix UI issues, and learn how frontend code is structured, reviewed, and shipped in a professional workflow.',
    responsibilities: [
      'Implement responsive web interfaces from Figma designs and written specifications',
      'Work with existing Astro, HTML, CSS, and TypeScript codebases to add features and fix issues',
      'Improve accessibility, spacing, typography, and mobile behaviour of assigned pages',
      'Test your work across viewports and document what you changed',
      'Participate in code reviews and apply feedback to your work',
    ],
    requirements: [
      'Working knowledge of HTML, CSS, and JavaScript fundamentals',
      'Familiarity with responsive layouts using flexbox or grid',
      'Basic understanding of Git for commits, branches, and pull requests',
      'Ability to follow a design and match spacing, typography, and structure carefully',
      'Clear written communication and willingness to ask questions',
    ],
    preferred: [
      'Exposure to TypeScript or a component-based framework',
      'Familiarity with Figma for reading designs and extracting styles',
      'Personal or coursework projects hosted on GitHub',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Astro', 'Git', 'Figma'],
    learningOutcomes: [
      'Build and ship responsive interfaces used in real projects',
      'Practise component structure, naming, and reusable styling patterns',
      'Learn professional Git workflow with reviews and revisions',
      'Understand accessibility and performance basics for production interfaces',
    ],
    benefits: [
      'Direct mentorship from practising engineers',
      'Portfolio-ready work based on real project contributions',
      'Certificate and recommendation based on completed work',
    ],
    applicationEmail: siteConfig.email,
    applicationSubject: 'Application: Frontend Development Intern',
    applicationInstructions:
      'Email your CV, a short introduction, and links to any frontend work such as GitHub repositories or deployed pages. Mention your availability and current learning focus.',
  },
  {
    slug: 'junior-backend-developer',
    title: 'Junior Backend Developer',
    shortTitle: 'Junior Backend Developer',
    status: 'Open',
    employmentType: 'Full-time · Junior',
    department: 'Engineering',
    location: 'Nepal',
    workMode: 'Hybrid / On-site collaboration as needed',
    experience: 'Junior — 0 to 2 years of practical backend or full-stack development experience',
    summary:
      'A junior engineering role focused on building and maintaining backend services, APIs, and data flows used in production systems.',
    description:
      'As a Junior Backend Developer, you will help design, implement, and maintain server-side systems. The work includes API development, database modelling, integration with frontend applications, and improving reliability through testing and careful code review.',
    responsibilities: [
      'Design and implement REST APIs and backend logic for web and mobile applications',
      'Model and query relational data with attention to correctness and performance',
      'Integrate backend services with frontend clients and third-party APIs',
      'Write tests, handle errors carefully, and document endpoints and behaviour',
      'Collaborate with senior engineers through planning, reviews, and deployment',
    ],
    requirements: [
      'Practical experience with a backend language such as Node.js, Python, or similar',
      'Understanding of HTTP, REST principles, authentication basics, and JSON data handling',
      'Working knowledge of a relational database such as PostgreSQL or MySQL',
      'Familiarity with Git workflow and collaborative code review',
      'Ability to break down requirements into clear, testable implementation steps',
    ],
    preferred: [
      'Experience with TypeScript and Node.js frameworks',
      'Familiarity with API documentation and tools such as Postman',
      'Exposure to deployment, environment configuration, or CI basics',
      'Contributions to production or open-source backend projects',
    ],
    technologies: ['Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Git', 'Postman'],
    learningOutcomes: [
      'Ship backend features used in production applications',
      'Practise API design, validation, and error-handling standards',
      'Learn database modelling and query optimisation in real systems',
      'Grow through structured reviews and incremental responsibility',
    ],
    benefits: [
      'Mentorship and code review from experienced engineers',
      'Clear growth path toward mid-level backend responsibilities',
      'Work on client systems and internal products with real users',
    ],
    applicationEmail: siteConfig.email,
    applicationSubject: 'Application: Junior Backend Developer',
    applicationInstructions:
      'Email your CV, a summary of your backend experience, and links to relevant code or projects. Include the technologies you have used and describe one backend feature you built end to end.',
  },
];

/* ── Helpers: pages consume these, never hardcode slugs ── */
export function getCareerBySlug(slug: string): Career | undefined {
  return careersData.find((c) => c.slug === slug);
}

export function getOpenCareers(): Career[] {
  return careersData.filter((c) => c.status === 'Open');
}

export function getAllCareerSlugs(): string[] {
  return careersData.map((c) => c.slug);
}
