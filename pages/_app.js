import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loading from '../components/layout/Loading'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </Provider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/prijava')
    },
  })
  const isUser = !!session?.user

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className='flex items-center justify-center h-screen'>
      <Loading />
    </div>
  )
}

export default MyApp
