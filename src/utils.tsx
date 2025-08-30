import {Linking} from 'react-native';

const openUrl = (url: string) => {
  Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
};

export {openUrl};
