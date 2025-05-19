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
  onConfirm
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
    backgroundColor: COLORS.inputBg,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 5,
  },
  title: {
    fontSize: SIZES.font + 2,
    marginBottom: SIZES.padding,
    textAlign: "center",
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    marginBottom: SIZES.padding,
    color: COLORS.text,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    marginRight: SIZES.padding / 2,
  },
  deleteBtn: {
    backgroundColor: COLORS.error,
    marginLeft: SIZES.padding / 2,
  },
  btnText: {
    color: COLORS.buttonText,
    fontWeight: "600",
  },
});
