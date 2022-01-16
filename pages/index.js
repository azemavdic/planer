import Head from 'next/head'
import PocetnaItem from '../components/pocetna/PocetnaItem'
import { pocetnaData } from '../data/pocetna'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Planer Asko 2022</title>
      </Head>
      <h2 className='text-xl font-bold text-center p-4'>Dobrodošli u Planer</h2>
      <main>
        {pocetnaData.map((data) => (
          <PocetnaItem key={data.naziv} naziv={data.naziv} path={data.path} />
        ))}
      </main>
    </div>
  )
}
