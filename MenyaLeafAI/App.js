// cspell:ignore Menya
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens (will create them next)
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import IdentificationScreen from './screens/IdentificationScreen';
import ResultsScreen from './screens/ResultsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menya Leaf AI' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Take Photo' }} />
        <Stack.Screen name="Identification" component={IdentificationScreen} options={{ title: 'Identifying...' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
