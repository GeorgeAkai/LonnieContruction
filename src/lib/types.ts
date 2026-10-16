export type Project = {
  id: string;
  title: string;
  city: string;
  category: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;

export const CATEGORIES = [
  "Stucco Repair",
  "New Stucco",
  "Re-Stucco",
  "Color Coat",
  "Interior Plaster",
  "Fire Rebuild",
] as const;
