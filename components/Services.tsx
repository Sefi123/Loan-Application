import { StyleSheet } from "react-native";
import React from "react";
import { Box, Button, Flex, HStack, Image, Text, VStack } from "native-base";
import GradientButton from "./GradientButton";

const Services = () => {
  return (
    <HStack px={1} justifyContent="space-between" alignItems="center">
      <Box>
        <Image
          size="sm"
          source={require("../assets/images/serviceIcon.png")}
          style={styles.image}
          alt=""
        />
      </Box>

      <Flex w="54%" ml={2}>
        <Text fontWeight={300} fontSize="md" fontFamily="heading" mb={2}>
          Always refused?
        </Text>
        <Text
          fontSize={12}
          fontWeight={200}
          lineHeight="xs"
          color="gray.500"
          fontFamily="mono"
        >
          Check your credit here. recommend more platforms
        </Text>
      </Flex>

      <GradientButton />
    </HStack>
  );
};

export default Services;

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FAD961",
    backgroundImage: "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%);",
  },
});
