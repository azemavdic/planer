import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetAllMamaAktivnostiQuery } from '../../redux/api/mamaApi'
import { showPretraga, textPretrage } from '../../redux/pretragaSlice'
import { useRouter } from 'next/router'
import { useGetAllPosaoQuery } from '../../redux/api/posaoApi'
import { useGetAllKucaAktivnostiQuery } from '../../redux/api/kucaApi'

const SearchComponent = () => {
  const [text, setText] = useState('')

  const router = useRouter()

  const { mamaAkt } = useGetAllMamaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      mamaAkt: data?.user?.mama.filter((akt) => {
        if (text) {
          if (
            akt?.naziv.toLowerCase().includes(text.toLowerCase()) ||
            akt?.opis.toLowerCase().includes(text.toLowerCase())
          ) {
            return akt
          }
        }
      }),
    }),
  })

  const { posaoAkt } = useGetAllPosaoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posaoAkt: data?.user?.posao.filter((akt) => {
        if (text) {
          if (
            akt?.naziv.toLowerCase().includes(text.toLowerCase()) ||
            akt?.opis.toLowerCase().includes(text.toLowerCase())
          ) {
            return akt
          }
        }
      }),
    }),
  })

  const { kucaAkt } = useGetAllKucaAktivnostiQuery(undefined, {
    selectFromResult: ({ data }) => ({
      kucaAkt: data?.user?.kuca.filter((akt) => {
        if (text) {
          if (
            akt?.naziv.toLowerCase().includes(text.toLowerCase()) ||
            akt?.opis.toLowerCase().includes(text.toLowerCase())
          ) {
            return akt
          }
        }
      }),
    }),
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setText(e.target.value)
    switch (router.pathname) {
      case '/mama':
        dispatch(showPretraga(mamaAkt))
        break
      case '/kuca':
        dispatch(showPretraga(kucaAkt))
        break
      case '/posao':
        dispatch(showPretraga(posaoAkt))
        break
      default:
        break
    }
  }

  useEffect(() => {
    console.log(router.pathname)
    dispatch(textPretrage(text))
    // if (text === '') {
    //   switch (router.pathname) {
    //     case '/mama':
    //       dispatch(showPretraga(mamaAkt))
    //       break
    //     case '/kuca':
    //       break
    //     case '/posao':
    //       break
    //     default:
    //       break
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, dispatch])

  return (
    <div className='justify-center flex-grow w-full'>
      <div className='form-control lg:w-4/5'>
        <input
          type='text'
          placeholder='Pretraga'
          className='input input-ghost'
          value={text}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SearchComponent
