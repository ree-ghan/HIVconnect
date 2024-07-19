import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="information-circle-outline" size={20} color="#e53935" /> Information Collection and Use
        </Text>
        <Text style={styles.paragraph}>
          We may collect personal information such as your name, email address, and medical information to provide and
          improve our services. We do not sell your information to third parties.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="lock-closed-outline" size={20} color="#e53935" /> Data Security
        </Text>
        <Text style={styles.paragraph}>
          We implement reasonable security measures to protect your personal information from unauthorized access and
          misuse. However, no method of transmission over the internet or electronic storage is completely secure.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="analytics-outline" size={20} color="#e53935" /> Usage of Information
        </Text>
        <Text style={styles.paragraph}>
          We may use your information to communicate with you, provide support, send notifications, and improve our
          services. We may also aggregate anonymized data for analytical purposes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="people-outline" size={20} color="#e53935" /> Sharing of Information
        </Text>
        <Text style={styles.paragraph}>
          We may share your information with trusted third parties who assist us in operating the App, conducting our
          business, or providing services to you, as long as those parties agree to keep this information confidential.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="document-text-outline" size={20} color="#e53935" /> Changes to This Privacy Policy
        </Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or modify this Privacy Policy at any time. We will notify you of any changes by
          posting the new policy on this page.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="mail-outline" size={20} color="#e53935" /> Contact Us
        </Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{" "}
          <Text style={styles.email}>support@hivconnect.com</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#e53935",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e53935",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  email: {
    textDecorationLine: "underline",
    color: "#0066FF", // Blue color for email link
  },
});

export default PrivacyPolicy;
