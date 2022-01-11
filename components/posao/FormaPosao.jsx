import { useState } from 'react'
import { useFocus } from '../../hooks/useFocus'
import { useAddPosaoMutation } from '../../redux/apiQuery'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import { buttonList } from 'suneditor-react'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

const FormaRacun = () => {
  const [formData, setFormData] = useState({
    naziv: '',
    // opis: '',
    zavrsen: false,
  })
  const [opis, setOpis] = useState('')

  const [inputRef, setInputFocus] = useFocus()

  const [greska, setGreska] = useState(null)

  const [dodajPosao, isLoading] = useAddPosaoMutation()

  const handleChange = (e) => {
    const name = e.target.name
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.naziv === '' || opis === '') {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    setFormData({ naziv: '', zavrsen: false })
    // dodajPosao(formData, dispatch);
    await dodajPosao({ ...formData, opis }).unwrap()
    setInputFocus()
  }

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
          <SunEditor
            value={opis}
            onChange={(content) => setOpis(content)}
            type='text'
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none h-28 hover:border-gray-500 focus:outline-none focus:shadow-outline'
            id='posao'
            name='opis'
            setOptions={{ buttonList: buttonList.basic }}
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
            value={formData.zavrsen}
            onChange={handleChange}
            name='zavrsen'
            id='posao'
            type='checkbox'
            className='w-5 h-5'
          />
        </div>
        <button
          disabled={!isLoading}
          className='btn btn-wide disabled:bg-gray-200'
        >
          Potvrdi
        </button>
        {greska && <p className='mt-2 text-center text-red-500'>{greska}</p>}
      </form>
    </div>
  )
}

export default FormaRacun
