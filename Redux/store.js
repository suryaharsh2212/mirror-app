import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Adjust the path if necessary
import userReducer from './userslice'; // Adjust the path if necessary

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
