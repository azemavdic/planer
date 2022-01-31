import dbConnect from '../../../../lib/mongodb'
import Iptv from '../../../../models/racuni/Iptv'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const iptv = await Iptv.find({})
        res.status(200).json({ uspjesno: true, iptv })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const iptv = await Iptv.create(req.body)
        res.status(201).json({ uspjesno: true, iptv })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
