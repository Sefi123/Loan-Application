import { z } from "zod";

export const genderValues = ["Male", "Female"];
export const maritalStatus = ["Single", "Married"] as const;
export const religion = [
  "Christian",
  "Muslim",
  "Traditionalist",
  "Other",
] as const;
export const incomeRange = ["500 - 1000", "1000-3000", "3000-5000"] as const;
export const networks = ["AIR", "VOD", "MTN"] as const;

export const registerSchema = z.object({
  first_name: z.string().min(2, { message: "This field is required" }),
  last_name: z.string().min(2, { message: "This field is required" }),
  phone_number_1: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" }),

  phone_number_2: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" })
    .optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z
    .string()
    .min(4, { message: "Please enter a minimum of 4 digits" }),
  dob: z.string().min(1, { message: "Please select your date of birth" }),
  gender: z.enum(["Male", "Female"]),
  ghcard_number: z
    .string()
    .min(10, { message: "Invalid card credentials" })
    .max(10, { message: "Please enter the numbers only" }),
  ghcard_img: z
    .string({ required_error: "Please upload your ghana card photo" })
    .min(1),
  marital_status: z.enum(maritalStatus),
  education: z
    .string()
    .min(1, { message: "Please enter your education level" }),
  residential_address: z
    .string()
    .min(1, { message: "Please enter your residential address" }),
  religion: z.enum(religion),
  town: z.string().min(1, { message: "Please enter your town" }),
  region: z.string().min(1, { message: "Please enter your region" }),
  occupation: z.string().min(1, { message: "Please enter your occupation" }),
  landmark: z.string().min(1, { message: "Please enter a known landmark" }),
  company_name: z
    .string()
    .min(1, { message: "Please enter your company name" }),
  company_phone: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" }),
  company_location: z
    .string()
    .min(1, { message: "Please enter your company location" }),
  company_city: z.string().min(1, { message: "This field is required" }),
  company_landmark: z.string().min(1, { message: "This field is required" }),
  monthly_income: z.enum(incomeRange),
  job_postion: z.string().min(1, { message: "Please enter your job role" }),
  family_member_1_fullname: z
    .string()
    .min(1, { message: "This field is required" }),
  family_member_1_relationship: z
    .string()
    .min(1, { message: "This field is required" }),
  family_member_1_phone_number: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" }),
  family_member_2_fullname: z
    .string()
    .min(1, { message: "This field is required" }),
  family_member_2_phone_number: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" }),
  family_member_2_relationship: z
    .string()
    .min(1, { message: "This field is required" }),
  co_worker_fullname: z.string().min(1, { message: "This field is required" }),
  co_worker_phone: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" }),
  co_worker_relationship: z
    .string()
    .min(1, { message: "This field is required" }),
  wallet_network: z.enum(networks),
  wallet_name: z
    .string()
    .min(1, { message: "Please enter your mobile wallet name" }),
  wallet_number: z
    .string({ required_error: "This field is required" })
    .min(10, { message: "Please enter a valid phone number" }),
});

export const loginSchema = z.object({
  otp: z.string().min(1, { message: "Please Enter OTP Pin" }),
  phone_number: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  pin: z.string().min(1, { message: "Please Enter your Pin Code here" }),
});
