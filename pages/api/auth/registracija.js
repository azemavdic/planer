import { hashSifra } from '../../../lib/auth'
import dbConnect from '../../../lib/mongodb'
import User from '../../../models/korisnici/User'

export default async function handler(req, res) {
  await dbConnect()
  const { ime, email, sifra } = req.body
  switch (req.method) {
    case 'POST':
      try {
        if (!ime || !email || !email.includes('@') || !sifra) {
          res.status(422).json({ poruka: 'Molimo popunite sva polja' })
          return
        }
        const postojeciKorisnik = await User.findOne({ email: email })
        if (postojeciKorisnik) {
          res.status(422).json({ poruka: 'Korisnik već postoji.' })
          return
        }

        const hashedSifra = await hashSifra(sifra)
        const user = await User.create({
          ime: ime,
          email: email,
          sifra: hashedSifra,
        })
        res
          .status(201)
          .json({ poruka: `Korisnik ${user.ime} uspješno kreiran` })
      } catch (error) {
        res.status(400).json({ poruka: 'Nešto je pošlo u krivu (api).' })
      }
      break
    default:
      res.status(400).json({ poruka: 'Neuspješno' })
      break
  }
}
