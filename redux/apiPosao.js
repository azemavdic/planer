import {
    dodajAktivnost,
    dodajAktivnostGreska,
    dodajAktivnostStart,
} from './posaoSlice';

export const dodajPosao = async (posao, dispatch) => {
    dispatch(dodajAktivnostStart());
    try {
        const res = await fetch('http://localhost:3000/api/posao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(posao),
        });
        const data = await res.json();
        dispatch(dodajAktivnost(data));
    } catch (error) {
        dispatch(dodajAktivnostGreska());
    }
};
