import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { request, gql, GraphQLClient } from "graphql-request";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = (): JSX.Element => {
  const [id, setId] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState([]);

  const profileDataQuery = gql`
    query Query {
      getProfile {
        username
        email
        projects {
          title
          tasks {
            title
          }
          users {
            username
          }
          dev {
            username
          }
          managers {
            username
          }
        }
      }
    }
  `;

  const placeholderData = [
    {
      username: "test",
      email: "test@test.fr",
      projects: [
        {
          title: "Discuss",
        },
      ],
    },
  ];

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
