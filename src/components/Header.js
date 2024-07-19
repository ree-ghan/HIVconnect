import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, signOut } from '../firebase/firebaseConfig';

const Header = ({ username }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleProfilePress = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleEditProfile = () => {
    setDropdownVisible(false); // Hide dropdown
    navigation.navigate('Settings');
  };

  // const handleLogout = () => {
  //   setDropdownVisible(false); // Hide dropdown
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful
  //       navigation.navigate('Home');
  //     })
  //     .catch((error) => {
  //       // An error happened
  //       console.error('Error signing out: ', error);
  //     });
  // };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.screenName}>{route.name}</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(username)}</Text>
          </View>
          <Text style={styles.username}>{username}</Text>
          <Ionicons name={dropdownVisible ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={handleEditProfile} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e53935',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
    backgroundColor: '#e53935',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 1,
  },
  screenName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#e53935',
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#fff',
    marginRight: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Header;
