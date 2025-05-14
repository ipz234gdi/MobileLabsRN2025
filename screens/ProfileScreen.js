import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

export default function ProfileScreen() {
  const user = auth.currentUser;
  const uid = user.uid;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // Завантажуємо дані
  useEffect(() => {
    (async () => {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        const d = docSnap.data();
        setName(d.name); setAge(d.age); setCity(d.city);
      }
    })();
  }, []);

  const saveProfile = async () => {
    await setDoc(doc(db, "users", uid), { name, age, city });
    Alert.alert("Ок", "Збережено");
  };

  const handleDelete = async () => {
    // повторна автентифікація
    const credential = EmailAuthProvider.credential(user.email, prompt("Пароль?"));
    await reauthenticateWithCredential(user, credential);
    await deleteDoc(doc(db, "users", uid));
    await deleteUser(user);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Ім'я" value={name} onChangeText={setName} />
      <TextInput placeholder="Вік" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput placeholder="Місто" value={city} onChangeText={setCity} />
      <Button title="Зберегти" onPress={saveProfile} />
      <Button title="Вийти" onPress={() => auth.signOut()} />
      <Button title="Видалити акаунт" onPress={handleDelete} color="red" />
    </View>
  );
}
