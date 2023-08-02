import { React, useState } from "react";
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

function Chat({ setisNeededToLift, isNeededToLift }) {
  const [message, setMessage] = useState("");
  const [isMessageOptionsVisible, setMessageOptionVisibility] = useState(false);
  const [messageType, setMessageType] = useState(1);

  const handleTypeMessage = (value) => {
    setMessage(value);
  };

  const handleMessageOptionButton = () => {
    setMessageOptionVisibility(!isMessageOptionsVisible);
    setisNeededToLift(!isNeededToLift);
  };

  return (
    <View style={styles.chatContainer}>
      <MessageBubble
        isIncoming={true}
        profilePicture={require("../assets/images/logo.png")}
        name={"Senith Uthsara"}
        message={"Bla Bla Bla"}
        time={"9 mins ago"}
      ></MessageBubble>

      <MessageBubble
        isIncoming={false}
        profilePicture={require("../assets/images/logo.png")}
        name={"Senith Uthsara"}
        message={"Bla Bla Bla"}
        time={"8 mins ago"}
      ></MessageBubble>
      <MessageBubble
        isIncoming={true}
        profilePicture={require("../assets/images/logo.png")}
        name={"Senith Uthsara"}
        message={"Bla Bla Bla"}
        time={"7 mins ago"}
      ></MessageBubble>
      <MessageBubble
        isIncoming={true}
        profilePicture={require("../assets/images/logo.png")}
        name={"Senith Uthsara"}
        message={"Bla Bla Bla"}
        time={"6 mins ago"}
      ></MessageBubble>

      <MessageBubble
        isIncoming={false}
        profilePicture={require("../assets/images/logo.png")}
        name={"Senith Uthsara"}
        message={"Bla Bla Bla"}
        time={"5 mins ago"}
      ></MessageBubble>

      <MessageBubble
        isIncoming={false}
        profilePicture={require("../assets/images/logo.png")}
        name={"Senith Uthsara"}
        message={"Bla Bla Bla"}
        time={"4 mins ago"}
      ></MessageBubble>

      <View style={styles.messageOptionsBar}>
        <Ionicons
          style={styles.icons}
          name='hand-right-outline'
          size={30}
          color='#4154F1'
        />
        <TextInput
          style={styles.messageInput}
          placeholder='Ask your question'
          onChangeText={handleTypeMessage}
          value={message}
        />
        <MaterialCommunityIcons
          style={styles.icons}
          name='send-circle'
          size={30}
          color='#4154F1'
        />

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
