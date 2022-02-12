import { configureStore } from '@reduxjs/toolkit'
import racunReducer from './racunSlice'
import pretragaReducer from './pretragaSlice'
import { emptySplitApi } from './api/emptySplitApi'
import modalSlice from './modalSlice'
import editingItemSlice from './editingItemSlice'

export const store = configureStore({
  reducer: {
    racun: racunReducer,
    modal: modalSlice,
    edit: editingItemSlice,
    pretraga: pretragaReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (gDM) => gDM().concat(emptySplitApi.middleware),
})
