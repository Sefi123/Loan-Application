import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { HStack } from "native-base";
import IconButton from "./IconButton";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const DashboardLinks = () => {
  return (
    <HStack justifyContent="space-between" px={10}>
      <IconButton
        name="Borrow"
        Icon={<FontAwesome name="credit-card" size={20} color="black" />}
      />
      <IconButton
        name="History"
        Icon={<Ionicons name="receipt-outline" size={20} color="black" />}
      />
      <IconButton
        name="Coupons"
        Icon={<Feather name="gift" size={20} color="black" />}
      />
    </HStack>
  );
};

export const PayRentDashboardLinks = () => {
  return (
    <HStack justifyContent="space-between" px={10}>
      <IconButton
        name="PayRent"
        Icon={<FontAwesome name="credit-card" size={20} color="black" />}
      />
      <IconButton
        name="History"
        Icon={<Ionicons name="receipt-outline" size={20} color="black" />}
      />
      <IconButton
        name="Favour"
        Icon={<Feather name="gift" size={20} color="black" />}
      />
    </HStack>
  );
};

export default DashboardLinks;
