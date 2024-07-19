import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileSetupScreen from "../screens/ProfileSetupScreen";
import ChatRoom from "../screens/ChatRoom";
import CommunityChat from "../screens/CommunityChat";
import AlarmClock from "../screens/AlarmClock";
import SettingsNavigation from "../components/settings/SettingsNavigation";
import FAQs from "../components/settings/FAQs";
import ProfileEditing from "../components/settings/ProfileEditing";
import PasswordChange from "../components/settings/PasswordChange";
import ContactSupport from "../components/settings/ContactSupport";
import PushNotifications from "../components/settings/PushNotifications";
import TermsOfService from "../components/settings/TermsOfService";
import About from "../components/settings/About";
import PrivacyPolicy from "../components/settings/PrivacyPolicy";
import Version from "../components/settings/Version";
import { UserProvider } from "../../UserContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
          <Stack.Screen
            name="ProfileSetup"
            component={ProfileSetupScreen}
            options={{ title: "Set Up Profile" }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{ title: "Chat" }}
          />
          <Stack.Screen
            name="CommunityChat"
            component={CommunityChat}
            options={{ title: "Community chat" }}
          />
          <Stack.Screen
            name="AlarmClock"
            component={AlarmClock}
            options={{ title: "Alarm Clock" }}
          />
          <Stack.Screen
            name="FAQs"
            component={FAQs}
            options={{ title: "FAQs" }}
          />
          <Stack.Screen
            name="ProfileEditing"
            component={ProfileEditing}
            options={{ title: "Profile Editing" }}
          />
          <Stack.Screen
            name="PasswordChange"
            component={PasswordChange}
            options={{ title: "Password Change" }}
          />
          <Stack.Screen
            name="ContactSupport"
            component={ContactSupport}
            options={{ title: "Contact Support" }}
          />
          <Stack.Screen
            name="PushNotifications"
            component={PushNotifications}
            options={{ title: "Push Notifications" }}
          />
          <Stack.Screen
            name="TermsOfService"
            component={TermsOfService}
            options={{ title: "Terms of Service" }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ title: "Privacy Policy" }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ title: "About" }}
          />
          <Stack.Screen
            name="Version"
            component={Version}
            options={{ title: "Version" }}
          />
          <Stack.Screen
            name="Feeds"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default AppNavigator;
