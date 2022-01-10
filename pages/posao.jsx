import { useSelector } from 'react-redux';
import FormaPosao from '../components/posao/FormaPosao';
import PosaoList from '../components/posao/PosaoList';

const Posao = () => {
    const posao = useSelector((state) => state.posaoReducer.posao);
    let rb = 1;

    return (
        <div className='grid grid-cols-12 gap-4 mt-20 '>
            <div className='col-span-12 mx-auto lg:col-span-4'>
                <h3 className='text-xl font-bold'>Dodaj aktivnost</h3>
                <FormaPosao />
            </div>
            <div className='col-span-12 lg:col-span-8'>
                <h3 className='text-xl font-bold'>Pregled aktivnosti</h3>
                {posao.length === 0 ? (
                    <p>Nema aktivnosti za prikazati.</p>
                ) : (
                    <div className='p-4 w-full overflow-y-visible overflow-x-auto bg-white shadow-lg h-[25rem] mt-4 rounded-lg'>
                        {posao.map((posao) => (
                            <PosaoList
                                key={posao._id}
                                posao={posao}
                                rb={rb++}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posao;
