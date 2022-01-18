import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loading from '../components/layout/Loading';
import AktivnostiForma from '../components/layout/aktivnosti/AktivnostiForma';
import AktivnostiLista from '../components/layout/aktivnosti/AktivnostiLista';
import { useGetAllPosaoQuery } from '../redux/apiQuery';
import DodajButton from '../components/layout/DodajButton';
import Modal from '../components/layout/Modal';
const { motion } = require('framer-motion');
const Posao = () => {
    const [posaoState, setPosaoState] = useState(null);
    const [filterActive, setfilterActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});

    const { data, isError, isLoading } = useGetAllPosaoQuery();

    useEffect(() => {
        setPosaoState(data?.posao);
    }, [data]);

    const { posaoZavrsen } = useGetAllPosaoQuery(undefined, {
        selectFromResult: ({ data }) => ({
            posaoZavrsen: data?.posao.filter((posao) => posao?.zavrsen),
        }),
    });
    const { posaoNezavrsen } = useGetAllPosaoQuery(undefined, {
        selectFromResult: ({ data }) => ({
            posaoNezavrsen: data?.posao.filter(
                (posao) => posao?.zavrsen === false
            ),
        }),
    });

    const styleBadge = 'p-4 border-none cursor-pointer badge shadow-lg';
    const styleBadgeZavrsen = `${styleBadge} bg-green-700 shadow-green-700/40`;
    const styleBadgeNezavrsen = `${styleBadge} bg-red-600 shadow-red-600/40`;

    const filterNezavrseni = () => {
        setPosaoState(posaoNezavrsen);
        setfilterActive(true);
    };
    const filterZavrseni = () => {
        setPosaoState(posaoZavrsen);
        setfilterActive(true);
    };

    const ocistiFilter = () => {
        setPosaoState(data?.posao);
        setfilterActive(false);
    };

    return (
        <div className='relative'>
            <Head>
                <title>Planer - Posao</title>
            </Head>
            <div className='flex items-center justify-center mt-5 space-x-4'>
                <p className={styleBadgeNezavrsen} onClick={filterNezavrseni}>
                    Nezavršene:{' '}
                    <span className='ml-2'>{posaoNezavrsen?.length}</span>
                </p>
                <p className={styleBadgeZavrsen} onClick={filterZavrseni}>
                    Završene:{' '}
                    <span className='ml-2'>{posaoZavrsen?.length}</span>
                </p>
                {filterActive && (
                    <p
                        className='p-3 text-center cursor-pointer badge'
                        onClick={ocistiFilter}
                    >
                        Očisti
                    </p>
                )}
            </div>
            <div className='flex items-center justify-center gap-4 mt-5'>
                <div className='lg:w-9/12 w-full'>
                    <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
                    {data?.posao.length === 0 ? (
                        <div className='flex items-center justify-center h-[25rem]'>
                            <p>Nema aktivnosti za prikazati.</p>
                        </div>
                    ) : isLoading ? (
                        <div className='flex items-center justify-center h-[25rem]'>
                            <Loading />
                        </div>
                    ) : (
                        <div className='p-4 w-full overflow-y-visible overflow-x-auto bg-white shadow-lg h-[25rem] mt-4 rounded-lg'>
                            {posaoState?.map((posao) => (
                                <motion.div
                                    key={posao._id}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <AktivnostiLista
                                        key={posao._id}
                                        id={posao._id}
                                        data={posao}
                                        referenca='posao'
                                        isEditing={isEditing}
                                        setIsEditing={setIsEditing}
                                        editedItem={editedItem}
                                        setEditedItem={setEditedItem}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DodajButton />
            <Modal setIsEditing={setIsEditing}>
                <div className='flex items-center justify-center'>
                    <AktivnostiForma
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        editedItem={editedItem}
                        setEditedItem={setEditedItem}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Posao;
