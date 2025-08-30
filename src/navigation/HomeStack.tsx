import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import HomeScreen from '../screens/HomeScreen';
import EventDetailScreen from '../screens/EventDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import {TMEvent} from '../types/event';

export type RootStackParamList = {
  HomeMain: undefined;
  Favorites: undefined;
  EventDetail: {event: TMEvent};
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  toggleLanguage: (lang: 'en' | 'ar') => void;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeStack: React.FC<AppNavigatorProps> = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{title: t('welcome')}}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{title: t('event_details')}}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: t('favorites_title')}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
