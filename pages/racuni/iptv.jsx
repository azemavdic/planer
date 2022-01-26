import { useRouter } from 'next/router'

const Iptv = () => {
  const router = useRouter()
  return (
    <div>
      <button className='btn btn-ghost' onClick={() => router.back()}>
        Nazad
      </button>
      <p>Iptv</p>
    </div>
  )
}

export default Iptv
