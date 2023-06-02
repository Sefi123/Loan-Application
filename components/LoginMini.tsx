import { HStack, Link, Text } from "native-base";

import React from "react";
import { RootStackParamList } from "../src/types";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export type componentNavigationProp = StackNavigationProp<RootStackParamList>;
const LoginMini = () => {
  const navigation = useNavigation<componentNavigationProp>();
  return (
    <HStack
      shadow={8}
      mt={16}
      space={2}
      // height="80%"
      width="90%"
      alignItems="center"
      justifyContent="center"
      bgColor="blueGray.50"
      //paddingX={7}
      pb={48}
      borderRadius={25}
    >
      <Text fontSize="md" fontWeight={300} alignSelf="center">
        Don't have an account yet?
      </Text>

      <Link
        onPress={() => navigation.navigate("PersonalInfo1")}
        _text={{ color: "blue.400", fontSize: "md", fontWeight: 400 }}
        isUnderlined={false}
      >
        Sign up
      </Link>
    </HStack>
  );
};

export default LoginMini;
