import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("[Auth] Завантаження токена з AsyncStorage…");
    AsyncStorage.getItem("token")
      .then((token) => {
        console.log("[Auth] Отриманий токен:", token);
        setUserToken(token);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("[Auth] Помилка читання токена:", err);
        setIsLoading(false);
      });
  }, []);

  const signIn = async (idToken) => {
    console.log("[Auth] signIn викликано з токеном:", idToken);
    try {
      await AsyncStorage.setItem("token", idToken);
      console.log("[Auth] Токен збережено");
      setUserToken(idToken);
    } catch (err) {
      console.error("[Auth] Помилка збереження токена:", err);
    }
  };

  const signOut = async () => {
    console.log("[Auth] signOut викликано");
    try {
      await AsyncStorage.removeItem("token");
      console.log("[Auth] Токен видалено");
      setUserToken(null);
    } catch (err) {
      console.error("[Auth] Помилка видалення токена:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
