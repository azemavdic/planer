import dbConnect from '../../../../lib/mongodb'
import Struja from '../../../../models/Struja'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const struja = await Struja.find({})
        res.status(200).json({ uspjesno: true, struja })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const struja = await Struja.create(req.body)
        res.status(201).json({ uspjesno: true, struja })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
