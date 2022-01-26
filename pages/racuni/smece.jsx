import { useRouter } from 'next/router'

const Smece = () => {
  const router = useRouter()
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <p>smece</p>
    </div>
  )
}

export default Smece
