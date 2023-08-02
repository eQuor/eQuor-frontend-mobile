import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function MessageBubble({ isIncoming, profilePicture, name, message, time }) {
  return (
    <View
      style={[
        styles.bubbleBar,
        { alignItems: isIncoming ? "flex-start" : "flex-end" },
      ]}
    >
      <View style={styles.bubbleContainer}>
        <Image
          source={profilePicture}
          style={styles.profilePicture}
          resizeMode='cover'
        ></Image>
        <View style={styles.textContainer}>
          <Text style={styles.senderName}>{name}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleBar: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
  },
  bubbleContainer: {
    display: "flex",
    flexDirection: "row",
    width: 270,
    height: 70,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F2F2FF",
    borderRadius: 20,
    elevation: 3,
    position: "relative",
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  textContainer: {
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },

  senderName: {
    fontWeight: "bold",
  },

  message: {
    fontSize: 15,
  },

  time: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 12,
  },
});

export default MessageBubble;
