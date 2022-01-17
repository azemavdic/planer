import { configureStore } from '@reduxjs/toolkit'
import racunReducer from './racunSlice'
import { api } from './apiQuery'
import modalSlice from './modalSlice'
import editingItemSlice from './editingItemSlice'

export const store = configureStore({
  reducer: {
    racun: racunReducer,
    modal: modalSlice,
    edit: editingItemSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})
