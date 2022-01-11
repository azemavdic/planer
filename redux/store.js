import { configureStore } from '@reduxjs/toolkit';
import racunReducer from './racunSlice';
import posaoReducer from './posaoSlice';
import { api } from './apiQuery';

export const store = configureStore({
    reducer: {
        racun: racunReducer,
        // posao: posaoReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware),
});
