import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactSupport = () => {
  const handleEmailSupport = () => {
    Linking.openURL("mailto:hivconnectsupport@gmail.com");
  };

  const handlePhoneSupport = () => {
    Linking.openURL("tel:+1234567890");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Contact Support</Text>
      <View style={styles.contactMethod}>
        <Ionicons name="mail-outline" size={24} color="#e53935" />
        <Text style={styles.methodText}>hivcspp@gmail.com</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#e0e0e0"
          onPress={handleEmailSupport}
        />
      </View>
      <View style={styles.contactMethod}>
        <Ionicons name="call-outline" size={24} color="#e53935" />
        <Text style={styles.methodText}>+256 703 496 878</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#e0e0e0"
          onPress={handlePhoneSupport}
        />
      </View>
      <Text style={styles.paragraph}>
        If you have any questions, feedback, or encounter issues while using
        our app, please feel free to contact our support team using the
        methods above. We are here to assist you and ensure you have the best
        experience.
      </Text>
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
    color: "#e53935", // Red color
  },
  contactMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  methodText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333", // Black color
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    textAlign: "justify",
    color: "#333", // Black color
  },
});

export default ContactSupport;
