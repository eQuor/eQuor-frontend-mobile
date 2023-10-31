import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBarDots from "../components/ProgressBarDots";
import LargeBlueButton from "../components/LargeBlueButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function WelcomePage({ fontsLoaded }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainWrap}>
      <Image style={styles.image} source={require("../assets/reg-dev.png")} />
      <Text style={styles.just_one_small}>Welcome to eQuor!</Text>
      <Text style={styles.register_your_device}>
        Manage your classroom with ease! Take attendance, track progress, and
        communicate with others.
      </Text>

      <TouchableOpacity
        style={styles.register_button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text
          style={[
            styles.register_button_text,
            { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>

      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    marginTop: 100,
    marginRight: 60,
    width: 200,
    height: 300,
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
});
