import type * as z from "zod";
import type { personalInfoSchema } from "@/lib/schemas";
import type { contactDetailsSchema } from "@/lib/schemas";
import type { residentialDetailsSchema } from "@/lib/schemas";

export interface UserProps {
  clerkId: string;
  email: string;
  fullName: string;
}

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type ContactDetailsValues = z.infer<typeof contactDetailsSchema>;
export type ResidentialDetailsValues = z.infer<typeof residentialDetailsSchema>;
