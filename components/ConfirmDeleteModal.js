import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { COLORS, SIZES } from "../theme";

export default function ConfirmDeleteModal({
  visible,
  password,
  onChangePassword,
  onCancel,
  onConfirm,
  error,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>Введіть пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={onChangePassword}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.cancelBtn]}
              onPress={onCancel}
            >
              <Text style={styles.btnText}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.deleteBtn]}
              onPress={onConfirm}
            >
              <Text style={styles.btnText}>Видалити назавжди</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: '#000',
    placeholderTextColor: '#000',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    marginBottom: 10,
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 10,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
  },
});