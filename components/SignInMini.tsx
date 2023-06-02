import { HStack, Link, Text } from "native-base";

import React from "react";
import { RootStackParamList } from "../src/types";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export type componentNavigationProp = StackNavigationProp<RootStackParamList>;
const SignInMini = () => {
  const navigation = useNavigation<componentNavigationProp>();
  return (
    <HStack
      shadow={8}
      space={2}
      height="30%"
      width="90%"
      alignItems="center"
      justifyContent="center"
      bgColor="blueGray.50"
      paddingX={7}
      mt={8}
      pb={8}
      borderRadius={25}
    >
      <Text fontSize="md" fontWeight={300}>
        Already have an account?{" "}
      </Text>

      <Link
        //onPress={() => navigation.navigate("Login")}
        _text={{ color: "blue.400", fontSize: "md", fontWeight: 400 }}
        isUnderlined={false}
      >
        Login
      </Link>
    </HStack>
  );
};

export default SignInMini;
