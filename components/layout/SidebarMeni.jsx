import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useGetAllMamaAktivnostiQuery,
  useGetAllPosaoQuery,
} from '../../redux/apiQuery'

const SidebarMeni = ({ meni }) => {
  const { Ikona, naziv, path } = meni
  const router = useRouter()

  let className =
    'flex items-center cursor-pointer space-x-4 hover:bg-slate-600 px-3 py-2 hover:rounded'
  if (router.pathname === path) {
    className += ' border-b-8 border-r-8 rounded-full -mr-2 border-slate-400'
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
    <li className='p-2 m-1 text-xl font-semibold'>
      <Link href={path} passHref>
        <div className={className}>
          <Ikona />
          <p className='cursor-pointer indicator'>
            {naziv}
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
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SidebarMeni
