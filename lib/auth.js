import { hash, compare } from 'bcryptjs'

export const hashSifra = async (sifra) => {
  const hashedSifra = await hash(sifra, 12)
  return hashedSifra
}

export const provjeriSifru = async (enteredSifra, sifraIzBaze) => {
  const isValid = await compare(enteredSifra, sifraIzBaze)
  return isValid
}
