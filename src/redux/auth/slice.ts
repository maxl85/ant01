import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUsername } = authSlice.actions;

export default authSlice.reducer;