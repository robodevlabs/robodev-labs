export interface AcademyProgram {
  id: string;
  title: string;
  badge: string;
  targetAudience: string;
  description: string;
  focusAreas: string[];
  format: string;
  keyTakeaway: string;
}

export const academyData: AcademyProgram[] = [
  {
    id: 'workshops',
    title: 'Hands-On Engineering Workshops',
    badge: 'Intensive Immersions',
    targetAudience: 'Students & Junior Developers',
    description:
      'Rigorous, practical code-along sessions designed around modern production stacks. Students build real applications and deploy them to production rather than following theoretical slide decks.',
    focusAreas: [
      'Full-Stack Web Engineering (React, Astro, Node.js)',
      'Git workflows, PR reviews & CI/CD best practices',
      'API design, database modeling & production security',
    ],
    format: 'Weekend intensives & collaborative code sprints',
    keyTakeaway: 'Production-ready code and live deployed portfolio applications.',
  },
  {
    id: 'mentorship',
    title: 'Engineering Mentorship & Career Guidance',
    badge: '1-on-1 & Small Group',
    targetAudience: 'Aspiring Engineers & Career Changers',
    description:
      'Direct guidance from experienced software practitioners. We help engineers bridge the gap between academic theory and the daily demands of professional engineering teams.',
    focusAreas: [
      'Code review, system design, and architectural thinking',
      'Resume reviews, portfolio critiques, and technical mock interviews',
      'Open-source contribution guidance and engineering trade-offs',
    ],
    format: 'Dedicated weekly mentorship & async feedback',
    keyTakeaway: 'Clear technical direction and the confidence to crack engineering roles.',
  },
  {
    id: 'hackathons',
    title: 'Hackathon Prep & Project Bootcamps',
    badge: 'Competitive Building',
    targetAudience: 'Student Teams & Innovators',
    description:
      'Accelerators engineered to train developers on rapid prototyping, team collaboration, product scoping, and presenting technical solutions under tight deadlines.',
    focusAreas: [
      'Rapid MVP scoping, wireframing, and sprint execution',
      'Integrating AI APIs and third-party developer platforms',
      'Product pitch structuring and live technical demo delivery',
    ],
    format: 'Fast-paced multi-day sprint simulations',
    keyTakeaway: 'The ability to transform an unvalidated idea into a working MVP in 48 hours.',
  },
];
