import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: {}, totalQty: 0, totalPrice: 0 },
  reducers: {
    addToCart: (state, action) => {
      const { id, price, title } = action.payload;
      const item = state.items[id] || { id, title, price, qty: 0, sum: 0 };
      item.qty++;
      item.sum += price;
      state.items[id] = item;
      state.totalQty++;
      state.totalPrice += price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items[id];
      state.totalQty -= item.qty;
      state.totalPrice -= item.sum;
      delete state.items[id];
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items[id];
      state.totalQty += qty - item.qty;
      state.totalPrice += (qty - item.qty) * item.price;
      item.qty = qty;
      item.sum = qty * item.price;
    },
    clearCart: (state) => {
      state.items = {};
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
});
export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
