import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items, status } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status === "loading") {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  if (status === "failed") {
    return <Text style={{ padding: 16 }}>Помилка завантаження товарів</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <TouchableOpacity
        style={[styles.button, styles.cartButton]}
        onPress={() => navigation.navigate("Cart")}
      >
        <Icon name="shopping-cart" size={25} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.ordersButton]}
        onPress={() => navigation.navigate("Orders")}
      >
        <Icon name="history" size={25} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 1000,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
  },
  cartButton: {
    backgroundColor: "#66ff4f",
    left: 20,
  },
  ordersButton: {
    right: 20,
  },
});
