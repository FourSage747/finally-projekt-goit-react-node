import { createSlice } from '@reduxjs/toolkit';
import { getProductsThunk } from './thunk';

export const InitialState = {
  products: {
    items: [],
    isLoading: false,
    error: null,
  },
  // filter: '',
};



export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: InitialState,
  // reducers: {
  //   setFilter: (state, action) => {
  //       state.filter = action.payload;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(getProductsThunk.pending, state => {
        state.products.isLoading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.products.items = action.payload;
        state.products.error = '';
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.products.isLoading = false;
        state.products.error = action.payload;
      })
  },
});

// const filtersSlice = createSlice({
//     name: "filters",
//     initialState: InitialState,
//     reducers: {
//         setFilter: (state, action) => {
//             state.filter = action.payload;
//       },
//     },
//   });

export const contactsReducer = contactsSlice.reducer;
// export const filtersReducer = filtersSlice.reducer;

// export const {setFilter } = contactsSlice.actions;

// export const { creatContacts, deleteContacts, setFilter } =
//   contactsSlice.actions;
