import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { gql, useQuery } from "@apollo/client";
import { AppContext } from "../contexts/AppContext";

const Tab = createBottomTabNavigator();

const PROFILE_DATA = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
    }
  }
`;

const Routes = (): JSX.Element => {
  const { setUser } = useContext<any>(AppContext);
  const { data, loading, error } = useQuery(PROFILE_DATA);

  useEffect(() => {
    if (data) {
      setUser(data.getProfile);
    }
  }, [data]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Projects") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#198CE4",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
        name="Projects"
        component={ProjectsScreen}
      />
      <Tab.Screen
        options={{
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#198CE4",
  },
});

export default Routes;
