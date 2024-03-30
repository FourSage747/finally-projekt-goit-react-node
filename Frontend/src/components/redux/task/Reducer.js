import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './InitialState';
import { addContactsThunk, deleteContactsThunk, getContactsThunk } from './thunk';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: InitialState,
  reducers: {
    setFilter: (state, action) => {
        state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
        state.contacts.error = '';
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContactsThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(addContactsThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        // state.contacts.items.push(action.payload);
        state.contacts.items = [action.payload, ...state.contacts.items];
        state.contacts.error = '';
      })
      .addCase(addContactsThunk.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContactsThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContactsThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter((el) => el.id !== action.payload.id);
        state.contacts.error = '';
      })
      .addCase(deleteContactsThunk.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
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

export const {setFilter } = contactsSlice.actions;

// export const { creatContacts, deleteContacts, setFilter } =
//   contactsSlice.actions;
