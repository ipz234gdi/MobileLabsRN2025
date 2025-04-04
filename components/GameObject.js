import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GameObject() {
  return (
    <View style={styles.gameObject}>
      <Text style={styles.text}>Натисни мене!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gameObject: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
