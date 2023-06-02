import { HStack, Image, Text, VStack } from "native-base";

import React from "react";
import { View } from "react-native";

const ProfileCard = () => {
  return (
    <VStack bg="indigo.200" p={2} w="80" rounded="2xl" alignItems="center">
      <HStack space={3} alignItems="center">
        <Text fontFamily="body" fontWeight={100} fontSize={21}>
          Complete more profile
        </Text>
        <Image source={require("../assets/images/card.png")} size="sm" alt="" />
      </HStack>

      <Text fontSize={27} fontWeight={200} mb={2}>
        The higher the quota
      </Text>
    </VStack>
  );
};

export default ProfileCard;
