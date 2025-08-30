import AsyncStorage from '@react-native-async-storage/async-storage';
import {Event} from '../types/event';

const FAVORITES_KEY = 'favorite_events';

export const addFavorite = async (event: Event) => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed: Event[] = existing ? JSON.parse(existing) : [];

    // Prevent duplicates
    if (!parsed.find(e => e.id === event.id)) {
      const updated = [...parsed, event];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Error adding favorite:', err);
  }
};

export const removeFavorite = async (id: string) => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed: Event[] = existing ? JSON.parse(existing) : [];
    const updated = parsed?.filter(e => e?.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing favorite:', err);
  }
};

export const getFavorites = async (): Promise<Event[]> => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITES_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return [];
  }
};
