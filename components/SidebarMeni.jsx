import Link from 'next/link'
import { useRouter } from 'next/router'

const SidebarMeni = ({ meni }) => {
  const { Ikona, naziv, path } = meni
  const router = useRouter()

  let className =
    'flex items-center cursor-pointer space-x-4  hover:bg-slate-600 px-3 py-2 rounded'
  if (router.pathname === path) {
    className += ' border-l-8 border-slate-400'
  }

  return (
    <li className='p-2 m-1 text-xl font-semibold'>
      <Link href={path} passHref>
        <div className={className}>
          <Ikona />
          <p className='cursor-pointer'>{naziv}</p>
        </div>
      </Link>
    </li>
  )
}

export default SidebarMeni
