import { createSlice } from '@reduxjs/toolkit'

export const racunSlice = createSlice({
  name: 'racun',
  initialState: {
    struja: [],
    voda: [],
    smece: [],
    kablovska: [],
    mobitel: [],
    iptv: [],
  },
  reducers: {
    dodajRacunStruja: (state, action) => {
      state.struja.push(action.payload)
    },
    dodajRacunVoda: (state, action) => {
      state.voda.push(action.payload)
    },
    dodajRacunSmece: (state, action) => {
      state.smece.push(action.payload)
    },
    dodajRacunKablovska: (state, action) => {
      state.kablovska.push(action.payload)
    },
    dodajRacunMobitel: (state, action) => {
      state.mobitel.push(action.payload)
    },
    dodajRacunIptv: (state, action) => {
      state.iptv.push(action.payload)
    },
    izbrisiRacun: (state, action) => {
      state.racun = state.racun.filter((racun) => racun._id !== action.payload)
    },
  },
})

export const {
  dodajRacunStruja,
  dodajRacunVoda,
  dodajRacunSmece,
  dodajRacunIptv,
  dodajRacunKablovska,
  dodajRacunMobitel,
  izbrisiRacun,
} = racunSlice.actions
export default racunSlice.reducer
