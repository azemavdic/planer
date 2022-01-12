import { TiDocumentDelete } from 'react-icons/ti'
import {
  useGetAllPosaoQuery,
  useIzbrisiPosaoMutation,
  useToggleZavrsenMutation,
} from '../../redux/apiQuery'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PosaoList = ({ posao, rb, id }) => {
  const datum = dayjs(posao?.createdAt).format('DD.MM.YYYY')
  const vrijeme = dayjs(posao?.createdAt).format('HH:mm')

  let zavrsenClassName =
    'flex border-l-8 items-center gap-10 rounded-lg relative'
  if (posao?.zavrsen) {
    zavrsenClassName += ' border-green-400'
  } else {
    zavrsenClassName += ' border-red-400'
  }
  const { refetch } = useGetAllPosaoQuery()
  const { posaoToggle } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoToggle: data?.posao.find((posao) => posao._id === id),
    }),
  })
  const [izbrisiPosao] = useIzbrisiPosaoMutation()
  const [izmijeniZavrsen, result] = useToggleZavrsenMutation({
    fixedCacheKey: 'shared-update-post',
  })

  const toggleZavrsen = async () => {
    // const posao = !posaoToggle
    await izmijeniZavrsen({ id, zavrsen: !posaoToggle?.zavrsen })
  }

  const handleDeletePosao = async (id) => {
    const MySwal = withReactContent(Swal)
    const confirm = await MySwal.fire({
      title: 'Jeste li sigurni?',
      text: 'Želite obrisati aktivnost?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Da',
      denyButtonText: 'Ne',
      customClass: { htmlContainer: 'grid-row:1' },
    })
    if (confirm.isConfirmed) {
      Swal.fire('Aktivnost izbrisana!', '', 'success')
      izbrisiPosao({ id }).unwrap()
      refetch()
    } else {
      Swal.fire('Aktivnost nije izbrisana', '', 'info')
    }
  }

  return (
    <>
      <div className={zavrsenClassName} onDoubleClick={toggleZavrsen}>
        <p className='p-2'>{rb}</p>
        <div>
          <p className='py-5 font-bold'>{posao?.naziv}</p>
          <time className='block -mb-2 text-sm'>{datum}</time>
          <time className='text-sm italic '>{vrijeme}h</time>
        </div>
        <p>{posao?.opis}</p>
        <TiDocumentDelete
          className='absolute top-0 text-red-500 cursor-pointer right-2'
          size={25}
          onClick={() => handleDeletePosao(id)}
        />
      </div>
      <div className='divider'></div>
    </>
  )
}

export default PosaoList
