import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Routes from "./routes/Routes";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
  );
}
