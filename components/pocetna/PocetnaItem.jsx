import Link from 'next/link'
import {
  useGetAllMamaAktivnostiQuery,
  useGetAllPosaoQuery,
} from '../../redux/apiQuery'
import Loading from '../layout/Loading'

const PocetnaItem = ({ naziv, path }) => {
  const { posaoNezavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoNezavrsen: data?.posao.filter((posao) => posao?.zavrsen === false),
    }),
  })
  const { mamaNezavrsen, mamaLoading } = useGetAllMamaAktivnostiQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading }) => ({
        mamaNezavrsen: data?.mama.filter((mama) => mama?.zavrsen === false),
        mamaLoading: isLoading,
      }),
    }
  )
  let nezavrseni = 0
  switch (naziv) {
    case 'posao':
      nezavrseni = posaoNezavrsen?.length
      break
    case 'mama':
      nezavrseni = mamaNezavrsen?.length
      break
    default:
      break
  }
  return (
    <section className='flex items-center justify-between mb-4 md:justify-center md:space-x-10 lg:justify-center lg:space-x-4'>
      <div className='flex items-center space-x-2'>
        <p>Nezavršene aktivnosti {naziv}</p>
        <span className='p-4 bg-red-600 border-none badge'>
          {mamaLoading ? <Loading item='badge' /> : nezavrseni}
        </span>
      </div>
      <Link href={path} passHref>
        <a className='btn'>{naziv}</a>
      </Link>
    </section>
  )
}

export default PocetnaItem
