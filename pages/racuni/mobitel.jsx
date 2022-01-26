import { useRouter } from 'next/router'

const Mobitel = () => {
  const router = useRouter()
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <p>Mobitel</p>
    </div>
  )
}

export default Mobitel
