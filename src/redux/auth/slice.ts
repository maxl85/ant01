import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  isLoggedIn: boolean;
  selectedMenu: string;
  username: string;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  selectedMenu: '1',
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setMenu: (state, action: PayloadAction<string>) => {
      state.selectedMenu = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUsername, setMenu } = authSlice.actions;

export default authSlice.reducer;