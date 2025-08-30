import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from 'react';
import {Animated, Text, TouchableWithoutFeedback} from 'react-native';
import styles from '../styles';
import {colors} from '../colors';
import {SnackbarType} from '../types/type';

interface SnackbarContextProps {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used inside SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({children}: {children: ReactNode}) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('success');
  const [visible, setVisible] = useState(false);
  const translateY = useRef(new Animated.Value(100)).current;

  const showSnackbar = (msg: string, t: SnackbarType = 'success') => {
    setMessage(msg);
    setType(t);
    setVisible(true);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      }, 1000);
    });
  };

  const getBackgroundColor = (type: SnackbarType) => {
    const {success, error, kournikova, red} = colors;
    switch (type) {
      case 'success':
        return success;
      case 'error':
        return error;
      case 'info':
        return kournikova;
      case 'warning':
        return red;
      default:
        return success;
    }
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.snackbar,
            {
              transform: [{translateY}],
              backgroundColor: getBackgroundColor(type),
            },
          ]}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <Text style={styles.snackbarText}>{message}</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
    </SnackbarContext.Provider>
  );
};
