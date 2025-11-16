export interface SectionData {
  id: string;
  title: string;
  description: string;
  image: string;
  projects?: Project[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  project_url: string;
}

export interface PortfolioData {
  about: SectionData;
  experience: SectionData;
  projects: SectionData;
}
