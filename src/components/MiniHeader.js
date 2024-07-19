import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedsScreen from '../screens/FeedsScreen';
import DoctorsScreen from '../screens/DoctorListScreen';
import BlogsScreen from '../screens/BlogsScreen';

const TopTab = createMaterialTopTabNavigator();
export default function MiniHeader() {
  const TopTabs = () => {
    return (
      <TopTab.Navigator>
        {/* <TopTab.Screen name="Feeds" component={FeedsScreen} /> */}
        <TopTab.Screen name="Blogs" component={BlogsScreen} />
        <TopTab.Screen name="Doctors" component={DoctorsScreen} />
      </TopTab.Navigator>
    );
  };
}