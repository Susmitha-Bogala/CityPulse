import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true}); // hide splash after app loads
  }, []);
  return <AppNavigator />;
};

export default App;
