import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import ProgressBarDots from "../components/ProgressBarDots";
import { StatusBar } from "expo-status-bar";
import Gif from "react-native-gif";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function StayTuned({ fontsLoaded }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainWrap}>
      <Gif
        source={require("../assets/gifs/bear-working.gif")}
        style={{
          width: 400,
          height: 400,
        }}
      />

      <Text style={styles.just_one_small}>Hang Tight!</Text>
      <Text style={styles.register_your_device}>
        Our bear is working hard on your request. Please be patient, we'll be
        back soon.
      </Text>

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
    justifyContent: "center",
  },

  just_one_small: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
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
