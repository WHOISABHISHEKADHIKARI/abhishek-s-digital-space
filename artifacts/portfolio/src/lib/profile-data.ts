export interface Profile {
  name: string;
  linkedin: string;
  github: string;
  email: string;
  website: string;
  redesignProfile: string;
  address: {
    locality: string;
    region: string;
    country: string;
    countryCode: string;
    postalCode: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  image: string;
  sameAs: string[];
  description: string;
  jobTitle: string;
  knowsLanguage: string[];
}

export interface Project {
  category: string;
  items: Array<{
    name: string;
    url: string;
    imageUrl?: string;
  }>;
}

export interface Experience {
  role: string;
  organization: string;
  type: string;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  summary: string;
  responsibilities: string[];
  impact: string[];
  skills: string[];
  logoUrl?: string;
}

export interface Volunteering {
  role: string;
  organization: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  duration: string;
  category: string;
  summary: string;
  responsibilities?: string[];
  impact?: string[];
  images?: Array<{
    type: string;
    caption: string;
    description: string;
    pdfLine?: number;
    imageUrl: string;
    filename?: string;
  }>;
  projects?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  platform: string | null;
  date: string;
  url: string | null;
  credentialId: string | null;
  skills: string[];
  imageUrl: string | null;
}

export interface Recommendation {
  name: string;
  title: string;
  relationship: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

export interface BlogPost {
  title: string;
  publication: string;
  date: string;
  url: string;
  summary: string;
  tags: string[];
}

export interface NewsMedia {
  type: string;
  title: string;
  source: string;
  date: string;
  description: string;
  url: string | null;
  imageUrl: string | null;
}

export interface SkillCategory {
  category: string;
  items: Array<{
    name: string;
    level: number;
  }>;
}

export interface MediaAppearance {
  type: string;
  title: string;
  outlet: string;
  date: string;
  description: string;
  url: string | null;
  imageUrl: string | null;
}

export interface FeaturedHighlight {
  title: string;
}

export interface ProfileData {
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  volunteering: Volunteering[];
  certifications: Certification[];
  recommendations: Recommendation[];
  blog: BlogPost[];
  newsMedia: NewsMedia[];
  mediaAppearances?: MediaAppearance[];
  skills: SkillCategory[];
  featuredHighlights: FeaturedHighlight[];
}

export function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  const s = String(value).trim();
  const months: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  };
  let m = s.match(/^(\d{4})$/);
  if (m) return `${m[1]}-01-01`;
  m = s.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (m) return `${m[1]}-${m[2]}${m[3] ? `-${m[3]}` : "-01"}`;
  m = s.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})$/i);
  if (m) return `${m[2]}-${String(months[m[1].toLowerCase().slice(0, 3)]).padStart(2, "0")}-01`;
  m = s.match(/^(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})$/i);
  if (m) return `${m[3]}-${String(months[m[2].toLowerCase().slice(0, 3)]).padStart(2, "0")}-${String(m[1]).padStart(2, "0")}`;
  return undefined;
}

export function getLastModDate(data: ProfileData): string {
  const dates: string[] = [];
  
  data.experience.forEach(exp => {
    const d = toIsoDate(exp.endDate || exp.startDate);
    if (d) dates.push(d);
  });
  
  data.certifications.forEach(cert => {
    const d = toIsoDate(cert.date);
    if (d) dates.push(d);
  });
  
  data.newsMedia.forEach(news => {
    const d = toIsoDate(news.date);
    if (d) dates.push(d);
  });
  
  data.volunteering.forEach(vol => {
    const d = toIsoDate(vol.date || vol.startDate || vol.endDate);
    if (d) dates.push(d);
  });
  
  data.blog.forEach(post => {
    const d = toIsoDate(post.date);
    if (d) dates.push(d);
  });
  
  if (dates.length === 0) return new Date().toISOString().split('T')[0];
  
  return dates.sort((a, b) => b.localeCompare(a))[0];
}

export const OPEN_SOURCE_FACTS = {
  skillsAdded: 125,
  mergedPRs: 36,
  smeSkillsCount: 106,
  smePRRange: "#1688–#1698",
  smeDateRange: "September 29–30, 2026 (Nepal time)",
  readmeRanking: {
    mostCommits: 1,
    mostSkillsAdded: 2,
    verifiedDate: "October 11, 2026",
    source: "Agentic Awesome Skills README"
  },
  evidenceLinks: {
    githubProfile: "https://github.com/WHOISABHISHEKADHIKARI",
    repo: "https://github.com/sickn33/agentic-awesome-skills",
    readmeContributors: "https://github.com/sickn33/agentic-awesome-skills#top-contributors",
    prSearch: "https://github.com/sickn33/agentic-awesome-skills/pulls?q=is%3Apr+is%3Amerged+author%3AWHOISABHISHEKADHIKARI",
    pr1688: "https://github.com/sickn33/agentic-awesome-skills/pull/1688",
    pr1698: "https://github.com/sickn33/agentic-awesome-skills/pull/1698",
    starHistory: "https://www.star-history.com/sickn33/agentic-awesome-skills/"
  }
} as const;