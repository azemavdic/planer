import FormaPosao from '../components/posao/FormaPosao'

const Posao = () => {
  return (
    <div className='grid grid-cols-12 gap-4 mt-20 '>
      <div className='col-span-12 mx-auto lg:col-span-4'>
        <h3 className='text-xl font-bold'>Dodaj aktivnost</h3>
        <FormaPosao />
      </div>
      <div className='col-span-12 lg:col-span-8'>
        <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
      </div>
    </div>
  )
}

export default Posao
