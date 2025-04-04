import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Counter({ points }) {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>Очки: {points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    marginBottom: 20,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
