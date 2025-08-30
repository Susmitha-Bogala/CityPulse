import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {SnackbarProvider} from './src/components/SnackbarProvider';
import {AuthProvider} from './src/contexts/AuthContext';
import {LanguageProvider} from './src/contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <NavigationContainer>
            <SnackbarProvider>
              <AppNavigator />
            </SnackbarProvider>
          </NavigationContainer>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
