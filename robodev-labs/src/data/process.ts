export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const processData: ProcessStage[] = [
  {
    step: '01',
    title: 'Discover',
    subtitle: 'Scope & Requirements Clarification',
    description:
      'We deeply analyze your business objectives, target audience, technical constraints, and competitive landscape to define precise, realistic engineering specifications.',
    deliverables: ['Product Scope & Tech Stack Selection', 'Architecture Blueprint', 'Delivery Timeline'],
  },
  {
    step: '02',
    title: 'Plan',
    subtitle: 'System Architecture & Interface Design',
    description:
      'We architect database schemas, API contracts, security protocols, and interactive UI/UX prototypes before writing production code, ensuring smooth execution.',
    deliverables: ['Figma UI Design Specs', 'Data Models & API Contracts', 'Milestone Roadmap'],
  },
  {
    step: '03',
    title: 'Build',
    subtitle: 'Agile Engineering Sprints',
    description:
      'Clean, modular, thoroughly commented and tested code written in focused sprint cycles with weekly progress demos and transparent Git version control.',
    deliverables: ['Weekly Working Demos', 'Clean TypeScript Codebases', 'Sprint Reports'],
  },
  {
    step: '04',
    title: 'Test',
    subtitle: 'Quality Assurance & Performance Audits',
    description:
      'Comprehensive validation covering cross-browser rendering, mobile responsiveness, stress testing, edge-case vulnerability assessments, and accessibility checks.',
    deliverables: ['Zero-Regression Test Suite', 'Performance Score 95+', 'Security Review'],
  },
  {
    step: '05',
    title: 'Launch',
    subtitle: 'Zero-Downtime Production Deployment',
    description:
      'Configuring production cloud infrastructure, SSL, custom domain DNS routing, monitoring alerts, and automated backup regimes for a flawless public debut.',
    deliverables: ['CI/CD Pipeline Setup', 'Cloud Environment Live', 'DNS & Monitoring Active'],
  },
  {
    step: '06',
    title: 'Improve',
    subtitle: 'Telemetry, Iteration & Growth',
    description:
      'Analyzing real user telemetry, system metrics, and feedback loops to continuously optimize speed, introduce new capabilities, and scale infrastructure sustainably.',
    deliverables: ['Analytics & Error Tracking', 'Post-Launch Optimizations', 'Long-Term Support'],
  },
];
