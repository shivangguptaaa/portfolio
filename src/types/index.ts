export type Skin = "phosphor" | "ivory" | "riso";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  domain: string;
  badge: "PRODUCTION PLATFORM" | "LIVE WEB APP" | "RESEARCH CASE STUDY";
  description: string;
  whatItDoes: string[];
  whatItRefuses: string[];
  keyFeatures?: string[];
  refusals?: string[];
  metrics: ProjectMetric[];
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  isBciInteractive?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
