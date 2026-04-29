// Types for all data models
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  family: string;
  origin: string;
  description: string;
  features: string[];
  imageUrl: string;
  specSheetUrl: string | null;
  isNew: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  imageUrl: string;
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface ImportCountry {
  id: string;
  country: string;
  isoCode: string;
  alpha2: string;
  label: string;
  description: string;
  products: string[];
}
