import { FontDisplay } from "expo-font";
import { StyleSheet, View } from "react-native";

export default function ProgressBarDots({ pageNumber }) {
  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.dots,
          { backgroundColor: pageNumber === 1 ? "#0066FF" : "#D9D9D9" },
        ]}
      ></View>
      <View
        style={[
          styles.dots,
          { backgroundColor: pageNumber === 2 ? "#0066FF" : "#D9D9D9" },
        ]}
      ></View>
      <View
        style={[
          styles.dots,
          { backgroundColor: pageNumber === 3 ? "#0066FF" : "#D9D9D9" },
        ]}
      ></View>
      <View
        style={[
          styles.dots,
          { backgroundColor: pageNumber === 4 ? "#0066FF" : "#D9D9D9" },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 100,
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
