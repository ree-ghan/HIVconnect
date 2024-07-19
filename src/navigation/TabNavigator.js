import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import { db } from '../firebase/firebaseConfig';
import { collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import CombinedScreen from '../screens/CombinedScreen';
import SettingsScreen from '../screens/Settings';
import ChatScreen from '../screens/ChatScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Header from '../components/Header';
import { useUser } from "../../UserContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { user } = useUser();
  const [newNotifications, setNewNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userNotificationsRef = collection(db, `users/${user.uid}/notifications`);
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
        const blogNotificationsPromises = blogNotificationsSnapshot.docs.map(async (blogDoc) => {
          const blogNotificationRef = collection(blogDoc.ref, "notifications");
          const blogNotificationSnapshot = await getDocs(blogNotificationRef);
          return blogNotificationSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });

        // Resolve all blog notification promises
        const blogNotificationsArrays = await Promise.all(blogNotificationsPromises);
        const blogNotifications = blogNotificationsArrays.flat();

        // Merge and sort notifications by timestamp
        const allNotifications = [
          ...userNotifications,
          ...blogNotifications,
        ].sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

        // Check if there are new notifications
        setNewNotifications(allNotifications.some(notification => !notification.read)); // Assuming there's a 'read' field

      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchNotifications();

    // Real-time updates for notifications
    const unsubscribeUserNotifications = onSnapshot(collection(db, `users/${user.uid}/notifications`), fetchNotifications);
    const unsubscribeBlogNotifications = onSnapshot(collection(db, "blogs"), fetchNotifications);

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeUserNotifications();
      unsubscribeBlogNotifications();
    };
  }, [user.uid]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Feeds') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'HealthTracker') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          const customizeSize = 25;

          return (
            <View>
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? 'red' : 'grey'}
              />
              {route.name === 'Notifications' && newNotifications && (
                <Badge
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        header: () => <Header username={user.displayName} />, 
      })}
      // Listen to tab press to clear notifications
      screenListeners={({ navigation }) => ({
        tabPress: e => {
          const state = navigation.getState();
          const route = state.routes[state.index];
          if (route.name === 'Notifications') {
            setNewNotifications(false);
          }
        },
      })}
    >
      <Tab.Screen name="Feeds" component={CombinedScreen} />
      {/* <Tab.Screen name="HealthTracker" component={HealthTrackerScreen} /> */}
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
