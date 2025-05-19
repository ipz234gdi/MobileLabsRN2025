import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import OrderCard from '../components/OrderCard';

export default function OrdersScreen() {
  const history = useSelector(s => s.orders.history);

  if (history.length === 0) {
    return <Text style={{ padding: 16 }}>Немає замовлень</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </View>
  );
}
