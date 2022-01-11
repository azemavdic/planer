import { TiDocumentDelete } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import {
  useGetAllPosaoQuery,
  useIzbrisiPosaoMutation,
  useToggleZavrsenMutation,
} from '../../redux/apiQuery'
import { izmijeniZavrsen } from '../../redux/posaoSlice'
import dayjs from 'dayjs'

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

  const handleDeletePosao = (id) => {
    izbrisiPosao({ id }).unwrap()
    refetch()
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
