import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  return await res.json();
});
const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status:'idle' },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending,  state=>{ state.status='loading' })
      .addCase(fetchProducts.fulfilled,(state,action)=>{ state.items=action.payload; state.status='succeeded'; })
      .addCase(fetchProducts.rejected, state=>{ state.status='failed' });
  }
});
export default productsSlice.reducer;
