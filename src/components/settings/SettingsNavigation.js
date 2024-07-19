import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileEditing from './ProfileEditing';
import PasswordChange from './PasswordChange';
import PushNotifications from './PushNotifications';
import EmailNotifications from './EmailNotifications';
import FAQs from './FAQs';
import ContactSupport from './ContactSupport';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import About from './About';
import Version from './Version';
import SettingsScreen from '../../screens/Settings';

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="ProfileEditing" component={ProfileEditing} options={{ title: 'Profile Editing' }} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} options={{ title: 'Password Change' }} />
      <Stack.Screen name="PushNotifications" component={PushNotifications} options={{ title: 'Push Notifications' }} />
      <Stack.Screen name="EmailNotifications" component={EmailNotifications} options={{ title: 'Email Notifications' }} />
      <Stack.Screen name="FAQs" component={FAQs} options={{ title: 'FAQs' }} />
      <Stack.Screen name="ContactSupport" component={ContactSupport} options={{ title: 'Contact Support' }} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} options={{ title: 'Terms of Service' }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="About" component={About} options={{ title: 'About' }} />
      <Stack.Screen name="Version" component={Version} options={{ title: 'Version' }} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
