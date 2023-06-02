import * as SplashScreen from "expo-splash-screen";
import React from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let customFonts = {
  "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
  "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
  "Inter-Light": require("../assets/fonts/Inter-Light.otf"),
  "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
  "Inter-Italic": require("../assets/fonts/Inter-Italic.otf"),
  "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.otf"),
};

function cacheIcons(icons: any[]) {
  return icons.map((icon) => Font.loadAsync(icon));
}

function cacheImages(images: any[]) {
  return images.map((image) => Asset.fromModule(image).downloadAsync());
}
export function useLoadedAssets() {
  const [isLoadingComplete, setLoadingComplete] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        //Load the resources or api calls here
        const iconAssets = cacheIcons([
          FontAwesome.font,
          MaterialCommunityIcons.font,
          MaterialIcons.font,
          Ionicons.font,
          Feather.font,
        ]);

        const imageAssets = cacheImages([
          require("../assets/images/blackfam1.jpg"),
          require("../assets/images/blackfam2.jpg"),
          require("../assets/images/blackfam3.webp"),
          require("../assets/images/use1.jpg"),
          require("../assets/images/card.png"),
          require("../assets/images/serviceIcon.png"),
        ]);
        await Promise.all([
          Font.loadAsync(customFonts),
          ...iconAssets,
          ...imageAssets,
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);

        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
