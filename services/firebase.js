import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";

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

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth(app);

export { auth };