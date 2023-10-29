import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBarDots from "../components/ProgressBarDots";
import LargeBlueButton from "../components/LargeBlueButton";
import { StatusBar } from "expo-status-bar";

export default function WelcomePage({ fontsLoaded }) {
  return (
    <SafeAreaView style={styles.mainWrap}>
      <ProgressBarDots pageNumber={1} />

      <Text
        style={[
          styles.welcome_text,
          { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
        ]}
      >
        Welcome to
      </Text>
      <Image
        style={styles.logoImage}
        source={require("../assets/images/logo.png")}
      />

      <Text
        style={[
          styles.quote_text,
          { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
        ]}
      >
        Where keeps you in know!
      </Text>

      <LargeBlueButton
        title='GET STARTED'
        fontsLoaded={fontsLoaded}
        onpress='Login'
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
  welcome_text: {
    color: "#0066FF",
    fontSize: 50,
  },
  quote_text: {
    color: "#0066FF",
    fontSize: 25,
  },

  logoImage: {
    marginVertical: 50,
  },
});
