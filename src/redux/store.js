import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from '../redux/filterSlice';

import { contactsApi } from './contactsApi';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: { filter: filterReducer, [contactsApi.reducerPath]: contactsApi.reducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

// setupListeners(store.dispatch);
