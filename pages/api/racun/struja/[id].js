import dbConnect from '../../../../lib/mongodb'
import Struja from '../../../../models/racuni/Struja'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedStruja = await Struja.deleteOne({ _id: id })
        if (!deletedStruja) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const struja = await Struja.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!struja) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, struja })
      } catch (error) {
        res.status(400).json({ uspjesno: false, poruka: error })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
