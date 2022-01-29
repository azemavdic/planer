import dbConnect from '../../../../lib/mongodb'
import Smece from '../../../../models/Smece'

export default async function (req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const smece = await Smece.find({})
        res.status(200).json({ uspjesno: true, smece })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const smece = await Smece.create(req.body)
        res.status(201).json({ uspjesno: true, smece })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
