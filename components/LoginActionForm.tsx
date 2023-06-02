import * as SecureStore from "expo-secure-store";

import { ActivityIndicator, Linking, View } from "react-native";
import {
  Button,
  FormControl,
  Icon,
  Input,
  Link,
  Pressable,
  Spinner,
  Text,
  Toast,
  VStack,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import { LoginFormInputs, UserType } from "../src/types";
import {
  PhoneAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, firebaseConfig } from "../lib/firebaseConfig";

import CustomAuth from "../Hooks/customAuth";
import { FirebaseError } from "firebase/app";
import { MaterialIcons } from "@expo/vector-icons";
import { loginSchema } from "../src/Schema";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginActionForm = () => {
  const [show, setShow] = React.useState(false);
  const [userPhone, setUserPhone] = React.useState("");
  const [otp, setOTP] = React.useState("");
  const [password, setPassword] = useState("");
  const user = CustomAuth();
  const {
    control,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState<string | null>();

  const toast = useToast();

  const onSubmit = async () => {
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        phone: userPhone,
        password: password,
      });

      var requestOptions: {} = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://test.api.junipermicrocredit.com/v1/user/login",
        requestOptions
      )
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status) {
            debugger;
            const credential = PhoneAuthProvider.credential(
              verificationId,
              otp
            );
            await signInWithCredential(auth, credential);
            await SecureStore.setItemAsync(
              "auth_user",
              JSON.stringify(result.data)
            );
            setLoading(false);
          } else {
            toast.show({
              description: "No user found",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("login error", err.message);
        });
    } catch (err: any) {
      console.log(err.message);
      if (err instanceof FirebaseError) {
        setError("The OTP you entered is invalid");
        setLoading(false);
      } else {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const [getOPT, setGetOPT] = useState(false);

  return (
    <VStack
      borderRadius={25}
      shadow={8}
      zIndex={2}
      mt="6"
      space={4}
      alignSelf="center"
      //width="87%"
      bgColor="blueGray.50"
      alignItems="center"
      justifyContent="center"
      paddingX={5}
      paddingBottom="10"
      paddingTop="24"
    >
      {error && (
        <Text color="red.500">
          *{" "}
          {error.includes("TOO_SHORT")
            ? "Too Short Phone Number"
            : error.substring(10)}
        </Text>
      )}
      <FormControl isInvalid={errors.phone_number ? true : false} mb="2">
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input
              w="86%"
              keyboardType="numeric"
              isFocused={errors.phone_number ? true : false}
              placeholder="Enter Phone Number"
              value={value}
              maxLength={10}
              onChangeText={(text) => {
                setUserPhone(text);
                setValue("phone_number", text);
              }}
            />
          )}
        />
        {errors.phone_number && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.phone_number?.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl
        isInvalid={errors.password?.message ? true : false}
        mb={!userPhone ? "0" : "2"}
      >
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <Input
              w="86%"
              keyboardType="numeric"
              isFocused={errors.password ? true : false}
              placeholder="OTP Code"
              maxLength={6}
              value={value as string}
              onChangeText={setOTP}
            />
          )}
        />
        {errors.password?.message && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      {userPhone && (
        <Button
          //mb={4}
          width={100}
          size="sm"
          variant="solid"
          onPress={async () => {
            const verify = await trigger("phone");
            if (verify) {
              try {
                setGetOPT(true);
                const phoneProvider = new PhoneAuthProvider(auth);
                if (recaptchaVerifier.current) {
                  let verificationId = await phoneProvider.verifyPhoneNumber(
                    `+233${userPhone}`,
                    recaptchaVerifier?.current
                  );

                  setVerificationId(verificationId);
                  setGetOPT(false);
                  setError(null);
                }
              } catch (err: any) {
                setGetOPT(false);
                setError(err.message);
              }
            }
          }}
        >
          {getOPT ? (
            <Spinner accessibilityLabel="Submiting" color="gray" />
          ) : (
            "Get OTP"
          )}
        </Button>
      )}
      <FormControl isInvalid={errors.password?.message ? true : false} mb="2">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              w="85%"
              placeholder="Enter Pin Code"
              value={value}
              maxLength={4}
              isFocused={errors.password ? true : false}
              onChangeText={(t) => {
                onChange(t), setPassword(t);
              }}
              keyboardType="numeric"
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={6}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
          )}
        />
        {errors.password && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.password.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <Link
        mb={2}
        alignSelf="flex-end"
        _text={{ textDecoration: "none", fontFamily: "body", fontWeight: 300 }}
      >
        forget password?
      </Link>
      <Button
        mb={4}
        width={220}
        testID="loginButton"
        size="sm"
        variant="solid"
        onPress={onSubmit}
      >
        {loading ? (
          <Spinner accessibilityLabel="Submiting" color="gray" />
        ) : (
          "Login"
        )}
      </Button>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <FirebaseRecaptchaBanner style={{ display: "none" }} />
    </VStack>
  );
};

export default LoginActionForm;
