import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import { auth } from "../lib/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const OnBoardingScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigation.navigate("Root");
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.7 }}>
        <Onboarding
          showSkip={false}
          bottomBarHeight={0}
          showPagination={false}
          pages={[
            {
              backgroundColor: "#fff",
              image: (
                <Image
                  source={require("../assets/1.png")}
                  style={{ resizeMode: "contain", width: "80%" }}
                />
              ),
              title: "",
              subtitle: "",
              showPagination: false,
            },
            {
              backgroundColor: "#fff",
              image: (
                <Image
                  source={require("../assets/2.png")}
                  style={{ resizeMode: "contain", width: "80%" }}
                />
              ),
              title: "",
              subtitle: "",
            },
          ]}
        />
      </View>

      <View
        style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem("doneOnboarding", JSON.stringify(true));
            navigation.navigate("PersonalInfo1");
          }}
          style={{
            backgroundColor: "#451b66",
            padding: 15,
            width: "80%",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
            Signup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem("doneOnboarding", JSON.stringify(true));
            navigation.navigate("Login");
          }}
          style={{
            borderColor: "#451b66",
            borderWidth: 2,
            marginTop: 20,
            padding: 15,
            width: "80%",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#451b66" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
