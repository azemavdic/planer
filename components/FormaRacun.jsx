import { useState } from 'react';

const FormaRacun = () => {
    const [formData, setFormData] = useState({
        racun: '',
        iznos: '',
        mjesec: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div className='w-full max-w-xs'>
            <form
                onSubmit={handleSubmit}
                className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-4'
            >
                <div className='mb-4'>
                    <label
                        htmlFor='racun'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Vrsta troška
                    </label>
                    <select
                        value={formData.racun}
                        onChange={handleChange}
                        name='racun'
                        id='troskovi'
                        className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                    >
                        <option value='' disabled defaultChecked>
                            Odaberi
                        </option>
                        <option value='struja'>Struja</option>
                        <option value='voda'>Voda</option>
                        <option value='smece'>Smeće</option>
                        <option value='kablovska'>Kablovska</option>
                        <option value='mobitel'>Mobitel</option>
                        <option value='iptv'>IPTV</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='iznos'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Iznos
                    </label>
                    <input
                        value={formData.iznos}
                        onChange={handleChange}
                        type='number'
                        className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                        id='troskovi'
                        name='iznos'
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='mjesec'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Mjesec
                    </label>
                    <select
                        value={formData.mjesec}
                        onChange={handleChange}
                        name='mjesec'
                        id='troskovi'
                        className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                    >
                        <option value='' disabled defaultChecked>
                            Odaberi
                        </option>
                        <option value='januar'>Januar</option>
                        <option value='februar'>Februar</option>
                        <option value='mart'>Mart</option>
                        <option value='april'>April</option>
                        <option value='maj'>Maj</option>
                        <option value='juni'>Juni</option>
                        <option value='juli'>Juli</option>
                        <option value='avgust'>Avgust</option>
                        <option value='septembar'>Septembar</option>
                        <option value='oktobar'>Oktobar</option>
                        <option value='novembar'>Novembar</option>
                        <option value='decembar'>Decembar</option>
                    </select>
                </div>
                <button className='btn btn-wide'>Potvrdi</button>
            </form>
        </div>
    );
};

export default FormaRacun;
