import { Box, HStack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import LoginActionForm from "../../components/LoginActionForm";
import { RootStackParamList } from "../../src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as Contacts from "expo-contacts";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export type Navigation = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation, route }: Navigation) => {
  const [shouldUserMoveNext, setShouldUserMoveNext] = useState<boolean | null>(
    null
  );

  const [permissionStatus, setPermissionStatus] = useState({
    media: false,
    contact: false,
    location: false,
    camera: false,
  });

  const [runPermissionChecker, setRunPermissionChecker] = useState(false);

  let getPermission = async () => {
    let media = await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let contact = await Contacts.requestPermissionsAsync();
    let location = await Location.requestForegroundPermissionsAsync();
    let camera = await Camera.requestCameraPermissionsAsync();

    setPermissionStatus({
      media: media.granted,
      contact: contact.granted,
      location: location.granted,
      camera: camera.granted,
    });

    setRunPermissionChecker(!runPermissionChecker);
  };

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    if (
      permissionStatus.camera &&
      permissionStatus.media &&
      permissionStatus.contact &&
      permissionStatus.location
    ) {
      setShouldUserMoveNext(true);
    } else {
      setShouldUserMoveNext(false);
    }
  }, [runPermissionChecker]);

  if (shouldUserMoveNext === null) {
    SplashScreen.preventAutoHideAsync();
  } else if (!shouldUserMoveNext) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box width="100%" h="80">
          <LoginActionForm />
        </Box>
        {/* <Box
          h="72"
          bg="custom.main"
          alignItems="center"
          width="100%"
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
          pt={4}
        >
          <HStack
            shadow={8}
            mt={32}
            space={2}
            height="80%"
            width="85%"
            alignItems="center"
            justifyContent="center"
            bgColor="blueGray.50"
            //paddingX={7}
            pb="32"
            borderRadius={25}
          >
            <Text color="custom.main">
              Login with your pin and provided OTP
            </Text>
          </HStack>
        </Box> */}
      </SafeAreaView>
    );
  }
};

export default Login;
