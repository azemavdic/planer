const TrosakItem = ({ naziv, trosak }) => {
  return (
    <tr>
      <td>{naziv}</td>
      {trosak.map((trosak) => (
        <td key={trosak._id}>{trosak.iznos}</td>
      ))}
    </tr>
  )
}

export default TrosakItem
