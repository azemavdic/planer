import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ show, children, title, onClose }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60'>
            <div className='relative'>
                <div className='absolute right-4 top-5 font-bold text-xl cursor-pointer'>
                    <a onClick={handleClose}>x</a>
                </div>
                {title && <div className=''>{title}</div>}
                <div className=''>{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return createPortal(
            modalContent,
            document.getElementById('modal-root')
        );
    } else {
        return null;
    }
};

export default Modal;
