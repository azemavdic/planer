import dbConnect from '../../../../lib/mongodb'
import Mobitel from '../../../../models/racuni/Mobitel'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const mobitel = await Mobitel.find({})
        res.status(200).json({ uspjesno: true, mobitel })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const mobitel = await Mobitel.create(req.body)
        res.status(201).json({ uspjesno: true, mobitel })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
