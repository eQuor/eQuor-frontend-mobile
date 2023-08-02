import { FontDisplay } from "expo-font";
import { StyleSheet, View } from "react-native";

export default function ProgressBarDots() {
  return (
    <View style={styles.wrap}>
      <View style={styles.dots}></View>
      <View style={styles.dots}></View>
      <View style={styles.dots}></View>
      <View style={styles.dots}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 100,
    marginTop: 10,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dots: {
    backgroundColor: "#0066FF",
    width: 15,
    height: 15,
    borderRadius: 50,
  },
});
