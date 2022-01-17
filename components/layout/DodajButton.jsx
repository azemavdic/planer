const DodajButton = ({ setShowModal }) => {
    return (
        <div className='fixed bottom-16 lg:bottom-5 right-4'>
            <button
                className='btn btn-circle text-2xl text-center'
                onClick={() => setShowModal(true)}
            >
                +
            </button>
        </div>
    );
};

export default DodajButton;
