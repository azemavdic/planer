import dbConnect from '../../../lib/mongodb'
import Racun from '../../../models/Racun'

export default async function (req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const racun = await Racun.find({})
        res.status(201).json({ uspjesno: true, racun })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const racun = await Racun.create(req.body)
        res.status(201).json({ uspjesno: true, racun })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
