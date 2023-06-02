import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { Flex, NativeBaseProvider, View } from "native-base";
import Navigation from "./navigation";
import theme from "./src/theme";
import { useLoadedAssets } from "./Hooks/useLoadedAssets";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [auth, setAuth] = React.useState<boolean>(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <StatusBar style="light" backgroundColor={"black"} />
          {/* *conditionally set the style based on navigation route */}
          <Navigation />
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  }
}
