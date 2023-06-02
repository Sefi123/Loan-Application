import * as Location from "expo-location";

import { Box, Button, Checkbox, HStack, Text, VStack } from "native-base";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PayRentAmountToggle } from "../components/AmountToggle";
import { PayRentLoanInfoBox } from "../components/LoanInfoBox";
import React from "react";
import { RootStackParamList } from "../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { auth } from "../lib/firebaseConfig";
import { getApp } from "firebase/app";
import theme from "../src/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PayRentApplication">;

const LoanApplication = ({ navigation }: Props) => {
  const [days, setDays] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number>(0);
  const [month, setMonth] = React.useState<number>(0);
  const [accept, setAccept] = React.useState<boolean>(false);
  const [allValues, setAllValues] = React.useState<any>({});
  const [isLocationOn, setIsLocationOn] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await Location.hasServicesEnabledAsync().then((isOn) => {
        setIsLocationOn(isOn);
      });
    })();
  }, [isLocationOn]);

  const app = getApp();
  let get = getFirestore(app);

  let getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    let location = await Location.getCurrentPositionAsync({});

    if (status === "granted") {
      await getDoc(doc(get, "users", `${auth.currentUser?.phoneNumber}`)).then(
        async (ref) => {
          if (ref.exists()) {
            await updateDoc(
              doc(get, "users", `${auth.currentUser?.phoneNumber}`),
              {
                location: location,
              }
            );
          } else {
            await setDoc(
              doc(get, "users", `${auth.currentUser?.phoneNumber}`),
              {
                location: location,
              }
            );
          }
        }
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <StatusBar style="light" backgroundColor={"#000"} />
      <Box
        // h="50%"
        bg="custom.payRent"
        mt={0}
        width="100%"
        style={[styles.border, { position: "absolute", height: "40%" }]}
        pt={4}
      >
        <PayRentAmountToggle
          amount={amount}
          toggleAmount={setAmount}
          days={days}
          toggleDays={setDays}
          month={month}
          toggleMonth={setMonth}
        />
      </Box>
      <Box
        alignSelf="center"
        // position="absolute"
        zIndex={1}
        justifyContent="center"
        style={{ top: "25%" }}
        // bottom="20"
        // top="40"
        //mt={4}
        p={4}
        width="85%"
        height="28%"
        rounded="lg"
        bg="coolGray.50"
        shadow={5}
      >
        <PayRentLoanInfoBox
          amount={amount}
          month={month}
          values={setAllValues}
        />
      </Box>

      <VStack bottom="6" alignItems="center" space={8} top={"30%"}>
        <HStack space={6} alignItems="flex-end">
          <Checkbox
            isChecked={accept ? true : false}
            onChange={() => setAccept(!accept)}
            value="checked"
            accessibilityLabel="agree to terms and conditions"
          />
          <Text fontWeight={300} fontSize={15}>
            I agree to terms and conditions
          </Text>
        </HStack>
        <Button
          variant="solid"
          w="56"
          bgColor={theme.colors.custom.payRent}
          isDisabled={accept ? false : true}
          onPress={() => {
            console.log(amount, month, allValues);
            debugger;
            navigation.navigate("PayRentReview", {
              component: "PayRent",
              amount,
              days: month * 30,
              allValues,
            });
          }}
        >
          Submit
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default LoanApplication;

const styles = StyleSheet.create({
  border: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
});
