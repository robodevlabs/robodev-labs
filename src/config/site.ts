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
    linkedin: 'https://www.linkedin.com/company/robodev-labs/',
    instagram: 'https://www.instagram.com/bhattarairobert/',
    youtube: 'https://www.youtube.com/@_learnwithrobert',
    facebook: 'https://facebook.com/robodevlabs',
    x: 'https://x.com/RobodevLab',
    tiktok: 'https://www.tiktok.com/@robobhattarai',
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
