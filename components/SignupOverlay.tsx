import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, VStack } from "native-base";
import LoginMini from "./LoginMini";

const SignupOverlay = () => {
  return (
    <VStack space={0}>
      <Box w="full" h={300} bg="white" />
      <Box
        w="full"
        h={260}
        bgColor="custom.main"
        //bg="custom.900"
        style={styles.bottomContainer}
      >
        <Box alignSelf="center" mt="24" mx="16">
          <LoginMini />
        </Box>
      </Box>
    </VStack>
  );
};

export default SignupOverlay;

const styles = StyleSheet.create({
  bottomContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
