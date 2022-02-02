import Head from 'next/head'
import PocetnaItem from '../components/pocetna/PocetnaItem'
import { pocetnaData } from '../data/pocetna'
import Layout from '../components/layout/Layout'
import { getSession } from 'next-auth/react'
import Loading from '../components/layout/Loading'
import Link from 'next/link'
import { useEffect } from 'react'
import dbConnect from '../lib/mongodb'
import User from '../models/korisnici/User'

export default function Home({ user }) {
  const ime = user?.ime.charAt(0).toUpperCase() + user?.ime.slice(1)
  return (
    <Layout>
      <div>
        <Head>
          <title>Planer Asko 2022</title>
        </Head>
        <h2 className='text-xl font-bold text-center p-4'>
          Dobrodošli u Planer, {ime}.
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const email = session?.user?.email

  await dbConnect()

  const userData = await User.findOne({ email })
  const user = JSON.parse(JSON.stringify(userData))

  return {
    props: { user },
  }
}

Home.auth = true
