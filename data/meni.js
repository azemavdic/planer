import { BsFillHouseFill } from 'react-icons/bs';
import { RiParentFill, RiBillFill } from 'react-icons/ri';
import { MdWork } from 'react-icons/md';

export const meni = [
    {
        naziv: 'Kuća',
        Ikona: BsFillHouseFill,
        path: '/kuca',
    },
    {
        naziv: 'Mama',
        Ikona: RiParentFill,
        path: '/mama',
    },
    {
        naziv: 'Posao',
        Ikona: MdWork,
        path: '/posao',
    },
    {
        naziv: 'Računi',
        Ikona: RiBillFill,
        path: '/racuni',
    },
];
