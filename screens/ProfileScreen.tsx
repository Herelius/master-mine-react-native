import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = (): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
