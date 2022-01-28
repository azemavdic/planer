import { useRouter } from 'next/router'
import { useGetStrujaQuery } from '../../../redux/api/strujaApi'

const Card = ({ racun, refs }) => {
  const router = useRouter()
  const { naziv, Ikona, path } = racun

  const { strujaZadnji } = useGetStrujaQuery(undefined, {
    selectFromResult: ({ data }) => ({
      strujaZadnji: data?.struja[data?.struja.length - 1].mjesec,
    }),
  })

  return (
    <div
      onClick={() => router.push(path)}
      className='flex items-center justify-center w-full p-4 text-center text-white transition-all shadow-2xl cursor-pointer shadow-slate-600/60 hover:bg-slate-500 lg:w-80 bg-slate-600 card h-28'
    >
      <div className='flex items-center space-x-5'>
        <Ikona size={35} />
        <p className='text-xl font-bold'>{naziv}</p>
      </div>
      <div className='flex items-center justify-between w-full mt-6'>
        <i>Zadnji mjesec</i>
        {refs === 'Struja' && <i>{strujaZadnji}</i>}
      </div>
    </div>
  )
}

export default Card
