import { createSlice } from '@reduxjs/toolkit'

export const pretragaSlice = createSlice({
  name: 'pretraga',
  initialState: {
    pretraga: [],
    text: '',
  },
  reducers: {
    showPretraga: (state, action) => {
      state.pretraga = action.payload
    },
    textPretrage: (state, action) => {
      state.text = action.payload
    },
  },
})

export const { showPretraga, textPretrage } = pretragaSlice.actions
export default pretragaSlice.reducer
