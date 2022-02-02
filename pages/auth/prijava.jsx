import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loading from '../../components/layout/Loading'

const Prijava = () => {
  const emailRef = useRef()
  const sifraRef = useRef()
  const router = useRouter()
  const { data: session, status } = useSession()

  if (session) {
    router.back()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredSifra = sifraRef.current.value

    if (!enteredEmail || !enteredSifra) {
      console.log('Molimo popunite sva polja')
      return
    }
    const res = await signIn('credentials', {
      email: enteredEmail,
      sifra: enteredSifra,
      redirect: false,
    })
    router.back()
  }

  return (
    <div className='h-screen font-sans login bg-cover'>
      <Head>
        <title>Prijava</title>
      </Head>
      <div className='container mx-auto h-full flex flex-1 justify-center items-center'>
        <div className='w-full max-w-lg'>
          <div className='leading-loose'>
            <form
              onSubmit={handleSubmit}
              className='max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl'
            >
              <p className='text-white font-medium text-center text-lg'>
                PRIJAVA
              </p>
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
                  ref={emailRef}
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
                  ref={sifraRef}
                />
              </div>

              <div className='mt-4 items-center flex justify-between'>
                <button
                  className='px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded'
                  type='submit'
                >
                  Prijava
                </button>
                <Link href='/auth/registracija'>
                  <a className='inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400'>
                    Registrujte se ?
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

export default Prijava
