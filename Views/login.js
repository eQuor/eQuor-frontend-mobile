import { StyleSheet, View, Text, TextInput } from "react-native";

import { StatusBar } from "expo-status-bar";
import LargeBlueButton from "../components/LargeBlueButton";
import { useState } from "react";

export default function Login({ fontsLoaded }) {
  //for username
  const [username, setUsername] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  //for password
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  return (
    <>
      <View style={styles.welcomeWrap}>
        <View style={styles.backgroundTexture}></View>

        <View style={styles.mainContent}>
          <Text
            style={[
              styles.welcome_text,
              { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
            ]}
          >
            Login
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: fontsLoaded
                      ? "Poppins-ExtraBold.ttf"
                      : "System",
                  },
                ]}
              >
                Username:
              </Text>
              <TextInput
                style={styles.input}
                placeholder='Enter Username'
                onChangeText={handleUsernameChange}
                value={username}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: fontsLoaded
                      ? "Poppins-ExtraBold.ttf"
                      : "System",
                  },
                ]}
              >
                Password:
              </Text>
              <TextInput
                style={styles.input}
                placeholder='Enter Password'
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry={true}
              />
            </View>
          </View>

          <LargeBlueButton
            title='Login'
            fontsLoaded={fontsLoaded}
            onpress='Dashboard'
          />
        </View>
      </View>

      <StatusBar style='auto' />
    </>
  );
}

const styles = StyleSheet.create({
  welcome_text: {
    color: "#0066FF",
    fontSize: 60,
  },

  quote_text: {
    color: "#0066FF",
    fontSize: 30,
    textAlign: "center",
  },

  welcomeWrap: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
  },

  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundTexture: {
    backgroundColor: "#FFFFFF",
    width: "120%",
    height: "150%",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
  },

  formContainer: {
    width: 250,
    height: 200,
    display: "flex",
    justifyContent: "space-around",
    marginVertical: 50,
  },

  fieldContainer: {
    height: 80,
  },

  input: {
    backgroundColor: "#D9D9D9",
    height: 40,
    borderRadius: 10,
    padding: 10,
  },

  label: {
    color: "#525050",
    fontSize: 20,
  },
});
