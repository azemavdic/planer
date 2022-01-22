import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useGetAllMamaAktivnostiQuery,
  useGetAllPosaoQuery,
} from '../../redux/apiQuery'

const MobileMenuItem = ({ Ikona, path }) => {
  const router = useRouter()
  let className = 'text-white cursor-pointer'
  if (router.pathname === path) {
    className += ' text-slate-900'
  }

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

  return (
    <div className={className}>
      <Link href={path} passHref>
        <a className='indicator'>
          <Ikona size={35} />
          {path === '/posao' && (
            <div className='indicator-item badge'>{posaoNezavrsen?.length}</div>
          )}
          {path === '/mama' && (
            <div className='indicator-item badge'>{mamaNezavrsen?.length}</div>
          )}
        </a>
      </Link>
    </div>
  )
}

export default MobileMenuItem
