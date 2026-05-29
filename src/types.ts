export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  advantages: string[];
  equipmentList?: string[];
  icon: string;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  details: string[];
  equipments: string[];
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  country: string;
  year: string;
  status: 'Complété' | 'En cours' | 'Planifié';
  imagePlaceholderColor: string; // Dynamic modern CSS backgrounds instead of breaking images
}

export interface KeyStatistic {
  id: string;
  label: string;
  value: string;
  iconName: string;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  summary: string;
  email: string;
  phone: string;
  phone2?: string;
  address: string;
  whatsapp: string;
  locations: string[];
  vision: string;
  mission: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  institution: string;
  text: string;
  country: string;
}
