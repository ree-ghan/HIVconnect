import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogListScreen from './BlogListScreen';
import BlogDetailScreen from './BlogDetailScreen';
import BlogCreateScreen from './BlogCreateScreen';

const Stack = createNativeStackNavigator();

const BlogsScreen = () => {
  return (
    <Stack.Navigator initialRouteName="BlogList">
      <Stack.Screen
        name="BlogList"
        component={BlogListScreen}
        options={{ title: 'Blogs', headerShown: false }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={{ title: 'Blog Detail' }}
      />
      <Stack.Screen
        name="BlogCreate"
        component={BlogCreateScreen}
        options={{ title: 'New Blog' }}
      />
    </Stack.Navigator>
  );
};

export default BlogsScreen;
