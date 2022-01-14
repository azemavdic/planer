import SidebarMeni from './SidebarMeni';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { meni } from '../../data/meni';

const Sidebar = () => {
    const [vrijeme, setVrijeme] = useState(null);
    const [datum, setDatum] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const vrijemes = dayjs(new Date()).format('HH:mm:ss');
            setVrijeme(vrijemes);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const datumState = new Date();
        setDatum(datumState.toLocaleDateString());
    }, []);

    return (
        <div className='h-screen '>
            <Link href='/' passHref>
                <h1 className='p-6 text-3xl font-bold cursor-pointer'>
                    Planer
                </h1>
            </Link>
            <div className='flex flex-col justify-around space-y-44'>
                <div>
                    <ul className='mt-10'>
                        {meni.map((meni) => (
                            <SidebarMeni key={meni.naziv} meni={meni} />
                        ))}
                    </ul>
                </div>
                <div>
                    <p>{datum}</p>
                    <p>{vrijeme}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
