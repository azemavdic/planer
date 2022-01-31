import dbConnect from '../../../../lib/mongodb'
import Mobitel from '../../../../models/racuni/Mobitel'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedMobitel = await Mobitel.deleteOne({ _id: id })
        if (!deletedMobitel) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const mobitel = await Mobitel.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!mobitel) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, mobitel })
      } catch (error) {
        res.status(400).json({ uspjesno: false, poruka: error })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
