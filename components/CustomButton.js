import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../theme";

export default function CustomButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && { backgroundColor: COLORS.inputBorder },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: "center",
    marginTop: SIZES.padding,
  },
  text: {
    color: COLORS.buttonText,
    fontSize: SIZES.font,
    fontWeight: "600",
  },
});
