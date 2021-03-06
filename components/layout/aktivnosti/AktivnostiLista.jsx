import { TiDocumentDelete, TiDocumentText } from 'react-icons/ti'
import {
  useGetAllPosaoQuery,
  useIzbrisiPosaoMutation,
  useToggleZavrsenMutation,
} from '../../../redux/api/posaoApi'
import {
  useGetAllMamaAktivnostiQuery,
  useIzbrisiMamaAktivnostMutation,
  useToggleZavrsenMamaMutation,
} from '../../../redux/api/mamaApi'
import {
  useGetAllKucaAktivnostiQuery,
  useIzbrisiKucaAktivnostMutation,
  useToggleZavrsenKucaMutation,
} from '../../../redux/api/kucaApi'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux'
import { showModal } from '../../../redux/modalSlice'
import { isEditing } from '../../../redux/editingItemSlice'
import Loading from '../Loading'

const AktivnostiLista = ({ data, id, referenca, setEditedItem }) => {
  const dispatch = useDispatch()

  const datum = dayjs(data?.createdAt).format('DD.MM.YYYY')
  const vrijeme = dayjs(data?.createdAt).format('HH:mm')

  let zavrsenClassName =
    'flex border-l-8 flex-col lg:flex-row items-center bg-white lg:gap-10 rounded-lg relative mb-4 cursor-pointer select-none hover:scale-[0.98] duration-300'
  if (data?.zavrsen) {
    zavrsenClassName += ' border-green-400 shadow-lg shadow-green-400/40'
  } else {
    zavrsenClassName += ' border-red-400 shadow-lg shadow-red-400/40'
  }
  const { refetch } = useGetAllPosaoQuery()

  const { posaoToggle } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoToggle: data?.user?.posao.find((posao) => posao._id === id),
    }),
  })
  const { mamaToggle } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaToggle: data?.user?.mama.find((mama) => mama._id === id),
    }),
  })
  const { kucaToggle } = useGetAllKucaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      kucaToggle: data?.user?.kuca.find((kuca) => kuca._id === id),
    }),
  })
  const [izbrisiPosao] = useIzbrisiPosaoMutation()
  const [izmijeniZavrsen, { isLoading: isLoadingPosaoToggle }] =
    useToggleZavrsenMutation({
      fixedCacheKey: 'shared-update-post',
    })
  const [izbrisiMamaAktivnost] = useIzbrisiMamaAktivnostMutation()
  const [izmijeniZavrsenMama] = useToggleZavrsenMamaMutation({
    fixedCacheKey: 'shared-update-post',
  })
  const [izbrisiKucaAktivnost] = useIzbrisiKucaAktivnostMutation()
  const [izmijeniZavrsenKuca] = useToggleZavrsenKucaMutation({
    fixedCacheKey: 'shared-update-post',
  })

  const toggleZavrsen = async () => {
    if (referenca === 'mama') {
      await izmijeniZavrsenMama({ id, zavrsen: !mamaToggle?.zavrsen })
    } else if (referenca === 'posao') {
      await izmijeniZavrsen({ id, zavrsen: !posaoToggle?.zavrsen })
    } else {
      await izmijeniZavrsenKuca({ id, zavrsen: !kucaToggle?.zavrsen })
    }
  }

  const handleDelete = async (id) => {
    const MySwal = withReactContent(Swal)
    const confirm = await MySwal.fire({
      title: 'Jeste li sigurni?',
      text: '??elite obrisati aktivnost?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Da',
      denyButtonText: 'Ne',
      customClass: { htmlContainer: 'grid-row:1' },
    })
    if (confirm.isConfirmed) {
      Swal.fire('Aktivnost izbrisana!', '', 'success')
      if (referenca === 'mama') {
        izbrisiMamaAktivnost({ id }).unwrap()
      } else if (referenca === 'posao') {
        izbrisiPosao({ id }).unwrap()
      } else {
        izbrisiKucaAktivnost({ id }).unwrap()
      }
      refetch()
    } else {
      Swal.fire('Aktivnost nije izbrisana', '', 'info')
    }
  }

  const handleEditClick = () => {
    dispatch(showModal(true))
    dispatch(isEditing(true))
    setEditedItem(data)
  }

  return (
    <>
      <div className={zavrsenClassName} onDoubleClick={toggleZavrsen}>
        <div className='w-full p-2 border-b-2 lg:border-r-2 lg:border-b-0 lg:w-max '>
          <p className='font-bold text-center lg:py-5'>{data?.naziv}</p>
          <div className='flex items-center justify-between lg:block'>
            <time className='block -mb-2 text-sm'>{datum}</time>
            <time className='text-sm italic '>{vrijeme}h</time>
          </div>
        </div>
        {isLoadingPosaoToggle && <Loading item='badge' />}
        <p className='p-2'>{data?.opis}</p>
        <TiDocumentDelete
          className='absolute top-0 text-red-500 transition-all cursor-pointer right-2 active:scale-90'
          size={25}
          onClick={() => handleDelete(id)}
        />
        <TiDocumentText
          className='absolute top-0 transition-all cursor-pointer text-slate-500 right-8 active:scale-90'
          size={25}
          onClick={handleEditClick}
        />
      </div>
    </>
  )
}

export default AktivnostiLista
