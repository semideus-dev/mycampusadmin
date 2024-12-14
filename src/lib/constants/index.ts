import {
  personalInfoSchema,
  contactInfoSchema,
  residentialInfoSchema,
  finalVerificationSchema,
  otherInfoSchema,
} from "@/lib/schemas";

export const formSteps = [
  {
    id: 1,
    title: "Personal Information",
    description: "All fields are required",
    schema: personalInfoSchema,
  },
  {
    id: 2,
    title: "Contact Details",
    description: "All fields are required",
    schema: contactInfoSchema,
  },
  {
    id: 3,
    title: "Residential Details",
    description: "All fields are required",
    schema: residentialInfoSchema,
  },
  {
    id: 4,
    title: "Other Details",
    description: "All fields are required",
    schema: otherInfoSchema
  },
  {
    id: 5,
    title: "Final Verification",
    description: "Kindly verify all information before submitting",
    schema: finalVerificationSchema,
  },
] as const;
