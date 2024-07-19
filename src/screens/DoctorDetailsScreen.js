import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Communications from 'react-native-communications';

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  // Updated coordinates for Kampala City
  const location = { latitude: 0.3476, longitude: 32.5825, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={location}>
        <Marker coordinate={location} title={doctor.name} description={doctor.location} />
      </MapView>
      <View style={styles.details}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.location}>{doctor.location}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.callButton]} onPress={() => Communications.phonecall(doctor.number, true)}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.messageButton]} onPress={() => Communications.text(doctor.number)}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  details: {
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  distance: {
    fontSize: 16,
    color: '#888',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  callButton: {
    backgroundColor: '#e53935',
    marginRight: 10,
  },
  messageButton: {
    backgroundColor: '#1e88e5',
    marginLeft: 10,
  },
});

export default DoctorDetailScreen;
