import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ item }) {
  const dispatch = useDispatch();

  return (
    <View style={s.card}>
      <Image source={{ uri: item.image }} style={s.image} />
      <Text style={s.title}>{item.title}</Text>
      <Text numberOfLines={2} style={s.desc}>{item.description}</Text>
      <Text style={s.price}>${item.price.toFixed(2)}</Text>
      <Button
        title="Додати до кошика"
        onPress={() =>
          dispatch(addToCart({
            id: item.id,
            title: item.title,
            price: item.price
          }))
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
  },
  image: {
    width: '100%', height: 150, borderRadius: 4, marginBottom: 8
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  desc:  { fontSize: 14, color: '#555', marginBottom: 4 },
  price: { fontSize: 16, color: '#000', marginBottom: 8 }
});
