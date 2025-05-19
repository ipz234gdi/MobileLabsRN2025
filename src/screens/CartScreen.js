import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';

export default function CartScreen({ navigation }) {
  const { items, totalQty, totalPrice } = useSelector(s => s.cart);

  if (totalQty === 0) {
    return <Text style={{ padding: 16 }}>Кошик порожній</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={Object.values(items)}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <Text style={s.total}>Загалом: ${totalPrice.toFixed(2)}</Text>
      <Button
        title="Оформити замовлення"
        onPress={() => navigation.navigate('Checkout')}
      />
    </View>
  );
}

const s = StyleSheet.create({
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
