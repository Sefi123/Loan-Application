import { View } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { IconButton, Text } from "native-base";
import theme from "../src/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

/*export type DashboardStackList = {
  HomeDefault: undefined ;
  Application: undefined;
};

const HomeStack = createNativeStackNavigator<DashboardStackList>();

function HomeStackScreen() {
  const authName = "Phil";
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeDefault"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: (props) => (
            <Text color="white" fontWeight={200} ml={4} mt={6} fontSize={22}>
              Welcome{" "}
              <Text bold fontWeight={400}>
                {authName}
              </Text>
            </Text>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.custom.main,
          },
        }}
      />
      <HomeStack.Screen
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
              onPress={() => navigation.navigate("HomeDefault")}
              variant="link"
              icon={<Ionicons name="chevron-back" size={24} color="white" />}
            />
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.custom.main,
          },
        })}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;*/
