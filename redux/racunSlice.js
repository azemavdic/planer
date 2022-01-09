import { createSlice } from '@reduxjs/toolkit'

export const racunSlice = createSlice({
  name: 'racun',
  initialState: {
    racun: [
      {
        _id: '',
        trosak: '',
        iznos: null,
        mjesec: '',
      },
    ],
  },
  reducers: {
    dodajRacun: (state, action) => {
      state.racun.push(action.payload)
    },
    izbrisiRacun: (state, action) => {
      state.racun = state.racun.filter((racun) => racun._id !== action.payload)
    },
  },
})

export const { dodajRacun, izbrisiRacun } = racunSlice.actions
export default racunSlice.reducer
