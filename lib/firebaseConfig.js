import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth/react-native";

// Optionally import the services that you want to use
import { initializeAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
const firebaseConfig = {
  // old firebase project configuration
  // apiKey: "AIzaSyD4ZwfD5_35nocpGdAik7JaKsLSW-xxTYg",
  // authDomain: "junipercash-2038f.firebaseapp.com",
  // projectId: "junipercash-2038f",
  // storageBucket: "junipercash-2038f.appspot.com",
  // messagingSenderId: "171006704631",
  // appId: "171006704631:web:9f856a47c5005a7374ccf2",

  // new firebase project jCash
  apiKey: "AIzaSyDZjir6fO3yW9T2wSVEEChh9xxjqho8NUs",
  authDomain: "jcash-2a0f5.firebaseapp.com",
  projectId: "jcash-2a0f5",
  storageBucket: "jcash-2a0f5.appspot.com",
  messagingSenderId: "470796334143",
  appId: "1:470796334143:web:a3ba4419aa2b7fb99d348a",
  measurementId: "G-GZ9FQ1XDBE",
};

export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const bucket = getStorage(app);
const db = getFirestore(app);
export { auth, bucket, firebaseConfig, db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
