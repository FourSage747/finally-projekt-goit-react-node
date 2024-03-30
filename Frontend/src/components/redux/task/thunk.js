import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../contactsApi';

export const getProductsThunk = createAsyncThunk('product/getProducts', () => 
  getProducts()
);

// export const addContactsThunk = createAsyncThunk('contact/addContacts', (res) =>
//   addContacts(res)
// );

// export const deleteContactsThunk = createAsyncThunk('contact/deleteContacts', (id) =>
//   deleteContacts(id)
// );
