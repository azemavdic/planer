import { useRouter } from 'next/router'

const Voda = () => {
  const router = useRouter()
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <p>voda</p>
    </div>
  )
}

export default Voda
