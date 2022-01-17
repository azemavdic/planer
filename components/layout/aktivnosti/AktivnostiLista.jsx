import { TiDocumentDelete, TiDocumentText } from 'react-icons/ti';
import {
    useGetAllMamaAktivnostiQuery,
    useGetAllPosaoQuery,
    useIzbrisiMamaAktivnostMutation,
    useIzbrisiPosaoMutation,
    useToggleZavrsenMamaMutation,
    useToggleZavrsenMutation,
} from '../../../redux/apiQuery';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AktivnostiLista = ({
    data,
    id,
    referenca,
    isEditing,
    setIsEditing,
    editedItem,
    setEditedItem,
    setShowModal,
}) => {
    const datum = dayjs(data?.createdAt).format('DD.MM.YYYY');
    const vrijeme = dayjs(data?.createdAt).format('HH:mm');

    let zavrsenClassName =
        'flex border-l-8 flex-col lg:flex-row items-center bg-white lg:gap-10 rounded-lg relative mb-4 cursor-pointer';
    if (data?.zavrsen) {
        zavrsenClassName += ' border-green-400 shadow-lg shadow-green-400/40';
    } else {
        zavrsenClassName += ' border-red-400 shadow-lg shadow-red-400/40';
    }
    const { refetch } = useGetAllPosaoQuery();

    const { posaoToggle } = useGetAllPosaoQuery(undefined, {
        selectFromResult: ({ data }) => ({
            posaoToggle: data?.posao.find((posao) => posao._id === id),
        }),
    });
    const { mamaToggle } = useGetAllMamaAktivnostiQuery(undefined, {
        selectFromResult: ({ data }) => ({
            mamaToggle: data?.mama.find((mama) => mama._id === id),
        }),
    });
    const [izbrisiPosao] = useIzbrisiPosaoMutation();
    const [izmijeniZavrsen, result] = useToggleZavrsenMutation({
        fixedCacheKey: 'shared-update-post',
    });
    const [izbrisiMamaAktivnost] = useIzbrisiMamaAktivnostMutation();
    const [izmijeniZavrsenMama] = useToggleZavrsenMamaMutation({
        fixedCacheKey: 'shared-update-post',
    });

    const toggleZavrsen = async () => {
        if (referenca === 'mama') {
            await izmijeniZavrsenMama({ id, zavrsen: !mamaToggle?.zavrsen });
        } else {
            await izmijeniZavrsen({ id, zavrsen: !posaoToggle?.zavrsen });
        }
    };

    const handleDelete = async (id) => {
        const MySwal = withReactContent(Swal);
        const confirm = await MySwal.fire({
            title: 'Jeste li sigurni?',
            text: 'Želite obrisati aktivnost?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Da',
            denyButtonText: 'Ne',
            customClass: { htmlContainer: 'grid-row:1' },
        });
        if (confirm.isConfirmed) {
            Swal.fire('Aktivnost izbrisana!', '', 'success');
            if (referenca === 'mama') {
                izbrisiMamaAktivnost({ id }).unwrap();
            } else {
                izbrisiPosao({ id }).unwrap();
            }
            refetch();
        } else {
            Swal.fire('Aktivnost nije izbrisana', '', 'info');
        }
    };

    const handleEditClick = () => {
        setShowModal(true);
        setIsEditing(true);
        setEditedItem(data);
    };

    return (
        <>
            <div className={zavrsenClassName} onDoubleClick={toggleZavrsen}>
                <div className='p-2 lg:border-r-2 border-b-2 lg:border-b-0 w-full lg:w-max'>
                    <p className='lg:py-5 font-bold text-center'>
                        {data?.naziv}
                    </p>
                    <div className='flex items-center lg:block justify-between'>
                        <time className='block -mb-2 text-sm'>{datum}</time>
                        <time className='text-sm italic '>{vrijeme}h</time>
                    </div>
                </div>
                <p className='p-2'>{data?.opis}</p>
                <TiDocumentDelete
                    className='absolute top-0 text-red-500 transition-all cursor-pointer right-2 active:scale-90'
                    size={25}
                    onClick={() => handleDelete(id)}
                />
                <TiDocumentText
                    className='absolute top-0 text-slate-500 transition-all cursor-pointer right-8 active:scale-90'
                    size={25}
                    onClick={handleEditClick}
                />
            </div>
        </>
    );
};

export default AktivnostiLista;
