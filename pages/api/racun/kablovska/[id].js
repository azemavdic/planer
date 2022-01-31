import dbConnect from '../../../../lib/mongodb'
import Kablovska from '../../../../models/racuni/Kablovska'

export default async function handler(req, res) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedKablovska = await Kablovska.deleteOne({ _id: id })
        if (!deletedKablovska) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true })
      } catch (error) {
        res.status(400).json({ uspjesno: false })
      }
      break
    case 'PUT':
      try {
        const kablovska = await Kablovska.findByIdAndUpdate(
          { _id: id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
        if (!kablovska) {
          res.status(400).json({ uspjesno: false })
        }
        res.status(200).json({ uspjesno: true, kablovska })
      } catch (error) {
        res.status(400).json({ uspjesno: false, poruka: error })
      }
      break
    default:
      res.status(400).json({ uspjesno: false })
  }
}
