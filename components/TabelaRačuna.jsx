const TabelaRačuna = () => {
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
          <tr>
            <th>1</th>
            <td>100</td>
            <td>40</td>
            <td>70</td>
            <td>120</td>
            <td>20</td>
            <td>10</td>
          </tr>
          <tr>
            <th>2</th>
            <td>100</td>
            <td>40</td>
            <td>70</td>
            <td>120</td>
            <td>20</td>
            <td>10</td>
          </tr>
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
