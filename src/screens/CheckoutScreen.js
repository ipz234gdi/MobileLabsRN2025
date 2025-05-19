import React, { useState } from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import TextInputField from "../components/TextInputField";
import { setUser } from "../store/userSlice";
import { addOrder } from "../store/ordersSlice";
import { clearCart } from "../store/cartSlice";

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((s) => s.cart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name) e.name = "Введіть ім’я";
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Невірний email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;
    dispatch(setUser({ name, email }));
    dispatch(
      addOrder({
        date: Date.now(),
        items: Object.values(cart.items),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty,
      })
    );

    dispatch(clearCart());

    navigation.navigate("Orders");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInputField
        label="Ім’я"
        value={name}
        onChange={setName}
        error={errors.name}
      />
      <TextInputField
        label="Email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        keyboardType="email-address"
      />
      <Button title="Підтвердити" onPress={onSubmit} />
    </View>
  );
}
