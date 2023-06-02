import { Box, ScrollView, Text, VStack, useToast } from "native-base";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import DashboardCarousel from "../components/DashboardCarousel";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PayRentDashboardLinks } from "../components/DashboardLinks";
import { PayRentShowInfoBox } from "../components/ApplyNowBox";
import React from "react";
import { RootStackParamList } from "../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import Services from "../components/Services";
import colors from "native-base/lib/typescript/theme/base/colors";
import theme from "../src/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PayRentRepay">;

const PayRentRepayScreen = ({ navigation, route }: Props) => {
  const [daily, setDaily] = React.useState(0);
  const [monthly, setMonthly] = React.useState(0);
  // const [total, setTotal] = React.useState(0)

  const toast = useToast();

  const { allValues, component }: any = route.params;

  React.useEffect(() => {
    setDaily(allValues.daily);
    setMonthly(allValues.monthly);
    // setTotal(allValues.total)
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Box
        h="40"
        position={"absolute"}
        bg={component == "PayRent" ? "custom.payRent" : "custom.main"}
        mt={0}
        width="100%"
        style={styles.border}
        pt={4}
      ></Box>

      {/* <View style={{
        backgroundColor: theme.colors.custom.payRent,
        width: '100%', height: '25%',
        borderBottomRightRadius: 40, borderBottomLeftRadius: 40,
        position: 'absolute'
      }} /> */}

      <ScrollView style={{ flex: 1 }}>
        <VStack
          space={4}
          pb="8%"
          bg="transparent"
          w="full"
          marginTop={"25%"}
          paddingX={2}
          pt="35%"
        >
          <PayRentDashboardLinks />
          <DashboardCarousel />
          <VStack mt="2" px={5} space={2}>
            <Text fontWeight={400} fontSize="xl" fontFamily="heading">
              Services
            </Text>
            <Services />
          </VStack>
        </VStack>

        <Box
          alignSelf="center"
          position="absolute"
          p={4}
          width="85%"
          height="30%"
          rounded="lg"
          bg="coolGray.50"
          shadow="9"
        >
          <PayRentShowInfoBox
            daily={daily}
            monthly={monthly}
            component={component}
          />
        </Box>
      </ScrollView>

      <View
        style={{
          height: "9%",
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ alignItems: "center" }}
        >
          <Ionicons name={"home"} size={24} color="#46166c" />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Ionicons name={"cash"} size={24} color="#46166c" />
          <Text style={{ color: "#46166c" }}>PayRent</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{ alignItems: "center" }}
        >
          <Ionicons name={"settings-sharp"} size={24} color="#46166c" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PayRentRepayScreen;

const styles = StyleSheet.create({
  border: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topBox: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  bottomBox: { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
});
