import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';

import {EventCardProps} from '../types/type';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavorites} from '../hooks/useFavorites';
import i18n from '../i18n';
import {colors} from '../colors';

const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  isFavoriteScreen = false,
}) => {
  const imageUrl = event.images?.[0]?.url;
  const name = event.name;
  const dates = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const venueName = event._embedded?.venues?.[0]?.name;
  const city = event._embedded?.venues?.[0]?.city?.name;
  const {favorites, toggleFavorite} = useFavorites();
  const textAlign = i18n.language === 'ar' ? 'right' : 'left';
  const {favorite, gradient1, transparent} = colors;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ImageBackground
        source={{uri: imageUrl}}
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
            <Icon name="heart" size={20} color={favorite} />
          </TouchableOpacity>
        )}
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={[styles.title, {textAlign}]}>
          {name}
        </Text>
        <Text style={[styles.date, {textAlign}]}>
          {dates} {time}
        </Text>
        <Text style={[styles.venue, {textAlign}]}>
          {venueName}, {city}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
