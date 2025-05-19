// screens/SignInScreen.js
import React, { useState } from "react";
import { View, TextInput, Alert, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";
import CustomButton from "../components/CustomButton";
import styles from "../styles/formStyles";
import { COLORS } from "../theme";

export default function SignInScreen({ navigation }) {
  const { setLoggedInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errorMessages = {
    "auth/invalid-email": "Неправильний формат email.",
    "auth/user-disabled": "Обліковий запис заблоковано.",
    "auth/invalid-login-credentials": "Користувача з таким email не існує.",
    "auth/missing-password": "Введіть пароль!",
    "auth/wrong-password": "Невірний пароль.",
  };

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("[SignIn] Успішний вхід:", user);
      setLoggedInUser(user);
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      });
    } catch (e) {
      // дружнє повідомлення або дефолт
      const msg = errorMessages[e.code] || "Помилка: " + e.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.inputBorder}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInput
        placeholder="Пароль"
        placeholderTextColor={COLORS.inputBorder}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        editable={!loading}
      />
      {error ? <Text style={styles.alertText}>{error}</Text> : null}
      <CustomButton
        title={loading ? "Зачекайте..." : "Увійти"}
        onPress={handleSignIn}
        disabled={loading}
      />
      <View style={styles.linkButton}>
        <Text
          onPress={() => navigation.navigate("SignUp")}
          style={styles.linkText}
        >
          Реєстрація
        </Text>
        <Text
          onPress={() => navigation.navigate("ResetPassword")}
          style={styles.linkText}
        >
          Забули пароль?
        </Text>
      </View>
    </View>
  );
}
