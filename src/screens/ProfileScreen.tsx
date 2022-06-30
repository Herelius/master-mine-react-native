import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "../contexts/AppContext";

const ProfileScreen = (): JSX.Element => {
  const { user } = useContext<any>(AppContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.userInfo}>Profile</Text>
        <Text style={styles.userInfo}>Username : {user.username}</Text>
        <Text style={styles.userInfo}>E-mail : {user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
