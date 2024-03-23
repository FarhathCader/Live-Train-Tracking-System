import { createSlice,configureStore } from '@reduxjs/toolkit';

const initialState = {
  isLoggedin: localStorage.getItem('isLoggedin') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedin = true;
      localStorage.setItem('isLoggedin', 'true');
    },
    logout(state) {
      state.isLoggedin = false;
      localStorage.setItem('isLoggedin', 'false');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

export const store  = configureStore({
    reducer: authSlice.reducer
    });
