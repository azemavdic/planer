import { TiDocumentDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import {
    useGetAllPosaoQuery,
    useIzbrisiPosaoMutation,
} from '../../redux/apiQuery';
import { izbrisiAktivnost, izmijeniZavrsen } from '../../redux/posaoSlice';

const PosaoList = ({ posao, rb, id }) => {
    let zavrsenClassName =
        'flex border-l-8 items-center gap-10 rounded-lg relative';
    if (posao?.zavrsen) {
        zavrsenClassName += ' border-green-400';
    } else {
        zavrsenClassName += ' border-red-400';
    }
    const dispatch = useDispatch();
    const { data } = useGetAllPosaoQuery();
    const { refetch } = useGetAllPosaoQuery();
    const [izbrisiPosao] = useIzbrisiPosaoMutation();

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

    const handleDeletePosao = (id) => {
        try {
            izbrisiPosao({ id }).unwrap();
            refetch();
        } catch (error) {
            console.error(error);
        }
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
                    onClick={() => handleDeletePosao(id)}
                />
            </div>
            <div className='divider'></div>
        </>
    );
};

export default PosaoList;
