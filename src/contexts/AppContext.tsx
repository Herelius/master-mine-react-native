import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { gql, useQuery } from "@apollo/client";

export const AppContext: any = createContext({});

const AppProvider = ({ children }: { children: any }) => {
  const test = "aaaaaa";
  const [user, setUser] = useState(null);
  const [headers, setHeaders] = useState(null);

  const getUserProfile = async () => {
    const token = await SecureStore.getItemAsync("secure_token");

    if (token) {
      console.log(token);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // getUserProfile();
  }, []);

  return (
    <AppContext.Provider value={{ test, getUserProfile }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
