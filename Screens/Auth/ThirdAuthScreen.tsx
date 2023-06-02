import { Button, ScrollView, VStack } from "native-base";

import FormInputSelect from "../../components/FormInputSelect";
import FormInputText from "../../components/FormInputText";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormContext } from "react-hook-form";

type Props = NativeStackScreenProps<RootStackParamList, "EmployerInfo">;
const ThirdAuthScreen = ({ navigation }: Props) => {
  const { trigger } = useFormContext();
  return (
    <SafeAreaView>
      <ScrollView w="100%">
        <VStack paddingX={2} space={4} alignItems="center" mb={4}>
          <FormInputText
            w="86%"
            placeholder="Company Name"
            name="company_name"
          />
          <FormInputText
            w="86%"
            placeholder="Phone Number"
            name="company_phone"
            keyboardType="numeric"
          />
          <FormInputText
            w="86%"
            placeholder="Company Location"
            name="company_location"
          />
          <FormInputText w="86%" placeholder="City" name="company_city" />
          <FormInputText
            w="86%"
            placeholder="Nearest Landmark"
            name="company_landmark"
          />
          <FormInputText
            w="86%"
            placeholder="Job Position"
            name="job_postion"
          />
          <FormInputSelect
            name="monthly_income"
            mb={3}
            options={[
              { label: "500 - 1000", value: "500 - 1000" },
              { label: "1000-3000", value: "1000-3000" },
              { label: "3000-5000", value: "3000-5000" },
            ]}
            placeholder="Monthly Income"
          />

          <Button
            w="85%"
            bgColor="primary.900"
            onPress={async () => {
              const result = await trigger([
                "company_name",
                "company_phone",
                "company_location",
                "company_city",
                "company_landmark",
                "monthly_salary",
                "job_postion",
              ]);
              if (result) navigation.navigate("ContactInfo");
            }}
          >
            Next
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThirdAuthScreen;
