import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function TextInputField({
  label, value, onChange, error, ...props
}) {
  return (
    <View style={s.container}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        style={[s.input, error && s.errorBorder]}
        value={value}
        onChangeText={onChange}
        {...props}
      />
      {error && <Text style={s.errorText}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  container: { marginBottom: 12 },
  label:     { fontSize: 14, marginBottom: 4 },
  input:     {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  errorBorder: { borderColor: '#c00' },
  errorText:   { color: '#c00', marginTop: 4 },
});
