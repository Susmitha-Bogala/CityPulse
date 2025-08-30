import {useEffect, useState, useCallback} from 'react';
import {Event} from '../types/event';
import {addFavorite, removeFavorite, getFavorites} from '../storage/favorites';
import {useSnackbar} from '../components/SnackbarProvider';
import {useTranslation} from 'react-i18next';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const {showSnackbar} = useSnackbar();
  const {t} = useTranslation();

  const loadFavorites = useCallback(async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  }, []);

  const toggleFavorite = useCallback(
    async (event: Event) => {
      let updatedFavorites: Event[] = [];

      const exists = favorites.find(e => e.id === event.id);

      if (exists) {
        updatedFavorites = favorites.filter(e => e.id !== event.id);
        await removeFavorite(event.id);
        showSnackbar(t('removed_from_favorites'), 'info');
      } else {
        updatedFavorites = [...favorites, event];
        await addFavorite(event);
        showSnackbar(t('added_to_favorites'), 'success');
      }

      setFavorites(updatedFavorites); // trigger re-render
    },
    [favorites, showSnackbar, t],
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {favorites, toggleFavorite, reloadFavorites: loadFavorites};
};
