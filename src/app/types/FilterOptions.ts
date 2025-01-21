import { Degree, Specialty } from "@/app/constants/advocates";

export interface FilterOptions {
  cities: string[];
  allSpecialties: Specialty[];
  allDegrees: Degree[];
}
