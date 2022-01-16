import { configureStore } from '@reduxjs/toolkit'
import racunReducer from './racunSlice'
import { api } from './apiQuery'

export const store = configureStore({
  reducer: {
    racun: racunReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})
