import { ExperienceRange } from "@/app/components/filters/ExperienceFilter";

export interface ActiveFilters {
  searchTerm?: string;
  specialties?: string[];
  cities?: string[];
  degrees?: string[];
  experienceRange?: ExperienceRange;
}
