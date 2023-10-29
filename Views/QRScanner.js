import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";

function QRScanner({ afterScanner, handleData }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    afterScanner(false);
    handleData(JSON.parse(data));
  };
  return (
    <View style={styles.scannerContainer}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.scanner}
      />
    </View>
  );
}

export default QRScanner;

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

  scanner: {
    width: "90%",
    height: "90%",
  },

  scannerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
