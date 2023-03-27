import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, AuthSlice } from './';


export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})