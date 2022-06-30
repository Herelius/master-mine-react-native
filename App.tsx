import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import RegisterScreen from "./src/screens/RegisterScreen";
import Routes from "./src/routes/Routes";
import AppProvider from "./src/contexts/AppContext";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const httpLink = createHttpLink({
  uri: API_URL as string,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("secure_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Routes"
                component={Routes}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </AppProvider>
  );
}
