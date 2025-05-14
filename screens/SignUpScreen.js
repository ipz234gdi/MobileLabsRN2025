import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      Alert.alert("Хиба", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" value={pass} onChangeText={setPass} secureTextEntry />
      <Button title="Зареєструватись" onPress={handleSignUp} />
      <Button title="Увійти" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
}
