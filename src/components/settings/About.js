import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About HIVconnect</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="people-outline" size={20} color="#e53935" /> Project Overview
        </Text>
        <Text style={styles.paragraph}>
          The "Mobile Support Application for HIV Communities in Kampala, Uganda" project aims to address the critical
          needs of individuals living with HIV by developing a comprehensive mobile application. This application is
          specifically designed to assist users in managing their health more effectively through three primary
          functionalities: improving medication access, enhancing adherence to treatment protocols, and reducing the
          stigma associated with HIV.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="phone-portrait-outline" size={20} color="#e53935" /> Functionality
        </Text>
        <Text style={styles.paragraph}>
          By leveraging mobile technology, the project seeks to provide a user-friendly platform that facilitates easier
          access to medications, sends reminders for timely intake, and offers a safe space for users to share
          experiences and receive community support. This initiative is expected to lead to better healthcare outcomes,
          increased adherence rates, and a reduction in the social stigma surrounding HIV in Kampala's HIV community.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="globe-outline" size={20} color="#e53935" /> Impact
        </Text>
        <Text style={styles.paragraph}>
          Ultimately, the project aspires to enhance the overall well-being and quality of life for individuals living
          with HIV in this region. By empowering users with tools and resources to manage their health effectively, the
          "HIVconnect" app aims to create a supportive environment that promotes positive health outcomes and reduces
          healthcare disparities among HIV-positive individuals in Kampala, Uganda.
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

export default About;
