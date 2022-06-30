import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { gql, useQuery } from "@apollo/client";

const PROFILE_DATA = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
    }
  }
`;

export const AppContext: any = createContext({});

const AppProvider = ({ children }: { children: any }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const getToken = async () => {
    const result = await SecureStore.getItemAsync("secure_token");
    if (result) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
