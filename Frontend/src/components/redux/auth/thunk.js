import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, login } from "../contactsApi";

export const loginThunk = createAsyncThunk('auth/login', (body)=>
    login(body)
)

export const getProfileThunk = createAsyncThunk('auth/profile', (token)=>
    getProfile(token)
)