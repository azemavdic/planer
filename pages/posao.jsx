import Head from 'next/head'
import { useEffect, useState } from 'react'
import Loading from '../components/layout/Loading'
import FormaPosao from '../components/posao/FormaPosao'
import PosaoList from '../components/posao/PosaoList'
import { useGetAllPosaoQuery } from '../redux/apiQuery'
const Posao = () => {
  let rb = 1
  const [posaoState, setPosaoState] = useState(null)
  const [filterActive, setfilterActive] = useState(false)

  const { data, isError, isLoading } = useGetAllPosaoQuery()

  useEffect(() => {
    setPosaoState(data?.posao)
  }, [data])

  const { posaoZavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoZavrsen: data?.posao.filter((posao) => posao?.zavrsen),
    }),
  })
  const { posaoNezavrsen } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoNezavrsen: data?.posao.filter((posao) => posao?.zavrsen === false),
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
    setPosaoState(data?.posao)
    setfilterActive(false)
  }

  return (
    <>
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
      <div className='grid grid-cols-12 gap-4 mt-5'>
        <div className='col-span-12 mx-auto lg:col-span-4'>
          <h3 className='text-xl font-bold'>Dodaj aktivnost</h3>
          <FormaPosao />
        </div>
        <div className='col-span-12 lg:col-span-8'>
          <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
          {data?.posao.length === 0 ? (
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
                <PosaoList
                  key={posao._id}
                  id={posao._id}
                  data={posao}
                  rb={rb++}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Posao
