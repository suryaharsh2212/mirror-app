import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  phone: null,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { id, email, phone, name } = action.payload;
      state.id = id;
      state.email = email;
      state.phone = phone;
      state.name = name;
    },
    clearUserDetails: (state) => {
      state.id = null;
      state.email = null;
      state.phone = null;
      state.name = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
