import dbConnect from '../../../../lib/mongodb'
import Voda from '../../../../models/Voda'

export default async function (req, res) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedVoda = await Voda.deleteOne({ _id: id })
        if (!deletedVoda) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const voda = await Voda.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!voda) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, voda })
      } catch (error) {
        res.status(400).json({ uspjesno: false, poruka: error })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
