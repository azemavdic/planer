import Head from 'next/head'
import { useEffect, useState } from 'react'
import Loading from '../components/layout/Loading'
import AktivnostiForma from '../components/layout/aktivnosti/AktivnostiForma'
import AktivnostiLista from '../components/layout/aktivnosti/AktivnostiLista'
import { useGetAllKucaAktivnostiQuery } from '../redux/api/kucaApi'
import DodajButton from '../components/layout/DodajButton'
import Modal from '../components/layout/Modal'
import Layout from '../components/layout/Layout'
import dbConnect from '../lib/mongodb'
import { getSession } from 'next-auth/react'
import User from '../models/korisnici/User'
const { motion } = require('framer-motion')

const Kuca = ({ user }) => {
  const [kucaState, setkucaState] = useState(null)
  const [filterActive, setfilterActive] = useState(false)
  const [editedItem, setEditedItem] = useState({})

  const { data, isError, isLoading, refetch } = useGetAllKucaAktivnostiQuery()

  useEffect(() => {
    setkucaState(data?.user?.kuca)
  }, [data])

  const { kucaAktZavrsena } = useGetAllKucaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      kucaAktZavrsena: data?.user?.kuca.filter((kuca) => kuca?.zavrsen),
    }),
  })
  const { kucaAktNezavrsena } = useGetAllKucaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      kucaAktNezavrsena: data?.user?.kuca.filter(
        (kuca) => kuca?.zavrsen === false
      ),
    }),
  })

  const styleBadge = 'p-4 border-none cursor-pointer badge shadow-lg'
  const styleBadgeZavrsen = `${styleBadge} bg-green-700 shadow-green-700/40`
  const styleBadgeNezavrsen = `${styleBadge} bg-red-600 shadow-red-600/40`

  const filterNezavrseni = () => {
    setkucaState(kucaAktNezavrsena)
    setfilterActive(true)
  }
  const filterZavrseni = () => {
    setkucaState(kucaAktZavrsena)
    setfilterActive(true)
  }

  const ocistiFilter = () => {
    setkucaState(data?.user?.kuca)
    setfilterActive(false)
  }

  return (
    <Layout>
      <div className='relative'>
        <Head>
          <title>Planer - Kuca</title>
        </Head>
        <div className='flex items-center justify-center mt-5 space-x-4'>
          <p className={styleBadgeNezavrsen} onClick={filterNezavrseni}>
            Nezavršene:{' '}
            <span className='ml-2'>{kucaAktNezavrsena?.length}</span>
          </p>
          <p className={styleBadgeZavrsen} onClick={filterZavrseni}>
            Završene: <span className='ml-2'>{kucaAktZavrsena?.length}</span>
          </p>
          {filterActive && (
            <p
              className='p-3 text-center cursor-pointer badge'
              onClick={ocistiFilter}
            >
              Očisti
            </p>
          )}
        </div>
        <div className='flex items-center justify-center gap-4 mt-5'>
          <div className='w-full lg:w-9/12'>
            <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
            {data?.user?.kuca.length === 0 ? (
              <div className='flex items-center justify-center h-[25rem]'>
                <p>Nema aktivnosti za prikazati.</p>
              </div>
            ) : isLoading ? (
              <div className='flex items-center justify-center h-[25rem]'>
                <Loading />
              </div>
            ) : (
              <div className='p-4 w-full overflow-y-visible overflow-x-auto bg-white shadow-lg h-[25rem] mt-4 rounded-lg'>
                {kucaState?.map((kuca) => (
                  <motion.div
                    key={kuca._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <AktivnostiLista
                      key={kuca._id}
                      id={kuca._id}
                      data={kuca}
                      referenca='kuca'
                      editedItem={editedItem}
                      setEditedItem={setEditedItem}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DodajButton />
        <Modal>
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ x: 0, y: 0 }}
            className='flex items-center justify-center'
          >
            <AktivnostiForma
              editedItem={editedItem}
              setEditedItem={setEditedItem}
              referenca='kuca'
              user={user}
            />
          </motion.div>
        </Modal>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const email = session?.user?.email

  await dbConnect()
  const userData = await User.findOne({ email: email })
  const user = JSON.parse(JSON.stringify(userData))

  return {
    props: { user },
  }
}

export default Kuca

Kuca.auth = true
