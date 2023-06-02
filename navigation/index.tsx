import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstAuthScreen from "../Screens/Auth/FirstAuthScreen";
import SecondAuthScreen from "../Screens/Auth/SecondAuthScreen";
import ThirdAuthScreen from "../Screens/Auth/ThirdAuthScreen";
import FourthAuthScreen from "../Screens/Auth/FourthAuthScreen";
import FifthAuthScreen from "../Screens/Auth/FifthAuthScreen";
import theme from "../src/theme";
import { IconButton, Text } from "native-base";
import Login from "../Screens/Auth/Login";
import LoanApplication from "../Screens/LoanApplication";
import PayRentApplication from "../Screens/PayRentApplication";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../src/types";
import SelfieScreen from "../Screens/SelfieScreen";
import useInitialState from "../Hooks/useInitialState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReviewScreen from "../Screens/ReviewScreen";
import { FormProvider, useForm } from "react-hook-form";
import { registrationState, useRegisterStore } from "../lib/registerStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../src/Schema";
import { auth } from "../lib/firebaseConfig";
import { User } from "firebase/auth";
import * as ScreenCapture from "expo-screen-capture";
import { ActivityIndicator, View } from "react-native";

import OnBoardingScreen from "../Screens/onBoardingScreen";
import AcceptTerms from "../Screens/AcceptTerms";
import PayRentReviewScreen from "../Screens/PayRentReviewScreen";
import PayRentRepayScreen from "../Screens/PayRentRepayScreen";

