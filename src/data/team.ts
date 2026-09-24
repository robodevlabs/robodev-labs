export interface Founder {
  id: string;
  name: string;
  role: string;
  eyebrow: string;
  bio: string;
  image: string;
  imageAlt: string;
  aspectRatio?: string;
}

export interface DepartmentLead {
  id: string;
  department: string;
  role: string;
  name: string;
  divisionScope: string;
  image?: string;
  imageAlt?: string;
}

export const foundersData: Founder[] = [
  {
    id: 'safal-bhattarai',
    name: 'Safal Bhattarai',
    role: 'Co-Founder & CEO',
    eyebrow: 'FOUNDER',
    bio: 'Directing engineering strategy, architectural systems, and the long-term vision of RoboDev Labs as a venture studio.',
    image: '/src/assets/images/CEO Photo.png',
    imageAlt: 'Safal Bhattarai, Co-Founder and CEO of RoboDev Labs',
    aspectRatio: '3/4',
  },
  {
    id: 'co-founder-technical',
    name: 'Salisha Adhikari',
    role: 'Co-Founder & Finance Lead',
    eyebrow: 'FOUNDER',
    bio: 'Spearheading financial strategy, investments, and growth for RoboDev Labs as a venture studio.',
    image: '/src/assets/images/Co Founder Photo.jpeg',
    imageAlt: 'Salisha Adhikari, Co-Founder and Finance Lead of RoboDev Labs',
    aspectRatio: '4/5',
  },
];

export const departmentLeadsData: DepartmentLead[] = [
  {
    id: 'engineering',
    department: 'Engineering Services',
    role: 'Head of Department',
    name: 'Safal Bhattarai',
    divisionScope: 'Custom software, cloud infrastructure, and AI workflow delivery.',
    image: '/src/assets/images/CEO Photo.png',
    imageAlt: 'Safal Bhattarai, Head of Engineering Services',
  },
  {
    id: 'academy',
    department: 'RoboDev Academy',
    role: 'Head of Department',
    name: 'Safal Bhattarai',
    divisionScope: 'Developer training, practical engineering workshops, and mentorship.',
    image: '/src/assets/images/CEO Photo.png',
    imageAlt: 'Safal Bhattarai, Head of RoboDev Academy',
  },
  {
    id: 'product-studio',
    department: 'Product Studio',
    role: 'Head of Department',
    name: 'Safal Bhattarai',
    divisionScope: 'Proprietary product incubation, Busly transit platform, and venture validation.',
    image: '/src/assets/images/CEO Photo.png',
    imageAlt: 'Safal Bhattarai, Head of Product Studio',
  },
  {
    id: 'media-growth',
    department: 'Media & Growth',
    role: 'Head of Department',
    name: 'Safal Bhattarai',
    divisionScope: 'Brand systems, design direction, community growth, and digital reach.',
    image: '/src/assets/images/CEO Photo.png',
    imageAlt: 'Safal Bhattarai, Head of Media & Growth',
  },
];
