import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// Set Notification Handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});

const AlarmClock = () => {
  const [notificationId, setNotificationId] = useState("none");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");
  const [displayedAlarm, setDisplayedAlarm] = useState("No reminder set");

  useEffect(() => {
    getData();
  }, []);

  const scheduleNotificationHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    if (notificationId === "none") {
      const newHour = ampm.toLowerCase() === "pm" && parseInt(hour) !== 12 ? parseInt(hour) + 12 : parseInt(hour);
      try {
        const identifier = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Medical Adherence Reminder",
            body: "Medication Time! Don't forget to take your medication as prescribed.",
            data: { data: "Your alarm notification" },
          },
          trigger: {
            hour: newHour,
            minute: parseInt(minute),
            repeats: true,
          },
        });
        setNotificationId(identifier);
        storeData(identifier);
        setDisplayedAlarm(`${hour}:${minute} ${ampm.toUpperCase()}`);
        Alert.alert("Success", "Reminder set successfully!");
        clearInputs();
      } catch (error) {
        console.error("Failed to schedule notification:", error);
        Alert.alert("Error", "Failed to set alarm. Please try again.");
      }
    } else {
      Alert.alert("Error", "Turn off the existing reminders before setting a new one.");
    }
  };

  const turnOffAlarm = async () => {
    if (notificationId !== "none") {
      try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        setNotificationId("none");
        storeData("none");
        setDisplayedAlarm("No alarm set");
        Alert.alert("Success", "Reminder turned off successfully!");
        clearInputs();
      } catch (error) {
        console.error("Failed to cancel notification:", error);
        Alert.alert("Error", "Failed to turn off alarm. Please try again.");
      }
    } else {
      Alert.alert("Error", "No alarm to turn off.");
    }
  };

  const validateInputs = () => {
    if (!hour.trim() || !minute.trim() || !ampm.trim()) {
      Alert.alert("Missing Input", "Please enter all fields.");
      return false;
    }
    if (isNaN(hour) || isNaN(minute)) {
      Alert.alert("Invalid Input", "Hour and minute must be numeric values.");
      return false;
    }
    if (parseInt(hour) < 1 || parseInt(hour) > 12) {
      Alert.alert("Invalid Input", "Hour must be between 1 and 12.");
      return false;
    }
    if (parseInt(minute) < 0 || parseInt(minute) > 59) {
      Alert.alert("Invalid Input", "Minute must be between 0 and 59.");
      return false;
    }
    if (ampm.toLowerCase() !== "am" && ampm.toLowerCase() !== "pm") {
      Alert.alert("Invalid Input", 'AM/PM must be "am" or "pm".');
      return false;
    }
    return true;
  };

  const clearInputs = () => {
    setHour("");
    setMinute("");
    setAmpm("");
  };

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem("currentAlarmId", JSON.stringify(id));
    } catch (e) {
      Alert.alert("Error", "Failed to store data");
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentAlarmId");
      if (jsonValue !== null) {
        setNotificationId(JSON.parse(jsonValue));
        if (jsonValue !== "none") {
          setDisplayedAlarm("Reminder set");
        }
      }
    } catch (e) {
      Alert.alert("Error", "Failed to retrieve data");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Medication Reminder</Text>
        <View style={styles.innerContainer}>
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Hour (1-12)"
            value={hour}
            onChangeText={(text) => setHour(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Minute (0-59)"
            value={minute}
            onChangeText={(text) => setMinute(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="AM / PM"
            value={ampm}
            onChangeText={(text) => setAmpm(text)}
          />
        </View>
        <Text style={styles.displayedAlarmText}>{displayedAlarm}</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={scheduleNotificationHandler}>
            <Ionicons name="alarm" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Set Reminder</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonOff]} onPress={turnOffAlarm}>
            <Ionicons name="alarm" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Turn Off</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#e53935",
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: '#fff',
  },
  displayedAlarmText: {
    fontSize: 27,
    marginBottom: 20,
    color:"#00b300",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonOff: {
    backgroundColor: '#e53935',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AlarmClock;
