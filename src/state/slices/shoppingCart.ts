import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface shoppingCartState {
  items: any[];
  isLoading: boolean;
  error: string;
}

const initialState: shoppingCartState = {
  items: [],
  isLoading: false,
  error: '',
};

export const fetchShoppingCart = createAsyncThunk(
  'shoppingCart/fetchShoppingCart',
  async (jwt: string, thunkAPI) => {
    const { data: shoppingCart } = await axios.get(
      `http://123.56.149.216:8080/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    const { shoppingCartItems } = shoppingCart;
    return shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async (params: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { jwt, touristRouteId } = params;
    const { data: shoppingCart } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    const { shoppingCartItems } = shoppingCart;
    return shoppingCartItems;
  }
);

export const checkout = createAsyncThunk(
  'shoppingCart/checkout',
  async (jwt: string, thunkAPI) => {
    const { data: order } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return order;
  }
);

export const emptyShoppingCartItem = createAsyncThunk(
  'shoppingCart/emptyShoppingCartItem',
  async (params: { jwt: string; itemIds: number[] }, thunkAPI) => {
    const { jwt, itemIds } = params;
    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${itemIds.join(
        ','
      )})`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
  }
);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShoppingCart.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [fetchShoppingCart.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    [addShoppingCartItem.pending.type]: state => {
      state.isLoading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [addShoppingCartItem.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    [checkout.pending.type]: state => {
      state.isLoading = true;
    },
    [checkout.fulfilled.type]: state => {
      state.items = [];
      state.isLoading = false;
      state.error = '';
    },
    [checkout.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    [emptyShoppingCartItem.pending.type]: state => {
      state.isLoading = true;
    },
    [emptyShoppingCartItem.fulfilled.type]: state => {
      state.items = [];
      state.isLoading = false;
      state.error = '';
    },
    [emptyShoppingCartItem.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;
