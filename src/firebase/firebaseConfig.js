import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, signOut } from 'firebase/auth';
import { collection ,getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6FmsAcM0RSKy0V2FKdzvGgszJE2OnmT8",
  authDomain: "hivconnect-a6a83.firebaseapp.com",
  projectId: "hivconnect-a6a83",
  storageBucket: "hivconnect-a6a83.appspot.com",
  messagingSenderId: "207147710331",
  appId: "1:207147710331:web:c09a5d06042049c19b6fde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);
export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
export const blogRef = collection(db, 'blogs');


export { auth, db, signOut };
