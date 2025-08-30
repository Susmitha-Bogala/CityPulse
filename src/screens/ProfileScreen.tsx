import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSnackbar} from '../components/SnackbarProvider';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {SNACKBAR_TYPES} from '../constants';
import styles from '../styles';
import {colors} from '../colors';
import {getUser} from '../storage/user';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {useLanguage} from '../contexts/LanguageContext';
import {getFormattedNameFromEmail} from '../utils';
import {icons} from '../constants';

import i18n from '../i18n';
import {removeUser} from '../storage/user';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {toggleLanguage} = useLanguage();
  const {setIsLoggedIn} = useAuth();
  const {showSnackbar} = useSnackbar();
  const {t} = useTranslation();
  const [user, setUser] = useState<any>(null);

  const getUserDetails = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    Alert.alert(t('confirm_logout'), t('confirm_logout_message'), [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('current_user');
          await removeUser();
          setIsLoggedIn(false);
          showSnackbar(t('logout_success'), 'success');
        },
      },
    ]);
  };

  const changeLanguage = () => {
    const {success} = SNACKBAR_TYPES;
    Alert.alert(t('toggle_language'), t('toggle_language_message'), [
      {text: t('cancel'), style: 'cancel'},
      {
        text: t('yes'),
        style: 'destructive',
        onPress: () => {
          const newLang = i18n.language === 'en' ? 'ar' : 'en';
          toggleLanguage(newLang);
          showSnackbar(t('language_changed'), success);
          setTimeout(() => {
            if (RNRestart && RNRestart.restart) {
              RNRestart.restart();
            } else {
              console.warn('RNRestart is not available');
            }
          }, 500);
        },
      },
    ]);
  };

  const actionItems = [
    {
      key: 'my_tickets',
      icon: icons.ticket,
      color: colors.boldViolet,
      text: t('my_tickets'),
      onPress: () => {},
    },
    {
      key: 'favorites',
      icon: icons.heartOutline,
      color: colors.favorite,
      text: t('favorites'),
      onPress: () =>
        navigation.navigate(
          'Favorite' as never,
          {
            screen: 'Favorites',
          } as never,
        ),
    },
    {
      key: 'settings',
      icon: icons.settings,
      color: colors.softGreen,
      text: t('settings'),
      onPress: () => {},
    },
    {
      key: 'change_language',
      icon: icons.language,
      color: colors.darkBlue,
      text:
        i18n.language === 'ar' ? t('change_to_english') : t('change_to_arabic'),
      onPress: changeLanguage,
    },
    {
      key: 'logout',
      icon: icons.logout,
      color: colors.error,
      text: t('logout'),
      onPress: handleLogout,
    },
  ];

  const renderItem = ({item}: {item: (typeof actionItems)[0]}) => (
    <TouchableOpacity style={styles.actionItem} onPress={item.onPress}>
      <Ionicons name={item.icon} size={22} color={item.color} />
      <Text style={styles.actionText}>{t(item.text)}</Text>
      <Ionicons
        name={i18n.language === 'ar' ? icons.chevronBack : icons.chevronForward}
        size={20}
        color={colors.darkGray}
        style={styles.arrow}
      />
    </TouchableOpacity>
  );

  const userName = getFormattedNameFromEmail(user?.email);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradient2} />
      <View style={styles.profileContainer}>
        <LinearGradient
          colors={[colors.gradient2, colors.gradient3]}
          style={styles.profileHeader}>
          <Ionicons name={icons.person} size={90} color={colors.white} />
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </LinearGradient>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>{t('about_me')}</Text>
          <Text style={styles.about}>{t('about_me_details')}</Text>
        </View>

        <FlatList
          data={actionItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.actionList}
        />
      </View>
    </>
  );
};

export default ProfileScreen;
