import dbConnect from '../../../lib/mongodb'
import Kuca from '../../../models/aktivnosti/Kuca'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query
  switch (req.method) {
    case 'GET':
      try {
        const aktivnost = await Kuca.findById({ _id: id })
        res.status(200).json({ uspjesno: true, aktivnost })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const aktivnost = await Kuca.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!aktivnost) {
          return res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, aktivnost })
      } catch (error) {
        return res.status(400).json({ uspjesno: false })
      }
      break
    case 'DELETE':
      try {
        const deletedAktivnost = await Kuca.deleteOne({ _id: id })
        if (!deletedAktivnost) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
      break
  }
}
