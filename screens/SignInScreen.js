import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function SignInScreen({ navigation }) {
  const { setLoggedInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    console.log("[SignIn] Починаємо вхід із:", email);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("[SignIn] Успішний вхід:", userCredential.user);
      setLoggedInUser(userCredential.user);
      Alert.alert("Успіх", "Ви успішно увійшли");
    } catch (e) {
      console.error("[SignIn] Помилка входу:", e.code, e.message, e.customData);
      Alert.alert("Помилка", `${e.code}: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button
        title={loading ? "Зачекайте..." : "Увійти"}
        onPress={handleSignIn}
        disabled={loading}
      />
      <Button
        title="Реєструватися"
        onPress={() => navigation.navigate("SignUp")}
        disabled={loading}
      />
      <Button
        title="Забув пароль?"
        onPress={() => navigation.navigate("ResetPassword")}
        disabled={loading}
      />
    </View>
  );
}
