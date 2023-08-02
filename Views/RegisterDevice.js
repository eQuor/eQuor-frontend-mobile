import { StyleSheet, View, Text } from "react-native";
import ProgressBarDots from "../components/ProgressBarDots";
import LargeBlueButton from "../components/LargeBlueButton";
import { StatusBar } from "expo-status-bar";
import Gif from "react-native-gif";

export default function RegisterDevice(props) {
  const { fontsLoaded } = props;

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
              styles.titleText,
              { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
            ]}
          >
            Get your device
          </Text>
          <Text
            style={[
              styles.titleText,
              { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
            ]}
          >
            registered
          </Text>
        </View>

        <Gif
          source={require("../assets/gifs/qr-code-scan.gif")}
          style={{ width: 300, height: 300 }}
        />

        <LargeBlueButton
          title='Scan the QR code'
          fontsLoaded={fontsLoaded}
          onpress='Stay tuned'
        />
      </View>
      <StatusBar style='auto' />
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: "#0066FF",
    fontSize: 40,
    textAlign: "justify",
    marginHorizontal: 10,
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
