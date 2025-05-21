import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice.ts";
import profileReducer from "./profileSlice.ts";

const store = configureStore({
    reducer: {
        authReducer,
        profileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;