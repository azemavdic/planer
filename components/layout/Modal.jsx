import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEditing } from '../../redux/editingItemSlice';
import { showModal } from '../../redux/modalSlice';

const Modal = ({ children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    const showModalSelector = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(isEditing(false));
        dispatch(showModal(false));
    };

    const modalContent = showModalSelector ? (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60'>
            <div className='relative'>
                <div className='absolute z-10 right-4 top-5 font-bold text-xl cursor-pointer'>
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
