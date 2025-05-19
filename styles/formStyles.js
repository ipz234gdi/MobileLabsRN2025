import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
    justifyContent: "center",
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.font,
    marginTop: SIZES.padding / 2,
    color: COLORS.text,
  },
  linkButton: {
    marginTop: SIZES.padding / 2,
    alignItems: "center",
  },
  linkText: {
    color: COLORS.accent,
    fontSize: SIZES.font,
  },
  alertText: {
    color: COLORS.error,
    textAlign: "center",
    marginTop: SIZES.padding / 2,
  },
});
