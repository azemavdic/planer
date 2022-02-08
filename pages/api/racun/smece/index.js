import dbConnect from '../../../../lib/mongodb'
import Smece from '../../../../models/racuni/Smece'
import User from '../../../../models/korisnici/User'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  await dbConnect()
  const session = await getSession({ req })
  const email = session?.user?.email

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ email: email })
          .populate({ path: 'smece', options: { sort: { createdAt: 'desc' } } })
          .exec()
        res.status(200).json({ uspjesno: true, user })
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
