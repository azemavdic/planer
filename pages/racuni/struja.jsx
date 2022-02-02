import { useRouter } from 'next/router'
import DodajButton from '../../components/layout/DodajButton'
import Modal from '../../components/layout/Modal'
import Forma from '../../components/layout/racun/Forma'
import {
  useIzbrisiStrujaMutation,
  useGetStrujaQuery,
} from '../../redux/api/strujaApi'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { showModal } from '../../redux/modalSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { isEditing } from '../../redux/editingItemSlice'
import Loading from '../../components/layout/Loading'
import Layout from '../../components/layout/Layout'

const Struja = () => {
  const [editedItem, setEditedItem] = useState({})

  const router = useRouter()
  const dispatch = useDispatch()

  const { data, isLoading } = useGetStrujaQuery()
  const [izbrisiRacun] = useIzbrisiStrujaMutation()

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
      izbrisiRacun({ id })
    } else {
      Swal.fire('Račun nije obrisan.', '', 'info')
    }
  }

  const handleEditClick = (id) => {
    dispatch(showModal(true))
    dispatch(isEditing(true))
    setEditedItem(data?.struja.find((racun) => racun._id === id))
  }

  let rb = 1

  return (
    <Layout>
      <h2 className='mb-5 text-lg font-bold'>Struja</h2>
      <div className='w-full p-2 text-white rounded bg-slate-600'>
        <table className='w-full'>
          <thead className='border-b-2'>
            <tr>
              <th>RB</th>
              <th>Mjesec</th>
              <th>Iznos</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {isLoading && (
              <tr>
                <td>
                  <Loading item='badge' />
                </td>
              </tr>
            )}
            {data?.struja.map((racun) => (
              <tr key={racun?._id} className='border-b-[1px]'>
                <td className='p-2'>{rb++}</td>
                <td>{racun?.mjesec}</td>
                <td>{racun?.iznos} KM</td>
                <td className='space-x-2'>
                  <button
                    className='btn btn-info btn-sm'
                    onClick={() => handleEditClick(racun._id)}
                  >
                    <BsFillPencilFill />
                  </button>
                  <button
                    className='btn btn-error btn-sm'
                    onClick={() => handleDelete(racun._id)}
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
        <Forma editedItem={editedItem} setEditedItem={setEditedItem} />
      </Modal>
    </Layout>
  )
}

export default Struja
Struja.auth = true
