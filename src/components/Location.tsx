import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {openUrl} from '../utils';
import styles from '../styles';
import {colors} from '../colors';
import {icons} from '../constants';

type LocationProps = {
  event: {
    _embedded?: {
      venues?: Array<{
        name?: string;
        city?: {name?: string};
        state?: {stateCode?: string};
        location?: {
          latitude?: string;
          longitude?: string;
        };
      }>;
    };
  };
};

const Location: React.FC<LocationProps> = ({event}) => {
  const venue = event?._embedded?.venues?.[0];
  const latitude = venue?.location?.latitude;
  const longitude = venue?.location?.longitude;
  const city = venue?.city?.name;
  const state = venue?.state?.stateCode;

  const handleOpenMaps = () => {
    if (latitude && longitude) {
      const label = encodeURIComponent(venue?.name || 'Event Location');
      const url = Platform.select({
        ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`,
        android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      });

      openUrl(url || '');
    }
  };

  if (!venue) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.row} onPress={handleOpenMaps}>
      <Icon name={icons.location} size={18} color={colors.primary} />
      <Text
        style={[styles.metaText, {color: colors.primary}]}
        numberOfLines={2}>
        {venue.name}, {city}, {state}
      </Text>
    </TouchableOpacity>
  );
};

export default Location;
