import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useFocus } from '../../../hooks/useFocus'
import {
  useAddPosaoMutation,
  useUpdatePosaoMutation,
} from '../../../redux/api/posaoApi'
import {
  useAddMamaAktivnostMutation,
  useUpdateMamaAktivnostMutation,
} from '../../../redux/api/mamaApi'
import { isEditing } from '../../../redux/editingItemSlice'
import { showModal } from '../../../redux/modalSlice'

const AktivnostiForma = ({ referenca, editedItem, setEditedItem, user }) => {
  const [formData, setFormData] = useState({
    naziv: '',
    opis: '',
    zavrsen: false,
    user,
  })
  const [greska, setGreska] = useState(null)
  const isEditingSelector = useSelector((state) => state.edit.value)

  const [inputRef, setInputFocus] = useFocus()
  const dispatch = useDispatch()

  const [dodajPosao, { isLoading: isLoadingPosao }] = useAddPosaoMutation()
  const [dodajMamaAktivnost, { isLoading: isLoadingMama }] =
    useAddMamaAktivnostMutation()

  const handleChange = (e) => {
    const name = e.target.name
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleChangeEditItem = (e) => {
    const name = e.target.name
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setEditedItem((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const [updatePosao, { isLoading: isLoadingPosaoEdit }] =
    useUpdatePosaoMutation({
      fixedCacheKey: 'shared-update-post',
    })
  const [updateMamaAkt, { isLoading: isLoadingMamaEdit }] =
    useUpdateMamaAktivnostMutation({
      fixedCacheKey: 'shared-update-post',
    })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.naziv === '' || formData.opis === '') {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    setFormData({ naziv: '', opis: '', zavrsen: false })
    if (referenca === 'mama') {
      await dodajMamaAktivnost(formData).unwrap()
    } else {
      await dodajPosao(formData).unwrap()
    }
    setInputFocus()
    dispatch(showModal(false))
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (editedItem.naziv === '' || editedItem.opis === '') {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    if (referenca === 'mama') {
      await updateMamaAkt({
        id: editedItem?._id,
        naziv: editedItem?.naziv,
        opis: editedItem?.opis,
        zavrsen: editedItem?.zavrsen,
      }).unwrap()
    } else {
      await updatePosao({
        id: editedItem?._id,
        naziv: editedItem?.naziv,
        opis: editedItem?.opis,
        zavrsen: editedItem?.zavrsen,
      }).unwrap()
    }
    dispatch(isEditing(false))
    setInputFocus()
    dispatch(showModal(false))
  }

  return (
    <div className='w-full max-w-xs'>
      <form
        onSubmit={isEditingSelector ? handleEditSubmit : handleSubmit}
        className='px-8 pt-6 pb-8 mt-4 mb-4 bg-white rounded-lg shadow-lg'
      >
        <div className='mb-4'>
          <label
            htmlFor='naziv'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Naziv aktivnosti
          </label>
          <input
            value={isEditingSelector ? editedItem?.naziv : formData.naziv}
            onChange={isEditingSelector ? handleChangeEditItem : handleChange}
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
            value={isEditingSelector ? editedItem?.opis : formData.opis}
            onChange={isEditingSelector ? handleChangeEditItem : handleChange}
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
            value={isEditingSelector ? editedItem?.zavrsen : formData.zavrsen}
            onChange={isEditingSelector ? handleChangeEditItem : handleChange}
            name='zavrsen'
            id='posao'
            type='checkbox'
            className='w-5 h-5'
          />
        </div>
        {isEditingSelector ? (
          <button
            disabled={
              referenca === 'mama' ? isLoadingMamaEdit : isLoadingPosaoEdit
            }
            className='btn btn-wide disabled:bg-gray-200 disabled:loading'
          >
            Ispravi
          </button>
        ) : (
          <button
            disabled={referenca === 'mama' ? isLoadingMama : isLoadingPosao}
            className='btn btn-wide disabled:bg-gray-200 disabled:loading'
          >
            Potvrdi
          </button>
        )}

        {isEditingSelector && (
          <div className='text-center'>
            <button
              onClick={() => dispatch(isEditing(false))}
              className='btn btn-outline btn-error btn-xs'
            >
              Poništi
            </button>
          </div>
        )}
        {greska && <p className='mt-2 text-center text-red-500'>{greska}</p>}
      </form>
    </div>
  )
}

export default AktivnostiForma
