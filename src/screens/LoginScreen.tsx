import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { request, gql } from "graphql-request";
import { AppContext } from "../contexts/AppContext";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { getUserProfile }: any = useContext(AppContext);

  const getToken = async (key: string) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) setToken(result);
    else setToken("null");
  };

  useEffect(() => {
    try {
      getToken("secure_token");
    } catch (err) {
      console.log("No Token");
    }
  }, []);

  const query = gql`
    query Query {
      getUser {
        username
        email
      }
    }
  `;

  const signInQuery = gql`
    mutation SignIn($password: String!, $email: String!) {
      signIn(password: $password, email: $email) {
        accessToken
      }
    }
  `;

  const signIn = async () => {
    try {
      const req = await request({
        url: "http://192.168.0.244:4000/graphql",
        document: signInQuery,
        variables: {
          email,
          password,
        },
      });

      if (req.signIn.accessToken) {
        await SecureStore.setItemAsync("secure_token", req.signIn.accessToken);
        getUserProfile();
        navigation.navigate("Routes");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Wrong credentials", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  return token !== "null" ? (
    <>
      <View style={styles.homeContainer}>
        <Text>News</Text>
      </View>
      <View style={styles.homeBtnContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={async () => {
            await SecureStore.deleteItemAsync("secure_token");
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.homeButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          autoCompleteType="password"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await signIn();
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF8F8",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
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

export default LoginScreen;
