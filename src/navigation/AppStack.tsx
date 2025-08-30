import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import {colors} from '../colors';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import {icons} from '../constants';

const Tab = createBottomTabNavigator();

export type TabParamList = {
  Home: undefined;
  FavoriteStack: undefined;
  Profile: {
    toggleLanguage: (lang: 'en' | 'ar') => void;
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const TabBarIcon = ({
  route,
  color,
  size,
}: {
  route: {name: string};
  color: string;
  size: number;
}) => {
  let iconName: string;

  switch (route.name) {
    case 'Home':
      iconName = icons.home;
      break;
    case 'Favorite':
      iconName = icons.favorites;
      break;
    case 'Profile':
      iconName = icons.person;
      break;
    default:
      iconName = icons.ellipse;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const AppStack: React.FC = () => {
  const {primary, lightGray} = colors;

  const tabBarOptions = {
    tabBarActiveTintColor: primary,
    tabBarInactiveTintColor: lightGray,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => TabBarIcon({route, color, size}),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false, ...tabBarOptions}}
      />

      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        options={{headerShown: false, ...tabBarOptions}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false, ...tabBarOptions}}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
