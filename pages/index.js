import Head from 'next/head'
import PocetnaItem from '../components/pocetna/PocetnaItem'
import { pocetnaData } from '../data/pocetna'
import Layout from '../components/layout/Layout'
import { getSession } from 'next-auth/react'
import Loading from '../components/layout/Loading'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    getSession().then((credentials) => {
      console.log(credentials)
    })
  }, [])
  return (
    <Layout>
      <div>
        <Head>
          <title>Planer Asko 2022</title>
        </Head>
        <h2 className='text-xl font-bold text-center p-4'>
          Dobrodošli u Planer
        </h2>
        <main>
          {pocetnaData.map((data) => (
            <PocetnaItem key={data.naziv} naziv={data.naziv} path={data.path} />
          ))}
        </main>
      </div>
    </Layout>
  )
}

Home.auth = true
