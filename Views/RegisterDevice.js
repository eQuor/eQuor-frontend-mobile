import { StyleSheet, View, Text } from "react-native";
import ProgressBarDots from "../components/ProgressBarDots";
import LargeBlueButton from "../components/LargeBlueButton";
import { StatusBar } from "expo-status-bar";
import Gif from "react-native-gif";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterDevice(props) {
  const { fontsLoaded } = props;

  return (
    <SafeAreaView style={styles.mainWrap}>
      <ProgressBarDots pageNumber={2} />
      <Text
        style={[
          styles.titleText,
          { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
        ]}
      >
        Get your device
      </Text>
      <Gif
        source={require("../assets/gifs/qr-code-scan.gif")}
        style={{ width: 300, height: 300 }}
      />
      <LargeBlueButton
        title='Scan the QR code'
        fontsLoaded={fontsLoaded}
        onpress='Stay tuned'
      />

      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  titleText: {
    color: "#0066FF",
    fontSize: 40,
    textAlign: "justify",
    marginHorizontal: 10,
  },
});
