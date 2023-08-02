import { StyleSheet, Text } from "react-native";
import { Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LargeBlueButton(props) {
  const { fontsLoaded, title, onpress } = props;
  const navigation = useNavigation();

  const handlePress = () => {
    if (typeof onpress === "string") {
      navigation.navigate(onpress);
    } else {
      Alert.alert("Invalid navigation error");
    }
  };

  return (
    <Pressable style={styles.get_started_button} onPress={handlePress}>
      <Text
        style={[
          styles.getStarted_button_text,
          { fontFamily: fontsLoaded ? "Poppins-ExtraBold.ttf" : "System" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});
