import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Account Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ProfileEditing")}
          >
            <Ionicons
              name="person-circle-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>Profile Editing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("PasswordChange")}
          >
            <Ionicons name="key-outline" size={24} color="#e53935" />
            <Text style={styles.optionText}>Password Change</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("PrivacySettings")}
          >
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>Privacy Settings</Text>
          </TouchableOpacity> */}
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("PushNotifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>Push Notifications</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("EmailNotifications")}
          >
            <Ionicons name="mail-outline" size={24} color="#e53935" />
            <Text style={styles.optionText}>Email Notifications</Text>
          </TouchableOpacity> */}
        </View>

        {/* Health Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Management</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("AlarmClock")}
          >
            <Ionicons name="medkit-outline" size={24} color="#e53935" />
            <Text style={styles.optionText}>Medication Reminders</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option}>
            <Ionicons name="calendar-outline" size={24} color="#e53935" />
            <Text style={styles.optionText}>Appointment Reminders</Text>
          </TouchableOpacity> */}
        </View>

        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("FAQs")}
          >
            <Ionicons
              name="help-circle-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ContactSupport")}
          >
            <Ionicons name="call-outline" size={24} color="#e53935" />
            <Text style={styles.optionText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("TermsOfService")}
          >
            <Ionicons
              name="document-text-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("About")}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#e53935"
            />
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("Version")}
          >
            <Ionicons name="code-slash-outline" size={24} color="#e53935" />
            <Text style={styles.optionText}>Version</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53935",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default SettingsScreen;
