import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {openUrl} from '../utils';
import styles from '../styles';

type ButtonComponentProps = {
  ticketUrl: string;
  title: string;
  isImage?: boolean;
  imageUrl?: string;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  ticketUrl,
  title,
}) => {
  const handlePress = () => {
    openUrl(ticketUrl);
  };

  return (
    <TouchableOpacity style={styles.ticketButton} onPress={handlePress}>
      <Text style={styles.ticketText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
