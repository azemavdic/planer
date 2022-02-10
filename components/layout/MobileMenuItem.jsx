import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGetAllMamaAktivnostiQuery } from '../../redux/api/mamaApi'
import { useGetAllKucaAktivnostiQuery } from '../../redux/api/kucaApi'
import { useGetAllPosaoQuery } from '../../redux/api/posaoApi'

const MobileMenuItem = ({ Ikona, path }) => {
  const router = useRouter()
  let className = 'text-white cursor-pointer'
  if (router.pathname === path) {
    className += ' text-slate-900'
  }

  const { posaoNezavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoNezavrsen: data?.user?.posao.filter(
        (posao) => posao?.zavrsen === false
      ),
    }),
  })

  const { mamaNezavrsen } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaNezavrsen: data?.user?.mama.filter((mama) => mama?.zavrsen === false),
    }),
  })
  const { kucaNezavrsen } = useGetAllKucaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      kucaNezavrsen: data?.user?.kuca.filter((kuca) => kuca?.zavrsen === false),
    }),
  })

  return (
    <div className={className}>
      <Link href={path} passHref>
        <a className='indicator'>
          <Ikona size={35} />
          {path === '/posao' && (
            <div className='indicator-item badge badge-warning'>
              {posaoNezavrsen?.length}
            </div>
          )}
          {path === '/mama' && (
            <div className='indicator-item badge badge-warning'>
              {mamaNezavrsen?.length}
            </div>
          )}
          {path === '/kuca' && (
            <div className='indicator-item badge badge-warning'>
              {kucaNezavrsen?.length}
            </div>
          )}
        </a>
      </Link>
    </div>
  )
}

export default MobileMenuItem
