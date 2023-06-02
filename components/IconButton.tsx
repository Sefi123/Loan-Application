import { Pressable, Text, VStack } from "native-base";

import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface appProps extends InterfaceVStackProps {
  name?: string;
  Icon: JSX.Element;
  onPress?: () => void;
}
const IconButton = ({ name, Icon, onPress, ...props }: appProps) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => {
        return (
          <VStack
            {...props}
            alignItems="center"
            space={props.space ? props.space : 0}
            //bg={isPressed ? "coolGray.100" : "white"}
            borderRadius={isPressed ? 15 : 0}
            style={{ transform: [{ scale: isPressed ? 0.95 : 1 }] }}
          >
            {Icon}
            {name && (
              <Text fontSize={14} fontFamily="body" fontWeight={300}>
                {name}
              </Text>
            )}
          </VStack>
        );
      }}
    </Pressable>
  );
};

export default IconButton;
