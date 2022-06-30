import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";

import { AppContext } from "../contexts/AppContext";

const ProfileScreen = (): JSX.Element => {
  const { user } = useContext<any>(AppContext);
  console.log(user);

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
        <View>
          <Text style={styles.userInfo}>Username : {user.username}</Text>
          <Text style={styles.userInfo}>E-mail : {user.email}</Text>
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
  },
  userInfo: {
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
