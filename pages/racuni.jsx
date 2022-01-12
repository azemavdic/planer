import FormaRacun from '../components/racun/FormaRacun'
import TabelaRačuna from '../components/racun/TabelaRačuna'
import Head from 'next/head'

const Racuni = () => {
  return (
    <div className='grid grid-cols-12 gap-4 mt-16 '>
      <Head>
        <title>Planer - Računi</title>
      </Head>
      <div className='col-span-12 mx-auto lg:col-span-4'>
        <h3 className='text-xl font-bold'>Dodaj račun</h3>
        <FormaRacun />
      </div>
      <div className='col-span-12 lg:col-span-8'>
        <h3 className='text-xl font-bold'>Pregled računa</h3>
        <TabelaRačuna />
      </div>
    </div>
  )
}

export default Racuni
