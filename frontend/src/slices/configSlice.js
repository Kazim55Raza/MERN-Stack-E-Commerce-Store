import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: 'USD',
  theme: 'mossy', // for future theme switching
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setCurrency, setTheme } = configSlice.actions;
export default configSlice.reducer;
