import { React, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MessageBubble from "../components/MessageBubble";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ServerConfig from "../config/backendConfigurations";
import { TextEncoder } from "text-encoding";

global.TextEncoder = TextEncoder;
function Chat({ setisNeededToLift, isNeededToLift }) {
  const [message, setMessage] = useState("");
  const [isMessageOptionsVisible, setMessageOptionVisibility] = useState(false);
  const [messageType, setMessageType] = useState(1);
  let messageIndex = 0;
  const [messages, setMessages] = useState([]);

  const messagesList = messages.map((msg) => (
    <MessageBubble
      key={msg.index}
      isIncoming={msg.isIncoming}
      profilePicture={require("../assets/images/logo.png")}
      name={msg.name}
      message={msg.message}
      time={msg.time}
    ></MessageBubble>
  ));
  let client;

  const handleTypeMessage = (value) => {
    setMessage(value);
  };

  const handleMessageOptionButton = () => {
    setMessageOptionVisibility(!isMessageOptionsVisible);
    setisNeededToLift(!isNeededToLift);
  };

  const handleSendButton = () => {
    if (client) {
      client.activate();
      client.publish({
        destination: "/app/hello",
        body: JSON.stringify({ name: message }),
      });
      const newList = messages;
      newList.push({
        index: messageIndex,
        isIncoming: true,
        profilePicture: "../assets/images/logo.png",
        name: "Senith Uthsara",
        message: message,
        time: "9 mins ago",
      });
      messageIndex++;
      setMessages(newList);
    } else {
      console.log("client not connected");
    }
  };

  useEffect(() => {}, []);
  client = new Client({
    brokerURL: "ws://192.168.43.69:3001/ws",
    onConnect: () => {
      console.log("mekwth wd krpnko oi");
      client.subscribe("/topic/hello", (message) =>
        console.log(`Received: ${message.body}`)
      );
      client.publish({
        destination: "/app/hello",
        body: JSON.stringify({ name: "senith" }),
      });
    },
    debug: (err) => {
      console.log(err);
    },
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
  });

  client.activate();

  client.onWebSocketError = (error) => {
    console.error("Error with websocket", error);
  };

  client.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  return (
    <View style={styles.chatContainer}>
      {messagesList}

      <View style={styles.messageOptionsBar}>
        <TextInput
          style={styles.messageInput}
          placeholder='Ask your question'
          onChangeText={handleTypeMessage}
          value={message}
        />
        <TouchableOpacity onPress={handleSendButton}>
          <MaterialCommunityIcons
            style={styles.icons}
            name='send-circle'
            size={30}
            color='#4154F1'
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMessageOptionButton}>
          {messageType === 1 ? (
            <Octicons
              name='person'
              size={30}
              color='#4154F1'
              style={styles.icons}
            />
          ) : messageType === 2 ? (
            <Feather
              name='eye-off'
              size={24}
              color='#4154F1'
              style={styles.icons}
            />
          ) : (
            <Ionicons
              name='people'
              size={30}
              color='#4154F1'
              style={styles.icons}
            />
          )}
        </TouchableOpacity>
      </View>
      {isMessageOptionsVisible ? (
        <View style={styles.chatTypeSelector}>
          <TouchableOpacity
            style={styles.chatTypeOption}
            onPress={() => {
              setMessageType(1);
            }}
          >
            <Text style={styles.chatTypeOptionText}>Direct message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatTypeOption}
            onPress={() => {
              setMessageType(2);
            }}
          >
            <Text style={styles.chatTypeOptionText}>
              Ask question as Anonymous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatTypeOption}
            onPress={() => {
              setMessageType(3);
            }}
          >
            <Text style={styles.chatTypeOptionText}>
              Ask question as Senith Uthsara
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  messageOptionsBar: {
    width: "95%",
    margin: "auto",
    position: "absolute",
    bottom: 10,
    height: 60,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "#F2F2FF",
    borderRadius: 40,
    elevation: 3,
  },

  messageInput: {
    width: "60%",
    height: "80%",
    marginHorizontal: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  icons: {
    marginHorizontal: 5,
  },

  chatTypeSelector: {
    position: "absolute",
    right: 10,
    bottom: 80,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  chatTypeOption: {
    margin: 5,
    width: 120,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: "#F2F2FF",
  },

  chatTypeOptionText: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default Chat;
