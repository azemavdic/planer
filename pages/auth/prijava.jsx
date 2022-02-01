import { useRef } from 'react'

const Prijava = () => {
  const emailRef = useRef()
  const sifraRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredSifra = sifraRef.current.value
    console.log(enteredEmail)
    console.log(enteredSifra)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen bg-slate-300'>
      <div className='bg-slate-600 p-12'>
        <h2 className='text-white text-lg font-bold text-center mb-5'>
          Prijava
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='form-control'>
            <label className='input-group mb-2'>
              <span className='w-16'>Email</span>
              <input
                type='text'
                placeholder='info@site.com'
                className='input input-bordered'
                ref={emailRef}
              />
            </label>
            <label className='input-group mb-4'>
              <span className='w-16'>Šifra</span>
              <input
                type='password'
                placeholder='********'
                className='input input-bordered'
                ref={sifraRef}
              />
            </label>
          </div>
          <button className='btn'>Prijavi se</button>
        </form>
      </div>
    </div>
  )
}

export default Prijava
