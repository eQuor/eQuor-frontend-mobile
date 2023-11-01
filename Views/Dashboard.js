import { React, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Chat from "./Chat";
import { useNavigation } from "@react-navigation/native";
import Polls from "./Polls";

const Tab = createMaterialTopTabNavigator();

function Dashboard({ fontsLoaded, subject }) {
  const [isNeededToLift, setisNeededToLift] = useState(false);
  const [isNeededtoShowScanner, setIsNeededtoShowScanner] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({});
  const [scannedCount, setScannedCount] = useState(0);
  const navigation = useNavigation();

  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState([]);

  const getSessiondetails = async () => {
    let result = await SecureStore.getItemAsync("session_id");
    let token = await SecureStore.getItemAsync("jwtToken");

    await axios
      .get(
        ServerConfig.baseUrl +
          ":" +
          ServerConfig.port +
          `/api/v1/session/${result}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data === null) {
            alert("No session");
          } else {
            setSessionDetails(response.data);
          }
          // navigation.navigate("Home");
        }
      });
  };

  useEffect(() => {
    getSessiondetails();
    setScannedData([]);
    setScannedCount(0);
    //barcode
    if (isNeededtoShowScanner) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, [isNeededtoShowScanner]);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const newData = scannedData;
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    if (newData[newData.length - 1] === data) {
      alert(scannedCount);
      setScanned(false);
    } else {
      newData.push(data);
      setScannedData(newData);
      const newCount = scannedCount + 1;
      setScannedCount(newCount);
    }

    setScanned(false);

    setScannedData(newData);

    if (scannedCount === 7) {
      setScanned(true);
      setIsNeededtoShowScanner(!isNeededtoShowScanner);
      alert(JSON.stringify(scannedData));
      const codes = {
        codes: scannedData,
      };
      alert(codes);
      const stringData = scannedData;
      const intData = stringData.map((el) => {
        return parseInt(el);
      });
      alert(JSON.stringify(intData));
      try {
        let result = await SecureStore.getItemAsync("jwtToken");
        let token;
        if (result) {
          token = result;
        } else {
          alert("No values stored under that key.");
        }
        await axios
          .post(
            ServerConfig.baseUrl +
              ":" +
              ServerConfig.port +
              "/api/v1/student/mark-attendance",
            {
              sessionId: 33,
              codes: intData,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              navigation.navigate("Dashboard");
              if (response.data.isMarked) {
                alert("You're in the clear!");
              } else {
                alert(response.data.error);
              }
            } else if (response.status === 401) {
              alert("Unauthorized");
            } else {
              alert("Unexpected error!");
            }
          });
      } catch (error) {
        //implement
        console.log(error);
        alert("Error");
      }
    }
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
    <SafeAreaView>
      <View style={styles.tabContainer}>
        <Text
          style={[
            styles.dashBoardTitle,
            { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
          ]}
        >
          {sessionDetails.session_name}
        </Text>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              height: 50,
              display: "flex",
              justifyContent: "flex-end",
            },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System",
              color: "black",
            },
            tabBarIndicatorStyle: { backgroundColor: "#4154F1" },
          }}
        >
          <Tab.Screen
            name='Chat'
            options={{ headerShown: false }}
            children={(props) => (
              <Chat
                setisNeededToLift={setisNeededToLift}
                isNeededToLift={isNeededToLift}
              />
            )}
          ></Tab.Screen>
          <Tab.Screen
            name='Polls'
            component={Polls}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
        <TouchableOpacity
          style={[
            styles.floatingButton,
            { bottom: isNeededToLift ? 150 : 100 },
          ]}
          onPress={() => setIsNeededtoShowScanner(!isNeededtoShowScanner)}
        >
          <Ionicons name='ios-qr-code' size={40} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    height: "100%",
    backgroundColor: "white",
  },

  dashBoardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
    color: "#4154F1",
  },

  floatingButton: {
    backgroundColor: "#6C63FF",
    position: "absolute",
    width: 80,
    height: 80,
    right: 20,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    gap: 5,
    elevation: 5,
  },

  floatingButtonText: {
    fontWeight: "bold",
    color: "white",
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
});

export default Dashboard;
