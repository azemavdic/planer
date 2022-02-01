import { hash } from 'bcryptjs'

export const hashSifra = async (sifra) => {
  const hashedSifra = await hash(sifra, 12)
  return hashedSifra
}
