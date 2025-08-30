import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../styles';
import {useTranslation} from 'react-i18next';

interface EmptyFavoritesProps {
  onPress: () => void;
}

const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({onPress}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.emptyFavoritesContainer}>
      <Text style={styles.emptyEmoji}>💔</Text>
      <Text style={styles.emptyText}>{t('no_favorites_title')}</Text>
      <Text style={styles.emptyText}>{t('no_favorites_subtitle')}</Text>
      <TouchableOpacity style={styles.exploreButton} onPress={onPress}>
        <Text style={styles.exploreButtonText}>{t('explore_events')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyFavorites;
