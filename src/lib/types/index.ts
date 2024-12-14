import type * as z from "zod";
import type {
  personalInfoSchema,
  contactInfoSchema,
  residentialInfoSchema,
  otherInfoSchema,
  finalVerificationSchema,
} from "@/lib/schemas";

export interface UserProps {
  clerkId: string;
  email: string;
  fullName: string;
}

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type ContactInfoValues = z.infer<typeof contactInfoSchema>;
export type ResidentialInfoValues = z.infer<typeof residentialInfoSchema>;
export type OtherInfoValues = z.infer<typeof otherInfoSchema>;
export type FinalVerificationValues = z.infer<typeof finalVerificationSchema>;

