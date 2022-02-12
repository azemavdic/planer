import Head from 'next/head'
import { useEffect, useState } from 'react'
import Loading from '../components/layout/Loading'
import AktivnostiForma from '../components/layout/aktivnosti/AktivnostiForma'
import AktivnostiLista from '../components/layout/aktivnosti/AktivnostiLista'
import { useGetAllPosaoQuery } from '../redux/api/posaoApi'
import DodajButton from '../components/layout/DodajButton'
import Modal from '../components/layout/Modal'
import Layout from '../components/layout/Layout'
import { getSession } from 'next-auth/react'
import dbConnect from '../lib/mongodb'
import User from '../models/korisnici/User'
import { useSelector } from 'react-redux'
const { motion } = require('framer-motion')

const Posao = ({ user }) => {
  const [posaoState, setPosaoState] = useState(null)
  const [filterActive, setfilterActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState({})

  const { data, isLoading } = useGetAllPosaoQuery()

  const posaoData = useSelector((state) => state.pretraga.pretraga)
  const text = useSelector((state) => state.pretraga.text)

  useEffect(() => {
    if (!text || posaoData.length === 0) {
      setPosaoState(data?.user?.posao)
    } else {
      setPosaoState(posaoData)
    }
  }, [data, posaoData, text])

  const { posaoZavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoZavrsen: data?.user?.posao.filter((posao) => posao?.zavrsen),
    }),
  })
  const { posaoNezavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoNezavrsen: data?.user?.posao.filter(
        (posao) => posao?.zavrsen === false
      ),
    }),
  })

  const styleBadge = 'p-4 border-none cursor-pointer badge shadow-lg'
  const styleBadgeZavrsen = `${styleBadge} bg-green-700 shadow-green-700/40`
  const styleBadgeNezavrsen = `${styleBadge} bg-red-600 shadow-red-600/40`

  const filterNezavrseni = () => {
    setPosaoState(posaoNezavrsen)
    setfilterActive(true)
  }
  const filterZavrseni = () => {
    setPosaoState(posaoZavrsen)
    setfilterActive(true)
  }

  const ocistiFilter = () => {
    setPosaoState(data?.user?.posao)
    setfilterActive(false)
  }

  return (
    <Layout>
      <div className='relative'>
        <Head>
          <title>Planer - Posao</title>
        </Head>
        <div className='flex items-center justify-center mt-5 space-x-4'>
          <p className={styleBadgeNezavrsen} onClick={filterNezavrseni}>
            Nezavršene: <span className='ml-2'>{posaoNezavrsen?.length}</span>
          </p>
          <p className={styleBadgeZavrsen} onClick={filterZavrseni}>
            Završene: <span className='ml-2'>{posaoZavrsen?.length}</span>
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
            {data?.user?.posao.length === 0 ? (
              <div className='flex items-center justify-center h-[25rem]'>
                <p>Nema aktivnosti za prikazati.</p>
              </div>
            ) : isLoading ? (
              <div className='flex items-center justify-center h-[25rem]'>
                <Loading />
              </div>
            ) : (
              <div className='p-4 w-full overflow-y-visible overflow-x-auto bg-white shadow-lg h-[25rem] mt-4 rounded-lg'>
                {posaoState?.map((posao) => (
                  <motion.div
                    key={posao._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <AktivnostiLista
                      key={posao._id}
                      id={posao._id}
                      data={posao}
                      referenca='posao'
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
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
        <Modal setIsEditing={setIsEditing}>
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ x: 0, y: 0 }}
            className='flex items-center justify-center'
          >
            <AktivnostiForma
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editedItem={editedItem}
              setEditedItem={setEditedItem}
              user={user}
              referenca='posao'
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

export default Posao

Posao.auth = true
