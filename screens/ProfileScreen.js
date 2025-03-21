import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Реєстрація</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
