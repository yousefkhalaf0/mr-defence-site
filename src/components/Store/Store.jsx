import { configureStore, createSlice } from '@reduxjs/toolkit';
import en from '../../Locals/en';
import ar from '../../Locals/ar';

// Language Slice
const langSlice = createSlice({
  name: 'lang',
  initialState: { lang: 'en', content: en },
  reducers: {
    toggleLang: (state) => {
      if (state.lang === 'en') {
        state.lang = 'ar';
        state.content = ar;
      } else {
        state.lang = 'en';
        state.content = en;
      }
    },
  },
});

export const { toggleLang } = langSlice.actions;

const store = configureStore({
  reducer: {
    lang: langSlice.reducer,
  },
});

export default store;
