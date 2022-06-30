import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { AppContext } from "../contexts/AppContext";

const HomeScreen = ({ navigation }) => {
  const { setToken } = useContext<any>(AppContext);

  return (
    <>
      <View style={styles.homeContainer}>
        <Text>News</Text>
      </View>
      <View style={styles.homeBtnContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={async () => {
            await SecureStore.deleteItemAsync("secure_token");
            await setToken(null);
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.homeButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 0.8,
  },
  homeBtnContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#E41919",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  homeButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
