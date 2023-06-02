import create from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export interface registrationState {
  first_name: string;
  last_name: string;
  phone_number_1: string;
  phone_number_2?: string;
  email: string;
  password: string;
  dob: string;
  gender: any;
  ghcard_img: string;
  ghcard_number: string;
  marital_status: any;
  education: string;
  residential_address: string;
  religion: any;
  town: string;
  region: string;
  landmark: string;
  company_name: string;
  company_phone: string;
  company_location: string;
  company_city: string;
  company_landmark: string;
  monthly_income: any;
  job_postion: string;
  family_member_1_fullname: string;
  family_member_1_relationship: string;
  family_member_1_phone_number: string;
  family_member_2_fullname: string;
  family_member_2_relationship: string;
  family_member_2_phone_number: string;
  co_worker_fullname: string;
  co_worker_phone: string;
  co_worker_relationship: string;
  wallet_network: any;
  wallet_name: string;
  wallet_number: string;
}

export const useRegisterStore = create<registrationState>()(
  persist(
    (set, get) => ({
      first_name: "",
      last_name: "",
      phone_number_1: "",
      phone_number_2: "",
      email: "",
      password: "",
      dob: format(new Date(), "yyyy-MM-dd").toString(),
      gender: "Female",
      ghcard_img: "",
      ghcard_number: "",
      marital_status: "Single",
      education: "",
      residential_address: "",
      religion: "Christian",
      town: "",
      region: "",
      landmark: "",
      company_name: "",
      company_phone: "",
      company_location: "",
      company_city: "",
      company_landmark: "",
      monthly_income: "500 - 1000",
      job_postion: "",
      family_member_1_fullname: "",
      family_member_1_relationship: "",
      family_member_1_phone_number: "",
      family_member_2_fullname: "",
      family_member_2_relationship: "",
      family_member_2_phone_number: "",
      co_worker_fullname: "",
      co_worker_phone: "",
      co_worker_relationship: "",
      wallet_network: "MTN",
      wallet_name: "",
      wallet_number: "",
    }),
    {
      name: "register",
      getStorage: () => AsyncStorage,
    }
  )
);
