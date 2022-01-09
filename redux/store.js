import { configureStore } from '@reduxjs/toolkit'
import racunReducer from './racunSlice'
import posaoReducer from './posaoSlice'

export const store = configureStore({ reducer: { racunReducer, posaoReducer } })
