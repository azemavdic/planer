import { AiFillPlusCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { showModal } from '../../redux/modalSlice'

const DodajButton = () => {
  const dispatch = useDispatch()
  return (
    <div className='fixed bottom-16 lg:bottom-5 right-4 shadow-lg rounded-full shadow-slate-900/50'>
      <AiFillPlusCircle
        size={60}
        className='cursor-pointer active:scale-95'
        onClick={() => dispatch(showModal(true))}
      />
    </div>
  )
}

export default DodajButton
