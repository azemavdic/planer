import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '../components/layout/Loading';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                        <ToastContainer
                            position='top-right'
                            autoClose={8000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            draggable={false}
                            pauseOnVisibilityChange
                            closeOnClick
                            pauseOnHover
                        />
                    </Auth>
                ) : (
                    <>
                        <Component {...pageProps} />
                        <ToastContainer
                            position='top-right'
                            autoClose={8000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            draggable={false}
                            pauseOnVisibilityChange
                            closeOnClick
                            pauseOnHover
                        />
                    </>
                )}
            </SessionProvider>
        </Provider>
    );
}

function Auth({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/prijava');
        },
    });
    const isUser = !!session?.user;

    if (isUser) {
        return children;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return (
        <div className='flex items-center justify-center h-screen'>
            <Loading />
        </div>
    );
}

export default MyApp;
