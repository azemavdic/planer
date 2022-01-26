import { useRouter } from 'next/router'

const Kablovska = () => {
  const router = useRouter()
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <p>Kablovska</p>
    </div>
  )
}

export default Kablovska
