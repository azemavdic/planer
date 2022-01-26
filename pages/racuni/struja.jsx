import { useRouter } from 'next/router'
import DodajButton from '../../components/layout/DodajButton'
import Modal from '../../components/layout/Modal'
import Forma from '../../components/layout/racun/Forma'

const Struja = () => {
  const router = useRouter()
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <h2 className='text-lg font-bold'>Struja</h2>
      <DodajButton />
      <Modal>
        <Forma />
      </Modal>
    </div>
  )
}

export default Struja
