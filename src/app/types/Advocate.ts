import { Degree, Specialty } from "@/app/constants/advocates";

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: Degree;
  specialties: Specialty[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: string;
}
