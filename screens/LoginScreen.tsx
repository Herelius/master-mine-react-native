import React, { useEffect, useState } from "react";
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
import { API_URL } from "@env";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const saveSession = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getToken = async (key: string) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) setToken(result);
    else setToken("null");
  };

  useEffect(() => {
    try {
      getToken("secure_token");
      if (token !== "null") {
        navigation.navigate("Routes");
      }
    } catch (err) {
      console.log("No Token");
    }
  }, []);

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
        url: API_URL as string,
        document: signInQuery,
        variables: {
          email,
          password,
        },
      });
      console.log(req.signIn);
      saveSession("secure_token", req.signIn.accessToken);
      navigation.navigate("Routes");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Wrong credentials", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  return (
    token === "null" && (
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
            onPress={() => {
              signIn();
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
    )
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
