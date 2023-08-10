import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import DeviceRegistered from "./Views/deviceRegistered";
import Login from "./Views/login";

import StayTuned from "./Views/stayTuned";

import WelcomePage from "./Views/WelcomePage";

import RegisterDevice from "./Views/RegisterDevice";
import Dashboard from "./Views/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-ExtraBold.ttf": require("./assets/fonts/Poppins-SemiBold.ttf"),
    });

    setFontsLoaded(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' options={{ headerShown: false }}>
          {(props) => <WelcomePage {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>

        <Stack.Screen name='Register' options={{ headerShown: false }}>
          {(props) => <RegisterDevice {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>

        <Stack.Screen name='Stay tuned' options={{ headerShown: false }}>
          {(props) => <StayTuned {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>

        <Stack.Screen
          name='Registration successful'
          options={{ headerShown: false }}
        >
          {(props) => <DeviceRegistered {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>

        <Stack.Screen name='Login' options={{ headerShown: false }}>
          {(props) => <Login {...props} fontsLoaded={fontsLoaded} />}
        </Stack.Screen>

        <Stack.Screen name='Dashboard' options={{ headerShown: false }}>
          {(props) => (
            <Dashboard
              {...props}
              fontsLoaded={fontsLoaded}
              subject={"1101 Database management System"}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
