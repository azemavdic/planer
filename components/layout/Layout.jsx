import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className='grid grid-cols-12 relative bg-slate-400 h-[100vh]'>
            <div className='col-span-2 bg-slate-700 text-center text-white hidden lg:block shadow-lg'>
                <Sidebar />
            </div>
            <div className='lg:col-span-10 bg-slate-400 p-3 col-span-12 mb-12 lg:mb-0'>
                <Navbar />
                {children}
            </div>
            <div className='lg:hidden fixed bottom-0 left-0 bg-slate-600 h-14 w-full z-50'>
                <MobileMenu />
            </div>
        </div>
    );
};

export default Layout;
