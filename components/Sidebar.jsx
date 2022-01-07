import { BsFillHouseFill } from 'react-icons/bs'
import { RiParentFill } from 'react-icons/ri'
import { MdWork } from 'react-icons/md'
import SidebarMeni from './SidebarMeni'
import Link from 'next/link'

const sidebarMeni = [
  {
    naziv: 'Kuća',
    Ikona: BsFillHouseFill,
    path: '/kuca',
  },
  {
    naziv: 'Mama',
    Ikona: RiParentFill,
    path: '/mama',
  },
  {
    naziv: 'Posao',
    Ikona: MdWork,
    path: '/posao',
  },
]

const Sidebar = () => {
  return (
    <div className='h-screen'>
      <Link href='/' passHref>
        <h1 className='text-3xl font-bold p-6 cursor-pointer'>Planer</h1>
      </Link>
      <ul>
        {sidebarMeni.map((meni) => (
          <SidebarMeni key={meni.naziv} meni={meni} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
