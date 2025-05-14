import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      Alert.alert("Хиба", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" value={pass} onChangeText={setPass} secureTextEntry />
      <Button title="Увійти" onPress={handleSignIn} />
      <Button title="Реєструватися" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Забув пароль?" onPress={() => navigation.navigate("ResetPassword")} />
    </View>
  );
}