import * as SecureStore from "expo-secure-store";
import PayLoanRepayScreen from "../Screens/PayLoanRepayScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  const methods = useForm<registrationState>({
    defaultValues: useRegisterStore(),
    resolver: zodResolver(registerSchema),
  });

  const [user, setUser] = React.useState<User | null>();
  const [userLogged, setUserLogged] = React.useState<boolean | null>(null);

  function onAuthStateChanged(user: User | null) {
    if (user) {
      setUser(user);
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }
  React.useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  React.useEffect(() => {
    let prevent = async () => await ScreenCapture.allowScreenCaptureAsync();
    // let prevent = async () => await ScreenCapture.preventScreenCaptureAsync()
    prevent();
  }, []);

  const [shouldSkipOnboarding, setShouldSkipOnboarding] = useState(false);
  const [shouldSkipTerms, setShouldSkipTerms] = useState(false);

  useEffect(() => {
    let getValue = async () => {
      await AsyncStorage.getItem("doneOnboarding").then((check: any) => {
        if (check !== null) setShouldSkipOnboarding(JSON.parse(check));
      });

      await AsyncStorage.getItem("acceptTerms").then((check: any) => {
        if (check !== null) setShouldSkipTerms(JSON.parse(check));
      });
    };
    getValue();
  }, []);

  const [data, setData] = useState<any>("");
  const [reRun, setReRun] = useState(false);

  useEffect(() => {
    (async () => {
      await SecureStore.getItemAsync("auth_user").then((data) => {
        if (data !== null) {
          let d = JSON.parse(data);
          setData(d.first_name);
        } else {
          setReRun(!reRun);
        }
      });
    })();
  }, [reRun]);

  if (userLogged === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <FormProvider {...methods}>
        <Stack.Navigator>
          {!shouldSkipTerms && (
            <Stack.Screen
              name="acceptTerms"
              component={AcceptTerms}
              options={{
                headerShown: false,
              }}
            />
          )}
          {!shouldSkipOnboarding && (
            <Stack.Screen
              name="onBoardingScreen"
              component={OnBoardingScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          {userLogged ? (
            <Stack.Group>
              <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Application"
                component={LoanApplication}
                options={({ navigation }) => ({
                  headerBackVisible: false,
                  headerTitle: (props) => (
                    <Text color="white" fontWeight={300} ml={4} fontSize={22}>
                      Loan Application
                    </Text>
                  ),
                  headerLeft: (props) => (
                    <IconButton
                      onPress={() => navigation.goBack()}
                      variant="link"
                      icon={
                        <Ionicons name="chevron-back" size={24} color="white" />
                      }
                    />
                  ),
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: theme.colors.custom.main,
                  },
                })}
              />
              {/* PayRent */}
              <Stack.Screen
                name="PayRentApplication"
                component={PayRentApplication}
                options={({ navigation }) => ({
                  headerBackVisible: false,
                  headerTitle: (props) => (
                    <Text color="white" fontWeight={300} ml={4} fontSize={22}>
                      PayRent Application
                    </Text>
                  ),
                  headerLeft: (props) => (
                    <IconButton
                      onPress={() => navigation.goBack()}
                      variant="link"
                      icon={
                        <Ionicons name="chevron-back" size={24} color="white" />
                      }
                    />
                  ),
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: theme.colors.custom.main,
                  },
                })}
              />
              {/* PayRent */}
              <Stack.Screen
                name="Photo"
                component={SelfieScreen}
                options={({ navigation }) => ({
                  headerBackVisible: false,
                  headerShown: false,
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: theme.colors.custom.main,
                    display: "none",
                  },
                })}
              />
              <Stack.Screen
                name="PayRentReview"
                component={PayRentReviewScreen}
                options={({ navigation }) => ({
                  // headerBackVisible: false,
                  headerShown: false,
                  // headerShadowVisible: false,
                  // headerStyle: {
                  //  backgroundColor: theme.colors.custom.main,
                  //  display: "none",
                  // },
                })}
              />
              <Stack.Screen
                name="PayRentRepay"
                component={PayRentRepayScreen}
                options={({ navigation }) => {
                  return {
                    headerStyle: {
                      backgroundColor: theme.colors.custom.payRent,
                    },
                    headerTitle: () => (
                      <Text color="black" fontWeight={200} fontSize={22}>
                        Welcome{" "}
                        <Text
                          bold
                          fontWeight={400}
                          style={{ textTransform: "capitalize" }}
                        >
                          {data}
                        </Text>
                      </Text>
                    ),
                  };
                }}
              />
              <Stack.Screen
                name="PayLoanRepay"
                component={PayLoanRepayScreen}
                options={({ navigation }) => {
                  return {
                    headerBackVisible: false,
                    headerStyle: {
                      backgroundColor: theme.colors.custom.main,
                    },
                    headerTitle: () => (
                      <Text color="white" fontWeight={200} fontSize={22}>
                        Welcome{" "}
                        <Text
                          bold
                          fontWeight={400}
                          style={{ textTransform: "capitalize" }}
                        >
                          {data}
                        </Text>
                      </Text>
                    ),
                  };
                }}
              />
              <Stack.Screen
                name="Review"
                component={ReviewScreen}
                options={({ navigation }) => ({
                  // headerBackVisible: false,
                  headerShown: false,
                  // headerShadowVisible: false,
                  // headerStyle: {
                  //  backgroundColor: theme.colors.custom.main,
                  //  display: "none",
                  // },
                })}
              />
            </Stack.Group>
          ) : (
            <Stack.Group
              screenOptions={{
                headerShadowVisible: false,
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen
                name="Login"
                component={Login}
                options={() => ({
                  headerTitle: () => (
                    <Text fontWeight={300} fontFamily="heading" fontSize={25}>
                      Login
                    </Text>
                  ),
                  headerBackVisible: false,
                })}
              />
              <Stack.Screen
                name="PersonalInfo1"
                component={FirstAuthScreen}
                options={({ navigation, route }) => ({
                  headerTitle: () => (
                    <Text fontWeight={300} fontFamily="heading" fontSize={25}>
                      Personal Information
                    </Text>
                  ),
                })}
              />
              <Stack.Screen
                name="PersonalInfo2"
                component={SecondAuthScreen}
                options={({ navigation, route }) => ({
                  headerTitle: () => (
                    <Text fontWeight={300} fontFamily="heading" fontSize={25}>
                      Personal Information
                    </Text>
                  ),
                })}
              />
              <Stack.Screen
                name="EmployerInfo"
                component={ThirdAuthScreen}
                options={({ navigation, route }) => ({
                  headerTitle: () => (
                    <Text fontWeight={300} fontFamily="heading" fontSize={25}>
                      Employer Information
                    </Text>
                  ),
                })}
              />
              <Stack.Screen
                name="ContactInfo"
                component={FourthAuthScreen}
                options={({ navigation, route }) => ({
                  headerTitle: () => (
                    <Text fontWeight={300} fontFamily="heading" fontSize={25}>
                      Emergency Contact
                    </Text>
                  ),
                })}
              />
              <Stack.Screen
                name="MobileWallet"
                component={FifthAuthScreen}
                options={({ navigation, route }) => ({
                  headerTitle: () => (
                    <Text fontWeight={300} fontFamily="heading" fontSize={25}>
                      Mobile Wallet
                    </Text>
                  ),
                })}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </FormProvider>
    );
  }
}

/*function AuthNavigator() {
  return (
    <Stack.Navigator>
      
    </Stack.Navigator>
  );
}*/
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function Navigation() {
  const [isReady, initialState] = useInitialState();
  if (!isReady) return null;
  return (
    <NavigationContainer
      theme={navTheme}
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem("NAVIGATION_STATE_V1", JSON.stringify(state))
      }
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
