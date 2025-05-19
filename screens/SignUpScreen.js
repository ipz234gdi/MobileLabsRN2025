import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignUp = async () => {
    console.log("[SignUp] Починаємо реєстрацію:", email);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      console.log("[SignUp] Реєстрація успішна:", userCredential.user);
      Alert.alert("Успіх", "Реєстрація пройшла успішно");
      // При потребі відразу переходьте на екран профілю:
      navigation.replace("Profile");
    } catch (e) {
      console.error("[SignUp] Помилка під час реєстрації:", e);
      Alert.alert("Хиба", e.message);
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
      />
      <TextInput
        placeholder="Пароль"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <Button title="Зареєструватись" onPress={handleSignUp} />
      <Button title="Увійти" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
}
