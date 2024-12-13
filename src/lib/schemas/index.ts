import * as z from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const personalInfoSchema = z.object({
  guardianFirstName: z
    .string()
    .min(2, "Guardian first name must be at least 2 characters"),
  guardianLastName: z
    .string()
    .min(1, "Guardian last name must be at least 1 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
});

export const contactDetailsSchema = z.object({
  guardianEmail: z.string().email("Invalid email address"),
  applicantPhone: z.string().regex(phoneRegex, "Invalid phone number"),
  guardianPhone: z.string().regex(phoneRegex, "Invalid phone number"),
  applicantAadhar: z
    .string()
    .min(12, "Aadhar number must be 12 digits")
    .max(12),
});

export const residentialDetailsSchema = z.object({
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  country: z.string().min(1, "Country is required"),
  nationality: z.string().min(1, "Nationality is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  region: z.string().min(1, "Region is required"),
  address: z.string().min(10, "Please provide a detailed address"),
});
