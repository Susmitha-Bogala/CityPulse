// src/navigation/AuthStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from '../screens/Auth/SignupScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
