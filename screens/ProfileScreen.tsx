import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gql } from "graphql-request";

const ProfileScreen = (): JSX.Element => {
  const profileDataQuery = gql`
    query GetProfile {
      getProfile {
        id
        username
        email
      }
    }
  `;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.userInfo}>Profile</Text>
      </View>
    </>
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
