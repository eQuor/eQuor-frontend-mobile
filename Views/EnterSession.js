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

export default function EnterSession({ fontsLoaded }) {
  const navigation = useNavigation();

  //for session code
  const [sessionCode, setSessionCode] = useState("");

  const handleSessionCodeChange = (value) => {
    let characterCheck = /[a-zA-Z]/;
    if (!characterCheck.test(value)) {
      setSessionCode(value);
    }
  };

  const handleSubmit = async () => {
    try {
      let result = await SecureStore.getItemAsync("jwtToken");
      let token;
      if (result) {
        token = result;
      } else {
        alert("No values stored under that key.");
      }
      console.log("aaa");
      await axios
        .get(
          ServerConfig.baseUrl +
            ":" +
            ServerConfig.port +
            `/api/v1/student/get-session?session_id=${sessionCode}`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            if (response.data.isFound) {
              await SecureStore.setItemAsync("session_id", sessionCode);
              navigation.navigate("Dashboard", { session_id: 2 });
            } else {
              alert("Session not found");
              setSessionCode("");
            }
            // navigation.navigate("Home");
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
          Ready to join?
        </Text>
        <Text style={styles.register_your_device}>
          Join, chat, and check in
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
              Session code
            </Text>
            <TextInput
              style={styles.input}
              placeholder='Enter session code'
              onChangeText={handleSessionCodeChange}
              value={sessionCode}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.register_button} onPress={handleSubmit}>
          <Text style={styles.register_button_text}>Join</Text>
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
  register_your_device: {
    color: "#808080",
    marginHorizontal: 20,
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
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
