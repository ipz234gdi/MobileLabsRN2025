import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const API_KEY = "AIzaSyBSyCQ7b75_oTaSIWU9_CZ7E49KUfzgjcI";

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    const url = isRegister
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      await AsyncStorage.multiSet([
        ["token", data.idToken],
        ["userId", data.localId],
        ["userEmail", data.email],
      ]);

      signIn(data.idToken);
    } catch (e) {
      const msg = e.response?.data?.error?.message || "Помилка автентифікації";
      setError(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? "Реєстрація" : "Логін"}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isRegister ? "Зареєструватися" : "Увійти"}
        onPress={handleAuth}
      />
      <TouchableOpacity
        onPress={() => {
          setIsRegister((prev) => !prev);
          setError("");
        }}
      >
        <Text style={styles.toggle}>
          {isRegister
            ? "Вже є акаунт? Увійти"
            : "Немає акаунту? Зареєструватися"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  toggle: {
    color: "#0066cc",
    textAlign: "center",
    marginTop: 15,
  },
});
