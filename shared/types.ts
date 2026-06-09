export interface Meta {
  siteTitle: string;
  description: string;
  basePath: string;
  frameworks: string[];
  defaultFramework: string;
  frameworkLabels: Record<string, string>;
  routing: string;
  frameworkPaths: Record<string, string>;
  showPhonePublicly?: boolean;
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  taglines?: string[];
  location: string;
  email: string;
  phone?: string;
  links: { linkedin: string; github: string };
  image?: string;
  available?: boolean;
  resumeUrl?: string;
  stats?: ProfileStat[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Role {
  title: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface Company {
  company: string;
  location: string;
  roles: Role[];
}

export interface Project {
  name: string;
  url: string;
  date: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  credential: string;
  start: string;
  end: string;
}

export interface AboutSitePillar {
  title: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface AboutSite {
  intro: string;
  pillars: AboutSitePillar[];
}

export interface Content {
  meta: Meta;
  profile: Profile;
  summary: string;
  skills: Skill[];
  experience: Company[];
  projects: Project[];
  education: Education[];
  aboutSite: AboutSite;
}
