import { useDispatch } from 'react-redux'
import { izbrisiRacun } from '../../redux/racunSlice'
import { TiDocumentDelete } from 'react-icons/ti'

const RacunCard = ({ racun }) => {
  const { trosak, iznos, mjesec, _id } = racun

  const dispatch = useDispatch()

  const handleDelete = (id) => {
    if (window.confirm('Jeste li sigurni da želite obrisati?')) {
      dispatch(izbrisiRacun(id))
    }
  }

  if (trosak === '') return null
  return (
    <div
      onClick={() => handleDelete(_id)}
      className='relative col-span-6 p-3 m-3 bg-white shadow-lg rounded-3xl'
    >
      <h3 className='text-lg font-semibold text-center '>
        {trosak.toUpperCase()}
      </h3>
      <div className='flex flex-col items-center justify-around lg:flex-row'>
        <p>{mjesec.toUpperCase()}</p>
        <span>{iznos} KM</span>
      </div>
      <TiDocumentDelete
        className='absolute font-bold text-red-500 cursor-pointer top-2 right-3'
        size={25}
      />
    </div>
  )
}

export default RacunCard
