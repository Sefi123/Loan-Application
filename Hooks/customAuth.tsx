import React from "react";
import * as SecureStore from "expo-secure-store";
import { UserType } from "../src/types";

const CustomAuth = () => {
  const [authUser, setAuthUser] = React.useState<UserType | null>();
  const getAuthUser = async () => {
    let result = await SecureStore.getItemAsync("auth_user");
    if (result) {
      setAuthUser(JSON.parse(result));
    }
  };
  React.useEffect(() => {
    getAuthUser();
  }, []);
  return authUser;
};

export default CustomAuth;
