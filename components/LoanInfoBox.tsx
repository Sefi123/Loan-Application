import React, { useState } from "react";
import { Text, View, VStack } from "native-base";
import { format } from "date-fns";

type Props = {
  amount: number;
  days: number;
};
const LoanInfoBox = ({ amount, days }: Props) => {
  const [interest, setInterest] = React.useState(0);
  const [service, setService] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  React.useMemo(() => {
    setInterest((amount * days * 0.13) / 30);
    setService((amount * days * 0.2) / 30);
    setTotal(interest + service + amount);
  }, [amount, days, interest, service]);

  return (
    <VStack space={4}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
            Interest
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={300}>
            Service Fee
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
            GH₵{interest.toFixed(2)}
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            GH₵{service.toFixed(2)}
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            GH₵{total.toFixed(2)}
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            {format(new Date(), "P")}
          </Text>
        </View>
      </View>
    </VStack>
  );
};

export default LoanInfoBox;

type PayRentProps = {
  amount: number;
  month: number;
  values: any;
};
export const PayRentLoanInfoBox = ({ amount, month, values }: PayRentProps) => {
  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    setTotal(0.035 * month * amount + amount);
    setDaily(total / (month * 30));
    setMonthly(total / month);
  }, [amount, month, total]);

  React.useEffect(() => {
    values({
      daily,
      monthly,
      total,
    });
  }, [daily, monthly, total]);

  return (
    <VStack space={4}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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
            GH₵ {daily ? daily?.toFixed(2) : "0.00"}
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            GH₵ {monthly ? monthly?.toFixed(2) : "0.00"}
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            GH₵ {total?.toFixed(2)}
          </Text>
          <Text fontSize={17} style={{ marginBottom: 10 }} fontWeight={200}>
            {format(new Date(), "P")}
          </Text>
        </View>
      </View>
    </VStack>
  );
};
