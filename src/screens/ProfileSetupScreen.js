import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const ProfileSetupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("Patient");
  const [condition, setCondition] = useState("");
  const [medication, setMedication] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [title, setTitle] = useState("");
  const [healthFacility, setHealthFacility] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "No user is logged in");
        setLoading(false);
        return;
      }

      if (userType === "Patient") {
        await addDoc(collection(db, "Patient"), {
          name,
          dob: dateOfBirth,
          gender,
          location,
          phonenumber: phoneNumber,
          condition,
          medicationtaken: medication === "yes",
          timetaken: timeTaken,
          userId: currentUser.uid,
        });
      } else {
        await addDoc(collection(db, "Health_worker"), {
          name,
          dob: dateOfBirth,
          gender,
          location,
          phonenumber: phoneNumber,
          title,
          healthfacility: healthFacility,
          userId: currentUser.uid,
        });
      }

      setLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to complete profile setup");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <Text style={styles.title}>Profile Setup</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Date Of Birth (DD-MM-YYYY)"
              placeholderTextColor="#aaa"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="transgender-outline"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              placeholderTextColor="#aaa"
              value={gender}
              onChangeText={setGender}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="#aaa"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Text style={styles.subTitle}>User Type</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="Patient"
                status={userType === "Patient" ? "checked" : "unchecked"}
                onPress={() => setUserType("Patient")}
                color="#e53935"
              />
              <Text style={styles.radioLabel}>Patient</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Doctor"
                status={userType === "Doctor" ? "checked" : "unchecked"}
                onPress={() => setUserType("Doctor")}
                color="#e53935"
              />
              <Text style={styles.radioLabel}>Doctor</Text>
            </View>
          </View>

          {userType === "Patient" ? (
            <>
              <Text style={styles.subTitle}>Health Status</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="pulse-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Condition (born with HIV or acquired)"
                  placeholderTextColor="#aaa"
                  value={condition}
                  onChangeText={setCondition}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="medkit-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Medication Taken"
                  placeholderTextColor="#aaa"
                  value={medication}
                  onChangeText={setMedication}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="timer-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Time Taken"
                  placeholderTextColor="#aaa"
                  value={timeTaken}
                  onChangeText={setTimeTaken}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.subTitle}>Professional Details</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="briefcase-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  placeholderTextColor="#aaa"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="business-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Health Facility"
                  placeholderTextColor="#aaa"
                  value={healthFacility}
                  onChangeText={setHealthFacility}
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Finish</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollContainer: {
    padding: 20,
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e53935",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
    paddingBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e53935",
    marginVertical: 15,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 18,
    color: "#333",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#e53935",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileSetupScreen;
