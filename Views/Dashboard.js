import { React, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";

import Chat from "./Chat";
import Polls from "./Polls";

const Tab = createMaterialTopTabNavigator();

function Dashboard({ fontsLoaded, subject }) {
  const [isNeededToLift, setisNeededToLift] = useState(false);
  const [isNeededtoShowScanner, setIsNeededtoShowScanner] = useState(false);

  //barcode related hooks
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    //barcode
    if (isNeededtoShowScanner) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, [isNeededtoShowScanner]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    console.log(data);
    setIsNeededtoShowScanner(!isNeededtoShowScanner);
    setScanned(false);
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
          {subject}
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
              color: "#4154F1",
            },
            tabBarIndicatorStyle: { backgroundColor: "#4154F1" },
          }}
        >
          <Tab.Screen
            name='Q&A'
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
          <Text style={styles.floatingButtonText}>Mark your attendance</Text>
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
    backgroundColor: "#4154F1",
    position: "absolute",
    width: 180,
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
