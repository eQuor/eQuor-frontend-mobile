import { StyleSheet, View, Text } from "react-native";
import ProgressBarDots from "../components/ProgressBarDots";
import { StatusBar } from "expo-status-bar";
import Gif from "react-native-gif";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function StayTuned({ fontsLoaded }) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.welcomeWrap}>
        <View style={styles.backgroundTexture}></View>
        <View style={styles.ProgressBarDotsContainer}>
          <ProgressBarDots />
        </View>

        <View style={styles.mainContent}>
          <Text
            style={[
              styles.welcome_text,
              { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
            ]}
          >
            Stay tuned
          </Text>

          <Gif
            source={require("../assets/gifs/clock.gif")}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={[
              styles.quote_text,
              { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
            ]}
          >
            Your Registration is{"\n"} in Progress !
          </Text>
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

  get_started_button: {
    width: 250,
    height: 50,
    backgroundColor: "#0066FF",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  getStarted_button_text: {
    color: "white",
    fontSize: 30,
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
});
