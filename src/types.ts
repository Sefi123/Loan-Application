import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

export type TabStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  PayRent: undefined;
};

export type ApplicationState = {
  amount: number;
  picture: string | null;
  interest: number;
  serviceFee: number;
  total: number;
  setPicture: React.Dispatch<React.SetStateAction<string | null>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setServiceFee: React.Dispatch<React.SetStateAction<number>>;

  setInterest: React.Dispatch<React.SetStateAction<number>>;
};

export type AuthStackParamList = {};

export type RootStackParamList = {
  Signup: undefined;
  Application: undefined;
  Photo: { principal: number; time: number };
  Review: { principal: number; time: number; photo: string };
  PersonalInfo1: undefined;
  PersonalInfo2: undefined;
  EmployerInfo: undefined;
  ContactInfo: undefined;
  MobileWallet: undefined;
  Login: undefined;
  Root: undefined;
  permissionScreen: undefined;
  onBoardingScreen: undefined;
  acceptTerms: undefined;
  // PayRent
  Home: undefined;
  Settings: undefined;
  PayRentApplication: undefined;
  PayRentRepay: { component: string; allValues: object };
  PayLoanRepay: undefined;
  PayRentReview: {
    component: string;
    amount: number;
    days: number;
    allValues: object;
  };
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export type UserType = {
  id: string;
  email: string;
  phone_number_1: string;
  first_name: string;
  last_name: string;
  password: number;
};

export interface LoginFormInputs {
  phone: string;
  password: string;
  otp: string;
  phone_number: string;
}
