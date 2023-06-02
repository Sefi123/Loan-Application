import * as SecureStore from "expo-secure-store";

import { IconButton, Text } from "native-base";
import React, { useEffect, useState } from "react";

import CustomAuth from "../Hooks/customAuth";
import Dashboard from "../Screens/Dashboard";
import { Ionicons } from "@expo/vector-icons";
import PayRentApplication from "../Screens/PayRentApplication";
import Profile from "../Screens/Profile";
import Settings from "../Screens/Settings";
import { StyleSheet } from "react-native";
import { TabStackParamList } from "../src/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../src/theme";
const Tab = createBottomTabNavigator<TabStackParamList>();

function BottomTabNavigator() {
  const user = CustomAuth();

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

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home" as string;
          } else if (route.name === "Settings") {
            iconName = "settings-sharp" as string;
          } else {
            iconName = "cash" as string;
            //md-person Ionicons
          }
          return <Ionicons name={iconName as any} size={24} color="#46166c" />;
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },

        tabBarLabel: ({ focused }) => {
          return focused ? (
            <Text
              color="custom.main"
              fontFamily="body"
              fontWeight="300"
              fontSize={14}
            >
              {route.name}
            </Text>
          ) : (
            false
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: true,
          headerTitle: (props) => (
            <Text color="white" fontWeight={200} ml={4} mt={6} fontSize={22}>
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
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.custom.main,
          },
        }}
        component={Dashboard}
      />

      <Tab.Screen
        name="PayRent"
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
              icon={<Ionicons name="chevron-back" size={24} color="white" />}
            />
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.custom.payRent,
          },
        })}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={({ route, navigation }) => ({
          headerTitleAlign: "center",
          headerShown: true,
          headerTitle: () => (
            <Text color="white" fontWeight={300} fontSize={22}>
              {route.name}
            </Text>
          ),
          //tabBarLabel: "Home",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.custom.main,
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
