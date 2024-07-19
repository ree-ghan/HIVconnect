import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorDetailScreen from '../screens/DoctorDetailsScreen';
import DoctorListScreen from '../screens/DoctorListScreen';

const Stack = createNativeStackNavigator();

const DoctorsScreen = () => {
  return (
    <Stack.Navigator initialRouteName="DoctorList">
      <Stack.Screen
        name="DoctorList"
        component={DoctorListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorDetail"
        component={DoctorDetailScreen}
        options={{ title: 'Doctor Detail' }}
      />
    </Stack.Navigator>
  );
};

export default DoctorsScreen;