import * as SecureStore from "expo-secure-store";

import { Avatar, Box, HStack, Text, VStack } from "native-base";
import { Linking, Platform, StyleSheet, ToastAndroid } from "react-native";

import CustomAuth from "../Hooks/customAuth";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsInfoBox from "../components/SettingsInfoBox";
import { StatusBar } from "expo-status-bar";
import { auth } from "../lib/firebaseConfig";

const Settings = () => {
  const user = CustomAuth();

  let whatsappPress = async () => {
    let isAvailable = await Linking.canOpenURL("whatsapp://send");
    if (isAvailable) {
      Linking.openURL("whatsapp://send?text=&phone=+233303964839");
    } else {
      ToastAndroid.show(
        "Whatsapp is not available on your device",
        ToastAndroid.SHORT
      );
      if (Platform.OS === "ios") {
        Linking.openURL(
          "https://apps.apple.com/us/app/whatsapp-messenger/id310633997"
        );
      } else {
        Linking.openURL(
          "https://play.google.com/store/apps/details?id=com.whatsapp&hl=en&gl=US"
        );
      }
    }
  };

  let contactUsPress = () => {
    Linking.openURL(`tel:+2330303964839`);
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#341051" />
      <Box h="40" bg="custom.main" mt={0} width="100%" style={styles.border}>
        <HStack space={5} px={10} alignItems="center">
          <Avatar
            bg="custom.main"
            size="lg"
            source={require("../assets/images/use1.jpg")}
          />
          <VStack>
            <Text
              fontFamily="body"
              fontWeight={300}
              fontSize={19}
              color="white"
            >
              {user?.phone_number_1}
            </Text>
            <Text
              fontFamily="mono"
              fontWeight={300}
              fontSize={13}
              color="warmGray.300"
            >
              Keep good credit, enjoy loans
            </Text>
          </VStack>
        </HStack>
      </Box>
      <VStack
        space={4}
        //height={540}
        pb="8%"
        w="full"
        paddingX={9}
        pt="25%"
      >
        <Text fontSize={23} fontWeight={300} fontFamily="heading">
          Other services
        </Text>
        <HStack justifyContent="space-around" alignItems="center">
          <IconButton
            space={2}
            name="Wallet"
            Icon={<FontAwesome name="credit-card" size={20} color="black" />}
          />
          <IconButton
            space={2}
            name="whatsapp"
            Icon={<FontAwesome name="whatsapp" size={24} color="black" />}
            onPress={() => whatsappPress()}
          />
          <IconButton
            space={2}
            name="history"
            Icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={24}
                color="black"
              />
            }
          />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <IconButton
            space={2}
            name="notification"
            Icon={
              <MaterialCommunityIcons
                name="bell-ring-outline"
                size={25}
                color="black"
              />
            }
          />
          <IconButton
            space={2}
            name="password"
            Icon={<MaterialIcons name="lock-outline" size={24} color="black" />}
          />
          <IconButton
            space={2}
            name="contact us"
            Icon={
              <MaterialCommunityIcons
                name="phone-plus"
                size={24}
                color="black"
              />
            }
            onPress={() => contactUsPress()}
          />
        </HStack>
        <Box
          alignItems="center"
          justifyContent="space-around"
          width="65%"
          flexDirection="row"
        >
          <IconButton
            space={2}
            name="Help"
            Icon={
              <MaterialCommunityIcons
                name="shield-alert-outline"
                size={24}
                color="black"
              />
            }
          />
          <IconButton
            space={2}
            ml={10}
            onPress={async () => {
              auth.signOut();
              await SecureStore.deleteItemAsync("auth_user");
            }}
            name="logout"
            Icon={<MaterialIcons name="logout" size={24} color="black" />}
          />
        </Box>
      </VStack>
      <Box
        alignSelf="center"
        position="absolute"
        justifyContent="center"
        top="24"
        p={4}
        width="85%"
        height="25%"
        rounded="lg"
        bg="coolGray.50"
        shadow={4}
      >
        <SettingsInfoBox />
      </Box>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  border: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
