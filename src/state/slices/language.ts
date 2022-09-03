import { createSlice } from '@reduxjs/toolkit';

type langCode = 'en' | 'zh';

interface LanguageState {
  language: langCode;
  languageList: { name: string; code: langCode }[];
}

const initialState: LanguageState = {
  language: 'en',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
