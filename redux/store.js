import { configureStore } from '@reduxjs/toolkit'
import racunReducer from './racunSlice'

export const store = configureStore({ reducer: racunReducer })
