import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface productState {
  product: any;
  isLoading: boolean;
  error: string;
}

const initialState: productState = {
  product: {},
  isLoading: false,
  error: '',
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId: string | undefined, thunkAPI) => {
    const { data: product } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${productId}`
    );

    return product;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProduct.fulfilled.type]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    [fetchProduct.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const productReducer = productSlice.reducer;
