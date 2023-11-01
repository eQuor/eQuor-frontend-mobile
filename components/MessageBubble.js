import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function MessageBubble({ isIncoming, name, message }) {
  return (
    <View
      style={[
        styles.bubbleBar,
        { alignItems: isIncoming ? "flex-start" : "flex-end" },
      ]}
    >
      <View style={styles.bubbleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.senderName}>{name}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleBar: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 0,
    display: "flex",
    position: "relative",
  },
  bubbleContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
    width: 270,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F2F2FF",
    borderRadius: 20,
    elevation: 3,
    position: "relative",
    marginRight: "auto",
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  textContainer: {
    marginHorizontal: 10,
    display: "flex",
    justifyContent: "center",
  },

  senderName: {
    fontWeight: "bold",
  },

  message: {
    fontSize: 11,
  },

  time: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 12,
  },
});

export default MessageBubble;
