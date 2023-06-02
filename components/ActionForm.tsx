import { Button, Icon, Input, Pressable, VStack } from "native-base";

import FormInputText from "./FormInputText";
import React from "react";
import { RootStackParamList } from "../src/types";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

type Navigation = StackNavigationProp<RootStackParamList, "Signup">;
const ActionForm = () => {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const navigation = useNavigation<Navigation>();
  const [show, setShow] = React.useState(false);
  return (
    <VStack
      borderRadius={25}
      shadow={8}
      space={3}
      bgColor="blueGray.50"
      alignItems="center"
      paddingX={7}
      paddingY={10}
    >
      <Input w="85%" mb={3} placeholder="Enter your phone number" />
      <Button variant="solid" size="sm" width={100} mb={3}>
        Get OTP
      </Button>
      <FormInputText
        name="otp"
        w="85%"
        placeholder="Enter your OTP code here"
        keyboardType="numeric"
        type={show ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={6}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <Button
        mb={4}
        width={220}
        size="sm"
        variant="solid"
        onPress={async () => {
          const result = await trigger("otp");
          if (result) navigation.navigate("PersonalInfo1");
        }}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default ActionForm;
