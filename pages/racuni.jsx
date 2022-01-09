import FormaRacun from '../components/FormaRacun'
import RacunCard from '../components/RacunCard'
import TabelaRačuna from '../components/TabelaRačuna'
import { useSelector } from 'react-redux'

const Racuni = () => {
  return (
    <div className='grid grid-cols-12 gap-4 mt-20 '>
      <div className='col-span-12 mx-auto lg:col-span-4'>
        <h3 className='text-xl font-bold'>Dodaj račun</h3>
        <FormaRacun />
      </div>
      <div className='col-span-12 lg:col-span-8'>
        <h3 className='text-xl font-bold'>Pregled računa</h3>
        <TabelaRačuna />
        {/* <div className='grid grid-cols-12'> */}
        {/* {racuni &&
            racuni.map((racun, i) => <RacunCard key={i} racun={racun} />)} */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Racuni
