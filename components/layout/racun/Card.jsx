import React from 'react'

const Card = ({ racun }) => {
  const { naziv, Ikona } = racun
  return (
    <div className='flex items-center justify-center w-full p-4 text-center text-white transition-all shadow-2xl cursor-pointer shadow-slate-600/60 hover:bg-slate-500 lg:w-80 bg-slate-600 card h-28'>
      <div className='flex items-center space-x-5'>
        <Ikona size={35} />
        <p className='text-xl font-bold'>{naziv}</p>
      </div>
      <div className='flex items-center justify-between w-full mt-6'>
        <p>Zadnji mjesec</p>
        <p>Mart</p>
      </div>
    </div>
  )
}

export default Card
