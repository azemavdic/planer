import { TiDocumentDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { useGetAllPosaoQuery } from '../../redux/apiQuery';
import { izbrisiAktivnost, izmijeniZavrsen } from '../../redux/posaoSlice';

const PosaoList = ({ posao, rb }) => {
    let zavrsenClassName =
        'flex border-l-8 items-center gap-10 rounded-lg relative';
    if (posao?.zavrsen) {
        zavrsenClassName += ' border-green-400';
    } else {
        zavrsenClassName += ' border-red-400';
    }
    const dispatch = useDispatch();
    const { data } = useGetAllPosaoQuery();

    const toggleZavrsen = (id) => {
        const dene = data.map((posao) => {
            if (posao._id === id) {
                return {
                    ...posao,
                    zavrsen: !posao.zavrsen,
                };
            }
            return posao;
        });
        dispatch(izmijeniZavrsen(dene));
    };

    return (
        <>
            <div
                className={zavrsenClassName}
                onDoubleClick={() => toggleZavrsen(posao?._id)}
            >
                <p className='p-2'>{rb}</p>
                <div>
                    <p className='font-bold'>{posao?.naziv}</p>
                    <time className='text-sm italic'>datum</time>
                </div>
                <p>{posao?.opis}</p>
                <TiDocumentDelete
                    className='cursor-pointer absolute top-0 text-red-500 right-2'
                    size={25}
                    onClick={() => dispatch(izbrisiAktivnost(posao?._id))}
                />
            </div>
            <div className='divider'></div>
        </>
    );
};

export default PosaoList;
