import { Camera, CameraType } from "expo-camera";

import { Button } from "native-base";
import React from "react";
import { View } from "react-native";

type Props = {
  save: React.Dispatch<React.SetStateAction<string | null>>;
  unmount: React.Dispatch<React.SetStateAction<boolean>>;
};
const SelfieComponent = ({ save, unmount }: Props) => {
  const [permission, requestPermission] =
    Camera.useCameraPermissions(undefined);
  const cameraRef = React.useRef<Camera | null>(null);

  React.useEffect(() => {
    requestPermission;
  }, []);
  if (!permission) unmount(false);
  return (
    <Camera style={{ flex: 1 }} type={CameraType.front} ref={cameraRef}>
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={async () => {
            if (cameraRef.current) {
              let photo = await cameraRef.current.takePictureAsync({
                quality: 1,
              });
              save(photo.uri);
              unmount(true);
            }
          }}
        >
          Take Selfie
        </Button>
      </View>
    </Camera>
  );
};

export default SelfieComponent;
