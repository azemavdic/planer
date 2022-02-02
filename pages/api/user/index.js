import dbConnect from '../../../lib/mongodb'
import User from '../../../models/korisnici/User'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  await dbConnect()
  const session = await getSession()
  const email = session?.user?.email

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ email: 'asko@mail.com' })
          .populate('mama')
          .exec()
        res.status(200).json({ uspjesno: true, user })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
      break
  }
}
