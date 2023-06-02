import { Alert, Button, HStack, Text, VStack } from "native-base";

import { HomeScreenNavigationProp } from "../Screens/Dashboard";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type Props = {
  navigation: HomeScreenNavigationProp["navigation"];
  amount: any;
  status: any;
};
const PendingBox = ({ navigation, amount, status }: Props) => {
  return (
    <VStack space={3} px={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={17} fontWeight={200} color="gray.500">
          Amount Requested
        </Text>
        <Text fontSize={18} fontWeight={400}>
          GH₵ {amount}
        </Text>
      </HStack>
      <Alert w="100%">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" color="custom.main" />
              <Text
                fontSize={14}
                fontFamily="body"
                fontWeight={400}
                color="gray.600"
              >
                Your application has been submitted and is under review. Status
                will be updated once our checks are completed.
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </VStack>
  );
};

export default PendingBox;
