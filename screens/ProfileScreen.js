import React, { useState, useEffect } from "react";
import { View, TextInput, Alert, Text } from "react-native";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import CustomButton from "../components/CustomButton";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import styles from "../styles/formStyles";

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const uid = user.uid;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  // Завантажити або створити документ користувача
  const fetchUserData = async () => {
    if (!user) return;

    const ref = doc(db, "users", uid);

    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setAge(data.age || "");
        setCity(data.city || "");
      } else {
        await setDoc(ref, {
          name: "",
          age: "",
          city: "",
          email: user.email,
          createdAt: Date.now(),
        });
      }
    } catch (e) {
      console.error("[Profile] fetchUserData error", e);
    }
  };

  // Оновити користувацькі дані
  const updateUserData = async () => {
    setError("");
    const ref = doc(db, "users", uid);

    try {
      await setDoc(ref, { name, age, city }, { merge: true });
      Alert.alert("Успіх", "Дані успішно оновлено.");
    } catch (e) {
      console.error("updateUserData error", e);
      setError("Не вдалося зберегти зміни.");
      Alert.alert("Помилка", e.message);
    }
  };

  // Показати модалку підтвердження
  const confirmDelete = () => {
    setPassword("");
    setShowDeleteModal(true);
  };

  // Видалити акаунт
  const handleDelete = async () => {
    setError("");
    try {
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);

      await deleteDoc(doc(db, "users", uid));
      await deleteUser(user);

      setShowDeleteModal(false);
      navigation.replace("SignIn");
    } catch (e) {
      console.error("[Profile] handleDelete error", e);
      if (e.code === "auth/wrong-password") {
        Alert.alert("Помилка", "Невірний пароль.");
      } else if (e.code === "auth/requires-recent-login") {
        Alert.alert(
          "Сесія закінчилась",
          "Будь ласка, вийдіть і знову увійдіть, потім повторіть видалення."
        );
        setShowDeleteModal(false);
      } else {
        Alert.alert("Помилка", e.message);
      }
    }
  };

  // Вийти з акаунту
  const handleSignOut = () => {
    auth.signOut();
    navigation.replace("SignIn");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Вік"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Місто"
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
      />

      {error !== "" && <Text style={styles.alertText}>{error}</Text>}

      <CustomButton title="Зберегти" onPress={updateUserData} />
      <CustomButton title="Вийти" onPress={handleSignOut} />
      <CustomButton
        title="Видалити акаунт"
        color="red"
        onPress={confirmDelete}
      />

      <ConfirmDeleteModal
        visible={showDeleteModal}
        password={password}
        onChangePassword={setPassword}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
