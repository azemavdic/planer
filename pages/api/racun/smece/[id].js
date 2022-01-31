import dbConnect from '../../../../lib/mongodb'
import Smece from '../../../../models/racuni/Smece'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedSmece = await Smece.deleteOne({ _id: id })
        if (!deletedSmece) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const smece = await Smece.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!smece) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, smece })
      } catch (error) {
        res.status(400).json({ uspjesno: false, poruka: error })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
