import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface userState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: userState = {
  token: null,
  isLoading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'user/signIn',
  async (params: { email: string; password: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/auth/login`,
      params
    );
    return data.token;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
    clearError(state) {
      console.log(123123);
      state.error = null;
    },
  },
  extraReducers: {
    [signIn.pending.type]: state => {
      state.isLoading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const { signOut, clearError } = userSlice.actions;
export const userReducer = userSlice.reducer;
