import { createSlice } from '@reduxjs/toolkit';

export const posaoSlice = createSlice({
    name: 'posao',
    initialState: {
        posao: [],
        pending: false,
        error: false,
    },
    reducers: {
        dodajAktivnostStart: (state) => {
            state.pending = true;
        },
        dodajAktivnostGreska: (state) => {
            state.pending = false;
            state.error = true;
        },
        dodajAktivnost: (state, action) => {
            state.pending = false;
            state.error = false;
            state.posao.unshift(action.payload);
        },
        izbrisiAktivnost: (state, action) => {
            state.pending = false;
            state.error = true;
            state.posao = state.posao.filter(
                (posao) => posao._id !== action.payload
            );
        },
        izmijeniZavrsen: (state, action) => {
            state.posao = action.payload;
        },
    },
});

export const {
    dodajAktivnostStart,
    dodajAktivnostGreska,
    dodajAktivnost,
    izbrisiAktivnost,
    izmijeniZavrsen,
} = posaoSlice.actions;

export const getAllPosao = (state) => state.posao.posao;

export default posaoSlice.reducer;
