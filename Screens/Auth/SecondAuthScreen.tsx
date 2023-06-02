import { Button, ScrollView, VStack } from "native-base";
import { Text, View } from "react-native";

import FormInputSelect from "../../components/FormInputSelect";
import FormInputText from "../../components/FormInputText";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormContext } from "react-hook-form";

type Props = NativeStackScreenProps<RootStackParamList, "PersonalInfo2">;

const SecondAuthScreen = ({ navigation }: Props) => {
  const { trigger, getValues } = useFormContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack paddingX={2} space={4} alignItems="center" mb={3}>
          <FormInputSelect
            name="marital_status"
            mb={3}
            options={[
              { label: "Single", value: "Single" },
              { label: "Married", value: "Married" },
            ]}
            placeholder="Marital Status"
          />
          <FormInputText
            w="86%"
            placeholder="Education Level"
            name="education"
          />
          <FormInputText
            w="86%"
            name="residential_address"
            placeholder="Current Residential address/GPS"
          />
          <FormInputSelect
            name="religion"
            mb={3}
            options={[
              { label: "Christian", value: "Christian" },
              { label: "Muslim", value: "Muslim" },
              { label: "Traditionalist", value: "Traditionalist" },
              { label: "Other", value: "Other" },
            ]}
            placeholder="Religion"
          />
          <FormInputText w="86%" name="region" placeholder="Region" />
          <FormInputText w="86%" name="town" placeholder="Town" />
          <FormInputText w="86%" name="occupation" placeholder="Area" />
          <FormInputText
            w="86%"
            name="landmark"
            placeholder="Nearest landmark"
            mb={1}
          />
          <Button
            w="85%"
            bgColor="primary.900"
            onPress={async () => {
              const result = await trigger([
                "marital_status",
                "education",
                "residential_address",
                "religion",
                "occupation",
                "town",
                "region",
                "landmark",
              ]);
              if (result) navigation.navigate("EmployerInfo");
            }}
          >
            Next
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecondAuthScreen;
