import dbConnect from '../../../lib/mongodb'
import Posao from '../../../models/Posao'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query
  switch (req.method) {
    case 'GET':
      try {
        const posao = await Posao.findById({ _id: id })
        res.status(200).json({ uspjesno: true, posao })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const posao = await Posao.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!posao) {
          return res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, posao })
      } catch (error) {
        return res.status(400).json({ uspjesno: false })
      }
      break
    case 'DELETE':
      try {
        const deletedPosao = await Posao.deleteOne({ _id: id })
        if (!deletedPosao) {
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
