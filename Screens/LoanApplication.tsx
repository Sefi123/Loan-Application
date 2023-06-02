import * as Location from "expo-location";

import {
  Box,
  Button,
  Checkbox,
  HStack,
  Modal,
  Text,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import AmountToggle from "../components/AmountToggle";
import { Linking } from "react-native";
import LoanInfoBox from "../components/LoanInfoBox";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../lib/firebaseConfig";
import { getApp } from "firebase/app";

type Props = NativeStackScreenProps<RootStackParamList, "Application">;

const LoanApplication = ({ navigation }: Props) => {
  const [days, setDays] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number>(0);
  const [accept, setAccept] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLocationOn, setIsLocationOn] = React.useState<any>(null);

  // React.useEffect(() => {
  //   (async () => {
  //     await Location.hasServicesEnabledAsync()
  //       .then(isOn => {
  //         setIsLocationOn(isOn)
  //       })
  //   })()
  // }, [isLocationOn])

  useEffect(() => {
    (async () => {
      await Location.getCurrentPositionAsync()
        .then((position) => setIsLocationOn(true))
        .catch((err) => setIsLocationOn(false));
    })();
  }, []);

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

  if (isLocationOn === null) {
    return null;
  }

  if (!isLocationOn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Location is required to proceed further.</Text>
        <Button
          variant="solid"
          w="56"
          onPress={() => Linking.sendIntent("android.settings.SETTINGS")}
        >
          Open Setting
        </Button>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <Box
          h="56"
          bg="custom.main"
          mt={0}
          width="100%"
          style={styles.border}
          pt={4}
        >
          <AmountToggle
            amount={amount}
            toggleAmount={setAmount}
            days={days}
            toggleDays={setDays}
          />
        </Box>
        <Box
          alignSelf="center"
          //position="absolute"
          zIndex={1}
          justifyContent="center"
          bottom="12"
          //mt={4}
          p={4}
          width="85%"
          height="38%"
          rounded="lg"
          bg="coolGray.50"
          shadow={5}
        >
          <LoanInfoBox amount={amount} days={days} />
        </Box>
        <VStack bottom="6" alignItems="center" space={8}>
          <HStack space={6} alignItems="flex-end">
            <Checkbox
              isChecked={accept ? true : false}
              //bg="blue.500"
              //bgColor="blue.500"
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
            isDisabled={accept ? false : true}
            onPress={() => {
              // if (!isLocationOn) {
              // Alert.alert('Alert', "For better experience turn on your device location which uses Google location.", [
              //   {
              //     text: 'Open Setting',
              //     onPress: () => Linking.sendIntent('android.settings.SETTINGS')
              //   },
              //   {
              //     text: 'No Thanks'
              //   }
              // ])
              // } else {
              setModalVisible(true);
              getLocation();
              // }
            }}
          >
            Next
          </Button>
        </VStack>
        <Modal isOpen={modalVisible} onClose={setModalVisible} size="sm">
          <Modal.Content maxH="212">
            <Modal.Body>
              <Box flexDirection="column" flex={1} alignItems="center" h="72">
                <Text fontSize={16} fontWeight={300}>
                  {" "}
                  Please take a selfie to confirm the loan
                </Text>
              </Box>
            </Modal.Body>

            <Modal.Footer borderTopColor="transparent">
              <Button.Group space="16" size="sm">
                <Button
                  w="16"
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Photo", {
                      principal: amount,
                      time: days,
                    });
                  }}
                >
                  Ok
                </Button>
                <Button
                  variant="outline"
                  bgColor="white"
                  borderColor="custom.main"
                  _text={{ color: "custom.main" }}
                  //bg="custom.main"
                  //colorScheme="custom.main"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  Cancel
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    );
  }
};

export default LoanApplication;

const styles = StyleSheet.create({
  border: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
});
