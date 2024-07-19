import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { getRoomId } from "../utils/common";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../firebase/firebaseConfig";
import { useUser } from "../../UserContext";
import MessageList from "../components/MessageList";
import styles from "./ChatRoomStyles";

const ChatRoom = ({ route }) => {
  const { user } = useUser(); // Current user
  const { item } = route.params; // Chat partner
  const textRef = useRef("");
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const ScrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.uid, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(allMessages);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, [user, item]);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.uid, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    if (!user || !user.uid) {
      Alert.alert("Error", "User information is missing.");
      return;
    }

    try {
      let roomId = getRoomId(user.uid, item.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef.current.clear();
      const newDoc = await addDoc(messagesRef, {
        userId: user.uid,
        text: message,
        senderName: user.displayName,
        createdAt: Timestamp.fromDate(new Date()),
      });

      // Add notification to the receiver's notifications subcollection
      const notificationsRef = collection(
        db,
        "users",
        item.userId,
        "notifications"
      );
      await addDoc(notificationsRef, {
        senderId: user.uid,
        senderName: `${user.displayName} has sent you a message.`,
        roomId: roomId,
        createdAt: Timestamp.fromDate(new Date()),
        read: false,
      });

    } catch (err) {
      Alert.alert("Message", err.message);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInitials}>
          <Text style={styles.userInitialsText}>
            {getInitials(item.username)}
          </Text>
        </View>
        <Text style={styles.headerText}>{item.username}</Text>
      </View>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        <MessageList
          ScrollViewRef={ScrollViewRef}
          messages={messages}
          currentUser={user}
        />
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          onChangeText={(value) => (textRef.current = value)}
          placeholder="Type your message..."
          multiline
          autoCapitalize="sentences"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
