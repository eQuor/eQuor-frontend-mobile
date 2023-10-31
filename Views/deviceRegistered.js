import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import ProgressBarDots from "../components/ProgressBarDots";
import LargeBlueButton from "../components/LargeBlueButton";
import { StatusBar } from "expo-status-bar";
import Gif from "react-native-gif";
import { useNavigation } from "@react-navigation/native";

export default function DeviceRegistered({ fontsLoaded }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainWrap}>
      <Image style={styles.image} source={require("../assets/reg-dev.png")} />
      <Text style={styles.just_one_small}>Registration Complete!</Text>
      <Text style={styles.register_your_device}>
        You're now ready to join a session and start learning. Happy learning!
      </Text>

      <TouchableOpacity
        style={styles.register_button}
        onPress={() => {
          navigation.navigate("Session");
        }}
      >
        <Text
          style={[
            styles.register_button_text,
            { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
          ]}
        >
          Get Started
        </Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 100,
    marginRight: 60,
    width: 200,
    height: 300,
  },
  scannerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  scanner: {
    width: "90%",
    height: "90%",
  },
  mainWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  register_button: {
    backgroundColor: "#6C63FF",
    width: 250,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 100,
  },
  register_button_text: {
    color: "white",
    fontSize: 20,
  },
  just_one_small: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  register_your_device: {
    color: "#808080",
    marginHorizontal: 20,
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
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
