import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { encode } from "base-64";
import { StatusBar } from "expo-status-bar";
import LargeBlueButton from "../components/LargeBlueButton";
import { useEffect, useState } from "react";
import axios from "axios";
import ServerConfig from "../config/backendConfigurations";
import { useNavigation } from "@react-navigation/native";
import QRScanner from "./QRScanner";

export default function Login({ fontsLoaded }) {
  const navigation = useNavigation();

  const [showScanner, setShowScanner] = useState(false);
  const getAutherization = async (data) => {
    console.log(data);
    try {
      await axios
        .post(
          ServerConfig.baseUrl +
            ":" +
            ServerConfig.port +
            "/api/v1/auth/RegisterWithQR",
          data,
          {}
        )
        .then((response) => {
          if (response.status === 200) {
            navigation.navigate("Dashboard");
          }
        });
    } catch (error) {
      if (error.response === undefined) {
        console.log("Connection error");
      } else if (error.response.status === 401) {
        Alert.alert(
          "Incorrect credentials",
          "Please double check your email and password",
          [{ text: "Retry", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }
  };

  //for username
  const [username, setUsername] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handleLogin = async () => {
    try {
      console.log("aaa");
      await axios
        .post(
          ServerConfig.baseUrl + ":" + ServerConfig.port + "/api/v1/auth/token",
          {
            requestDeviceCode: 1,
          },
          {
            headers: {
              Authorization: "Basic " + encode(username + ":" + password),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            navigation.navigate("Dashboard");
          }
        });
    } catch (error) {
      if (error.response.status === 401) {
        Alert.alert(
          "Incorrect credentials",
          "Please double check your email and password",
          [{ text: "Retry", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }
  };

  //for password
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  if (showScanner) {
    return (
      <QRScanner
        handleData={getAutherization}
        afterScanner={setShowScanner}
      ></QRScanner>
    );
  }

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

          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>

          <Pressable
            style={styles.loginQRButton}
            onPress={() => {
              setShowScanner(true);
            }}
          >
            <Text style={styles.loginQRButtonText}>Login using QRrrr</Text>
          </Pressable>
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

  loginButton: {
    width: 250,
    height: 50,
    backgroundColor: "#0066FF",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonText: {
    color: "white",
    fontSize: 30,
  },

  loginQRButton: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderColor: "#0066FF",
    borderWidth: 2,
  },

  loginQRButtonText: {
    color: "black",
    fontSize: 30,
  },
});
