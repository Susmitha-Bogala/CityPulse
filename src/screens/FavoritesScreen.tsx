import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, FlatList} from 'react-native';
import EventCard from '../components/EventCard';
import {useFavorites} from '../hooks/useFavorites';
import {TMEvent} from '../types/type';
import styles from '../styles';

const FavoritesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {favorites, toggleFavorite} = useFavorites();
  const [currentFavorites, setCurrentFavorites] =
    useState<TMEvent[]>(favorites);

  useFocusEffect(
    useCallback(() => {
      setCurrentFavorites(favorites);
    }, [favorites]),
  );

  const renderItem = ({item}: {item: TMEvent}) => (
    <EventCard
      event={item}
      onPress={() => navigation.navigate('EventDetail', {event: item})}
      isFavoriteScreen={true}
      toggleFavorite={toggleFavorite}
    />
  );

  return (
    <View style={styles.favoritesContainer}>
      {currentFavorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet</Text>
      ) : (
        <FlatList
          data={currentFavorites}
          keyExtractor={item => item.id}
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
