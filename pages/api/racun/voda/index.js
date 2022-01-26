import dbConnect from '../../../../lib/mongodb'
import Voda from '../../../../models/Voda'

export default async function (req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const voda = await Voda.find({})
        res.status(201).json({ uspjesno: true, voda })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const voda = await Voda.create(req.body)
        res.status(201).json({ uspjesno: true, voda })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
