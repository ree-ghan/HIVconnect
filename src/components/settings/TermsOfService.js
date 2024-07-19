import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TermsOfService = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Terms of Service</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="document-text-outline" size={20} color="#e53935" /> Acceptance of Terms
        </Text>
        <Text style={styles.paragraph}>
          By accessing and using the "HIVconnect" mobile application, you agree to abide by these Terms of Service and
          all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using
          or accessing this site.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="lock-closed-outline" size={20} color="#e53935" /> User Responsibilities
        </Text>
        <Text style={styles.paragraph}>
          Users are responsible for maintaining the confidentiality of their account credentials and for all activities
          that occur under their account. Users must promptly notify us of any unauthorized use or security breaches.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="analytics-outline" size={20} color="#e53935" /> Use of Services
        </Text>
        <Text style={styles.paragraph}>
          The "HIVconnect" app is intended to assist individuals living with HIV in managing their health and connecting
          with support resources. Users agree not to use the app for any unlawful purpose or to violate any local,
          national, or international regulations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="people-outline" size={20} color="#e53935" /> Privacy
        </Text>
        <Text style={styles.paragraph}>
          We respect the privacy of our users. Please refer to our{" "}
          <Text style={styles.link}>Privacy Policy</Text> for information on how we collect, use, and protect your
          personal information.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="sync-outline" size={20} color="#e53935" /> Modifications
        </Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or modify these Terms of Service at any time without prior notice. Your continued
          use of the app after changes are made constitutes acceptance of those changes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="mail-outline" size={20} color="#e53935" /> Contact Us
        </Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about these Terms of Service, please contact us at{" "}
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
  link: {
    textDecorationLine: "underline",
    color: "#0066FF", // Blue color for link
  },
  email: {
    textDecorationLine: "underline",
    color: "#0066FF", // Blue color for email link
  },
});

export default TermsOfService;
