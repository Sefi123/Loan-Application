import { Button, ScrollView, Text, VStack } from "native-base";

import FormInputText from "../../components/FormInputText";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormContext } from "react-hook-form";

type Props = NativeStackScreenProps<RootStackParamList, "ContactInfo">;
const FourthAuthScreen = ({ navigation }: Props) => {
  const { trigger } = useFormContext();
  const validateFields = React.useCallback(async () => {
    const result = await trigger([
      "family_member_1_fullname",
      "family_member_1_phone_number",
      "family_member_1_relationship",
      "family_member_2_fullname",
      "family_member_2_phone_number",
      "family_member_2_relationship",
      "co_worker_fullname",
      "co_worker_phone",
      "co_worker_relationship",
    ]);
    if (result) navigation.navigate("MobileWallet");
  }, []);
  return (
    <SafeAreaView>
      <ScrollView w="100%">
        <VStack paddingX={2} space={4} alignItems="center" mb={4}>
          <Text fontWeight={400} fontFamily="body" mr="40">
            Family Memeber 1
          </Text>
          <FormInputText
            w="86%"
            placeholder="Full Name"
            name="family_member_1_fullname"
          />
          <FormInputText
            w="86%"
            placeholder="Phone Number"
            keyboardType="numeric"
            name="family_member_1_phone_number"
          />
          <FormInputText
            w="86%"
            mr="8"
            placeholder="Relationship(sister,brother,wife)"
            name="family_member_1_relationship"
          />

          <Text fontWeight={400} fontFamily="body" mr="40">
            Family Memeber 2
          </Text>
          <FormInputText
            w="86%"
            placeholder="Full Name"
            name="family_member_2_fullname"
          />
          <FormInputText
            w="86%"
            placeholder="Phone Number"
            keyboardType="numeric"
            name="family_member_2_phone_number"
          />
          <FormInputText
            w="86%"
            placeholder="Relationship(sister,brother,wife)"
            name="family_member_2_relationship"
          />

          <Text fontWeight={400} fontFamily="body" mr="48">
            Co-Worker
          </Text>

          <FormInputText
            w="86%"
            placeholder="Full Name"
            name="co_worker_fullname"
          />
          <FormInputText
            w="86%"
            placeholder="Phone Number"
            keyboardType="numeric"
            name="co_worker_phone"
          />
          <FormInputText
            w="86%"
            placeholder="Relationship(manager, supervisor,..)"
            name="co_worker_relationship"
          />

          <Button w="85%" bgColor="primary.900" onPress={validateFields}>
            Next
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FourthAuthScreen;
