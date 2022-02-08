import dbConnect from '../../../../lib/mongodb'
import Iptv from '../../../../models/racuni/Iptv'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedIptv = await Iptv.deleteOne({ _id: id })
        if (!deletedIptv) {
          res.status(400).json({ uspjesno: false })
        }
        res
          .status(200)
          .json({ uspjesno: true, poruka: `Uspješno obrisan ${id} račun` })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const iptv = await Iptv.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!iptv) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, iptv })
      } catch (error) {
        res.status(400).json({ uspjesno: false, poruka: error })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
