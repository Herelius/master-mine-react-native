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
  const [token, setToken] = useState<any | null>(null);
  const [user, setUser] = useState(null);
  const [headers, setHeaders] = useState(null);

  useEffect(() => {}, []);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
