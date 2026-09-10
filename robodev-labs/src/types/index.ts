export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TextVariant = 'body' | 'large' | 'small' | 'muted' | 'eyebrow' | 'caption' | 'label';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface SiteConfig {
  name: string;
  founder: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook: string;
    x: string;
    tiktok: string;
  };
  divisions: Array<{
    id: string;
    name: string;
    shortDesc: string;
  }>;
}
