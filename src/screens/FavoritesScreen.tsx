import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, FlatList} from 'react-native';
import EventCard from '../components/EventCard';
import styles from '../styles';
import EmptyFavorites from '../components/EmptyFavorites';
import {useFavorites} from '../hooks/useFavorites';
import screenNames from '../screenNames';
import {TMEvent} from '../types/type';

const FavoritesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {favorites, toggleFavorite, reloadFavorites} = useFavorites();

  useFocusEffect(
    useCallback(() => {
      reloadFavorites();
    }, [reloadFavorites]),
  );

  const renderItem = ({item}: {item: TMEvent}) => (
    <EventCard
      event={item}
      onPress={() =>
        navigation.navigate(screenNames.EVENT_DETAIL, {event: item})
      }
      isFavoriteScreen
      toggleFavorite={toggleFavorite}
    />
  );

  return (
    <View style={styles.favoritesContainer}>
      {favorites.length === 0 ? (
        <EmptyFavorites onPress={() => navigation.navigate(screenNames.HOME)} />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item?.id?.toString() || ''}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.favoritesFlatListColumnWrapper}
          contentContainerStyle={styles.favoritesFlatListContentContainer}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
