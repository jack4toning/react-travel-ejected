import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface filteredProductsState {
  filteredProducts: any[];
  subFilteredProducts: any[];
  pagination: any;
  isLoading: boolean;
  error: string;
}

const initialState: filteredProductsState = {
  filteredProducts: [],
  subFilteredProducts: [],
  pagination: null,
  isLoading: false,
  error: '',
};

interface params {
  keywords: string | undefined;
  nextPage: number | string;
  pageSize: number | string;
}

export const fetchFilteredProducts = createAsyncThunk(
  'filteredProducts/fetchFilteredProducts',
  async ({ keywords, nextPage, pageSize }: params, thunkAPI) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${nextPage}&pageSize=${pageSize}`;
    if (keywords) url += `&keywords=${keywords}`;
    const response = await axios.get(url);

    return {
      data: response.data,
      pagination: JSON.parse(response.headers['x-pagination']),
    };
  }
);

const filteredProductsSlice = createSlice({
  name: 'filteredProducts',
  initialState,
  reducers: {
    changeSubFilteredProducts(state, action) {
      state.subFilteredProducts = action.payload;
    },
  },
  extraReducers: {
    [fetchFilteredProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchFilteredProducts.fulfilled.type]: (state, action) => {
      state.filteredProducts = action.payload.data;
      state.subFilteredProducts = state.filteredProducts;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
    },
    [fetchFilteredProducts.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { changeSubFilteredProducts } = filteredProductsSlice.actions;
export const filteredProductsReducer = filteredProductsSlice.reducer;
