import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedsScreen from '../screens/FeedsScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import BlogsScreen from '../screens/BlogsScreen';


const TopTab = createMaterialTopTabNavigator();

const CombinedScreen = () => {
  return (
    <React.Fragment>
      
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarLabelStyle: { fontSize: 13, fontWeight: '700' },
          tabBarIndicatorStyle: { backgroundColor: 'red', height: 3 },
          tabBarStyle: { backgroundColor: 'white' },
        }}
      >
        <TopTab.Screen name="Feeds" component={FeedsScreen} />
        <TopTab.Screen
          name="Blogs" component={BlogsScreen} />
        <TopTab.Screen name="Hospitals" component={DoctorsScreen} />
      </TopTab.Navigator>
    </React.Fragment>


  );
};

export default CombinedScreen;
