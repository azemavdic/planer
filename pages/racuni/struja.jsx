import { useRouter } from 'next/router'
import DodajButton from '../../components/layout/DodajButton'
import Modal from '../../components/layout/Modal'
import Forma from '../../components/layout/racun/Forma'
import { useGetStrujaQuery } from '../../redux/apiQuery'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'

const Struja = () => {
  const router = useRouter()

  const { data } = useGetStrujaQuery()

  let rb = 1
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <h2 className='mb-5 text-lg font-bold'>Struja</h2>
      <div className='w-full p-2 text-white rounded bg-slate-600'>
        <table className='w-full'>
          <thead className='border-b-2'>
            <th>RB</th>
            <th>Mjesec</th>
            <th>Iznos</th>
            <th>Akcije</th>
          </thead>
          <tbody className='text-center'>
            {data?.struja.map((struja) => (
              <tr key={struja?._id} className='border-b-[1px]'>
                <td className='p-2'>{rb++}</td>
                <td>{struja?.mjesec}</td>
                <td>{struja?.iznos} KM</td>
                <td className='space-x-2'>
                  <button className='btn btn-info btn-sm'>
                    <BsFillPencilFill />
                  </button>
                  <button className='btn btn-error btn-sm'>
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DodajButton />
      <Modal>
        <Forma />
      </Modal>
    </div>
  )
}

export default Struja
