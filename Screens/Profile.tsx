import { Box, ScrollView, Text, VStack } from "native-base";

import ProfileCard from "../components/ProfileCard";
import ProfileFieldContainer from "../components/ProfileFieldContainer";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type dataProps = {
  title: string;
  color: string;
};
const data: dataProps[] = [
  { title: "Personal Information", color: "red.400" },
  { title: "Employer Information", color: "indigo.400" },
  { title: "Emergency Information", color: "red.400" },
  { title: "Mobile Wallet Information", color: "lightBlue.200" },
];

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Box px={4} alignItems="center" pb={3}>
          <Text
            fontFamily="heading"
            fontSize={26}
            mt={7}
            mb={21}
            alignSelf="center"
          >
            Profile
          </Text>

          <Box>
            <ProfileCard />
          </Box>

          <Text
            fontFamily="mono"
            fontWeight={200}
            ml={5}
            my={5}
            alignSelf="flex-start"
          >
            Required Fields
          </Text>
          <VStack space={6}>
            {data.map(({ title, color }, index) => (
              <ProfileFieldContainer title={title} key={index} bg={color} />
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
