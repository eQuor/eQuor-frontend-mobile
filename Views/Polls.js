import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

function Polls() {
  return (
    <View style={styles.mainWrap}>
      <Image style={styles.image} source={require("../assets/reg-dev.png")} />
      <Text style={styles.just_one_small}>No current Polls!</Text>
    </View>
  );
}

export default Polls;

const styles = StyleSheet.create({
  mainWrap: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    marginTop: 100,
    width: 200,
    height: 300,
  },
  just_one_small: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
});
