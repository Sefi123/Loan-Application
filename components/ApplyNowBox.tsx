import { Button, HStack, Text, VStack, View } from "native-base";

import { HomeScreenNavigationProp } from "../Screens/Dashboard";
import { PayRentPaynowBox } from "./PaynowBox";
import React from "react";

type Props = {
  navigation: HomeScreenNavigationProp["navigation"];
};
const ApplyNowBox = ({ navigation }: Props) => {
  return (
    <VStack space={3} px={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={18} fontWeight={200} color="gray.500">
          Credit Limit
        </Text>
        <Text fontSize={18} fontWeight={400}>
          GH₵ 100.00
        </Text>
      </HStack>

      <Text
        fontSize={16}
        fontFamily="body"
        fontWeight={300}
        color="gray.600"
        alignSelf="center"
        mb="2"
      >
        Get it delivered to your account in less than 2 minutes
      </Text>
      <Button
        variant="solid"
        size="md"
        width="80%"
        alignSelf="center"
        onPress={() => navigation.navigate("Application")}
      >
        Apply Now
      </Button>
    </VStack>
  );
};

type PayRentShowBox = {
  daily: number;
  monthly: number;
  component?: string;
};

export const PayRentShowInfoBox = ({
  daily,
  monthly,
  component,
}: PayRentShowBox) => {
  return (
    <VStack space={3} px={2}>
      {component == "Loan" && <PayRentPaynowBox component={component} />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <View>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
            Amount Due
          </Text>
          {component != "Loan" && (
            <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
              Daily
            </Text>
          )}
          {component != "Loan" && (
            <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
              Monthly
            </Text>
          )}
        </View>

        <View>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            GH₵ {daily?.toFixed(2)}
          </Text>
          {component != "Loan" && (
            <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
              GH₵ {daily?.toFixed(2)}
            </Text>
          )}
          {component != "Loan" && (
            <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
              GH₵ {monthly?.toFixed(2)}
            </Text>
          )}
        </View>
      </View>

      {/* <View style={{ marginTop: 10, justifyContent: 'space-evenly', alignItems: 'center' }}> */}
      {component != "Loan" && <PayRentPaynowBox component={component} />}
      {/* </View> */}
    </VStack>
  );
};

export default ApplyNowBox;
