import { ScrollView, VStack, ZStack } from "native-base";

import ActionForm from "../../components/ActionForm";
import React from "react";
import { SafeAreaView } from "react-native";
import SignInMini from "../../components/SignInMini";
import SignupOverlay from "../../components/SignupOverlay";

const SignUp = () => {
  return (
    <SafeAreaView>
      <ScrollView w="100%">
        <ZStack>
          <SignupOverlay />
          <VStack
            alignSelf="center"
            mt={16}
            w="100%"
            alignItems="center"
            space={7}
          >
            <ActionForm />
            <SignInMini />
          </VStack>
        </ZStack>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
