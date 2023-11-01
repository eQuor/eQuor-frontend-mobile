import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { encode } from "base-64";
import { StatusBar } from "expo-status-bar";
import LargeBlueButton from "../components/LargeBlueButton";
import { useEffect, useState } from "react";
import axios from "axios";
import ServerConfig from "../config/backendConfigurations";
import { useNavigation } from "@react-navigation/native";
import QRScanner from "./QRScanner";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

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
        .then(async (response) => {
          if (response.status === 200) {
            if (response.data.isAuth) {
              let token = response.data.jwtToken;
              let userName = response.data.username;
              console.log(token);
              await SecureStore.setItemAsync("jwtToken", token);
              await SecureStore.setItemAsync("username", username);
            }
            navigation.navigate("Home");
          }
        });
    } catch (error) {
      Alert.alert(
        "Incorrect credentials",
        "Please double check your email and password",
        [{ text: "Retry", onPress: () => console.log(error) }],
        { cancelable: false }
      );
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
    <SafeAreaView style={styles.mainWrap}>
      <View style={styles.mainContent}>
        <Image style={styles.image} source={require("../assets/reg-dev.png")} />
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
                  fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System",
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
                  fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System",
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

        <TouchableOpacity style={styles.register_button} onPress={handleLogin}>
          <Text style={styles.register_button_text}>Login</Text>
        </TouchableOpacity>

        {/* <Pressable
          style={styles.loginQRButton}
          onPress={() => {
            setShowScanner(true);
          }}
        >
          <Text style={styles.loginQRButtonText}>Login using QRz</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginRight: 60,
    width: 200,
    height: 280,
  },
  mainWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  welcome_text: {
    fontSize: 30,
  },

  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  formContainer: {
    width: 250,
    height: 200,
    display: "flex",
    justifyContent: "space-around",
  },

  fieldContainer: {
    height: 80,
  },

  input: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 10,
    padding: 10,
    borderColor: "#B0B0B0",
    borderWidth: 1,
  },

  label: {
    color: "#525050",
    fontSize: 20,
  },

  register_button: {
    backgroundColor: "#6C63FF",
    width: 250,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  register_button_text: {
    color: "white",
    fontSize: 20,
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
