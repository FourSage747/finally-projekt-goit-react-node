import { getProfileThunk, loginThunk } from './thunk';

import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const InitialState = {
  token: '',
  isLoading: false,
  error: '',
  profile: null
};

const handlePending = (state) => {
    state.isLoading = true
}
const handleFulfilled = (state, {payload}) => {
    state.isLoading = false
    state.error = ''
    state.token = payload.token
}
const handleFulfilledProfile = (state, {payload}) => {
    state.isLoading = false
    state.error = ''
    state.profile = payload
}
const handleRejected = (state, {payload}) => {
    state.isLoading = false
    state.error = payload
}

const authSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    logOut: (state)=>{
      state.token = ''
      state.profile = null
    }
  },
  extraReducers: builder => {
    builder
      // .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, handleFulfilled)
      .addCase(getProfileThunk.fulfilled, handleFulfilledProfile)
      .addMatcher(isAnyOf(loginThunk.pending, getProfileThunk.pending), handlePending)
      // .addCase(loginThunk.rejected, handleRejected)
      .addMatcher(isAnyOf(loginThunk.rejected, getProfileThunk.rejected), handleRejected)
  },
});

export const authReducer = authSlice.reducer;
export const {logOut} = authSlice.actions;