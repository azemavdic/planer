import { data } from 'autoprefixer';
import { useState } from 'react';
import { useFocus } from '../../hooks/useFocus';
import {
    useAddMamaAktivnostMutation,
    useAddPosaoMutation,
    useGetAllPosaoQuery,
} from '../../redux/apiQuery';

const FormaRacun = ({ referenca, isEditing, setIsEditing, editedItem }) => {
    const [formData, setFormData] = useState({
        naziv: '',
        opis: '',
        zavrsen: false,
    });

    const [inputRef, setInputFocus] = useFocus();

    const [greska, setGreska] = useState(null);

    const [dodajPosao, isLoading] = useAddPosaoMutation();
    const [dodajMamaAktivnost, isLoadingMama] = useAddMamaAktivnostMutation();

    const handleChange = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { posaoState } = useGetAllPosaoQuery(undefined, {
        selectFromResult: ({ data }) => ({
            posaoState: data?.posao.find(
                (posao) => posao._id === editedItem._id
            ),
        }),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.naziv === '' || formData.opis === '') {
            setGreska('Popunite sva polja');
            setTimeout(() => {
                setGreska(false);
            }, 3000);
            return;
        }
        setFormData({ naziv: '', opis: '', zavrsen: false });
        if (referenca === 'mama') {
            await dodajMamaAktivnost(formData).unwrap();
        } else {
            await dodajPosao(formData).unwrap();
        }
        setInputFocus();
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
                        value={isEditing ? editedItem?.naziv : formData.naziv}
                        onChange={handleChange}
                        name='naziv'
                        id='posao'
                        type='text'
                        ref={inputRef}
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
                        value={isEditing ? editedItem?.opis : formData.opis}
                        onChange={handleChange}
                        type='text'
                        className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none h-28 hover:border-gray-500 focus:outline-none focus:shadow-outline'
                        id='posao'
                        name='opis'
                    />
                </div>
                <div className='flex items-center justify-between mb-6'>
                    <label
                        htmlFor='zavrsen'
                        className='block mb-2 text-sm font-bold text-gray-700'
                    >
                        Završen
                    </label>
                    <input
                        value={
                            isEditing ? editedItem?.zavrsen : formData.zavrsen
                        }
                        onChange={handleChange}
                        name='zavrsen'
                        id='posao'
                        type='checkbox'
                        className='w-5 h-5'
                    />
                </div>
                <button
                    disabled={
                        referenca === 'mama' ? !isLoadingMama : !isLoading
                    }
                    className='btn btn-wide disabled:bg-gray-200 disabled:loading'
                >
                    {isEditing ? 'Ispravi' : 'Potvrdi'}
                </button>
                {greska && (
                    <p className='mt-2 text-center text-red-500'>{greska}</p>
                )}
            </form>
        </div>
    );
};

export default FormaRacun;
