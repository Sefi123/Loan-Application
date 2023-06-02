import { Box, HStack, ScrollView, Text, VStack } from "native-base";

import DashboardCarousel from "./DashboardCarousel";
import DashboardLinks from "./DashboardLinks";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardOverlay = () => {
  return (
    <VStack space={0}>
      <Box h="20%" bg="custom.main" w="full" />
      <Box h="80%" bg="white" w="full" paddingX={2} pt={100}>
        <VStack space={2}>
          <DashboardLinks />
          <DashboardCarousel />
          <Text>Services</Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default DashboardOverlay;
