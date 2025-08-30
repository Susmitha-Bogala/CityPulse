import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import {TMEvent} from '../types/event';
import {colors} from '../colors';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';

const Tab = createBottomTabNavigator();

export type TabParamList = {
  Home: undefined;
  FavoriteStack: undefined;
  Profile: {
    toggleLanguage: (lang: 'en' | 'ar') => void;
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

interface AppNavigatorProps {
  toggleLanguage: (lang: 'en' | 'ar') => void;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

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
      iconName = 'home';
      break;
    case 'Favorite':
      iconName = 'heart-sharp';
      break;
    case 'Profile':
      iconName = 'person-sharp';
      break;
    default:
      iconName = 'ellipse';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const AppNavigator: React.FC<AppNavigatorProps> = props => {
  const {toggleLanguage, setIsLoggedIn} = props;

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
        children={() => <HomeStack toggleLanguage={toggleLanguage} />}
        options={{headerShown: false, ...tabBarOptions}}
      />

      <Tab.Screen
        name="Favorite"
        children={() => <FavoriteStack toggleLanguage={toggleLanguage} />}
        options={{headerShown: false, ...tabBarOptions}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{
          toggleLanguage,
          setIsLoggedIn,
        }}
        options={{headerShown: false, ...tabBarOptions}}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
