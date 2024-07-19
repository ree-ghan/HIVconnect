import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Communications from 'react-native-communications';

const doctors = [
  { id: '1', name: 'Alive Medical Services', location: "Alive Medical Services", distance: '', number: '0774 704646' },
  { id: '2', name: 'AHF Uganda Cares', location: 'AHF Uganda Cares', distance: '', number: '0200 506100' },
  { id: '3', name: 'Reproductive Health Uganda', location: 'Reproductive Health Uganda', distance: '', number: '031 2207100' },
  { id: '4', name: 'Health Mart clinic Bukoto', location: 'Health Mart clinic Bukoto', distance: '', number: '0701 735611' },
  { id: '5', name: 'Uganda Network of Young People Living With HIV& AIDS (UNYPA)', location: 'Uganda Network of Young People Living With HIV& AIDS (UNYPA)', distance: '', number: '039 4892180' },
  { id: '6', name: "Royal Doctors' Chamber Jinja", location: "Royal Doctors' Chamber Jinja", distance: '', number: '0701 806065' },
  { id: '7', name: 'Uganda AIDS Commission', location: 'Uganda AIDS Commission', distance: '', number: '041 4288065' },
  { id: '8', name: 'Doctors clinic', location: 'Doctors clinic', distance: '9 Km', number: '0703 590471' },
  { id: '9', name: "The Medical Hub Kampala", location: "The Medical Hub Kampala", distance: '', number: '0750 939905' },
  { id: '10', name: 'SAS CLINIC', location: 'SAS CLINIC', distance: '', number: '041 4345325' }
];

const DoctorListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DoctorDetail', { doctor: item })}>
      <View style={styles.item}>
        <Avatar.Text size={50} label={item.name.charAt(0)} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>{item.location}  {item.distance}</Text>
          {/* <Text style={styles.location}>{item.location}  </Text> */}
        </View>
        <TouchableOpacity onPress={() => Communications.phonecall(item.number, true)} style={styles.callButton}>
          <Avatar.Icon size={30} icon="phone" backgroundColor="#e53935" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    marginRight: 15,
    backgroundColor: '#808080', // You can change this color if needed
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  callButton: {
    padding: 10,
  },
});

export default DoctorListScreen;
