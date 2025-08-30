import React, {useEffect, useState} from 'react';
import {I18nManager, ActivityIndicator, View, Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import AuthStack from './src/navigation/AuthStack';
import firebase from '@react-native-firebase/app';
import {NavigationContainer} from '@react-navigation/native';
import {iosFirebaseConfig, androidFirebaseConfig} from './firebaseConfig';
import {SnackbarProvider} from './src/components/SnackbarProvider';
import {initI18n} from './src/i18n';
import styles from './src/styles';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [i18nReady, setI18nReady] = useState<boolean>(false);

  const toggleLanguage = async (lang: 'en' | 'ar') => {
    await AsyncStorage.setItem('app_language', lang);
    await initI18n();

    if (lang === 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  };

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

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(
        Platform.OS === 'ios' ? iosFirebaseConfig : androidFirebaseConfig,
      );
    }
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

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SnackbarProvider>
          {isLoggedIn ? (
            <AppNavigator
              toggleLanguage={toggleLanguage}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <AuthStack setIsLoggedIn={setIsLoggedIn} />
          )}
        </SnackbarProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
