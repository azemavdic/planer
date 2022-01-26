import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFocus } from '../../../hooks/useFocus'

const Forma = () => {
  const [formData, setFormData] = useState({
    iznos: 0,
    mjesec: '',
  })

  const [greska, setGreska] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const [inputRef, setInputFocus] = useFocus()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.iznos === null || formData.mjesec === '') {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    setInputFocus()
  }

  const isEditingSelector = useSelector((state) => state.edit.value)

  return (
    <div className='w-full max-w-xs'>
      <form
        className='px-8 pt-6 pb-8 mt-4 mb-4 bg-white rounded-lg shadow-lg'
        onSubmit={handleSubmit}
      >
        <div className='mb-4'>
          <label
            htmlFor='iznos'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Iznos računa
          </label>
          <input
            value={isEditingSelector ? editedItem?.iznos : formData.iznos}
            onChange={isEditingSelector ? handleChangeEditItem : handleChange}
            name='iznos'
            id='struja'
            type='number'
            ref={inputRef}
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='mjesec'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Mjesec
          </label>
          <input
            value={isEditingSelector ? editedItem?.mjesec : formData.mjesec}
            onChange={isEditingSelector ? handleChangeEditItem : handleChange}
            name='mjesec'
            id='struja'
            type='text'
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
          />
        </div>
        {isEditingSelector ? (
          <button
            // disabled={
            //   referenca === 'mama' ? isLoadingMamaEdit : isLoadingPosaoEdit
            // }
            className='btn btn-wide disabled:bg-gray-200 disabled:loading'
          >
            Ispravi
          </button>
        ) : (
          <button
            // disabled={referenca === 'mama' ? isLoadingMama : isLoadingPosao}
            className='btn btn-wide disabled:bg-gray-200 disabled:loading'
          >
            Potvrdi
          </button>
        )}
        {greska && <p className='mt-2 text-center text-red-500'>{greska}</p>}
      </form>
    </div>
  )
}

export default Forma
