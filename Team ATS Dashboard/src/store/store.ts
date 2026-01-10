// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import pageTitleReducer from "./services/pageTitleSlice";
import authReducer from "./services/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    pageTitle: pageTitleReducer,
    user: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
