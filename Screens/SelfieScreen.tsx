import { Camera, CameraType } from "expo-camera";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../src/types";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Photo">;
const SelfieScreen = ({ navigation, route }: Props) => {
  const [status, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef<Camera | null>(null);
  const isFocused = useIsFocused();
  const { principal, time } = route.params;
  React.useEffect(() => {
    requestPermission();
  }, []);

  if (!isFocused) return null;
  if (!status?.granted) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          We need access to your camera
        </Text>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ overflow: "scroll", borderRadius: 1000 }}>
        <Camera
          style={{ width: "60%", aspectRatio: 1 }}
          type={CameraType.front}
          ratio="1:1"
          ref={cameraRef}
          zoom={0}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
            }}
          ></View>
        </Camera>
      </View>

      <Button
        style={{
          marginTop: 40,
        }}
        onPress={async () => {
          if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync({
              quality: 1,
            });
            // setUserPhoto(photo.uri);
            //navigate to the next screen with the needed params
            navigation.navigate("Review", {
              principal: principal,
              time: time,
              photo: photo.uri,
            });
          }
        }}
      >
        Take Selfie
      </Button>
    </View>
  );
};

export default SelfieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
