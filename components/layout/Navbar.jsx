import { useRouter } from 'next/router'
import { useState } from 'react'

const Navbar = () => {
  const [title, setTitle] = useState('')
  const router = useRouter()

  return (
    <div className='mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box'>
      <div className='flex-1 hidden px-2 mx-2 lg:flex'>
        <span className='text-lg font-bold'>
          {router.pathname === '/mama'
            ? 'Mama'
            : router.pathname === '/posao'
            ? 'Posao'
            : router.pathname === '/kuca'
            ? 'Kuća'
            : router.pathname === '/racuni'
            ? 'Računi'
            : 'Početna'}
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
