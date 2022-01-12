const NavbarIcon = ({ naziv, Ikona }) => {
  return (
    <div className='flex items-center space-x-3'>
      <Ikona size={25} />
      <p>{naziv}</p>
    </div>
  )
}

export default NavbarIcon
