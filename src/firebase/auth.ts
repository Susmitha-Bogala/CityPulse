import auth from '@react-native-firebase/auth';
import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';

import {iosFirebaseConfig, androidFirebaseConfig} from '../../firebaseConfig';
import {saveUser} from '../storage/user';

if (!firebase.apps.length) {
  firebase.initializeApp(
    Platform.OS === 'ios' ? iosFirebaseConfig : androidFirebaseConfig,
  );
}
// Signup
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await saveUser(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Login
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout
export const signOutUser = async () => {
  await auth().signOut();
};
