import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'RoboDev Labs',
  founder: 'Safal Bhattarai',
  tagline: 'Software Solutions. Developer Education. Technology Products.',
  description:
    'RoboDev Labs is a technology company building practical software solutions, educating and mentoring aspiring engineers, and creating proprietary software products.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://robodevlabs.com',
  email: 'robodevlabs.team@gmail.com',
  socials: {
    github: 'https://github.com/RoboDevLabs',
    linkedin: 'https://linkedin.com/company/robodevlabs',
    instagram: 'https://instagram.com/robodevlabs',
    youtube: 'https://youtube.com/@robodevlabs',
    facebook: 'https://facebook.com/robodevlabs',
    x: 'https://x.com/robodevlabs',
    tiktok: 'https://tiktok.com/@robodevlabs',
  },
  divisions: [
    {
      id: 'services',
      name: 'Engineering Services',
      shortDesc: 'Custom software, AI solutions, web & mobile applications, and cloud architecture.',
    },
    {
      id: 'academy',
      name: 'RoboDev Academy',
      shortDesc: 'Practical technology training, hands-on workshops, and developer mentorship.',
    },
    {
      id: 'products',
      name: 'Product Studio',
      shortDesc: 'Incubating proprietary technology products, starting with the Busly transit platform.',
    },
  ],
};
