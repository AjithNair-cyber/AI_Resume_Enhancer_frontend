type Experience = {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
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
  start_date: string;
  end_date : string;
  cgpa?: string;
  percentage?: string;
};

type Certification = {
  title: string;
  start_date : string;
  end_date: string;
  organization: string;
}

type ResumeFormValues = {
  job: string;
  resume: File | null;
};

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
  created_at: string;
};

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
}

