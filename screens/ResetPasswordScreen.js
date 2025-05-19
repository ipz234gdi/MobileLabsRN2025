import React, { useState } from "react";
import { View, TextInput, Alert, Text } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import CustomButton from "../components/CustomButton";
import styles from "../styles/formStyles";
import { COLORS } from "../theme";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Готово", "Лист для скидання пароля відправлено");
    } catch (e) {
      setError(e.message);
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
      {error ? <Text style={styles.alertText}>{error}</Text> : null}
      <CustomButton
        title={loading ? "Зачекайте..." : "Скинути пароль"}
        onPress={handleReset}
        disabled={loading}
      />
      <View style={styles.linkButton}>
        <Text onPress={() => navigation.navigate("SignIn")} style={styles.linkText}>
          Повернутися до входу
        </Text>
      </View>
    </View>
  );
}