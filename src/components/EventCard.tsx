import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';

import {EventCardProps} from '../types/type';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavorites} from '../hooks/useFavorites';
import {colors} from '../colors';
import {formatDataTime} from '../utils';
import {icons} from '../constants';

const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  isFavoriteScreen = false,
}) => {
  const {toggleFavorite} = useFavorites();

  const {
    name: eventName = '',
    dates: {start: {localDate: date = '', localTime: time = ''}} = {},
    images: [{url: thumbnailUrl = ''}] = [],
    _embedded = {},
  } = event;

  const venueName = _embedded?.venues?.[0]?.name;
  const city = _embedded?.venues?.[0]?.city?.name;

  const formattedDate = formatDataTime(date, time, {
    withDate: true,
    hour12: false,
  });
  const {favorite, gradient1, transparent} = colors;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ImageBackground
        source={{uri: thumbnailUrl}}
        style={styles.image}
        imageStyle={styles.eventCardImage}>
        <LinearGradient
          colors={[gradient1, transparent]}
          style={styles.gradient}
        />
        {isFavoriteScreen && (
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => toggleFavorite(event)}>
            <Icon name={icons.heart} size={20} color={favorite} />
          </TouchableOpacity>
        )}
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {eventName}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.venue}>
          {venueName}, {city}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
