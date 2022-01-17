import { configureStore } from '@reduxjs/toolkit'
import racunReducer from './racunSlice'
import { api } from './apiQuery'
import modalSlice from './modalSlice'

export const store = configureStore({
  reducer: {
    racun: racunReducer,
    modal: modalSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})
