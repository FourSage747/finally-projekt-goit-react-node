import { loginThunk } from './thunk';

import { createSlice } from '@reduxjs/toolkit';

const InitialState = {
  token: '',
  user: {
    name: '',
    email: ''
  },
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
    state.isLoading = true
}
const handleFulfilled = (state, action) => {
    state.isLoading = false
    state.error = ''
    state.token = action.payload.token
    state.user.name = action.payload.user.name
    state.user.email = action.payload.user.email
}
// const handleRejected = (state, action) => {
//     state.isLoading = false
//     state.error = action.payload.message;;
// }

const authSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    logOut: (state)=>{
      state.token = ''
      state.user.name = ''
      state.user.email = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, handleFulfilled)
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message;
      })
  },
});

export const authReducer = authSlice.reducer;
export const {logOut} = authSlice.actions;