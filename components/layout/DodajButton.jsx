import { AiFillPlusCircle } from 'react-icons/ai'

const DodajButton = ({ setShowModal }) => {
  return (
    <div className='fixed bottom-16 lg:bottom-5 right-4 shadow-lg rounded-full shadow-slate-900/50'>
      <AiFillPlusCircle
        size={60}
        className='cursor-pointer active:scale-95'
        onClick={() => setShowModal(true)}
      />
    </div>
  )
}

export default DodajButton
