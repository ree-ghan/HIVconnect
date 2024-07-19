import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from "../firebase/firebaseConfig"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "../../UserContext";

const NotificationScreen = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !user.uid) {
        Alert.alert("Error", "User information is missing.");
        return;
      }

      try {
        const userNotificationsRef = collection(
          db,
          `users/${user.uid}/notifications`
        );
        const blogNotificationsRef = collection(db, "blogs");

        // Fetch user notifications
        const userNotificationsQuery = query(userNotificationsRef);
        const userNotificationsSnapshot = await getDocs(userNotificationsQuery);
        const userNotifications = userNotificationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch blog notifications
        const blogNotificationsSnapshot = await getDocs(blogNotificationsRef);
        let blogNotifications = [];

        for (let blogDoc of blogNotificationsSnapshot.docs) {
          const blogNotificationRef = collection(blogDoc.ref, "notifications");
          const blogNotificationSnapshot = await getDocs(blogNotificationRef);
          const blogNotif = blogNotificationSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          blogNotifications = [...blogNotifications, ...blogNotif];
        }

        // Merge and sort notifications by timestamp and get the first 8
        const allNotifications = [
          ...userNotifications,
          ...blogNotifications,
        ].sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()).slice(0, 8);

        setNotifications(allNotifications);
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchNotifications();
  }, [user]);

  const generateAvatar = (name) => {
    // const initials = name
    //   .split(" ")
    //   .map((part) => part.charAt(0))
    //   .join("")
    //   .toUpperCase();
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const NotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={[styles.avatar, { backgroundColor: "#e53935" }]}>
        <Text style={styles.avatarText}>{generateAvatar(item.senderName)}</Text>
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.senderName}</Text>
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt.toDate()).toLocaleString()}
        </Text>
      </View>
      <Ionicons name="chatbubble-ellipses-outline" size={20} color="#e53935" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 15,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    backgroundColor: "#e53935",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  username: {
    fontWeight: "bold",
    color: "#e53935",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});

export default NotificationScreen;
