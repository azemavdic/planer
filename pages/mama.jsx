import Head from 'next/head'
import { useEffect, useState } from 'react'
import Loading from '../components/layout/Loading'
import AktivnostiForma from '../components/layout/aktivnosti/AktivnostiForma'
import AktivnostiLista from '../components/layout/aktivnosti/AktivnostiLista'
import { useGetAllMamaAktivnostiQuery } from '../redux/api/mamaApi'
import DodajButton from '../components/layout/DodajButton'
import Modal from '../components/layout/Modal'
import Layout from '../components/layout/Layout'
import dbConnect from '../lib/mongodb'
import { getSession } from 'next-auth/react'
import User from '../models/korisnici/User'
import { useSelector } from 'react-redux'
const { motion } = require('framer-motion')

const Mama = ({ user }) => {
  const [mamaState, setmamaState] = useState(null)
  const [filterActive, setfilterActive] = useState(false)
  const [editedItem, setEditedItem] = useState({})

  const { data, isLoading } = useGetAllMamaAktivnostiQuery()

  const mamaData = useSelector((state) => state.pretraga.pretraga)
  const text = useSelector((state) => state.pretraga.text)

  useEffect(() => {
    if (!text || mamaData.length === 0) {
      setmamaState(data?.user?.mama)
    } else {
      setmamaState(mamaData)
    }
  }, [data, mamaData, text])

  const { mamaAktZavrsena } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaAktZavrsena: data?.user?.mama.filter((mama) => mama?.zavrsen),
    }),
  })
  const { mamaAktNezavrsena } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaAktNezavrsena: data?.user?.mama.filter(
        (mama) => mama?.zavrsen === false
      ),
    }),
  })

  const styleBadge = 'p-4 border-none cursor-pointer badge shadow-lg'
  const styleBadgeZavrsen = `${styleBadge} bg-green-700 shadow-green-700/40`
  const styleBadgeNezavrsen = `${styleBadge} bg-red-600 shadow-red-600/40`

  const filterNezavrseni = () => {
    setmamaState(mamaAktNezavrsena)
    setfilterActive(true)
  }
  const filterZavrseni = () => {
    setmamaState(mamaAktZavrsena)
    setfilterActive(true)
  }

  const ocistiFilter = () => {
    setmamaState(data?.user?.mama)
    setfilterActive(false)
  }

  return (
    <Layout>
      <div className='relative'>
        <Head>
          <title>Planer - Mama</title>
        </Head>
        <div className='flex items-center justify-center mt-5 space-x-4'>
          <p className={styleBadgeNezavrsen} onClick={filterNezavrseni}>
            Nezavršene:{' '}
            <span className='ml-2'>{mamaAktNezavrsena?.length}</span>
          </p>
          <p className={styleBadgeZavrsen} onClick={filterZavrseni}>
            Završene: <span className='ml-2'>{mamaAktZavrsena?.length}</span>
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
            {data?.user?.mama.length === 0 ? (
              <div className='flex items-center justify-center h-[25rem]'>
                <p>Nema aktivnosti za prikazati.</p>
              </div>
            ) : isLoading ? (
              <div className='flex items-center justify-center h-[25rem]'>
                <Loading />
              </div>
            ) : (
              <div className='p-4 w-full overflow-y-visible overflow-x-auto bg-white shadow-lg h-[25rem] mt-4 rounded-lg'>
                {mamaState?.map((mama) => (
                  <motion.div
                    key={mama._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <AktivnostiLista
                      key={mama._id}
                      id={mama._id}
                      data={mama}
                      referenca='mama'
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
              referenca='mama'
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

export default Mama

Mama.auth = true
