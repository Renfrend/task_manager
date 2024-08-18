import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = {
        username: payload.username,
        email: payload.email,
      };

      localStorage.setItem('jwt', payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('jwt');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.authSlice.user;
