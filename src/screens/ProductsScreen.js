import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items, status } = useSelector(s => s.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status === 'loading') {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  if (status === 'failed') {
    return <Text style={{ padding: 16 }}>Помилка завантаження товарів</Text>;
  }

   return (
    <View style={{ flex: 1, padding: 8 }}>
      <Button
        title="Переглянути кошик"
        onPress={() => navigation.navigate('Cart')}
      />
      <Button
        title="Історія замовлень"
        onPress={() => navigation.navigate('Orders')}
      />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}
