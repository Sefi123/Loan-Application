import { Box, HStack, Pressable, Text } from "native-base";

import { FontAwesome5 } from "@expo/vector-icons";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

interface Props extends InterfaceBoxProps {
  title: string;
  route?: string;
}
const ProfileFieldContainer = ({ title, color, ...props }: Props) => {
  return (
    <Box
      w="80"
      h="24"
      p="2"
      bg="green.100"
      rounded="xl"
      shadow={2}
      //style={{ elevation: 0 }}
      justifyContent="center"
      alignItems="center"
    >
      <HStack space={4}>
        <Box
          width="10%"
          height="74%"
          rounded="lg"
          bg={props.bg}
          alignItems="center"
          justifyContent="center"
        >
          <MaterialIcons name="lock" size={20} color="white" />
        </Box>
        <Text fontSize={16} fontWeight={200} color="coolGray.800">
          {title}
        </Text>
        <Text fontFamily="body" fontWeight={100}>
          0%
        </Text>
        <FontAwesome5 name="arrow-right" size={23} color="black" />
      </HStack>
    </Box>
  );
};

export default ProfileFieldContainer;
