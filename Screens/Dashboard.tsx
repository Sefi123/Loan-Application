import * as SecureStore from "expo-secure-store";

import { Box, ScrollView, Text, VStack, View } from "native-base";
import { RootStackParamList, TabStackParamList } from "../src/types";

import ApplyNowBox from "../components/ApplyNowBox";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import Constants from "expo-constants";
import DashboardCarousel from "../components/DashboardCarousel";
import DashboardLinks from "../components/DashboardLinks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import PaynowBox from "../components/PaynowBox";
import PendingBox from "../components/PendingBox";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Services from "../components/Services";
import { StatusBar } from "expo-status-bar";
import { auth } from "../lib/firebaseConfig";
import { useQuery } from "@tanstack/react-query";

type ApplicationType = {
  id: string;
  total_amount: string;
  payment_status: string;
  application_status: any;
  repayment_date: Date | string;
  amount: number;
};
export type HomeScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

const Dashboard = ({ navigation }: HomeScreenNavigationProp) => {
  const URI = Constants.expoConfig?.extra?.appUrl as string;
  const getActiveApplication = async () => {
    const token = await auth.currentUser?.getIdToken(true);
    const userDetails = await SecureStore.getItemAsync("auth_user");
    const jsonDetails = JSON.parse(userDetails as string);
    const userId = jsonDetails.id;
    const response = await fetch(`${URI}/application/${userId}`, {
      headers: {
        authorization: token as string,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw { message: error.message, status: 401 };
    }
    const res: ApplicationType[] | null = await response.json();
    return res;
  };
  const { data, isLoading } = useQuery<ApplicationType[] | null>(
    ["application"],
    async () => await getActiveApplication()
  );

  if (isLoading) {
    return <View style={{ flex: 1 }} />;
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: "#46166c", flex: 1 }}>
        <StatusBar style="light" backgroundColor="#000" />

        <ScrollView>
          <Box height={90} bg="custom.main" w="full" />

          <VStack space={4} pb="8%" bg="white" w="full" paddingX={2} pt="35%">
            <DashboardLinks />
            <DashboardCarousel />
            <VStack mt="2" px={5} space={2}>
              <Text fontWeight={400} fontSize="xl" fontFamily="heading">
                Services
              </Text>
              <Services />
            </VStack>
          </VStack>
          <Box
            alignSelf="center"
            position="absolute"
            p={4}
            width="85%"
            height="30%"
            rounded="lg"
            bg="coolGray.50"
            shadow="9"
          >
            {data?.length && data[0].application_status === "PENDING" ? (
              <PendingBox
                navigation={navigation}
                amount={data[0].amount}
                status={data[0].application_status}
              />
            ) : data?.length && data[0].application_status === "DISBURSED" ? (
              <PaynowBox
                navigation={navigation}
                repayment={data[0].repayment_date}
                amount={Number(data[0].total_amount)}
              />
            ) : (
              <ApplyNowBox navigation={navigation} />
            )}
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Dashboard;
