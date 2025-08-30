import React, {useEffect, useState} from 'react';
import {I18nManager, ActivityIndicator, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {initI18n} from '../i18n';
import styles from '../styles';
import {useAuth} from '../contexts/AuthContext';

const AppNavigator: React.FC = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const [i18nReady, setI18nReady] = useState<boolean>(false);

  useEffect(() => {
    const initializeApp = async () => {
      await initI18n();
      const lang = await AsyncStorage.getItem('app_language');
      const isArabic = lang === 'ar';
      I18nManager.allowRTL(isArabic);
      I18nManager.forceRTL(isArabic);

      try {
        const token = await AsyncStorage.getItem('current_user');
        setIsLoggedIn(!!token);
      } catch (e) {
        setIsLoggedIn(false);
      } finally {
        RNBootSplash.hide({fade: true});
        setI18nReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!i18nReady || isLoggedIn === null) {
    return (
      <SafeAreaProvider>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaProvider>
    );
  }

  return <>{isLoggedIn ? <AppStack /> : <AuthStack />}</>;
};

export default AppNavigator;
