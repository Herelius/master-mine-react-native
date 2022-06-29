import React, { useState } from "react";
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
import { gql, request } from "graphql-request";
import { API_URL } from "@env";

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const newUser = gql`
    mutation SignUp($data: SignUpInput!) {
      signUp(data: $data) {
        username
        email
        password
      }
    }
  `;

  const registerNewUser = async () => {
    if (confirmPassword.length && confirmPassword === password) {
      try {
        const req = await request({
          url: API_URL as string,
          document: newUser,
          variables: {
            data: { username, email, password },
          },
        });
        console.log(req);
        Alert.alert("Congratulations", "User created");
      } catch (err) {
        Alert.alert("Error", "User already exist");
      }
    } else {
      Alert.alert("Error", "The passwords do not match");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
          autoCompleteType="username"
        />
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          autoCompleteType="password"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => registerNewUser()}
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
});

export default RegisterScreen;
