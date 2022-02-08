import dbConnect from '../../../../lib/mongodb'
import Struja from '../../../../models/racuni/Struja'
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
          .populate({
            path: 'struja',
            options: { sort: { createdAt: 'desc' } },
          })
          .exec()
        res.status(200).json({ uspjesno: true, user })
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
