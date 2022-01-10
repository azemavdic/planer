const PosaoList = ({ posao, rb }) => {
  let zavrsenClassName = 'flex border-l-8 items-center gap-10  rounded-lg'
  if (posao.zavrsen) {
    zavrsenClassName += ' border-green-400'
  } else {
    zavrsenClassName += ' border-red-400'
  }

  return (
    <>
      <div className={zavrsenClassName}>
        <p className='p-2'>{rb}</p>
        <div>
          <p className='font-bold'>{posao.naziv}</p>
          <time className='text-sm italic'>datum</time>
        </div>
        <p>{posao.opis}</p>
      </div>
      {/* <hr className='my-4 bg-slate-500' /> */}
      <div className='divider'></div>
    </>
  )
}

export default PosaoList
