import * as SecureStore from "expo-secure-store";

import { Box, Button, HStack, Spinner, Stack, Text, VStack } from "native-base";

import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import axios from "axios";
import { format } from "date-fns";
import uploadImageAsync from "../lib/uploadImage";

type Props = NativeStackScreenProps<RootStackParamList, "Review">;

const ReviewScreen = ({ navigation, route }: Props) => {
  const { principal, time, photo } = route.params;
  const interest = (principal * 0.13 * time) / 30;
  const service = (principal * 0.2 * time) / 30;
  const total = interest + service + principal;
  const URI = Constants.expoConfig?.extra?.appUrl as string;
  const [loading, setLoading] = React.useState(false);

  const submitApplication = async () => {
    setLoading(true);
    const userDetails = await SecureStore.getItemAsync("auth_user");
    const jsonDetails = JSON.parse(userDetails as string);

    //save image to firebase
    const selfie = await uploadImageAsync(photo, "applicationSelfie");
    try {
      let body = {
        amount_requested: principal,
        period: time,
        userId: jsonDetails.id,
        selfie_img: selfie,
        interest: interest.toFixed(2),
        service_fee: service.toFixed(2),
        amount_to_repay: total,
      };

      axios
        .post(
          "https://test.api.junipermicrocredit.com/v1/application",
          JSON.stringify(body),
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      console.log(body);
      debugger;

      setLoading(false);
      // navigation.navigate("Root");
      // navigation.navigate("PayRentReview", {
      //   component: "Loan",
      //   amount: total,
      //   days: time,
      //   allValues: {
      //     daily: time,
      //     monthly: time / 30,
      //     total: total,
      //   },
      // });
      navigation.navigate("PayLoanRepay", {
        component: "Loan",
        allValues: {
          daily: time,
          monthly: time / 30,
          total: total,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center" }}
      edges={["bottom", "left", "right"]}
    >
      <Box
        h="64"
        bg="custom.main"
        mt={0}
        width="100%"
        style={styles.border}
        pt={4}
      ></Box>
      <Stack zIndex={1} bottom="32" shadow={7} width="90%" height="27%">
        <HStack
          bg="white"
          h="50%"
          style={styles.topBox}
          alignItems="center"
          px={5}
          space={10}
        >
          <MaterialIcons name="lock-clock" size={35} color="black" />
          <Text fontWeight={400} fontSize={21}>
            Review
          </Text>
        </HStack>
        <VStack
          bg="trueGray.300"
          flex={1}
          style={styles.bottomBox}
          pt={2}
          px={5}
          space={3}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight={300} fontSize={15}>
              Amount
            </Text>
            <Text fontWeight={300} fontSize={15}>
              GHS {principal.toFixed(0)}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight={300} fontSize={15}>
              Duration
            </Text>
            <Text fontWeight={300} fontSize={15}>
              {time}
            </Text>
          </HStack>
        </VStack>
      </Stack>
      <VStack
        pt="11%"
        //alignItems="center"
        h="34%"
        w="85%"
        rounded="xl"
        bg="info.100"
        space={2}
        bottom="40"
      >
        <HStack justifyContent="space-around" alignItems="center">
          <Text fontWeight={300} fontSize={16}>
            Interest
          </Text>
          <Text fontWeight={300} fontSize={16}>
            GHS {interest.toFixed(2)}
          </Text>
        </HStack>
        <HStack justifyContent="space-around" alignItems="center">
          <Text fontWeight={300} fontSize={16}>
            Service Fee
          </Text>
          <Text fontWeight={300} fontSize={16}>
            GHS {service.toFixed(2)}
          </Text>
        </HStack>
        <HStack justifyContent="space-around" alignItems="center">
          <Text fontWeight={300} fontSize={16}>
            Total Amount Due
          </Text>
          <Text fontWeight={300} fontSize={16}>
            GHS {total.toFixed(2)}
          </Text>
        </HStack>
        <HStack justifyContent="space-around" alignItems="center">
          <Text fontWeight={300} fontSize={16}>
            Application Date
          </Text>
          <Text fontWeight={300} fontSize={16}>
            {format(new Date(), "P")}
          </Text>
        </HStack>
      </VStack>
      <Button
        bottom="32"
        variant="solid"
        w="56"
        onPress={submitApplication /*() => */}
      >
        {loading ? (
          <Spinner accessibilityLabel="Submiting" color="gray" />
        ) : (
          "Submit"
        )}
      </Button>
    </SafeAreaView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  border: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topBox: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  bottomBox: { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
});
