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
  ScrollView,
} from "react-native";
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
import CommunityChatList from "../components/CommunityChatList";
import styles from "./CommunityChatStyles";

const CommunityChat = ({ route }) => {
  const { user } = useUser(); // a/c user
  const { item } = route.params; // chat user
  const { title } = route.params;
  const textRef = useRef("");
  const inputRef = useRef(null);
  const [allCommunityChats, setAllCommunityChats] = useState([]);
  const ScrollViewRef = useRef(null);

  useEffect(() => {
    const docRef = doc(db, "blogs", item.id);
    const CommunityChatRef = collection(docRef, "communityChat");
    const q = query(CommunityChatRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allCommunityChats = snapshot.docs.map((doc) => doc.data());
      setAllCommunityChats(allCommunityChats);
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
  }, [allCommunityChats]);

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendCommunityMessage = async () => {
    let communityChat = textRef.current.trim();
    if (!communityChat) return;

    if (!user || !user.uid) {
      Alert.alert("Error", "User information is missing.");
      return;
    }

    try {
      const docRef = doc(db, "blogs", item.id);
      const CommunityChatRef = collection(docRef, "communityChat");
      textRef.current = "";
      if (inputRef) inputRef.current.clear();
      const newDoc = await addDoc(CommunityChatRef, {
        userId: user.uid,
        username: user.displayName,
        content: communityChat,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("new community chat id-", newDoc.id);

      // Add notification to the blog's notifications subcollection
      const notificationsRef = collection(docRef, "notifications");
      await addDoc(notificationsRef, {
        senderId: user.uid,
        senderName: `${user.displayName} has posted a community chat in ${title}.`,
        communityChatId: newDoc.id,
        createdAt: Timestamp.fromDate(new Date()),
        read: false, // Add a flag to indicate if the notification has been read
      });

      console.log("Notification added to blog-", item.id);
    } catch (err) {
      Alert.alert("Message:", err.message);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={90}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{item.username}</Text>
        </View>

        {/* Main Content - allCommunityChats */}
        <ScrollView style={styles.messagesContainer} ref={ScrollViewRef}>
          <CommunityChatList
            allCommunityChats={allCommunityChats}
            currentUser={user}
          />
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            ref={inputRef}
            onChangeText={(value) => (textRef.current = value)}
            placeholder="Type your comment..."
            placeholderTextColor="#aaa"
            multiline
            autoCapitalize="sentences"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendCommunityMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommunityChat;
