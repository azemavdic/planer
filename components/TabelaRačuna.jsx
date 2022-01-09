import { useSelector } from 'react-redux'
import TrosakItem from './TrosakItem'

const TabelaRačuna = () => {
  const struja = useSelector((state) => state.struja)
  const voda = useSelector((state) => state.voda)
  const smece = useSelector((state) => state.smece)
  const kablovska = useSelector((state) => state.kablovska)
  const mobitel = useSelector((state) => state.mobitel)
  const iptv = useSelector((state) => state.iptv)

  const strujaUkupno = struja.reduce(
    (prev, curr) => prev + Number(curr.iznos),
    0
  )

  return (
    <div className='overflow-x-auto mt-4 overflow-y-visible h-[30rem]'>
      <table className='table w-full table-zebra overflow-x-visible'>
        <thead>
          <tr>
            <th>Račun</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>Maj</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Avg</th>
            <th>Sep</th>
            <th>Okt</th>
            <th>Nov</th>
            <th>Dec</th>
          </tr>
        </thead>
        <tbody>
          <TrosakItem naziv='Struja' trosak={struja} />
          <TrosakItem naziv='Voda' trosak={voda} />
          <TrosakItem naziv='Smece' trosak={smece} />
          <TrosakItem naziv='Kablovska' trosak={kablovska} />
          <TrosakItem naziv='Mobitel' trosak={mobitel} />
          <TrosakItem naziv='IPTV' trosak={iptv} />
        </tbody>
        <tfoot>
          <tr>
            <th>UKUPNO</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default TabelaRačuna
