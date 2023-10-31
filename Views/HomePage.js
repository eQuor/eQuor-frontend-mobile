import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Device from "expo-device";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function HomePage({ fontsLoaded }) {
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
    let result = await SecureStore.getItemAsync("jwtToken");
    let token;
    if (result) {
      token = result;
    } else {
      alert("No values stored under that key.");
    }
    console.log(deviceInfo);
    await axios
      .post(
        ServerConfig.baseUrl +
          ":" +
          ServerConfig.port +
          "/api/v1/student/testMobile",
        deviceInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          if (data.isRegistered) {
            alert(data.error);
          } else {
            alert(data.error);
            navigation.navigate("Registration successful");
          }
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
      <Image style={styles.image} source={require("../assets/reg-dev.png")} />
      <Text style={styles.just_one_small}>Just one small step!</Text>
      <Text style={styles.register_your_device}>
        You cannot use another smartphone after the Registration. Always use the
        registered device to mark your attendance
      </Text>

      <Pressable
        style={styles.register_button}
        onPress={() => {
          setIsNeededtoShowScanner(!isNeededtoShowScanner);
        }}
      >
        <Text
          style={[
            styles.register_button_text,
            { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
          ]}
        >
          Register Now
        </Text>
      </Pressable>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 100,
    marginRight: 60,
    width: 200,
    height: 300,
  },
  scannerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  scanner: {
    width: "90%",
    height: "90%",
  },
  mainWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
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
  just_one_small: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  register_your_device: {
    color: "#808080",
    marginHorizontal: 20,
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
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

  formContainer: {
    width: 250,
    height: 200,
    display: "flex",
    justifyContent: "space-around",
    marginVertical: 50,
  },

  fieldContainer: {
    height: 80,
  },

  input: {
    backgroundColor: "#D9D9D9",
    height: 40,
    borderRadius: 10,
    padding: 10,
  },

  label: {
    color: "#525050",
    fontSize: 20,
  },

  loginButton: {
    width: 250,
    height: 50,
    backgroundColor: "#0066FF",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonText: {
    color: "white",
    fontSize: 30,
  },

  loginQRButton: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderColor: "#0066FF",
    borderWidth: 2,
  },

  loginQRButtonText: {
    color: "black",
    fontSize: 30,
  },
});
