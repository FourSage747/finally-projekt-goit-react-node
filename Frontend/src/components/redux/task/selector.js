import { createSelector } from "@reduxjs/toolkit";

export const contactsSelector = state => state.contacts.contacts.items;
export const getFilter = state => state.contacts.filter;

export const filterSelector = createSelector(
    [contactsSelector, getFilter],
    (contacts, filter) => {
        if (!contacts) {
            return [];
        }
        return contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
    }
)