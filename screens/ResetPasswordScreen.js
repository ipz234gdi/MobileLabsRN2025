import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Готово", "Лист для скидання відправлено");
    } catch (e) {
      Alert.alert("Хиба", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Скинути пароль" onPress={handleReset} />
    </View>
  );
}
