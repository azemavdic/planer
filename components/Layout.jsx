import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2 bg-slate-700 text-center text-white hidden lg:block shadow-lg'>
        <Sidebar />
      </div>
      <div className='lg:col-span-10 bg-slate-400 p-3 col-span-12'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default Layout
