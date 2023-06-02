import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Text,
  VStack,
} from "native-base";
import { intervalToDuration, startOfDay } from "date-fns";

import { HomeScreenNavigationProp } from "../Screens/Dashboard";
import React from "react";
import theme from "../src/theme";
import { useNavigation } from "@react-navigation/native";

type Props = {
  navigation: HomeScreenNavigationProp["navigation"];
  repayment?: string | Date;
  amount: number;
};
const PaynowBox = ({ navigation, repayment, amount }: Props) => {
  let { days, hours, minutes } = intervalToDuration({
    // start: startOfDay(new Date(repayment as Date)),
    start: new Date(),
    end: new Date(),
  });
  const [showModal, setShowModal] = React.useState(false);
  const [paymentAmt, setPaymentAmt] = React.useState("");
  const handleChange = (text: string) => setPaymentAmt(text);
  return (
    <>
      <VStack space={3} px={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize={18} fontWeight={200} color="gray.500">
            Amount Due
          </Text>
          <Text fontSize={18} fontWeight={400}>
            GH₵ {amount}
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
          {days} days left for loan repayment
        </Text>
        <Button
          variant="solid"
          size="md"
          width="80%"
          alignSelf="center"
          onPress={() => setShowModal(true)}
          //onPress={() => navigation.navigate("Application")}
        >
          Repay Loan
        </Button>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.CloseButton />
          <Modal.Header _text={{ fontFamily: "Inter-Bold" }}>
            Enter Amount to Pay
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label _text={{ color: "black" }}>
                Amount Gh₵
              </FormControl.Label>
              <Input
                keyboardType="numeric"
                placeholder="Enter Amount.."
                value={paymentAmt}
                onChangeText={handleChange}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                //variant="ghost"
                //colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                isDisabled={paymentAmt.length > 0 ? false : true}
                onPress={() => {
                  //mutation here to make the payment and on success invalidate the qyery
                  setShowModal(false);
                }}
              >
                Pay Amount
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default PaynowBox;

export const PayRentPaynowBox = ({ component }: any) => {
  let { days, hours, minutes } = intervalToDuration({
    start: new Date(),
    end: new Date(),
  });
  const [showModal, setShowModal] = React.useState(false);
  const [paymentAmt, setPaymentAmt] = React.useState("");
  const handleChange = (text: string) => setPaymentAmt(text);

  return (
    <>
      <Button
        variant="solid"
        size="md"
        width="80%"
        alignSelf="center"
        bgColor={
          component == "Loan"
            ? theme.colors.custom.main
            : theme.colors.custom.payRent
        }
        onPress={() => setShowModal(true)}
        //onPress={() => navigation.navigate("Application")}
      >
        Repay Loan
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.CloseButton />
          <Modal.Header _text={{ fontFamily: "Inter-Bold" }}>
            Enter Amount to Pay
          </Modal.Header>
          <Modal.Body style={{ marginTop: -15 }}>
            <FormControl>
              <FormControl.Label _text={{ color: "black" }}>
                Amount Gh₵
              </FormControl.Label>
              <Input
                keyboardType="numeric"
                placeholder="Enter Amount.."
                value={paymentAmt}
                onChangeText={handleChange}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer style={{ paddingTop: 5, paddingBottom: 5 }}>
            <Button.Group space={2}>
              <Button
                marginTop={"0"}
                //variant="ghost"
                //colorScheme="blueGray"
                bgColor={theme.colors.custom.payRent}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                marginTop={"0"}
                bgColor={theme.colors.custom.payRent}
                isDisabled={paymentAmt.length > 0 ? false : true}
                onPress={() => {
                  //mutation here to make the payment and on success invalidate the query
                  setShowModal(false);
                }}
              >
                Proceed
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
