import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useFocus } from '../../../hooks/useFocus'
import {
  useDodajStrujaMutation,
  useUpdateStrujaMutation,
} from '../../../redux/api/strujaApi'
import {
  useDodajVodaMutation,
  useUpdateVodaMutation,
} from '../../../redux/api/vodaApi'
import {
  useDodajSmeceMutation,
  useUpdateSmeceMutation,
} from '../../../redux/api/smeceApi'
import {
  useDodajMobitelMutation,
  useUpdateMobitelMutation,
} from '../../../redux/api/mobitelApi'
import {
  useDodajKablovskaMutation,
  useUpdateKablovskaMutation,
} from '../../../redux/api/kablovskaApi'
import {
  useDodajIptvMutation,
  useUpdateIptvMutation,
} from '../../../redux/api/iptvApi'
import { isEditing } from '../../../redux/editingItemSlice'
import { showModal } from '../../../redux/modalSlice'

const Forma = ({ editedItem, setEditedItem, user }) => {
  const [formData, setFormData] = useState({
    iznos: '',
    mjesec: '',
    user,
  })
  const [greska, setGreska] = useState(false)

  const router = useRouter()

  const [inputRef, setInputFocus] = useFocus()
  const dispatch = useDispatch()

  const isEditingSelector = useSelector((state) => state.edit.value)

  const [dodajStruja, { isLoading: isLoadingStrujaDodaj }] =
    useDodajStrujaMutation()
  const [updateStruja, { isLoading: isLoadingStrujaEdit }] =
    useUpdateStrujaMutation({
      fixedCacheKey: 'shared-update-post',
    })
  const [dodajVoda, { isLoading: isLoadingVodaDodaj }] = useDodajVodaMutation()
  const [updateVoda, { isLoading: isLoadingVodaEdit }] = useUpdateVodaMutation({
    fixedCacheKey: 'shared-update-post',
  })
  const [dodajSmece, { isLoading: isLoadingSmeceDodaj }] =
    useDodajSmeceMutation()
  const [updateSmece, { isLoading: isLoadingSmeceEdit }] =
    useUpdateSmeceMutation({
      fixedCacheKey: 'shared-update-post',
    })
  const [dodajMobitel, { isLoading: isLoadingMobitelDodaj }] =
    useDodajMobitelMutation()
  const [updateMobitel, { isLoading: isLoadingMobitelEdit }] =
    useUpdateMobitelMutation({
      fixedCacheKey: 'shared-update-post',
    })
  const [dodajKablovska, { isLoading: isLoadingKablovskaDodaj }] =
    useDodajKablovskaMutation()
  const [updateKablovska, { isLoading: isLoadingKablovskaEdit }] =
    useUpdateKablovskaMutation({
      fixedCacheKey: 'shared-update-post',
    })
  const [dodajIptv, { isLoading: isLoadingIptvDodaj }] = useDodajIptvMutation()
  const [updateIptv, { isLoading: isLoadingIptvEdit }] = useUpdateIptvMutation({
    fixedCacheKey: 'shared-update-post',
  })

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

  const handleChangeEditItem = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEditedItem((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.iznos === null || formData.mjesec === '') {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    if (formData.iznos <= 0) {
      setGreska('Iznos mora biti ve??i od 0')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    switch (router.pathname) {
      case '/racuni/struja':
        await dodajStruja(formData)
        break
      case '/racuni/voda':
        await dodajVoda(formData)
        break
      case '/racuni/smece':
        await dodajSmece(formData)
        break
      case '/racuni/mobitel':
        await dodajMobitel(formData)
        break
      case '/racuni/kablovska':
        await dodajKablovska(formData)
        break
      case '/racuni/iptv':
        await dodajIptv(formData)
        break
      default:
        break
    }
    dispatch(showModal(false))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (editedItem.iznos === null || editedItem.mjesec === '') {
      setGreska('Popunite sva polja')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    if (editedItem.iznos <= 0) {
      setGreska('Iznos mora biti ve??i od 0')
      setTimeout(() => {
        setGreska(false)
      }, 3000)
      return
    }
    const noviRacun = {
      id: editedItem._id,
      iznos: +editedItem?.iznos,
      mjesec: editedItem?.mjesec,
    }

    switch (router.pathname) {
      case '/racuni/struja':
        await updateStruja(noviRacun).unwrap()
        break
      case '/racuni/voda':
        await updateVoda(noviRacun).unwrap()
        break
      case '/racuni/smece':
        await updateSmece(noviRacun).unwrap()
        break
      case '/racuni/mobitel':
        await updateMobitel(noviRacun).unwrap()
        break
      case '/racuni/kablovska':
        await updateKablovska(noviRacun).unwrap()
        break
      case '/racuni/iptv':
        await updateIptv(noviRacun).unwrap()
        break
      default:
        break
    }

    dispatch(isEditing(false))
    dispatch(showModal(false))
  }

  return (
    <div className='w-full max-w-xs'>
      <form
        className='px-8 pt-6 pb-8 mt-4 mb-4 bg-white rounded-lg shadow-lg'
        onSubmit={isEditingSelector ? handleEditSubmit : handleSubmit}
      >
        <div className='mb-4'>
          <label
            htmlFor='iznos'
            className='block mb-2 text-sm font-bold text-gray-700'
          >
            Iznos ra??una
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
          <select
            value={isEditingSelector ? editedItem?.mjesec : formData.mjesec}
            onChange={isEditingSelector ? handleChangeEditItem : handleChange}
            name='mjesec'
            id='struja'
            type='text'
            className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
          >
            <option value='' disabled>
              Odaberi mjesec...
            </option>
            <option value='Januar'>Januar</option>
            <option value='Februar'>Februar</option>
            <option value='Mart'>Mart</option>
            <option value='April'>April</option>
            <option value='Maj'>Maj</option>
            <option value='Juni'>Juni</option>
            <option value='Juli'>Juli</option>
            <option value='Avgust'>Avgust</option>
            <option value='Septembar'>Septembar</option>
            <option value='Oktobar'>Oktobar</option>
            <option value='Novembar'>Novembar</option>
            <option value='Decembar'>Decembar</option>
          </select>
        </div>
        {isEditingSelector ? (
          <button
            disabled={isLoadingStrujaEdit}
            className='btn btn-wide disabled:bg-gray-200 disabled:loading'
          >
            Ispravi
          </button>
        ) : (
          <button
            disabled={isLoadingStrujaDodaj}
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
