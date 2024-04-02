import { createSlice } from '@reduxjs/toolkit';
import { getProductsThunk, postOrderThunk } from './thunk';

export const InitialState = {
  products: {
    items: [],
    isLoading: false,
    error: null,
  },
  shopping: []
};



export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: InitialState,
  reducers: {
    shoppingCart: (state, action) => {
      state.shopping = [action.payload, ...state.shopping]
    },
    deleteProducts: (state, action) => {
      state.shopping = state.shopping.filter((el) => el._id !== action.payload);
    },
    plus: (state, action) => {
      const updatedShopping = state.shopping.map((el) => {
          if (el._id === action.payload) {
              return {
                  ...el,
                  quantity: el.quantity + 1
              };
          }
          return el;
      });
      state.shopping = updatedShopping;
    },  
    minus: (state, action) => {
      const updatedShopping = state.shopping.map((el) => {
          if (el._id === action.payload) {
              return {
                  ...el,
                  quantity: el.quantity - 1
              };
          }
          return el;
      });
      state.shopping = updatedShopping;
    }  
  },
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
      .addCase(postOrderThunk.pending, state => {
        state.products.isLoading = true;
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.shopping = [];
        state.products.error = '';
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.products.isLoading = false;
        state.products.error = action.payload;
      })
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { shoppingCart, deleteProducts, plus, minus } = contactsSlice.actions;
