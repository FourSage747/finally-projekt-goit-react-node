import { loginThunk } from './thunk';

import { createSlice } from '@reduxjs/toolkit';

const InitialState = {
  token: '',
  isLoading: false,
  error: '',
};

const handlePending = (state) => {
    state.isLoading = true
    state.error = ''
}
const handleFulfilled = (state, action) => {
    state.isLoading = false
    state.error = ''
    state.token = action.payload.token
}
const handleRejected = (state, action) => {
    state.isLoading = false
    state.error = action.payload
}

const authSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
//   reducers: {
//     logOut: (state)=>{
//       state.token = ''
//       state.profile = null
//     }
//   },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, handleFulfilled)
      .addCase(loginThunk.rejected, handleRejected)
  },
});

export const authReducer = authSlice.reducer;
// export const {logOut} = authSlice.actions;