export interface ServiceItem {
  id: string;
  title: string;
  category: 'software' | 'ai' | 'cloud' | 'growth';
  badge: string;
  tagline: string;
  description: string;
  capabilities: string[];
  icon: 'code' | 'cpu' | 'cloud' | 'sparkles' | 'database' | 'smartphone';
}

export const servicesData: ServiceItem[] = [
  {
    id: 'software-engineering',
    title: 'Custom Software & Applications',
    category: 'software',
    badge: 'Full-Cycle Development',
    tagline: 'High-performance web, mobile, and SaaS applications built for scale.',
    description:
      'We design and build production-grade web applications, responsive platforms, and mobile apps with resilient architectures and clean, maintainable codebases.',
    capabilities: [
      'Web Application & SaaS Development',
      'Cross-Platform Mobile Apps (iOS & Android)',
      'High-Throughput REST & GraphQL APIs',
      'Modern UI/UX Implementation',
      'Database Architecture & Optimization',
    ],
    icon: 'code',
  },
  {
    id: 'ai-automation',
    title: 'AI Solutions & Intelligent Systems',
    category: 'ai',
    badge: 'AI & Machine Learning',
    tagline: 'Practical AI implementations delivering measurable business automation.',
    description:
      'From custom LLM integrations and agentic pipelines to predictive models and workflow automation, we engineer intelligent systems that solve real operational bottlenecks.',
    capabilities: [
      'Custom LLM & Agentic Workflow Integrations',
      'Document Intelligence & Retrieval (RAG)',
      'Process & Workflow Automation',
      'Computer Vision & Data Extraction',
      'Predictive Analytics & Model Serving',
    ],
    icon: 'cpu',
  },
  {
    id: 'cloud-backend',
    title: 'Cloud Infrastructure & Backend Systems',
    category: 'cloud',
    badge: 'Cloud & DevOps',
    tagline: 'Secure, reliable cloud environments designed for continuous uptime.',
    description:
      'We architect scalable cloud infrastructure, automated CI/CD pipelines, and microservices backends that sustain high concurrency and enterprise data integrity.',
    capabilities: [
      'Serverless & Microservices Architecture',
      'Cloud Migration & Optimization (AWS/GCP)',
      'Automated CI/CD & Deployment Pipelines',
      'Observability, Logging & Security Hardening',
      'Scalable Data Pipelines & Storage',
    ],
    icon: 'cloud',
  },
  {
    id: 'digital-capabilities',
    title: 'Digital Positioning & Growth Systems',
    category: 'growth',
    badge: 'Strategic Growth',
    tagline: 'Technical branding, SEO optimization, and digital interfaces that convert.',
    description:
      'Engineering excellence paired with strategic brand identity, high-conversion web experiences, and search visibility to help technology products find and retain users.',
    capabilities: [
      'Technical SEO & Performance Auditing',
      'Product Brand Identity & Design Systems',
      'Conversion-Optimized Web Interfaces',
      'Content Architecture & Technical Writing',
      'Data-Driven Growth & Analytics Setup',
    ],
    icon: 'sparkles',
  },
];
