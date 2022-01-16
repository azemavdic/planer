import Link from 'next/link'
import {
  useGetAllMamaAktivnostiQuery,
  useGetAllPosaoQuery,
} from '../../redux/apiQuery'

const PocetnaItem = ({ naziv, path }) => {
  const { posaoNezavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoNezavrsen: data?.posao.filter((posao) => posao?.zavrsen === false),
    }),
  })
  const { mamaNezavrsen } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaNezavrsen: data?.mama.filter((mama) => mama?.zavrsen === false),
    }),
  })
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
    <section className='flex justify-between items-center lg:justify-center mb-4 lg:space-x-4'>
      <div className='flex space-x-2 items-center'>
        <p>Nezavršene aktivnosti {naziv}</p>
        <span className='badge bg-red-600 border-none p-4'>{nezavrseni}</span>
      </div>
      <Link href={path} passHref>
        <a className='btn'>{naziv}</a>
      </Link>
    </section>
  )
}

export default PocetnaItem
