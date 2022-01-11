import { useSelector } from 'react-redux';
import FormaPosao from '../components/posao/FormaPosao';
import PosaoList from '../components/posao/PosaoList';
import { useGetAllPosaoQuery } from '../redux/apiQuery';
const Posao = () => {
    let rb = 1;

    const { data, isError, isLoading } = useGetAllPosaoQuery();
    console.log(data);

    return (
        <>
            <div className='flex items-center justify-center mt-5 space-x-4'>
                <p className='badge bg-red-600 border-none p-4'>
                    Nezavršene: <span className='ml-2'>5</span>
                </p>
                <p className='badge bg-green-700 border-none p-4'>
                    Završene: <span className='ml-2'>3</span>
                </p>
            </div>
            <div className='grid grid-cols-12 gap-4 mt-5'>
                <div className='col-span-12 mx-auto lg:col-span-4'>
                    <h3 className='text-xl font-bold'>Dodaj aktivnost</h3>
                    <FormaPosao />
                </div>
                <div className='col-span-12 lg:col-span-8'>
                    <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
                    {data && data.posao.length === 0 ? (
                        <p>Nema aktivnosti za prikazati.</p>
                    ) : (
                        <div className='p-4 w-full overflow-y-visible overflow-x-auto bg-white shadow-lg h-[25rem] mt-4 rounded-lg'>
                            {data?.posao.map((posao) => (
                                <PosaoList
                                    key={posao._id}
                                    id={posao._id}
                                    posao={posao}
                                    rb={rb++}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Posao;
