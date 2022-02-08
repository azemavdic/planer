import { useRouter } from 'next/router'
import { useGetStrujaQuery } from '../../../redux/api/strujaApi'
import { useGetVodaQuery } from '../../../redux/api/vodaApi'
import { useGetSmeceQuery } from '../../../redux/api/smeceApi'
import { useGetMobitelQuery } from '../../../redux/api/mobitelApi'
import { useGetKablovskaQuery } from '../../../redux/api/kablovskaApi'
import { useGetIptvQuery } from '../../../redux/api/iptvApi'

const Card = ({ racun, refs }) => {
  const router = useRouter()
  const { naziv, Ikona, path } = racun

  const { strujaZadnji } = useGetStrujaQuery(undefined, {
    selectFromResult: ({ data }) => ({
      strujaZadnji:
        data?.user?.struja.length > 0
          ? data?.user?.struja[data?.user?.struja.length - 1].mjesec
          : '',
    }),
  })
  const { vodaZadnji } = useGetVodaQuery(undefined, {
    selectFromResult: ({ data }) => ({
      vodaZadnji:
        data?.user?.voda.length > 0
          ? data?.user?.voda[data?.user?.voda.length - 1].mjesec
          : '',
    }),
  })
  const { smeceZadnji } = useGetSmeceQuery(undefined, {
    selectFromResult: ({ data }) => ({
      smeceZadnji:
        data?.user?.smece.length > 0
          ? data?.user?.smece[data?.user?.smece.length - 1].mjesec
          : '',
    }),
  })
  const { mobitelZadnji } = useGetMobitelQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mobitelZadnji:
        data?.user?.mobitel.length > 0
          ? data?.user?.mobitel[data?.user?.mobitel.length - 1].mjesec
          : '',
    }),
  })
  const { kablovskaZadnji } = useGetKablovskaQuery(undefined, {
    selectFromResult: ({ data }) => ({
      kablovskaZadnji:
        data?.user?.kablovska.length > 0
          ? data?.user?.kablovska[data?.user?.kablovska.length - 1].mjesec
          : '',
    }),
  })
  const { iptvZadnji } = useGetIptvQuery(undefined, {
    selectFromResult: ({ data }) => ({
      iptvZadnji:
        data?.user?.iptv.length > 0
          ? data?.user?.iptv[data?.user?.iptv.length - 1].mjesec
          : '',
    }),
  })

  return (
    <div
      onClick={() => router.push(path)}
      className='flex items-center justify-center w-full p-4 text-center text-white transition-all shadow-2xl cursor-pointer shadow-slate-600/60 hover:bg-slate-500 lg:w-80 bg-slate-600 card h-28'
    >
      <div className='flex items-center space-x-5'>
        <Ikona size={35} />
        <p className='text-xl font-bold'>{naziv}</p>
      </div>
      <div className='flex items-center justify-between w-full mt-6'>
        <i>Zadnji mjesec</i>
        {refs === 'Struja' && <i>{strujaZadnji}</i>}
        {refs === 'Voda' && <i>{vodaZadnji}</i>}
        {refs === 'Smece' && <i>{smeceZadnji}</i>}
        {refs === 'Mobitel' && <i>{mobitelZadnji}</i>}
        {refs === 'Kablovska' && <i>{kablovskaZadnji}</i>}
        {refs === 'IPTV' && <i>{iptvZadnji}</i>}
      </div>
    </div>
  )
}

export default Card
