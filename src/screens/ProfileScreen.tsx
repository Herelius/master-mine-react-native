import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

import { AppContext } from "../contexts/AppContext";

const ProfileScreen = ({ navigation }: any): JSX.Element => {
  const { user, isAuth } = useContext<any>(AppContext);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.avatar}>
          <Avatar.Image size={220} source={require("../assets/avatar.png")} />
        </View>
        <View style={styles.button}>
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log("Change avatar")}
          >
            Change avatar
          </Button>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>
            Username : {user ? user.username : null}
          </Text>
          <Text style={styles.userInfo}>
            E-mail : {user ? user.email : null}
          </Text>
        </View>
        <View style={styles.logOutBtnContainer}>
          <Button
            icon="logout"
            mode="contained"
            style={{
              backgroundColor: "#fc0a54",
            }}
            onPress={async () => {
              await SecureStore.deleteItemAsync("secure_token");
              isAuth(false);

              navigation.navigate("Login");
            }}
          >
            Log out
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
  },
  userInfoContainer: {
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#198CE4",
  },
  userInfo: {
    padding: 5,
    fontSize: 25,
    color: "white",
  },
  logOutBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    paddingTop: 35,
  },
});

export default ProfileScreen;
