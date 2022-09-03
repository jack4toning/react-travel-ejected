import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkout } from './shoppingCart';

export interface orderState {
  currentOrder: any;
  isLoading: boolean;
  error: string;
}

const initialState: orderState = {
  currentOrder: null,
  isLoading: false,
  error: '',
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (params: { jwt: string; orderId: string }, thunkAPI) => {
    const { jwt, orderId } = params;
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/orders/${orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: state => {
      state.isLoading = true;
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [placeOrder.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    [checkout.pending.type]: state => {
      state.isLoading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [checkout.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const orderReducer = orderSlice.reducer;
