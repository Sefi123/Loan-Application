import { Box, Button, HStack, Stack, Text, VStack } from "native-base";
import { StyleSheet, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import theme from "../src/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PayRentReview">;

const PayRentReviewScreen = ({ navigation, route }: Props) => {
  const [daily, setDaily] = React.useState(0);
  const [monthly, setMonthly] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const { amount, days, allValues, component }: any = route.params;

  React.useEffect(() => {
    if (route.params) {
      setDaily(allValues.daily);
      setMonthly(allValues.monthly);
      setTotal(allValues.total);
    }
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center" }}
      edges={["bottom", "left", "right"]}
    >
      <Box
        h="64"
        bg={component == "PayRent" ? "custom.payRent" : "custom.main"}
        mt={0}
        width="100%"
        style={styles.border}
        pt={4}
      ></Box>
      <Stack zIndex={1} bottom="32" shadow={7} width="90%" height="27%">
        <HStack
          bg="white"
          h="50%"
          style={styles.topBox}
          alignItems="center"
          justifyContent={"center"}
          px={5}
          space={10}
        >
          <Text fontWeight={400} fontSize={21}>
            Under Review
          </Text>
        </HStack>
        <VStack
          bg="trueGray.300"
          flex={1}
          style={styles.bottomBox}
          pt={2}
          px={5}
          space={3}
          justifyContent={"center"}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight={300} fontSize={15}>
              Amount
            </Text>
            <Text fontWeight={300} fontSize={15}>
              GH₵ {amount}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight={300} fontSize={15}>
              Duration
            </Text>
            <Text fontWeight={300} fontSize={15}>
              Days {days}
            </Text>
          </HStack>
        </VStack>
      </Stack>

      <VStack
        pt="11%"
        //alignItems="center"
        h="24%"
        w="85%"
        rounded="xl"
        bg="info.100"
        space={2}
        bottom="40"
      >
        <HStack>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            <View>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                Daily Repay
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                Monthly Repay
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                Total Amount
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                Application Date
              </Text>
            </View>

            <View>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                -
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                -
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                -
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
                -
              </Text>
            </View>

            <View>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
                GH₵ {daily?.toFixed(2)}
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
                GH₵ {monthly?.toFixed(2)}
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
                GH₵ {total?.toFixed(2)}
              </Text>
              <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
                {format(new Date(), "P")}
              </Text>
            </View>
          </View>
        </HStack>
      </VStack>

      <Button
        bgColor={
          component == "PayRent"
            ? theme.colors.custom.payRent
            : theme.colors.custom.main
        }
        onPress={() =>
          navigation.navigate("PayRentRepay", {
            component: "PayRent",
            allValues,
          })
        }
      >
        OK
      </Button>
    </SafeAreaView>
  );
};

export default PayRentReviewScreen;

const styles = StyleSheet.create({
  border: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topBox: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  bottomBox: { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
});
