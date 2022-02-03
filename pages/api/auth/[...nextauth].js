import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { provjeriSifru } from '../../../lib/auth'
import dbConnect from '../../../lib/mongodb'
import User from '../../../models/korisnici/User'

export default NextAuth({
  callbacks: {},
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw new Error('Korisnik nije pronađen!')
        }

        const isValid = await provjeriSifru(credentials.sifra, user.sifra)

        if (!isValid) {
          throw new Error('Šifra nije tačna.')
        }
        return { email: user.email }
      },
    }),
  ],
  // secret: process.env.SECRET,
})
