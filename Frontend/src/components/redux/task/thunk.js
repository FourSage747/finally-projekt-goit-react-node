import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, postOrder } from '../contactsApi';

export const getProductsThunk = createAsyncThunk('product/getProducts', () => 
  getProducts()
);

export const postOrderThunk = createAsyncThunk('order/postOrder', (body, token) => 
  postOrder(body, token)
);
