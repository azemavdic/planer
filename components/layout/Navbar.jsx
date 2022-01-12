import { useRouter } from 'next/router'
import NavbarIcon from './NavbarIcon'
import { BsFillHouseFill } from 'react-icons/bs'
import { RiParentFill, RiBillFill } from 'react-icons/ri'
import { MdWork } from 'react-icons/md'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className='mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box'>
      <div className='flex-1 hidden px-2 mx-2 lg:flex'>
        <span className='text-lg font-bold'>
          {router.pathname === '/mama' ? (
            <NavbarIcon naziv='Mama' Ikona={RiParentFill} />
          ) : router.pathname === '/posao' ? (
            <NavbarIcon naziv='Posao' Ikona={MdWork} />
          ) : router.pathname === '/kuca' ? (
            <NavbarIcon naziv='Kuća' Ikona={BsFillHouseFill} />
          ) : router.pathname === '/racuni' ? (
            <NavbarIcon naziv='Računi' Ikona={RiBillFill} />
          ) : (
            'Početna'
          )}
        </span>
      </div>
      <div className='justify-center flex-grow w-full'>
        <div className='form-control lg:w-4/5'>
          <input
            type='text'
            placeholder='Pretraga'
            className='input input-ghost'
          />
        </div>
      </div>
      <div className='flex-none'>
        <div className='avatar'>
          <div className='w-10 h-10 m-1 rounded-full'>
            <img src='https://i.pravatar.cc/500' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
