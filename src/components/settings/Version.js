import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Version = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Version Details</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="information-circle-outline" size={20} color="#e53935" /> Current Version
        </Text>
        <Text style={styles.paragraph}>
          Version 1.0.0
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="code-slash-outline" size={20} color="#e53935" /> Release Notes
        </Text>
        <Text style={styles.paragraph}>
          - Implemented user authentication and profile management.
          {"\n"}
          - Added medication reminder feature for improved adherence.
          {"\n"}
          - Enhanced community chat functionality for better user engagement.
          {"\n"}
          - Resolved various bugs and improved app performance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="calendar-outline" size={20} color="#e53935" /> Update History
        </Text>
        <Text style={styles.paragraph}>
          Version 1.0.0 (Release Date: June 2024)
          {"\n"}
          - Initial release of HIVconnect app.
          {"\n"}
          {"\n"}
          Version 1.1.0 (Release Date: July 2024)
          {"\n"}
          - Added FAQ section and improved user interface.
          {"\n"}
          - Implemented email notification settings.
          {"\n"}
          - Fixed minor bugs reported by users.
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
});

export default Version;
