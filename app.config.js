import "dotenv/config";
export default {
  expo: {
    name: "Juniper Cash",
    slug: "juniper-cash",
    privacy: "public",
    description: "loan application",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FFFFFF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.junipercash",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      permissions: [
        "READ_EXTERNAL_STORAGE",
        "MANAGE_EXTERNAL_STORAGE",
        "ACCESS_MEDIA_LOCATION ",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.MANAGE_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_MEDIA_LOCATION",
      ],
    },
    extra: {
      firebaseApiKey: process.env.API_KEY,
      firebaseAuthDomain: process.env.AUTH_DOMAIN,
      firebaseProjectId: process.env.PROJECT_ID,
      firebaseStorageBucket: process.env.STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.MESSAGE_SENDER_ID,
      firebaseAppId: process.env.APP_ID,
      appUrl: process.env.URI,
      eas: {
        projectId: process.env.EXPO_PROJECT_ID,
      },
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Juniper Cash to use your location.",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow Juniper Cash to take pictures.",
        },
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow Juniper Cash to access your photos.",
          savePhotosPermission: "Allow Juniper Cash to save photos.",
          isAccessMediaLocationEnabled: true,
        },
      ],
    ],
  },
};
