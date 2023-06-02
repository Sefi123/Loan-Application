import { HStack, Text, VStack } from "native-base";

import React from "react";

const SettingsInfoBox = () => {
  return (
    <HStack space={4} justifyContent="center">
      <VStack alignItems="center">
        <Text fontWeight={300} fontSize={18}>
          Wallet
        </Text>
        <Text fontWeight={400} fontSize={18}>
          0
        </Text>
      </VStack>
      {/* Hide out this invite code as per your request */}
      {/* <VStack alignItems="center">
        <Text fontWeight={300} fontSize={18}>
          Invite code
        </Text>
        <Text fontWeight={400} fontSize={18}>
          Phil021
        </Text>
      </VStack> */}
      <VStack alignItems="center">
        <Text fontWeight={300} fontSize={18}>
          Loan count
        </Text>
        <Text fontWeight={400} fontSize={18}>
          0
        </Text>
      </VStack>
    </HStack>
  );
};

export default SettingsInfoBox;
