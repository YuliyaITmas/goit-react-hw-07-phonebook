import { configureStore } from '@reduxjs/toolkit';


import { contactsReducer } from '../redux/contactsSlice';
import { filterReducer } from '../redux/filterSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
})

const middleware = getDefaultMiddleware({
  serializableCheck: false, 
});

export const store = configureStore({
 reducer: rootReducer,
  middleware
});


