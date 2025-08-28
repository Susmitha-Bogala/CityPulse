import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
// import EventDetailsScreen from '../screens/EventDetailsScreen';
// import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  EventDetails: {eventId: string};
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: true}}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
