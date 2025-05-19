import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderCard({ order }) {
  return (
    <View style={s.card}>
      <Text style={s.text}>
        Дата: {new Date(order.date).toLocaleString()}
      </Text>
      <Text style={s.text}>
        Товарів: {order.items.length}
      </Text>
      <Text style={s.text}>
        Сума: ${order.totalPrice.toFixed(2)}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    elevation: 1,
  },
  text: { fontSize: 14, marginBottom: 4 },
});
