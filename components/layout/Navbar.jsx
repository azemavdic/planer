import { useRouter } from 'next/router'
import NavbarIcon from './NavbarIcon'
import { BsFillHouseFill } from 'react-icons/bs'
import { RiParentFill, RiBillFill } from 'react-icons/ri'
import { MdWork } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'

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
            <Link href='/' passHref>
              <a>
                <Image
                  width={50}
                  height={50}
                  src='https://scontent.ftzl2-1.fna.fbcdn.net/v/t1.6435-9/36969684_10214334981242897_7897955411460882432_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VXdVBOl6TwUAX-aTQyM&_nc_ht=scontent.ftzl2-1.fna&oh=00_AT9YWQef74COT2KA7gwht1yxHRIFlWsTEEqiVyGAzkAfJg&oe=6210F209'
                  alt='avatar'
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
