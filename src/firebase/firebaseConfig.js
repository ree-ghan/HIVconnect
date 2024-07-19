import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, signOut } from 'firebase/auth';
import { collection ,getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
