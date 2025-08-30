import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import EventDetailScreen from '../screens/EventDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {TMEvent} from '../types/event';

export type FavoriteStackParamList = {
  Favorites: undefined;
  EventDetail: {event: TMEvent};
};

const Stack = createNativeStackNavigator<FavoriteStackParamList>();

interface AppNavigatorProps {
  toggleLanguage: (lang: 'en' | 'ar') => void;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavoriteStack: React.FC<AppNavigatorProps> = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: t('favorites_title')}}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{title: t('event_details')}}
      />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
