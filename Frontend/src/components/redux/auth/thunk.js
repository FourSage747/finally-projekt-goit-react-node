import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../contactsApi";

export const loginThunk = createAsyncThunk('auth/login', (body)=>
    login(body)
)