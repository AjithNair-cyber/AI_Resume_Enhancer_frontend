// Create styles
type Experience = {
  title: string;
  company: string;
  dates: string;
  description: string[];
};

type Project = {
  title: string;
  description: string[];
  tech_stack: string;
};

type Education = {
  institution: string;
  degree: string;
  dates: string;
  cgpa?: string;
  percentage?: string;
};

type Certification = {
  title: string;
  date : string;
  organization: string;
}

type ResumeData = {
  name: string;
  job_role: string;
  mobile: string;
  email: string;
  linkedin: string;
  github: string;
  professional_summary: string;
  key_skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  hobbies: string[];
  languages: string[];
};
