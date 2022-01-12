import Link from 'next/link';
import { meni } from '../../data/meni';

import MobileMenuItem from './MobileMenuItem';

const MobileMenu = () => {
    return (
        <div className='flex items-center justify-around py-3'>
            {meni.map(({ naziv, Ikona, path }) => (
                <MobileMenuItem key={naziv} Ikona={Ikona} path={path} />
            ))}
        </div>
    );
};

export default MobileMenu;
