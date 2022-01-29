import dbConnect from '../../../../lib/mongodb'
import Kablovska from '../../../../models/Kablovska'

export default async function (req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const kablovska = await Kablovska.find({})
        res.status(200).json({ uspjesno: true, kablovska })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const kablovska = await Kablovska.create(req.body)
        res.status(201).json({ uspjesno: true, kablovska })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}