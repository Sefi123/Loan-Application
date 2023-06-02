import * as ImagePicker from "expo-image-picker";

import { ActivityIndicator, View } from "react-native";
import {
  Button,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";

import FormInputDate from "../../components/FormInputDate";
import FormInputSelect from "../../components/FormInputSelect";
import FormInputText from "../../components/FormInputText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { manipulateAsync } from "expo-image-manipulator";
import uploadImageAsync from "../../lib/uploadImage";

type Props = NativeStackScreenProps<RootStackParamList, "PersonalInfo1">;
const FirstAuthScreen = ({ navigation }: Props) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const {
    trigger,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      const resizedImage = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { height: 700, width: 1200 } }],
        { compress: 1 }
      );
      const cardUrl = await uploadImageAsync(resizedImage.uri, "ghCards");
      setImage(result.assets[0].uri);
      setValue("ghcard_img", cardUrl);
      setLoading(false);
    }
  };

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 100);
  }, []);

  if (animating) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#000" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <VStack paddingX={2} space={4} alignItems="center" pb="8">
            <FormInputText w="85%" placeholder="First name" name="first_name" />
            <FormInputText w="85%" placeholder="Last name" name="last_name" />
            <FormInputText
              w="85%"
              placeholder="Personal phone number 1"
              name="phone_number_1"
              keyboardType="phone-pad"
            />
            <FormInputText
              w="85%"
              placeholder="Personal phone number 2"
              name="phone_number_2"
              keyboardType="numeric"
            />
            <FormInputText w="85%" placeholder="Email" name="email" />
            <FormInputDate
              placeholder="Date of birth"
              name="dob"
              w="85%"
              mb={3}
            />
            <FormInputSelect
              name="gender"
              mb={3}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              placeholder="Gender"
            />
            <FormControl
              isInvalid={errors.ghcard_number ? true : false}
              mb={3}
              //ml="12"
            >
              <Controller
                control={control}
                name="ghcard_number"
                render={({ field: { value, onChange } }) => (
                  <Stack alignItems="center">
                    <InputGroup
                      w={{
                        base: "85%",
                        md: "285",
                      }}
                    >
                      <InputLeftAddon
                        children={"GHA -"}
                        borderColor="trueGray.400"
                      />
                      <Input
                        w={{
                          base: "80%",
                          md: "100%",
                        }}
                        isFocused={errors.ghcard_number ? true : false}
                        placeholder="Ghana Card Numbers Only"
                        keyboardType="numeric"
                        value={value as string}
                        onChangeText={onChange}
                      />
                    </InputGroup>
                  </Stack>
                )}
              />
              {errors.ghcard_number && (
                <FormControl.ErrorMessage
                  ml={6}
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {errors.ghcard_number?.message}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Text
              fontSize={13}
              mr={10}
              color={errors.ghcard_img ? "red.500" : "black"}
            >
              {" "}
              * Please add an Image of your Ghana Card
            </Text>
            <Button
              size="xs"
              mr="40"
              onPress={pickImage}
              shadow={0}
              mb={3}
              _text={{ fontWeight: 400 }}
              variant="solid"
              leftIcon={
                image && !loading ? (
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={23}
                    color="green"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="cloud-upload-outline"
                    size={23}
                    color="white"
                  />
                )
              }
            >
              {loading ? (
                <Spinner accessibilityLabel="Submiting" color="gray" />
              ) : image && !loading ? (
                "Image Verified"
              ) : (
                "Uplaod Card Image"
              )}
            </Button>
            {image && (
              <Image
                resizeMode="cover"
                alt="image-GH003"
                w="85%"
                height={200}
                source={{ uri: image }}
              />
            )}
            <Button
              w="85%"
              bgColor="primary.900"
              onPress={async () => {
                const result = await trigger([
                  "first_name",
                  "last_name",
                  "phone_number_1",
                  "phone_number_2",
                  "email",
                  "ghcard_number",
                  "ghcard_img",
                ]);
                if (result) navigation.navigate("PersonalInfo2");
              }}
            >
              Next
            </Button>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default FirstAuthScreen;
