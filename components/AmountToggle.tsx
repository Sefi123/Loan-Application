import { HStack, IconButton, Text, VStack } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

type Props = {
  amount: number;
  toggleAmount: React.Dispatch<React.SetStateAction<number>>;
  days: number;
  toggleDays: React.Dispatch<React.SetStateAction<number>>;
  // toggleMonth: React.Dispatch<React.SetStateAction<number>>;
};

const AmountToggle = ({ amount, toggleAmount, days, toggleDays }: Props) => {
  const increaseAmount = React.useCallback(
    () => toggleAmount(amount + 1),
    [amount]
  );

  const decreaseAmount = React.useCallback(
    () => (amount == 0 ? toggleAmount(0) : toggleAmount(amount - 1)),
    [amount]
  );
  const increaseDays = React.useCallback(() => toggleDays(days + 1), [days]);
  const decreaseDays = React.useCallback(
    () => (days == 0 ? toggleDays(0) : toggleDays(days - 1)),
    [days]
  );

  return (
    <VStack space={5} alignItems="center">
      <HStack space={7} alignItems="flex-start">
        <IconButton
          onPress={decreaseAmount}
          variant="unstyled"
          mt={1}
          icon={
            <MaterialCommunityIcons
              name="chevron-left-box-outline"
              size={24}
              color="darkgray"
            />
          }
        />
        <VStack space={1} alignItems="center">
          <Text fontWeight={400} fontSize={21} color="white">
            GH₵ {amount.toFixed(0)}
          </Text>
          <Text fontSize={14} fontWeight={300} color="white">
            Amount
          </Text>
        </VStack>
        <IconButton
          onPress={increaseAmount}
          //mt={2}
          variant="unstyled"
          icon={
            <MaterialCommunityIcons
              name="chevron-right-box-outline"
              size={24}
              color="darkgray"
            />
          }
        />
      </HStack>
      <HStack space={7} alignItems="flex-end">
        <IconButton
          onPress={decreaseDays}
          variant="unstyled"
          icon={
            <MaterialCommunityIcons
              name="chevron-left-box-outline"
              size={24}
              color="darkgray"
            />
          }
        />
        <VStack space={1} alignItems="center">
          <Text fontWeight={400} fontSize={22} color="white">
            {days}
          </Text>
          <Text fontSize={14} fontWeight={300} color="white">
            Period (days)
          </Text>
        </VStack>
        <IconButton
          onPress={increaseDays}
          mb={0.5}
          variant="unstyled"
          icon={
            <MaterialCommunityIcons
              name="chevron-right-box-outline"
              size={24}
              color="darkgray"
            />
          }
        />
      </HStack>
    </VStack>
  );
};

export default AmountToggle;

type PayRentProps = {
  amount: number;
  toggleAmount: React.Dispatch<React.SetStateAction<number>>;
  days: number;
  toggleDays: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  toggleMonth: React.Dispatch<React.SetStateAction<number>>;
};

export const PayRentAmountToggle = ({
  amount,
  toggleAmount,
  month,
  toggleMonth,
}: PayRentProps) => {
  const increaseAmount = React.useCallback(
    () => toggleAmount(amount + 100),
    [amount]
  );

  const decreaseAmount = React.useCallback(
    () => (amount == 0 ? toggleAmount(0) : toggleAmount(amount - 1)),
    [amount]
  );

  const increaseMonth = React.useCallback(() => {
    toggleMonth(month + 1);
    // toggleDays(days + 30)
  }, [month]);

  const decreaseMonth = React.useCallback(() => {
    amount == 0 ? toggleMonth(0) : toggleMonth(month - 1);
    // toggleDays(days - 30)
    // days == 0 ? toggleDays(0) : toggleDays(days - 30)
  }, [month]);

  // const increaseDays = React.useCallback(() => toggleDays(days + 1), [days]);
  // const decreaseDays = React.useCallback(
  //   () => (days == 0 ? toggleDays(0) : toggleDays(days - 1)),
  //   [days]
  // );

  return (
    <VStack space={5} alignItems="center">
      <HStack space={7} alignItems="flex-start">
        <IconButton
          onPress={decreaseAmount}
          variant="unstyled"
          mt={1}
          icon={
            <MaterialCommunityIcons
              name="chevron-left-box-outline"
              size={24}
              color="black"
            />
          }
        />
        <VStack space={1} alignItems="center">
          <Text fontWeight={400} fontSize={21} color="white">
            GH₵ {amount.toFixed(0)}
          </Text>
          <Text fontSize={14} fontWeight={300} color="white">
            Amount
          </Text>
        </VStack>
        <IconButton
          onPress={increaseAmount}
          //mt={2}
          variant="unstyled"
          icon={
            <MaterialCommunityIcons
              name="chevron-right-box-outline"
              size={24}
              color="black"
            />
          }
        />
      </HStack>

      {/* month */}
      <HStack space={7} alignItems="flex-start">
        <IconButton
          onPress={decreaseMonth}
          variant="unstyled"
          mt={1}
          icon={
            <MaterialCommunityIcons
              name="chevron-left-box-outline"
              size={24}
              color="black"
            />
          }
        />
        <VStack space={1} alignItems="center">
          <Text fontWeight={400} fontSize={21} color="white">
            {month}
          </Text>
          <Text fontSize={14} fontWeight={300} color="white">
            Months
          </Text>
        </VStack>
        <IconButton
          onPress={increaseMonth}
          //mt={2}
          variant="unstyled"
          icon={
            <MaterialCommunityIcons
              name="chevron-right-box-outline"
              size={24}
              color="black"
            />
          }
        />
      </HStack>

      {/* <HStack space={7} alignItems="flex-end">

        <VStack space={1} alignItems="center">
          <Text fontWeight={400} fontSize={22} color="white">
            {month * 30}
          </Text>
          <Text fontSize={14} fontWeight={300} color="white">
            Days
          </Text>
        </VStack>

      </HStack> */}
    </VStack>
  );
};
