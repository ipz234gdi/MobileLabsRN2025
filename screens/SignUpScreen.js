import React, { useState } from "react";
import { View, TextInput, Alert, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import CustomButton from "../components/CustomButton";
import styles from "../styles/formStyles";
import { COLORS } from "../theme";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errorMessages = {
    "auth/email-already-in-use": "Ця електронна пошта вже зайнята.",
    "auth/invalid-email": "Неправильний формат email.",
    "auth/operation-not-allowed": "Операція реєстрації заборонена.",
    "auth/weak-password": "Пароль має бути не менше 6 символів.",
  };

  const handleSignUp = async () => {
    setError("");

    if (!email.trim()) {
      setError("Введіть email!");
      return;
    }
    if (!pass) {
      setError("Введіть пароль!");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      Alert.alert("Успіх", "Реєстрація пройшла успішно", [
        {
          text: "Добре",
          onPress: () => navigation.replace("SignIn"),
        },
      ]);
    } catch (e) {
      const msg = errorMessages[e.code] || "Помилка: " + e.message;
      console.log(e);
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
        value={pass}
        onChangeText={setPass}
        style={styles.input}
        secureTextEntry
        editable={!loading}
      />
      {error ? <Text style={styles.alertText}>{error}</Text> : null}
      <CustomButton
        title={loading ? "Зачекайте..." : "Зареєструватись"}
        onPress={handleSignUp}
        disabled={loading}
      />
      <View style={styles.linkButton}>
        <Text
          onPress={() => navigation.navigate("SignIn")}
          style={styles.linkText}
        >
          Вже є акаунт? Увійти
        </Text>
      </View>
    </View>
  );
}
