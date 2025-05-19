import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";                         // <- обов’язково firebase/app
import { initializeAuth, getAuth, getReactNativePersistence } 
       from "firebase/auth/react-native";                             // <- RN-специфічний auth
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWtdh--skxN_JBd8Fyw2ft_gyx8csMMM0",
  authDomain: "lab-5-ac608.firebaseapp.com",
  projectId: "lab-5-ac608",
  storageBucket: "lab-5-ac608.firebasestorage.app",
  messagingSenderId: "1016397488171",
  appId: "1:1016397488171:web:79d7ecebb2bb5805a10a6e",
  measurementId: "G-R1GY34V2NW",
};

const app = initializeApp(firebaseConfig);

// === AUTH ===
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// === FIRESTORE з fallback на XHR long-polling ===
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});