import dbConnect from '../../../lib/mongodb'
import User from '../../../models/korisnici/User'
import { getSession } from 'next-auth/react'
import Mama from '../../../models/aktivnosti/Mama'

export default async function handler(req, res) {
  await dbConnect()
  const session = await getSession({ req })
  const email = session?.user?.email

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ email: email })
          .populate({ path: 'mama', options: { sort: { createdAt: 'desc' } } })
          .exec()
        res.status(200).json({ uspjesno: true, user })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'POST':
      try {
        const user = await Mama.create(req.body)
        res.status(201).json({ uspjesno: true, user })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
      break
  }
}
