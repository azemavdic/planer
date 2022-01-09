import { useSelector } from 'react-redux'

const TabelaRačuna = () => {
  const racuni = useSelector((state) => state.racun)

  return (
    <div className='overflow-x-auto mt-4 overflow-y-visible h-[30rem]'>
      <table className='table w-full table-zebra'>
        <thead>
          <tr>
            <th>RB</th>
            <th>Struja</th>
            <th>Voda</th>
            <th>Smeće</th>
            <th>Kablovska</th>
            <th>Mobitel</th>
            <th>IPTV</th>
          </tr>
        </thead>
        <tbody>
          {racuni.map((racun, index) => {
            return (
              <tr key={index}>
                <td>{racun.mjesec}</td>
                {/* <td>{racun.}</td> */}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>UKUPNO</th>
            <th>200</th>
            <th>130</th>
            <th>130</th>
            <th>130</th>
            <th>130</th>
            <th>130</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default TabelaRačuna
