import Head from 'next/head'
import { useEffect, useState } from 'react'
import Loading from '../components/layout/Loading'
import AktivnostiForma from '../components/layout/aktivnosti/AktivnostiForma'
import AktivnostiLista from '../components/layout/aktivnosti/AktivnostiLista'
import { useGetAllMamaAktivnostiQuery } from '../redux/apiQuery'
const Mama = () => {
  const [mamaState, setmamaState] = useState(null)
  const [filterActive, setfilterActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState({})

  const { data, isError, isLoading } = useGetAllMamaAktivnostiQuery()

  useEffect(() => {
    setmamaState(data?.mama)
  }, [data])

  const { mamaAktZavrsena } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaAktZavrsena: data?.mama.filter((mama) => mama?.zavrsen),
    }),
  })
  const { mamaAktNezavrsena } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaAktNezavrsena: data?.mama.filter((mama) => mama?.zavrsen === false),
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
    setmamaState(data?.mama)
    setfilterActive(false)
  }

  return (
    <>
      <Head>
        <title>Planer - Mama</title>
      </Head>
      <div className='flex items-center justify-center mt-5 space-x-4'>
        <p className={styleBadgeNezavrsen} onClick={filterNezavrseni}>
          Nezavršene: <span className='ml-2'>{mamaAktNezavrsena?.length}</span>
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
      <div className='grid grid-cols-12 gap-4 mt-5'>
        <div className='col-span-12 mx-auto lg:col-span-4'>
          <h3 className='text-xl font-bold'>Dodaj aktivnost</h3>
          <AktivnostiForma
            referenca='mama'
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editedItem={editedItem}
            setEditedItem={setEditedItem}
          />
        </div>
        <div className='col-span-12 lg:col-span-8'>
          <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
          {data?.mama.length === 0 ? (
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
                <AktivnostiLista
                  key={mama._id}
                  id={mama._id}
                  data={mama}
                  referenca='mama'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  editedItem={editedItem}
                  setEditedItem={setEditedItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Mama
