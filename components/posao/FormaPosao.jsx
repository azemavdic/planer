import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { dodajAktivnost } from '../../redux/posaoSlice';
import dayjs from 'dayjs';

const FormaRacun = () => {
    const datum = dayjs(new Date().toLocaleString(), 'DD.MM.YYYY');
    const [formData, setFormData] = useState({
        naziv: '',
        opis: '',
        zavrsen: false,
        datum: datum,
    });

    const dispatch = useDispatch();

    const [greska, setGreska] = useState(null);

    const handleChange = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.naziv === '' || formData.opis === '') {
            setGreska('Popunite sva polja');
            setTimeout(() => {
                setGreska(null);
            }, 3000);
            return;
        }
        setFormData({ naziv: '', opis: '' });
        dispatch(dodajAktivnost({ ...formData, _id: uuidv4() }));
    };
    return (
        <div className='w-full max-w-xs'>
            <form
                onSubmit={handleSubmit}
                className='px-8 pt-6 pb-8 mt-4 mb-4 bg-white rounded-lg shadow-md'
            >
                <div className='mb-4'>
                    <label
                        htmlFor='naziv'
                        className='block mb-2 text-sm font-bold text-gray-700'
                    >
                        Naziv aktivnosti
                    </label>
                    <input
                        value={formData.naziv}
                        onChange={handleChange}
                        name='naziv'
                        id='posao'
                        type='text'
                        className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='iznos'
                        className='block mb-2 text-sm font-bold text-gray-700'
                    >
                        Opis
                    </label>
                    <textarea
                        value={formData.opis}
                        onChange={handleChange}
                        type='text'
                        className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
                        id='posao'
                        name='opis'
                    />
                </div>
                <div className='mb-6 flex items-center justify-between'>
                    <label
                        htmlFor='zavrsen'
                        className='block mb-2 text-sm font-bold text-gray-700'
                    >
                        Završen
                    </label>
                    <input
                        value={formData.zavrsen}
                        onChange={handleChange}
                        name='zavrsen'
                        id='posao'
                        type='checkbox'
                        className='w-5 h-5'
                    />
                </div>
                <button className='btn btn-wide'>Potvrdi</button>
                {greska && (
                    <p className='mt-2 text-center text-red-500'>{greska}</p>
                )}
            </form>
        </div>
    );
};

export default FormaRacun;
