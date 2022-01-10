import { createSlice } from '@reduxjs/toolkit';

export const posaoSlice = createSlice({
    name: 'posao',
    initialState: {
        posao: [],
    },
    reducers: {
        dodajAktivnost: (state, action) => {
            state.posao.unshift(action.payload);
        },
        izbrisiAktivnost: (state, action) => {
            state.posao = state.posao.filter(
                (posao) => posao._id !== action.payload
            );
        },
        izmijeniZavrsen: (state, action) => {
            state.posao = action.payload;
        },
    },
});

export const { dodajAktivnost, izbrisiAktivnost, izmijeniZavrsen } =
    posaoSlice.actions;
export default posaoSlice.reducer;
