import FormaRacun from '../components/FormaRacun'
import TabelaRačuna from '../components/TabelaRačuna'

const Racuni = () => {
  return (
    <div className='grid grid-cols-12 gap-4 mt-20'>
      <div className='col-span-4'>
        <h3 className='text-xl font-bold'>Dodaj račun</h3>
        <FormaRacun />
      </div>
      <div className='col-span-8'>
        <h3 className='text-xl font-bold'>Pregled računa</h3>
        <TabelaRačuna />
      </div>
    </div>
  )
}

export default Racuni
