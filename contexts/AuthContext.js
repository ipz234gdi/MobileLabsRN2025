import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Відновлюємо сесію з AsyncStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async u => {
      if (u) {
        setUser(u);
        await AsyncStorage.setItem("user", JSON.stringify(u));
      } else {
        setUser(null);
        await AsyncStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
