import { createSlice } from '@reduxjs/toolkit'

export const posaoSlice = createSlice({
  name: 'posao',
  initialState: {
    posao: [],
  },
  reducers: {
    dodajAktivnost: (state, action) => {
      state.posao.unshift(action.payload)
    },
  },
})

export const { dodajAktivnost } = posaoSlice.actions
export default posaoSlice.reducer
