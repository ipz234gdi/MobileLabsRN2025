import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateQty, removeFromCart } from '../store/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <View style={s.row}>
      <Text style={s.title}>{item.title}</Text>
      <View style={s.controls}>
        <Button
          title="−"
          onPress={() =>
            item.qty > 1 &&
            dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
          }
        />
        <Text style={s.qty}>{item.qty}</Text>
        <Button
          title="+"
          onPress={() =>
            dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
          }
        />
        <Button
          title="Видалити"
          color="#c00"
          onPress={() => dispatch(removeFromCart(item.id))}
        />
      </View>
      <Text style={s.sum}>${item.sum.toFixed(2)}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 4,
    borderRadius: 6,
    elevation: 1,
  },
  title: { fontSize: 16, marginBottom: 6 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  qty: { marginHorizontal: 8, fontSize: 16 },
  sum: { fontSize: 16, fontWeight: 'bold' },
});
