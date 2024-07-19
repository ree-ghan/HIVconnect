import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { query, where, getDocs } from "firebase/firestore";
import { userRef } from "../firebase/firebaseConfig";
import { useUser } from "../../UserContext";

const ChatScreen = ({ navigation }) => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user?.uid]);

  const getUsers = async () => {
    try {
      const data = [];
      // Fetch users
      const q = query(userRef, where("userId", "!=", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openChatRoom = (item) => {
    navigation.navigate("ChatRoom", { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => openChatRoom(item)}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item?.username.charAt(0)}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item?.username}</Text>
        <Text style={styles.messageText}>Tap to start chatting</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          contentContainerStyle={{ paddingVertical: 10 }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textTransform: "uppercase", // Add this line to make the text uppercase
  },
  userInfo: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 10,
    marginBottom: 10,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333333",
  },
  messageText: {
    fontSize: 14,
    color: "#7a7a7a",
    marginTop: 2,
  },
});

export default ChatScreen;
