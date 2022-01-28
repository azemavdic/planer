import Head from 'next/head'
import Card from '../../components/layout/racun/Card'
import { racuni } from '../../data/racuni'

const Racuni = () => {
  return (
    <div className=''>
      <Head>
        <title>Planer - Računi</title>
      </Head>
      <h3 className='text-xl font-bold'>Pregled računa</h3>
      <div className='flex flex-wrap w-full gap-8 mt-10 mb-14'>
        {racuni.map((racun) => (
          <Card racun={racun} key={racun.naziv} refs={racun.naziv} />
        ))}
      </div>
    </div>
  )
}

export default Racuni
