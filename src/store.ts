import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from './features/flights/flightSlice'
import { api } from "./features/api/apiSlice";
import thunk from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const store = configureStore({
    reducer: {
      flights: flightsReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, api.middleware),
  })
