import { Box, Center, Pressable, Text } from "native-base";

import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const GradientButton = () => {
  return (
    <Pressable size="md" height="45%" flex={1}>
      {({ isPressed }) => {
        return (
          <LinearGradient
            style={{
              flex: 1,
              flexDirection: "row",
              borderRadius: 14,
              transform: [
                {
                  scale: isPressed ? 0.95 : 1,
                },
              ],
            }}
            // Button Linear Gradient
            colors={["#FAD961", "#FAB470"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 0 }}
            // locations={[0.1, 0.9]}
          >
            <Center px={3}>
              <Text fontSize={12} fontWeight={400} color="white">
                Check
              </Text>
            </Center>
          </LinearGradient>
        );
      }}
    </Pressable>
  );
};

export default GradientButton;
