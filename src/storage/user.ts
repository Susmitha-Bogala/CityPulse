import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'current_user';

export const saveUser = async (user: any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Error saving user:', err);
  }
};

export const getUser = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error reading user:', err);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('Error removing user:', err);
  }
};
