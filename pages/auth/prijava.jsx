import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useGetAllMamaAktivnostiQuery } from '../../redux/api/mamaApi';
import { toast } from 'react-toastify';

const Prijava = () => {
    const [loading, setLoading] = useState(false);
    const [greska, setGreska] = useState(null);
    const emailRef = useRef();
    const sifraRef = useRef();
    const router = useRouter();
    const { data: session, status } = useSession();

    const { refetch } = useGetAllMamaAktivnostiQuery();

    if (session) {
        router.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const enteredEmail = emailRef.current.value;
        const enteredSifra = sifraRef.current.value;

        if (!enteredEmail || !enteredSifra) {
            console.log('Molimo popunite sva polja');
            return;
        }
        try {
            const res = await signIn('credentials', {
                email: enteredEmail,
                sifra: enteredSifra,
                redirect: false,
            });
            if (!res.error) {
                toast.success('Uspješna prijava');
                refetch();
            } else {
                toast.error(res.error);
                setLoading(false);
            }
        } catch (error) {
            setGreska(error.message);
            console.log(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='h-screen font-sans bg-cover login'>
            <Head>
                <title>Prijava</title>
            </Head>
            <div className='container flex items-center justify-center flex-1 h-full mx-auto'>
                <div className='w-full max-w-lg'>
                    <div className='leading-loose'>
                        <form
                            onSubmit={handleSubmit}
                            className='max-w-sm p-10 m-4 bg-white bg-opacity-25 rounded shadow-xl'
                        >
                            <p className='text-lg font-medium text-center text-white'>
                                PRIJAVA
                            </p>

                            <div className='mt-2'>
                                <label
                                    className='block text-sm text-white'
                                    htmlFor='email'
                                >
                                    E-mail
                                </label>
                                <input
                                    className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                                    type='email'
                                    id='email'
                                    placeholder='Upišite email'
                                    aria-label='email'
                                    required
                                    ref={emailRef}
                                />
                            </div>
                            <div className='mt-2'>
                                <label className='block text-sm text-white'>
                                    Šifra
                                </label>
                                <input
                                    className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                                    type='password'
                                    id='password'
                                    placeholder='Upišite šifru'
                                    arial-label='password'
                                    required
                                    ref={sifraRef}
                                />
                            </div>

                            <div className='flex items-center justify-between mt-4'>
                                <button
                                    className='px-4 py-1 font-light tracking-wider text-white bg-gray-900 rounded disabled:loading btn disabled:bg-gray-200 hover:bg-gray-800'
                                    type='submit'
                                    disabled={loading}
                                >
                                    Prijava
                                </button>
                                <Link href='/auth/registracija'>
                                    <a className='right-0 inline-block text-sm font-bold text-white align-baseline text-500 hover:text-red-400'>
                                        Registrujte se ?
                                    </a>
                                </Link>
                            </div>
                            {greska && (
                                <span className='text-red-400'>{greska}</span>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prijava;
