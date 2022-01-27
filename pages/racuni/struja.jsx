import { useRouter } from 'next/router'
import DodajButton from '../../components/layout/DodajButton'
import Modal from '../../components/layout/Modal'
import Forma from '../../components/layout/racun/Forma'
import {
  useGetStrujaQuery,
  useIzbrisiStrujaMutation,
} from '../../redux/apiQuery'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Struja = () => {
  const router = useRouter()

  const { data } = useGetStrujaQuery()
  const [izbrisiStruja] = useIzbrisiStrujaMutation()

  const handleDelete = async (id) => {
    const MySwal = withReactContent(Swal)
    const confirm = await MySwal.fire({
      title: 'Jeste li sigurni?',
      text: 'Želite obrisati račun?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Da',
      denyButtonText: 'Ne',
      customClass: { htmlContainer: 'grid-row:1' },
    })
    if (confirm.isConfirmed) {
      Swal.fire('Račun obrisan!', '', 'success')
      izbrisiStruja({ id })
    } else {
      Swal.fire('Račun nije obrisan.', '', 'info')
    }
  }

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
                  <button
                    className='btn btn-error btn-sm'
                    onClick={() => handleDelete(struja._id)}
                  >
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
