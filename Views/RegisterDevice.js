import { StyleSheet, View, Text, Pressable } from "react-native";
import ProgressBarDots from "../components/ProgressBarDots";
import LargeBlueButton from "../components/LargeBlueButton";
import { StatusBar } from "expo-status-bar";
import Gif from "react-native-gif";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import axios from "axios";
import ServerConfig from "../config/backendConfigurations";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterDevice(props) {
  const { fontsLoaded } = props;
  const [isNeededtoShowScanner, setIsNeededtoShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (isNeededtoShowScanner) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, [isNeededtoShowScanner]);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setScannedData(data);

    const deviceInfo = {
      brand: Device.brand.toString(),
      deviceName: Device.deviceName.toString(),
      manufacturer: Device.manufacturer.toString(),
      yearClass: Device.deviceYearClass.toString(),
      model_name: Device.modelName.toString(),
      osBuildId: Device.osBuildId.toString(),
      osInternalBuildId: Device.osInternalBuildId.toString(),
      osName: Device.osName.toString(),
      osVersion: Device.osVersion.toString(),
      supportedCpuArchitectures: Device.supportedCpuArchitectures.toString(),
      totalMemory: Device.supportedCpuArchitectures.toString(),
    };
    setIsNeededtoShowScanner(!isNeededtoShowScanner);
    setScanned(false);

    console.log(
      ServerConfig.baseUrl +
        ":" +
        ServerConfig.port +
        "/api/v1/student/testMobile"
    );
    navigation.navigate("Stay tuned");
    console.log(deviceInfo);
    await axios
      .post(
        ServerConfig.baseUrl +
          ":" +
          ServerConfig.port +
          "/api/v1/student/testMobile",
        deviceInfo
      )
      .then((response) => {
        if (response.status === 200) {
          navigation.navigate("Registration successful");
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isNeededtoShowScanner) {
    return (
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>
    );
  }

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
      {/* <LargeBlueButton
        title='Scan the QR code'
        fontsLoaded={fontsLoaded}
        onpress='Stay tuned'
      /> */}

      <Pressable
        style={styles.get_started_button}
        onPress={() => {
          setIsNeededtoShowScanner(!isNeededtoShowScanner);
        }}
      >
        <Text
          style={[
            styles.getStarted_button_text,
            { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
          ]}
        >
          Scan QR
        </Text>
      </Pressable>

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
