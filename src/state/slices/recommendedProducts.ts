import { createSlice } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';

export interface recommendedProductsState {
  productList: any[];
  isLoading: boolean;
  error: string;
}

const initialState: recommendedProductsState = {
  productList: [],
  isLoading: false,
  error: '',
};

const recommendedProductsSlice = createSlice({
  name: 'recommendedProducts',
  initialState,
  reducers: {
    startFetch(state) {
      state.isLoading = true;
    },
    finishFetch(state, action) {
      state.productList = action.payload;
    },
    failToFetch(state, action) {
      state.error = action.payload;
    },
    stopFetch(state) {
      state.isLoading = false;
    },
  },
});

const { startFetch, finishFetch, failToFetch, stopFetch } =
  recommendedProductsSlice.actions;
type FetchProductListActionType =
  | ReturnType<typeof startFetch>
  | ReturnType<typeof finishFetch>
  | ReturnType<typeof failToFetch>
  | ReturnType<typeof stopFetch>;

export const fetchRCProductListActionCreator =
  (): ThunkAction<void, RootState, unknown, FetchProductListActionType> =>
  async (dispatch) => {
    try {
      dispatch(startFetch());
      const { data: productList } = await axios.get(
        'http://123.56.149.216:8080/api/productCollections'
      );
      dispatch(finishFetch(productList));
    } catch (e: any) {
      dispatch(failToFetch(e.message));
    }
    dispatch(stopFetch());
  };
export const recommendedProductsReducer = recommendedProductsSlice.reducer;
