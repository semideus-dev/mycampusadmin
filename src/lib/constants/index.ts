import { personalInfoSchema } from "@/lib/schemas";
import { contactDetailsSchema } from "@/lib/schemas";
import { residentialDetailsSchema } from "@/lib/schemas";

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
    schema: contactDetailsSchema,
  },
  {
    id: 3,
    title: "Residential Details",
    description: "All fields are required",
    schema: residentialDetailsSchema,
  },
] as const;
