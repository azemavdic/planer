import Link from 'next/link'

const Registracija = () => {
  return (
    <div className='h-screen font-sans login bg-cover'>
      <div className='container mx-auto h-full flex flex-1 justify-center items-center'>
        <div className='w-full max-w-lg'>
          <div className='leading-loose'>
            <form className='max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl'>
              <p className='text-white font-medium text-center text-lg'>
                REGISTRACIJA
              </p>
              <div className=''>
                <label className='block text-sm text-white' htmlFor='email'>
                  Ime
                </label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Upišite ime'
                  aria-label='ime'
                  required
                />
              </div>
              <div className='mt-2'>
                <label className='block text-sm text-white' htmlFor='email'>
                  E-mail
                </label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='email'
                  id='email'
                  placeholder='Upišite email'
                  aria-label='email'
                  required
                />
              </div>
              <div className='mt-2'>
                <label className='block  text-sm text-white'>Šifra</label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='password'
                  id='password'
                  placeholder='Upišite šifru'
                  arial-label='password'
                  required
                />
              </div>

              <div className='mt-4 items-center flex justify-between'>
                <button
                  className='px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded'
                  type='submit'
                >
                  Registracija
                </button>
                <Link href='/auth/prijava'>
                  <a className='inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400'>
                    Prijavite se ?
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registracija
