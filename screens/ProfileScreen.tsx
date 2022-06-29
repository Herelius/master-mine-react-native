import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

const PROFILE_DATA = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
    }
  }
`;

const ProfileScreen = (): JSX.Element => {
  const { data, loading, error } = useQuery(PROFILE_DATA);
  useEffect(() => {});
  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.userInfo}>Loading ...</Text>
        ) : (
          <View>
            <Text style={styles.userInfo}>Profile</Text>
            <Text style={styles.userInfo}>
              Username : {data.getProfile.username}
            </Text>
            <Text style={styles.userInfo}>
              E-mail : {data.getProfile.email}
            </Text>
          </View>
        )}
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
