import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { dodajRacun } from '../redux/racunSlice'
import { v4 as uuidv4 } from 'uuid'

const FormaRacun = () => {
  const [formData, setFormData] = useState({
    trosak: '',
    iznos: '',
    mjesec: '',
  })

  const [greska, setGreska] = useState(null)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      formData.trosak === '' ||
      formData.iznos === '' ||
      formData.mjesec === ''
    ) {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(null)
      }, 3000)
      return
    }

    if (formData.iznos < 0) {
      setGreska('Iznos ne može biti manji od 0 !')
      setTimeout(() => {
        setGreska(null)
      }, 3000)
      return
    }

    dispatch(dodajRacun({ ...formData, _id: uuidv4() }))
  }
  return (
    <div className='w-full max-w-xs'>
      <form
        onSubmit={handleSubmit}
        className='px-8 pt-6 pb-8 mt-4 mb-4 bg-white rounded-lg shadow-md'
      >
        <div className='mb-4'>
          <label
            htmlFor='trosak'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Vrsta troška
          </label>
          <select
            value={formData.trosak}
            onChange={handleChange}
            name='trosak'
            id='troskovi'
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
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
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Iznos
          </label>
          <input
            value={formData.iznos}
            onChange={handleChange}
            type='number'
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
            id='troskovi'
            name='iznos'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='mjesec'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Mjesec
          </label>
          <select
            value={formData.mjesec}
            onChange={handleChange}
            name='mjesec'
            id='troskovi'
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
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
        {greska && <p className='mt-2 text-center text-red-500'>{greska}</p>}
      </form>
    </div>
  )
}

export default FormaRacun
